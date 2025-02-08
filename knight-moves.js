
// Chess board in coordinates is from [0, 0] to [7, 7], from bottom left to top right
// We can label each square as 0 to 63, square on chessboard[1, 2] would be square 10
// Conversion to square number is: coordinates: [x, y] -> squareNumber: 
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
for (i = 0; i < 64; i++) {
    adjacencyList[i] = [];
    adjacencyList[i].push(`${i}: `);

    for (const adjacentSquareConstant of adjacentSquareConstants) {
        // Get coordinates of adjacent square
        const x = Math.floor(i / 8) + adjacentSquareConstant[0];
        const y = (i % 8) + adjacentSquareConstant[1];

        // If coordinate has a negative number, or is higher than 7, it is out of the chessboard's bounds
        if (x > 0 && y > 0 && x < 8 && y < 8) {
            // Store as square number
            adjacencyList[i].push(x + (y * 8));
        }
    }
}

console.log(adjacencyList);
    