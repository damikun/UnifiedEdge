
import { createClient } from "graphql-ws";
import { meros } from "meros";

import {
  Environment,
  FetchFunction,
  Network,
  Observable,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

import { BASE_SERVER_URL, BASE_SERVER_WS_URL_DEV, GQL_ENDPOINT } from "../constants";

const fetchGraphQL: FetchFunction = (operation, variables, _cacheConfig) => {
	return Observable.create((sink) => {
		(async () => {

		const response = await fetch(`${BASE_SERVER_URL}/${GQL_ENDPOINT}`, {
        credentials: "include",
        method: "POST",
        mode: "cors",
		body: JSON.stringify({
			// id: operation.id, // NOTE: pass md5 hash to the server
			query: operation.text, // this is now obsolete because text is null
			variables,
			operationName: operation.name,
		}),
        headers: {
        //   "Accept": "application/json",
          "Content-Type": "application/json",
          'X-CSRF': '1'
        },
			});

			try{	
				const parts = await meros<ExecutionPatchResult>(response);

					if (isAsyncIterable(parts)) {
						for await (const part of parts) {
							if (!part.json) {
								sink.error(new Error('Failed to parse part as json'));
								break;
							}

							if(part?.body)  //@ts-ignore
								sink.next(part?.body);
						}
					} else {
		
						sink.next(await parts.json());
					}

				sink.complete();

			}catch (error) {
				sink.error(error as Error);
			}
			
		})();
		
	});
};


const STORE_ENTRIES = 250;

const STORE_CACHE_RELEASE_TIME = 3 * 5 * 1000; // 2 mins

export interface ExecutionPatchResult<
	TData = ObjMap<unknown> | unknown,
	TExtensions = ObjMap<unknown>
> {
	errors?: ReadonlyArray<any>; // GraphQLError
	data?: TData | null;
	path?: ReadonlyArray<string | number>;
	label?: string;
	hasNext: boolean;
	extensions?: TExtensions;
}

export interface ObjMap<T> {
	[key: string]: T;
}

const wsClient = createClient({
	url: `${BASE_SERVER_WS_URL_DEV}/${GQL_ENDPOINT}`,
	connectionParams: () => {
		return {
			'X-CSRF': '1'
		};
	  },
  });
  
function fetchOrSubscribe(
	operation: RequestParameters,
	variables: Variables,
  ): Observable<any> {
	return Observable.create((sink) => {
	  if (!operation.text) {
		return sink.error(new Error('Operation text cannot be empty'));
	  }
	  return wsClient.subscribe(
		{
		  operationName: operation.name,
		  query: operation.text,
		  variables,
		},
		sink,
	  );
	});
  }
  
export function createEnvironment() {
	//@ts-ignore
	const network = Network.create(fetchGraphQL, fetchOrSubscribe);

	const source = new RecordSource();

	const store = new Store(source, {
		gcReleaseBufferSize: STORE_ENTRIES,
		queryCacheExpirationTime: STORE_CACHE_RELEASE_TIME,
	});
	
	return new Environment({
		network,
		store,
	});
}

function isAsyncIterable(input: unknown): input is AsyncIterable<unknown> {
	return (
		typeof input === 'object' &&
		input !== null &&
		((input as any)[Symbol.toStringTag] === 'AsyncGenerator' ||
			Symbol.asyncIterator in input)
	);
}
