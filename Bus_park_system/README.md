Bus Park Network Management System
Overview
The Bus Park Network Management System is a C++ application designed to manage a network of bus parks in Rwanda, represented as a weighted, undirected graph. Bus parks are nodes with properties (ID, name, location, capacity, has_toilets), and connections between them are edges weighted by distance (in kilometers). The system supports full CRUD (Create, Read, Update, Delete) operations for both bus parks and connections, stores data in a single CSV file (bus_park_network.csv), and implements Dijkstra’s algorithm to find the shortest path between bus parks. An interactive console interface allows users to perform all operations via a menu-driven system.
Features

Bus Park Management:
Add, list, update, or delete bus parks with properties: ID (string), name (string), location (string), capacity (int), has_toilets (boolean).
Validation ensures unique IDs, non-empty fields, and non-negative capacity.

Connection Management:
Add, list, update, or delete bidirectional connections between bus parks with a distance (float).
Validation ensures existing bus parks, positive distances, no self-loops, and no duplicate connections.

Shortest Path:
Uses Dijkstra’s algorithm to find the shortest path between two bus parks, returning the path (sequence of bus park names) and total distance.

Data Storage:
All data (bus parks and connections) is stored in a single CSV file (bus_park_network.csv) with a type column to distinguish records.

Interactive Interface:
Menu-driven console interface prompts users to enter data for all operations.
Robust input validation handles invalid inputs with retry prompts.

Performance:
Uses unordered_map for O(1) lookups and vector for adjacency lists, efficient for sparse graphs.
Dijkstra’s algorithm uses a priority_queue for O((V + E) log V) complexity.
CSV I/O is minimized by writing only after successful operations.

File Structure
The project consists of three C++ files, each with line-by-line comments for clarity:

BusPark.h:

Purpose: Header file defining the BusPark struct and declaring the Graph class.
Contents:
BusPark struct with fields: id, name, location, capacity, has_toilets, and a constructor.
Graph class declaration with private members (busParks, adjList, NETWORK_FILE) and public methods for CRUD, CSV handling, and shortest path computation.

Artifact ID: 81c0e1da-0d6e-4d70-b6f2-b19288869669

BusPark.cpp:

Purpose: Implements the Graph class methods for managing bus parks, connections, CSV storage, and Dijkstra’s algorithm.
Contents:
Validation methods (validateBusPark, validateConnection).
CSV handling (saveToCSV, loadFromCSV) for a single CSV file.
CRUD methods for bus parks (addBusPark, getBusPark, getAllBusParks, updateBusPark, deleteBusPark).
CRUD methods for connections (addConnection, getConnections, getAllConnections, updateConnection, deleteConnection).
Dijkstra’s algorithm (findShortestPath) for shortest path computation.

Artifact ID: 0f55c314-0992-4ea4-a69a-eb88508181eb

main.cpp:

Purpose: Implements an interactive console interface for user interaction.
Contents:
Helper functions for input validation (clearInputBuffer, getStringInput, getIntInput, getBoolInput, getDoubleInput).
Main menu loop with options to add/list/update/delete bus parks and connections, find shortest paths, and exit.
Exception handling for robust error management.

Artifact ID: e07a9b3d-f85b-4fde-ac47-4372ffdb3e3c

CSV File Format
All data is stored in a single CSV file: bus_park_network.csv. The file uses a type column to distinguish between bus park and connection records.
Example bus_park_network.csv:
type,id,name,location,capacity,has_toilets,source_id,destination_id,distance
park,BP001,Kigali Central,Kigali,50,true,,,
park,BP002,Gisenyi Main,Gisenyi,30,false,,,
park,BP003,Huye Park,Huye,40,true,,,
connection,,,,,,BP001,BP002,3.2
connection,,,,,,BP002,BP001,3.2
connection,,,,,,BP001,BP003,5.5
connection,,,,,,BP003,BP001,5.5

