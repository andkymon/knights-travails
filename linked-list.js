import { Node } from "./node.js"

export class LinkedList {
    constructor() {
        this.headNode = null;
    }

    append(value) {
        if (this.headNode === null) {
            this.prepend(value);
            return;
        } 

        const newNode = new Node(value);
        const tail = this.tail();

        tail.nextNode = newNode;
    }

    prepend(value) {
        const newNode = new Node(value, this.headNode);
        this.headNode = newNode;
    }

    size() {
        if (this.headNode === null) {
            return 0;
        }

        let searchPointer = this.headNode;
        let count = 0;

        // Stop when searchPointer points to null
        while (searchPointer !== null) { 
            count++;
            searchPointer = searchPointer.nextNode;
        }

        return count;
    }

    head() {
        return this.headNode;
    }

    tail() {
        let searchPointer = this.headNode;

        // Stop when searchPointer points to tail
        while (searchPointer.nextNode !== null) { 
            searchPointer = searchPointer.nextNode;
        }

        return searchPointer;
    }

    at(index) {
        if (index >= this.size() || index < 0 || !Number.isInteger(index)) {
            return console.error("Invalid index selected");
        }

        if (this.headNode === null) {
            return console.error("List empty");
        }

        let searchPointer = this.headNode;

        for (let i = 0; i < index; i++) {   
            searchPointer = searchPointer.nextNode;
        }

        return searchPointer;
    }

    pop() {
        if (this.headNode === null) {
            return console.error("List empty");
        }

        let searchPointer = this.headNode;

        // Stop when searchPointer points to node before tail
        while (searchPointer.nextNode.nextNode !== null) { 
            searchPointer = searchPointer.nextNode;
        }
        const poppedNode = searchPointer.nextNode;
        searchPointer.nextNode = null;

        return poppedNode;
    }

    contains(value) {
        let searchPointer = this.headNode;

        // Stop when searchPointer points to null
        while (searchPointer !== null) { 
            if (value === searchPointer.value) {
                return true;
            }
            searchPointer = searchPointer.nextNode;
        }
        return false;
    }

    find(value) {
        if (this.headNode === null) {
            return console.error("List empty");
        }

        let searchPointer = this.headNode;
        let index = 0;

        // Stop when searchPointer points to null
        while (searchPointer !== null) { 
            if (value === searchPointer.value) {
                return index;
            }
            index++;
            searchPointer = searchPointer.nextNode;
        }

        return console.error("Node not found");
    }

    toString() {
        let string = "";
        let searchPointer = this.headNode;

        while (searchPointer !== null) { 
            string += `( ${searchPointer.value} ) -> `
            searchPointer = searchPointer.nextNode;
        }

        string += "null";
        return string;
    }

    insertAt(value, index) {
        if (index > this.size() || index < 0 || !Number.isInteger(index)) {
            return console.error("Invalid index selected");
        }

        if (this.headNode === null && index === 0) {
            this.prepend(value);
            return;
        }

        let searchPointer = this.headNode;

        // Stop when searchPointer points to node before desired index
        for (let i = 0; i < index - 1; i++) {   
            searchPointer = searchPointer.nextNode;
        }

        searchPointer.nextNode = new Node(value, searchPointer.nextNode);
    }

    removeAt(index) {
        if (index > this.size() || index < 0 || !Number.isInteger(index)) {
            return console.error("Invalid index selected");
        }

        if (this.headNode === null) {
            return console.error("List empty");
        }

        if (index === 0) {
            this.headNode = this.headNode.nextNode;
            return;
        }

        let searchPointer = this.headNode;

        // Stop when searchPointer points to node before desired index
        for (let i = 0; i < index - 1; i++) {   
            searchPointer = searchPointer.nextNode;
        }

        searchPointer.nextNode = searchPointer.nextNode.nextNode;
    }
}