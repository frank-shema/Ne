#include "BusPark.h" // Include header file for BusPark and Graph
#include <iostream> // Include input/output stream library for console operations
#include <limits> // Include limits for clearing input buffer
#include <stdexcept> // Include stdexcept for exception handling

using namespace std; // Use standard namespace to avoid prefixing std::

// Clear input buffer after reading
void clearInputBuffer() {
    cin.clear(); // Clear error flags
    cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Ignore remaining input
}

// Get valid string input from user
string getStringInput(const string& prompt) {
    string input; // Variable to store user input
    cout << prompt; // Display prompt
    getline(cin, input); // Read entire line
    return input; // Return input string
}

// Get valid integer input for capacity
int getIntInput(const string& prompt) {
    string input; // Variable to store input as string
    int value; // Variable to store converted integer
    while (true) { // Loop until valid input
        cout << prompt; // Display prompt
        getline(cin, input); // Read entire line
        try {
            value = stoi(input); // Convert to integer
            if (value >= 0) return value; // Return if non-negative
            cout << "Please enter a non-negative number.\n"; // Print error
        } catch (...) { // Catch conversion errors
            cout << "Invalid input. Please enter a number.\n"; // Print error
        }
    }
}

// Get valid boolean input for has_toilets
bool getBoolInput(const string& prompt) {
    string input; // Variable to store input
    while (true) { // Loop until valid input
        cout << prompt; // Display prompt
        getline(cin, input); // Read entire line
        if (input == "true" || input == "yes" || input == "y") return true; // Return true for affirmative inputs
        if (input == "false" || input == "no" || input == "n") return false; // Return false for negative inputs
        cout << "Please enter 'true', 'false', 'yes', 'no', 'y', or 'n'.\n"; // Print error
    }
}

// Get valid double input for distance
double getDoubleInput(const string& prompt) {
    string input; // Variable to store input as string
    double value; // Variable to store converted double
    while (true) { // Loop until valid input
        cout << prompt; // Display prompt
        getline(cin, input); // Read entire line
        try {
            value = stod(input); // Convert to double
            if (value > 0) return value; // Return if positive
            cout << "Please enter a positive number.\n"; // Print error
        } catch (...) { // Catch conversion errors
            cout << "Invalid input. Please enter a number.\n"; // Print error
        }
    }
}

