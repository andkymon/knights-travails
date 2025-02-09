import { LinkedList } from "./linked-list.js";

// Chess board in coordinates is from [0, 0] to [7, 7], from bottom left to top right
// We can index each coordinate as 0 to 63, square on chessboard[1, 2] would be index 10
// Conversion to index is: coordinates: [x, y] -> index: x + (y * 8)
// Index to coordinates: squareNumber: i -> coordinates: [Math.floor(i / 8), (i % 8)]
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

// Storing these constants in an array, sorted by ascending indices
const adjacentVertexConstants = [
  [-1, -2],
  [1, -2],
  [-2, -1],
  [2, -1],
  [-2, 1],
  [2, 1],
  [-1, 2],
  [1, 2],
];

// Let's create an adjacency list, where each index contains a list of all the indices they can move to
// Adjacent vertices do not mean they are beside each other on the chessboard
// adjacencyList[0] will store a list [[1, 2], [2, 1]]
const adjacencyList = [];
const CHESSBOARD_SIZE = 8 * 8;

for (let i = 0; i < CHESSBOARD_SIZE; i++) {
  adjacencyList[i] = [];

  for (const adjacentVertexConstant of adjacentVertexConstants) {
    // Adjacent square validation must be done using coordinates, as some invalid coordinates can have a valid (but incorrect) index
    const currentSquareCoordinates = getCoordinates(i);
    const x = currentSquareCoordinates[0] + adjacentVertexConstant[0];
    const y = currentSquareCoordinates[1] + adjacentVertexConstant[1];
    const adjacentVertexCoordinates = [x, y];

    if (validateCoordinates(adjacentVertexCoordinates) === true) {
      // Store index of adjacent square
      adjacencyList[i].push(getIndex(adjacentVertexCoordinates));
    }
  }
}

function getCoordinates(index) {
  const x = index % 8;
  const y = Math.floor(index / 8);

  return [x, y];
}

function validateCoordinates(coordinates) {
  // If coordinate has a negative number, or is higher than 7, it is out of the chessboard's bounds
  if (
    coordinates[0] < 0 ||
    coordinates[1] < 0 ||
    coordinates[0] >= 8 ||
    coordinates[1] >= 8
  ) {
    return false;
  }
  return true;
}

function getIndex(coordinates) {
  return coordinates[0] + coordinates[1] * 8;
}

// Array to keep track of a vertex's distance from starting vertex and its parent vertex's index, data needed for console output
const vertexData = new Array(adjacencyList.length);

export function knightMoves(start, end) {
  if (
    validateCoordinates(start) === false ||
    validateCoordinates(end) === false
  ) {
    throw new Error("Invalid coordinates selected.");
  }

  // Convert coordinates to index numbers
  const startIndex = getIndex(start);
  const endIndex = getIndex(end);

  // Set unvisited vertices as null, visited vertices will store objects with data for distance and parent
  vertexData.fill(null);

  // Initialize root, distance of root to itself is always 0, and no parent
  vertexData[startIndex] = { distanceFromStart: 0, parentIndex: null };

  // Using queue for BFS (breadth-first search) to find shortest path between vertices
  const queue = new LinkedList();
  queue.append(startIndex);

  while (queue.size() !== 0) {
    // Base case
    if (endVertexFound(queue, endIndex) === true) {
      displayMoves(endIndex);
      return;
    }

    // Access front of the queue, then enqueue its unvisited adjacent squares (BFS)
    const parentIndex = queue.headNode.value;

    for (const adjacentVertexIndex of adjacencyList[parentIndex]) {
      // Only enqueue non-visited vertices, which are null
      if (vertexData[adjacentVertexIndex] === null) {
        queue.append(adjacentVertexIndex);

        // Distance of a vertex from the start is its parent's distance from the start + 1
        const distanceFromStart = vertexData[parentIndex].distanceFromStart + 1;

        // Assign square data values on their respective index in vertexData array
        vertexData[adjacentVertexIndex] = { distanceFromStart, parentIndex };
      }
    }

    // Dequeue
    queue.headNode = queue.headNode.nextNode;
  }
}

function endVertexFound(queue, endIndex) {
  if (queue.headNode.value === endIndex) {
    return true;
  }
}

function displayMoves(endIndex) {
  if (vertexData[endIndex].distanceFromStart === 0) {
    console.log(`You're already on that square, silly!`);
    return;
  } else if (vertexData[endIndex].distanceFromStart === 1) {
    console.log(
      `You made it in ${vertexData[endIndex].distanceFromStart} move! Your path is:`
    );
  } else {
    console.log(
      `You made it in ${vertexData[endIndex].distanceFromStart} moves! Your path is:`
    );
  }

  // Store each vertex in shortest path in an array
  const pathArray = [];
  let searchPointer = endIndex;

  while (searchPointer !== null) {
    const currentSquareCoordinates = getCoordinates(searchPointer);
    pathArray.push(currentSquareCoordinates);

    searchPointer = vertexData[searchPointer].parentIndex;
  }

  // Display path from start to end by popping each entry in the array
  while (pathArray.length !== 0) {
    console.log(pathArray.pop());
  }
}