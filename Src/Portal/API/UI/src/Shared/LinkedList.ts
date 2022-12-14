
export class Node<T> {
    public next: Node<T> | null = null;
    public prev: Node<T> | null = null;
    constructor(public data: T) {}
}

interface ILinkedList<T> {
    insertInBegin(data: T): Node<T>;
    insertAtEnd(data: T): Node<T>;
    // deleteNode(node: Node<T>): void;
    traverse(): T[];
    size(): number;
    search(comparator: (data: T) => boolean): Node<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null = null;

    private length:number = 0;

    private max_size:number | null = null

    constructor(max_size?:number|null) {
      if(max_size){
        this.max_size = max_size
      }
    }

    public lastNode(){
      if (!this.head) {
        return this.head
      }

      const getLast = (node: Node<T>): Node<T> => {
        return node.next ? getLast(node.next) : node;
      };

      return getLast(this.head);
    }

    public insertAtEnd(data: T): Node<T> {
      const node = new Node(data);
      if (!this.head) {
        this.head = node;
      } else {
        const getLast = (node: Node<T>): Node<T> => {
          return node.next ? getLast(node.next) : node;
        };
  
        const lastNode = getLast(this.head);
        node.prev = lastNode;
        lastNode.next = node;
      }
      this.length++;      
      return node;
    }
  
    public insertInBegin(data: T): Node<T> {
      const node = new Node(data);
      if (!this.head) {
        this.head = node;
      } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      }
      this.length++;
      return node;
    }
  
    private deleteNode(node: Node<T>): void {
      if (!node.prev) {
        this.head = node.next;
      } else {
        const prevNode = node.prev;
        prevNode.next = node.next;
      }
      this.length--;    
    }

    public deleteFirst(): void {

        if(!this.head){
            return;
        }

        this.head = this.head.next;

        this.length--;    
    }

    public deleteLast(): void {

      if(!this.head){
          return;
      }

      const getLast = (node: Node<T>): Node<T> => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.head);

      this.deleteNode(lastNode)
    }
    
    public search(comparator: (data: T) => boolean): Node<T> | null {
      const checkNext = (node: Node<T>): Node<T> | null => {
        if (comparator(node.data)) {
          return node;
        }
        return node.next ? checkNext(node.next) : null;
      };
  
      return this.head ? checkNext(this.head) : null;
    }
  
    public traverse(): T[] {
      const array: T[] = [];
      if (!this.head) {
        return array;
      }
  
      const addToArray = (node: Node<T>): T[] => {
        array.push(node.data);
        return node.next ? addToArray(node.next) : array;
      };
      return addToArray(this.head);
    }
  
    public size(): number {
      return this.length
    }

}