// Main function with interactive interface
int main() {
    Graph graph; // Create Graph object
    graph.loadFromCSV(); // Load data from CSV file
    cout << "Welcome to the Bus Park Network Management System!\n"; // Print welcome message

    while (true) { // Main menu loop
        cout << "\nMenu:\n"; // Print menu header
        cout << "1. Add Bus Park\n"; // Option to add bus park
        cout << "2. List Bus Parks\n"; // Option to list all bus parks
        cout << "3. Update Bus Park\n"; // Option to update bus park
        cout << "4. Delete Bus Park\n"; // Option to delete bus park
        cout << "5. Add Connection\n"; // Option to add connection
        cout << "6. List Connections\n"; // Option to list all connections
        cout << "7. Update Connection\n"; // Option to update connection
        cout << "8. Delete Connection\n"; // Option to delete connection
        cout << "9. Find Shortest Path\n"; // Option to find shortest path
        cout << "10. Display Distance Chart\n"; // Option to display ASCII chart
        cout << "11. Export Network to DOT File\n"; // Option to export to DOT
        cout << "12. Generate Network Image\n"; // Option to generate image
        cout << "13. Exit\n"; // Option to exit
        cout << "Enter choice (1-13): "; // Prompt for choice

        string choice; // Variable to store user choice
        getline(cin, choice); // Read user choice

        try { // Handle exceptions
            if (choice == "1") { // Add Bus Park
                string id = getStringInput("Enter bus park ID: "); // Prompt for ID
                string name = getStringInput("Enter bus park name: "); // Prompt for name
                string location = getStringInput("Enter location: "); // Prompt for location
                int capacity = getIntInput("Enter capacity: "); // Prompt for capacity
                bool has_toilets = getBoolInput("Has toilets? (true/false): "); // Prompt for toilets
                BusPark park(id, name, location, capacity, has_toilets); // Create BusPark object
                if (graph.addBusPark(park)) { // Add bus park
                    cout << "Bus park added successfully.\n"; // Print success
                } else {
                    cout << "Failed to add bus park (invalid data or duplicate ID).\n"; // Print failure
                }
            } else if (choice == "2") { // List Bus Parks
                cout << "\nAll Bus Parks:\n"; // Print header
                for (const auto& park : graph.getAllBusParks()) { // Iterate through bus parks
                    cout << park.id << ": " << park.name << ", " << park.location // Print park details
                         << ", Capacity: " << park.capacity
                         << ", Toilets: " << (park.has_toilets ? "Yes" : "No") << endl;
                }
            } else if (choice == "3") { // Update Bus Park
                string id = getStringInput("Enter bus park ID to update: "); // Prompt for ID
                string name = getStringInput("Enter new name: "); // Prompt for new name
                string location = getStringInput("Enter new location: "); // Prompt for new location
                int capacity = getIntInput("Enter new capacity: "); // Prompt for new capacity
                bool has_toilets = getBoolInput("Has toilets? (true/false): "); // Prompt for new toilets
                BusPark park(id, name, location, capacity, has_toilets); // Create updated BusPark
                if (graph.updateBusPark(id, park)) { // Update bus park
                    cout << "Bus park updated successfully.\n"; // Print success
                } else {
                    cout << "Failed to update bus park (invalid data or ID not found).\n"; // Print failure
                }
            } else if (choice == "4") { // Delete Bus Park
                string id = getStringInput("Enter bus park ID to delete: "); // Prompt for ID
                if (graph.deleteBusPark(id)) { // Delete bus park
                    cout << "Bus park deleted successfully.\n"; // Print success
                } else {
                    cout << "Failed to delete bus park (ID not found).\n"; // Print failure
                }
            } else if (choice == "5") { // Add Connection
                string id1 = getStringInput("Enter source bus park ID: "); // Prompt for source ID
                string id2 = getStringInput("Enter destination bus park ID: "); // Prompt for destination ID
                double distance = getDoubleInput("Enter distance (km): "); // Prompt for distance
                if (graph.addConnection(id1, id2, distance)) { // Add connection
                    cout << "Connection added successfully.\n"; // Print success
                } else {
                    cout << "Failed to add connection (invalid data or parks not found).\n"; // Print failure
                }
            } else if (choice == "6") { // List Connections
                cout << "\nAll Connections:\n"; // Print header
                for (const auto& conn : graph.getAllConnections()) { // Iterate through connections
                    cout << get<0>(conn) << " -> " << get<1>(conn) << ": " << get<2>(conn) << " km\n"; // Print connection details
                }
            } else if (choice == "7") { // Update Connection
                string id1 = getStringInput("Enter source bus park ID: "); // Prompt for source ID
                string id2 = getStringInput("Enter destination bus park ID: "); // Prompt for destination ID
                double distance = getDoubleInput("Enter new distance (km): "); // Prompt for new distance
                if (graph.updateConnection(id1, id2, distance)) { // Update connection
                    cout << "Connection updated successfully.\n"; // Print success
                } else {
                    cout << "Failed to update connection (invalid data or connection not found).\n"; // Print failure
                }
            } else if (choice == "8") { // Delete Connection
                string id1 = getStringInput("Enter source bus park ID: "); // Prompt for source ID
                string id2 = getStringInput("Enter destination bus park ID: "); // Prompt for destination ID
                if (graph.deleteConnection(id1, id2)) { // Delete connection
                    cout << "Connection deleted successfully.\n"; // Print success
                } else {
                    cout << "Failed to delete connection (parks or connection not found).\n"; // Print failure
                }
            } else if (choice == "9") { // Find Shortest Path
                string startId = getStringInput("Enter start bus park ID: "); // Prompt for start ID
                string endId = getStringInput("Enter end bus park ID: "); // Prompt for end ID
                auto [path, distance] = graph.findShortestPath(startId, endId); // Find shortest path
                cout << "\nShortest Path from " << startId << " to " << endId << ":\n"; // Print header
                if (path.empty()) { // Check if path exists
                    cout << "No path found.\n"; // Print if no path
                } else {
                    for (size_t i = 0; i < path.size(); ++i) { // Iterate through path
                        cout << graph.getBusPark(path[i]).name; // Print bus park name
                        if (i < path.size() - 1) cout << " -> "; // Print arrow between nodes
                    }
                    cout << " (Total: " << distance << " km)\n"; // Print total distance
                }
            } else if (choice == "10") { // Display Distance Chart
                graph.printDistanceChart(); // Print ASCII chart of distances
            } else if (choice == "11") { // Export to DOT File
                string filename = getStringInput("Enter filename for DOT export (e.g., network.dot): "); // Prompt for filename
                graph.exportToDot(filename); // Export network to DOT file
            } else if (choice == "12") { // Generate Network Image
                string filename = getStringInput("Enter base filename for image (e.g., network): "); // Prompt for filename
                graph.generateImage(filename); // Generate image from DOT file
            } else if (choice == "13") { // Exit
                cout << "Exiting program.\n"; // Print exit message
                break; // Exit loop
            } else {
                cout << "Invalid choice. Please enter 1-13.\n"; // Print error for invalid choice
            }
        } catch (const exception& e) { // Catch any exceptions
            cout << "Error: " << e.what() << endl; // Print error message
            clearInputBuffer(); // Clear input buffer
        }
    }
    return 0; // Exit program
}

// Print an ASCII chart of connection distances
void Graph::printDistanceChart() const {
    cout << "\nDistance Chart (km):\n"; // Print header
    vector<tuple<string, string, double>> connections = getAllConnections(); // Get all connections
    if (connections.empty()) { // Check if there are connections
        cout << "No connections to display.\n"; // Print message if none
        return; // Exit function
    }
    double maxDistance = 0; // Variable to store maximum distance
    for (const auto& conn : connections) { // Iterate through connections
        maxDistance = max(maxDistance, get<2>(conn)); // Update max distance
    }
    const int maxBarWidth = 50; // Maximum width of ASCII bar
    for (const auto& conn : connections) { // Iterate through connections
        string label = get<0>(conn) + " -> " + get<1>(conn); // Create label (e.g., "BP001 -> BP002")
        double distance = get<2>(conn); // Get distance
        int barWidth = static_cast<int>(distance / maxDistance * maxBarWidth); // Scale bar width
        cout << label << string(15 - label.length(), ' ') << " |"; // Print label with padding
        for (int i = 0; i < barWidth; ++i) cout << "="; // Print bar
        cout << " " << distance << " km\n"; // Print distance value
    }
}