# knights-travails

# Knights Travails

This project provides a solution for calculating the shortest path a knight can take between two squares on a standard 8x8 chessboard using graph traversal techniques. The algorithm efficiently determines the optimal path by applying Breadth-First Search (BFS) and leverages an adjacency list to store possible moves for each square.

## Key Features
- **Chessboard Representation:** The chessboard is modeled as a graph where each square is a vertex, and valid knight moves form the edges.
- **Input Validation:** Ensures that both the starting and target coordinates are within the bounds of the chessboard. Throws errors for invalid coordinate input to prevent incorrect computations.
- **Breadth-First Search (BFS):** Guarantees the optimal solution by exploring all adjacent squares per move count. Utilizes a custom linked list to manage the BFS queue.
- **Path Display:** Outputs the number of moves and the path coordinates from the start to the target square.