Columns:
type: "park" for bus parks, "connection" for connections.
id, name, location, capacity, has_toilets: Used for bus park records; empty for connections.
source_id, destination_id, distance: Used for connection records; empty for bus parks.

Requirements

Compiler: C++17-compliant compiler (e.g., g++ 7.0 or later).
Operating System: Platform-independent (tested on Unix-like systems; should work on Windows with minor adjustments).
Dependencies: Standard C++ libraries (iostream, fstream, sstream, unordered_map, vector, queue, unordered_set, limits, algorithm, stdexcept).

Compilation and Execution

Save Files:

Place BusPark.h, BusPark.cpp, and main.cpp in the same directory.
Ensure file names match exactly.

Compile:
g++ -std=c++17 BusPark.cpp main.cpp -o bus_park_system

Run:
./bus_park_system

Output:

The program displays a menu with options 1-10 for managing bus parks and connections.
Data is saved to bus_park_network.csv after each successful operation.
The CSV file is created/updated in the working directory.

Usage
The program provides a menu-driven interface with the following options:

Add Bus Park: Enter ID, name, location, capacity, and has_toilets.
List Bus Parks: Display all bus parks with details.
Update Bus Park: Update an existing bus park’s details by ID.
Delete Bus Park: Remove a bus park and its connections by ID.
Add Connection: Enter source ID, destination ID, and distance.
List Connections: Display all connections with distances.
Update Connection: Update the distance of an existing connection.
Delete Connection: Remove a connection between two bus parks.
Find Shortest Path: Find the shortest path between two bus parks using Dijkstra’s algorithm.
Exit: Save data and exit the program.

Sample Interaction:
Welcome to the Bus Park Network Management System!

Menu:

1. Add Bus Park
2. List Bus Parks
   ...
3. Exit
   Enter choice (1-10): 1
   Enter bus park ID: BP001
   Enter bus park name: Kigali Central
   Enter location: Kigali
   Enter capacity: 50
   Has toilets? (true/false): true
   Bus park added successfully.

Menu:
Enter choice (1-10): 9
Enter start bus park ID: BP001
Enter end bus park ID: BP003
Shortest Path from BP001 to BP003:
Kigali Central -> Huye Park (Total: 5.5 km)

Error Handling

Input Validation: The interactive interface validates user inputs (e.g., non-negative capacity, positive distances, existing IDs) with retry prompts.
File I/O: Throws exceptions for file access errors.
CRUD Operations: Return boolean values to indicate success/failure, with appropriate error messages.
Shortest Path: Returns an empty path if no valid path exists.

Extensibility

Add Fields: Extend the BusPark struct and update saveToCSV/loadFromCSV to include additional properties (e.g., amenities).
Additional Algorithms: Add other graph algorithms (e.g., A\* or BFS) to the Graph class.
User Interface: Replace the console interface with a GUI or web interface by modifying main.cpp.

Notes

Single CSV File: All data is stored in bus_park_network.csv, with a type column to differentiate between bus park and connection records.
Line-by-Line Comments: All source files include detailed comments for every line, ensuring clarity and maintainability.
Performance: Optimized with unordered_map for fast lookups, vector for adjacency lists, and priority_queue for Dijkstra’s algorithm.
Artifact IDs:
BusPark.h: 81c0e1da-0d6e-4d70-b6f2-b19288869669
BusPark.cpp: 0f55c314-0992-4ea4-a69a-eb88508181eb
main.cpp: e07a9b3d-f85b-4fde-ac47-4372ffdb3e3c

For issues, questions, or feature requests, please contact the developer or submit a pull request.

frank@frank-ThinkBook-14-G2-ITL:~/Desktop/Ne/Bus_park_system$ g++ -std=c++17 BusPark.cpp main.cpp -o bus_park_system
frank@frank-ThinkBook-14-G2-ITL:~/Desktop/Ne/Bus_park_system$ ./bus_park_system
Welcome to the Bus Park Network Management System!

sudo apt update
sudo apt install graphviz
