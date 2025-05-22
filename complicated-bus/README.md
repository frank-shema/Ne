Complicated Bus Park System
Project Overview
The Complicated Bus Park System is a C++ application designed to manage a large-scale bus park facility in a metropolitan area. It simulates the operations of a multi-tiered bus park, handling bus scheduling, passenger management, and pathway navigation for a network of buses. The system uses linked lists to manage buses and passengers within zones, a graph data structure to model pathways between zones, and CSV files for data persistence. It is built to support real-time updates and can be extended for integration with autonomous bus technologies and databases.
Features

Zone Management:
Add and manage zones (e.g., ground loop, parking garage, metro station) within the bus park.
Each zone maintains a linked list of buses and their passengers.

Bus Operations:
Add, update (location), and display buses within specific zones.
Support real-time location updates (simulated via user input).

Passenger Management:
Add and remove passengers from buses, tracking their destinations.
Validate passenger uniqueness on each bus.

Graph Structure:
Represent zones and pathways as a graph with distances (e.g., ground loop to metro station).
Calculate the shortest path between zones using Dijkstra’s algorithm for passenger transfers.

File Persistence:
Synchronize data (zones, buses, passengers, paths) with CSV files for persistence across sessions.
Separate files for network structure (bus_park_network.csv), zone buses (e.g., buses_ground_loop.csv), and passenger logs (e.g., passengers_B001.csv).

Menu-Driven Interface:
Main menu for managing the bus park (add zones, buses, paths, etc.).
Display options to view zones, buses, passengers, and paths.

File Contents

1. BusParkSystem.h

Purpose: Header file containing class and struct definitions for the bus park system.
Contents:
Structs:
Passenger: Represents a passenger with fields passenger_id, destination, and a pointer to the next passenger.
Bus: Represents a bus with fields bus_id, route, zone, status, location_x, location_y, a pointer to the passenger linked list, and a pointer to the next bus.

Class BusPark:
Manages zones as an unordered_map mapping to linked lists of buses.
Methods for adding zones, buses, passengers, and paths, updating bus locations, finding shortest paths, and displaying data.
Includes file handling for persistence.

2. BusParkSystem.cpp

Purpose: Implementation file for the BusPark class.
Contents:
BusPark Class Methods:
Constructor and destructor for initializing and cleaning up linked lists and zones.
Methods to load data from CSV files (loadData) and save data to files (saveNetworkToFile, saveBusesToFile, savePassengersToFile).
Helper methods (findBus, passengerExists) for validation and traversal.
CRUD operations: addZone, addBus, updateBusLocation, addPassengerToBus, deletePassengerFromBus, addPath, displayZones, displayBusesInZone, displayPassengersInBus, displayPaths.
Shortest path method (findShortestPath) using Dijkstra’s algorithm.

Enhanced File Handling:
Supports structured CSV parsing with error handling.
Prepared for database integration with comments indicating where SQLite could replace file I/O.

3. main.cpp

Purpose: Entry point of the program with a menu-driven interface.
Contents:
Helper Functions:
clearInputBuffer: Clears the input buffer for safe getline usage.
getStringInput, getIntInput, getDoubleInput: Utility functions for validated user input.

Main Menu (main):
Provides options to add zones, buses, passengers, paths, display data, find shortest paths, and exit.
Initializes a BusPark object and runs the main loop for user interaction.

Prerequisites

C++ Compiler: Requires a compiler supporting C++17 (e.g., g++).
Operating System: Tested on Unix-based systems (Linux/macOS), but should work on Windows with minor file path adjustments.
Optional for Database Integration: SQLite library (libsqlite3-dev on Ubuntu) if extending to database support.

Compilation and Execution

Save the Files:
Place BusParkSystem.h, BusParkSystem.cpp, and main.cpp in a directory (e.g., ~/Desktop/BusParkSystem).

Compile:g++ -std=c++17 BusParkSystem.cpp main.cpp -o bus_park_system

For SQLite integration (optional), add -lsqlite3 and include SQLite headers.

Run:./bus_park_system

How the System Works
Core Components

