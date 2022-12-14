
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

import { BASE_SERVER_URL, BASE_SERVER_WS_URL_DEV, GQL_INTERNAL_ENDPOINT } from "../constants";

const ErrorMessages = {
	FAILED_FETCH: 'Failed to fetch',
	ERROR_FETCH: 'Error in fetch',
	UNWORKABLE_FETCH: 'Unworkable fetch',
	SOCKET_CLOSED: 'Socket closed',
	GRAPHQL_ERRORS: 'GraphQL error',
  };

class NetworkError extends Error {
	constructor(message:any, options:any) {
	  super(message, options);
  
	  this.name = 'NetworkError';
  
	  if (options) {
		const {cause, ...meta} = options;
  
		Object.assign(this, meta);
	  }
	}
  }

const fetchGraphQL: FetchFunction = (operation, variables, _cacheConfig) => {
	return Observable.create((sink) => {
		(async () => {


		const request = new Request(`${BASE_SERVER_URL}/${GQL_INTERNAL_ENDPOINT}`, {
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
				"Accept": "application/graphql-response+json;charset=utf-8, multipart/mixed;charset=utf-8",
				"Content-Type": "application/json",
				'X-CSRF': '1'
			},
			})

		const response = await fetch(request);

			// Status code in range 200-299 inclusive (2xx).
			if (response.ok) {
				try {
				  const parts = await meros(response);

				  if (isAsyncIterable(parts)) {
					//@ts-ignore
					for await (const part of parts) {
					  if (!part.json) {
						sink.error(
						  new NetworkError(ErrorMessages.UNWORKABLE_FETCH, {
							Request,
							response,
						  }),
						);
						break;
					  }
	  
					  // If any exceptions occurred when processing the request,
					  // throw an error to indicate to the developer what went wrong.
					  if ('errors' in part.body) {
						sink.error(
						  new NetworkError(ErrorMessages.GRAPHQL_ERRORS, {
							request,
							response,
						  }),
						);
						break;
					  }
	  
					  if ('data' in part.body) {
						 //@ts-ignore
						sink.next(part.body);
					  }
	  
					  if ('incremental' in part.body) {
						 //@ts-ignore
						for (const chunk of part.body.incremental) {
						  if ('data' in chunk) {
							sink.next({
							  ...chunk,
							  hasNext: part.body.hasNext,
							});
						  } else {
							if (chunk.items) {
							  const location = chunk.path.slice(0, -1);
							  let index = chunk.path.at(-1);
	  
							  for (const item of chunk.items) {
								sink.next({
								  ...chunk,
								  path: location.concat(index++),
								  data: item,
								  hasNext: part.body.hasNext,
								});
							  }
							} else {
							  sink.next({
								...chunk,
								data: chunk.items,
								hasNext: part.body.hasNext,
							  });
							}
						  }
						}
					  }
					}
				  } else {
					const json = await response.json();

					if ('errors' in json) {
					  sink.error(
						new NetworkError(ErrorMessages.GRAPHQL_ERRORS, {
						  request,
						  response,
						}),
					  );
					} else {
	  
					  sink.next(json);
					}
				  }
	  
				  sink.complete();
				} catch (err) {
				  sink.error(
					new NetworkError(ErrorMessages.UNWORKABLE_FETCH, {
					  cause: err,
					  request,
					  response,
					}),
					true,
				  );
				}
			  } else {
				sink.error(
				  new NetworkError(ErrorMessages.ERROR_FETCH, {request, response}),
				);
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
	url: `${BASE_SERVER_WS_URL_DEV}/${GQL_INTERNAL_ENDPOINT}`,
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

export const isAsyncIterable = (value:any) =>
  typeof Object(value)[Symbol.asyncIterator] === 'function';

// function isAsyncIterable(input: unknown): input is AsyncIterable<unknown> {
// 	return (
// 		typeof input === 'object' &&
// 		input !== null &&
// 		((input as any)[Symbol.toStringTag] === 'AsyncGenerator' ||
// 			Symbol.asyncIterator in input)
// 	);
// }
