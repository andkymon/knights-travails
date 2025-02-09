import { LinkedList } from "./linked-list.js"

// Chess board in coordinates is from [0, 0] to [7, 7], from bottom left to top right
// We can label each square as 0 to 63, square on chessboard[1, 2] would be square 10
// Conversion to square number is: coordinates: [x, y] -> squareNumber: x + (y * 8)
// Square number to coordinates: squareNumber: i -> coordinates: [Math.floor(i / 8), (i % 8)]
// If coordinate has a negative number, or is higher than 7, it is out of the chessboard's bounds

// In any square, a knight's adjacent squares are:
// coordinates: [x - 2, y - 1] 
// coordinates: [x - 2, y + 1] 
// coordinates: [x - 1, y - 2] 
// coordinates: [x - 1, y + 2] 
// coordinates: [x + 1, y - 2] 
// coordinates: [x + 1, y + 2] 
// coordinates: [x + 2, y - 1] 
// coordinates: [x + 2, y + 1] 

// Storing these constants in an array, sorted by ascending square numbers
const adjacentSquareConstants = [[-1, -2], [1, -2], [-2, -1], [2, -1], [-2, 1], [2, 1], [-1, 2], [1, 2]];

// Let's create an adjacency list, where each entry contains a list of all their adjacent squares
// adjacencyList[0] will store a list [[1, 2], [2, 1]]

const adjacencyList = [];

// Generate adjacency list
for (let i = 0; i < 64; i++) {
    adjacencyList[i] = [];

    for (const adjacentSquareConstant of adjacentSquareConstants) {
        // Get coordinates of adjacent square
        const x = (i % 8) + adjacentSquareConstant[0];
        const y = Math.floor(i / 8) + adjacentSquareConstant[1];

        if (validateCoordinates([x, y]) === true) {
            // Store as square number
            adjacencyList[i].push(x + (y * 8));
        }
    }
}

export function knightMoves(start, end) {
    if (validateCoordinates(start) === false || validateCoordinates(end) === false) {
        throw new Error("Invalid coordinates selected.");
    }

    // Convert coordinates to square/index numbers
    const startSquareNumber = start[0] + (start[1] * 8);
    const endSquareNumber = end[0] + (end[1] * 8);

    // array to keep track of a node's distance from root and its parent's index, needed for output
    // Set unvisited nodes as null, visited nodes will store objects with data for distance and parent
    const nodeData = new Array(adjacencyList.length).fill(null);
    
    // Initialize root, distance of root to itself is always 0, and no parent
    nodeData[startSquareNumber] = {distanceFromRoot: 0, parentIndex: null};

    // Using queue for breadth-first search to find shortest path
    const queue = new LinkedList();
    queue.append(startSquareNumber);

    while (queue.size() !== 0) {
        // Base case
        if (queue.headNode.value === endSquareNumber) {
            if (queue.headNode.value === endSquareNumber && nodeData[endSquareNumber] === 0) {
                console.log(`You're already on that square, silly!`);
                return;
            } else if (queue.headNode.value === endSquareNumber && nodeData[endSquareNumber] === 1) {
                console.log(`You made it in ${nodeData[endSquareNumber].distanceFromRoot} move! Your path is:`);
            } else {
                console.log(`You made it in ${nodeData[endSquareNumber].distanceFromRoot} moves! Your path is:`);
            }

            const pathArray = [];
            let searchPointer = endSquareNumber;

            while (searchPointer !== null) {
                // Convert to coordinates
                const x = (searchPointer % 8);
                const y = Math.floor(searchPointer / 8);
                
                pathArray.push([x, y]);

                searchPointer = nodeData[searchPointer].parentIndex;
            }

            while (pathArray.length !== 0) {
                console.log(pathArray.pop());
            }

            return;
        }

        // Set the front of the queue as parent, enqueue children (BFS)
        const parentIndex = queue.headNode.value;
        for (const adjacentNode of adjacencyList[parentIndex]) {
            // Only enqueue non-visited nodes, which are null
            if (nodeData[adjacentNode] === null) {
                queue.append(adjacentNode); 

                // Distance of a node from the root is its parent's distance from the root + 1
                const distanceFromRoot = nodeData[parentIndex].distanceFromRoot + 1;

                // Assign data values
                nodeData[adjacentNode] = {distanceFromRoot, parentIndex};
            }
        }

        // Dequeue
        queue.headNode = queue.headNode.nextNode;
    }
}

function validateCoordinates(coordinates) {
    // If coordinate has a negative number, or is higher than 7, it is out of the chessboard's bounds
    if (coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] >= 8 || coordinates[1] >= 8) {
        return false;
    }
    return true;
}