Zones: Represent physical areas within the bus park (e.g., ground loop, parking garage). Each zone is a key in an unordered_map, mapping to a linked list of buses.
Buses: Stored in linked lists within zones, each bus contains a linked list of passengers. Buses have attributes like ID, route, status, and location (x, y coordinates).
Passengers: Managed as linked lists within buses, with IDs and destinations tracked for transfers.
Graph: An adjacency list models pathways between zones (e.g., ground loop to metro station) with distances in kilometers. Dijkstra’s algorithm computes the shortest path for passenger or bus navigation.
File System: Data is saved to CSV files after each operation, ensuring persistence across sessions.

Operational Flow

Initialization:

The system loads existing data from CSV files (bus_park_network.csv, buses_zoneX.csv, passengers_busX.csv) when started.
A BusPark object is created with a unique park ID (e.g., BP001).

User Interaction:

The main menu provides options to manipulate the system:
Add Zone: Creates a new zone and initializes its bus list.
Add Bus: Adds a bus to a specified zone with a route.
Update Bus Location: Simulates real-time updates by changing a bus’s (x, y) coordinates.
Add Passenger to Bus: Assigns a passenger with a destination to a bus.
Remove Passenger from Bus: Deletes a passenger from a bus.
Add Path Between Zones: Defines a bidirectional pathway with a distance.
Display Options: Shows zones, buses in a zone, passengers on a bus, or all paths.
Find Shortest Path: Calculates the shortest route between two zones.
Exit: Terminates the program.

Data Persistence:

After each operation (e.g., adding a bus or passenger), the system updates the corresponding CSV file.
Example files:
bus_park_network.csv: Stores zone IDs and connections (e.g., ground_loop,metro_station,0.5).
buses_ground_loop.csv: Stores bus details (e.g., B001,Downtown Line,Parked,0.0,0.0).
passengers_B001.csv: Stores passenger details (e.g., 101,Metro Station).

Shortest Path Calculation:

Uses Dijkstra’s algorithm to find the optimal path between zones, useful for guiding passengers or rerouting buses.
Example: From ground_loop to metro_station with a 0.5 km path.

Sample Workflow
Initial Setup

Add zones and connect them:Enter choice (1-12): 1
Enter zone ID: ground_loop
Zone added successfully.
Enter choice (1-12): 1
Enter zone ID: metro_station
Zone added successfully.
Enter choice (1-12): 6
Enter starting zone ID: ground_loop
Enter ending zone ID: metro_station
Enter distance (km): 0.5
Path added successfully.

Manage Buses and Passengers

Add a bus and passenger:Enter choice (1-12): 2
Enter zone ID: ground_loop
Enter bus ID: B001
Enter route: Downtown Line
Bus added successfully.
Enter choice (1-12): 4
Enter bus ID: B001
Enter passenger ID: 101
Enter destination: Metro Station
Passenger added successfully.

Display and Navigate

Check details and find a path:Enter choice (1-12): 8
Enter zone ID: ground_loop
Buses in Zone ground_loop:
Bus ID: B001, Route: Downtown Line, Status: Parked, Location: (0, 0)
Enter choice (1-12): 9
Enter bus ID: B001
Passengers on Bus B001:
Passenger ID: 101, Destination: Metro Station
Enter choice (1-12): 11
Enter starting zone ID: ground_loop
Enter destination zone ID: metro_station
Shortest Path from ground_loop to metro_station:
ground_loop -> metro_station (Total: 0.5 km)

Exit

End the session:Enter choice (1-12): 12
Exiting program.

Notes

File Persistence: Data is saved to CSV files after each operation. Check the directory for files like bus_park_network.csv to verify.
Shortest Path: Useful for passenger transfers or bus rerouting, calculated using Dijkstra’s algorithm.
Limitations: The current system simulates real-time updates via user input. For 20,000 buses (1,500 requests/second), a WebSocket server and NoSQL database (e.g., MongoDB) would be needed.
Future Improvements:
Integrate a scheduler for dynamic bus departures.
Add CAN bus support for autonomous vehicles.
Replace CSV files with SQLite for real-time data management.

Current Date and Time

Today's date and time is 09:51 PM CAT on Thursday, May 22, 2025.

Compile and Run:
Save the files in a directory.
Compile: g++ -std=c++17 BusParkSystem.cpp main.cpp -o bus_park_system.
Run: ./bus_park_system
