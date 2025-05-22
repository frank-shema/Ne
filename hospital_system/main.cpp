#include "Hospital.h" // Include header file for Hospital and Graph
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

// Get valid integer input for bed capacity
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

// Get valid boolean input for has_icu
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
    cout << "Welcome to the Hospital Network Management System!\n"; // Print welcome message

    while (true) { // Main menu loop
        cout << "\nMenu:\n"; // Print menu header
        cout << "1. Add Hospital\n"; // Option to add hospital
        cout << "2. List Hospitals\n"; // Option to list all hospitals
        cout << "3. Update Hospital\n"; // Option to update hospital
        cout << "4. Delete Hospital\n"; // Option to delete hospital
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
            if (choice == "1") { // Add Hospital
                string id = getStringInput("Enter hospital ID: "); // Prompt for ID
                string name = getStringInput("Enter hospital name: "); // Prompt for name
                string location = getStringInput("Enter location: "); // Prompt for location
                int bed_capacity = getIntInput("Enter bed capacity: "); // Prompt for bed capacity
                bool has_icu = getBoolInput("Has ICU? (true/false): "); // Prompt for ICU
                Hospital hospital(id, name, location, bed_capacity, has_icu); // Create Hospital object
                if (graph.addHospital(hospital)) { // Add hospital
                    cout << "Hospital added successfully.\n"; // Print success
                } else {
                    cout << "Failed to add hospital (invalid data or duplicate ID).\n"; // Print failure
                }
            } else if (choice == "2") { // List Hospitals
                cout << "\nAll Hospitals:\n"; // Print header
                for (const auto& hospital : graph.getAllHospitals()) { // Iterate through hospitals
                    cout << hospital.id << ": " << hospital.name << ", " << hospital.location // Print hospital details
                         << ", Beds: " << hospital.bed_capacity
                         << ", ICU: " << (hospital.has_icu ? "Yes" : "No") << endl;
                }
            } else if (choice == "3") { // Update Hospital
                string id = getStringInput("Enter hospital ID to update: "); // Prompt for ID
                string name = getStringInput("Enter new name: "); // Prompt for new name
                string location = getStringInput("Enter new location: "); // Prompt for new location
                int bed_capacity = getIntInput("Enter new bed capacity: "); // Prompt for new capacity
                bool has_icu = getBoolInput("Has ICU? (true/false): "); // Prompt for new ICU
                Hospital hospital(id, name, location, bed_capacity, has_icu); // Create updated Hospital
                if (graph.updateHospital(id, hospital)) { // Update hospital
                    cout << "Hospital updated successfully.\n"; // Print success
                } else {
                    cout << "Failed to update hospital (invalid data or ID not found).\n"; // Print failure
                }
            } else if (choice == "4") { // Delete Hospital
                string id = getStringInput("Enter hospital ID to delete: "); // Prompt for ID
                if (graph.deleteHospital(id)) { // Delete hospital
                    cout << "Hospital deleted successfully.\n"; // Print success
                } else {
                    cout << "Failed to delete hospital (ID not found).\n"; // Print failure
                }
            } else if (choice == "5") { // Add Connection
                string id1 = getStringInput("Enter source hospital ID: "); // Prompt for source ID
                string id2 = getStringInput("Enter destination hospital ID: "); // Prompt for destination ID
                double distance = getDoubleInput("Enter distance (km): "); // Prompt for distance
                if (graph.addConnection(id1, id2, distance)) { // Add connection
                    cout << "Connection added successfully.\n"; // Print success
                } else {
                    cout << "Failed to add connection (invalid data or hospitals not found).\n"; // Print failure
                }
            } else if (choice == "6") { // List Connections
                cout << "\nAll Connections:\n"; // Print header
                for (const auto& conn : graph.getAllConnections()) { // Iterate through connections
                    cout << get<0>(conn) << " -> " << get<1>(conn) << ": " << get<2>(conn) << " km\n"; // Print connection details
                }
            } else if (choice == "7") { // Update Connection
                string id1 = getStringInput("Enter source hospital ID: "); // Prompt for source ID
                string id2 = getStringInput("Enter destination hospital ID: "); // Prompt for destination ID
                double distance = getDoubleInput("Enter new distance (km): "); // Prompt for new distance
                if (graph.updateConnection(id1, id2, distance)) { // Update connection
                    cout << "Connection updated successfully.\n"; // Print success
                } else {
                    cout << "Failed to update connection (invalid data or connection not found).\n"; // Print failure
                }
            } else if (choice == "8") { // Delete Connection
                string id1 = getStringInput("Enter source hospital ID: "); // Prompt for source ID
                string id2 = getStringInput("Enter destination hospital ID: "); // Prompt for destination ID
                if (graph.deleteConnection(id1, id2)) { // Delete connection
                    cout << "Connection deleted successfully.\n"; // Print success
                } else {
                    cout << "Failed to delete connection (hospitals or connection not found).\n"; // Print failure
                }
            } else if (choice == "9") { // Find Shortest Path
                string startId = getStringInput("Enter start hospital ID: "); // Prompt for start ID
                string endId = getStringInput("Enter end hospital ID: "); // Prompt for end ID
                auto [path, distance] = graph.findShortestPath(startId, endId); // Find shortest path
                cout << "\nShortest Path from " << startId << " to " << endId << ":\n"; // Print header
                if (path.empty()) { // Check if path exists
                    cout << "No path found.\n"; // Print if no path
                } else {
                    for (size_t i = 0; i < path.size(); ++i) { // Iterate through path
                        cout << graph.getHospital(path[i]).name; // Print hospital name
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