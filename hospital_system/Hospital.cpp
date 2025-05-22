#include "Hospital.h" // Include header file for Hospital and Graph declarations
#include <iostream> // Include iostream for console output
#include <fstream> // Include file stream library for CSV file handling
#include <sstream> // Include string stream library for parsing CSV lines
#include <limits> // Include limits for numeric_limits in Dijkstra’s algorithm
#include <algorithm> // Include algorithm for remove_if in connection deletion
#include <queue> // Include queue for priority_queue in Dijkstra’s algorithm
#include <unordered_set> // Include unordered_set for tracking visited nodes
#include <stdexcept> // Include stdexcept for exception handling
#include <cstdlib> // Include cstdlib for system command

using namespace std; // Use standard namespace to avoid prefixing std::

// Validate hospital data before adding or updating
bool Graph::validateHospital(const Hospital& hospital) const {
    if (hospital.id.empty() || hospital.name.empty() || hospital.location.empty()) { // Check if required fields are non-empty
        return false; // Return false if any required field is empty
    }
    if (hospital.bed_capacity < 0) { // Check if bed capacity is non-negative
        return false; // Return false if capacity is invalid
    }
    if (hospitals.count(hospital.id) && hospitals.at(hospital.id).name != hospital.name) { // Check for ID uniqueness
        return false; // Return false if ID exists with a different name
    }
    return true; // Return true if all validations pass
}

// Validate connection data before adding or updating
bool Graph::validateConnection(const string& id1, const string& id2, double distance) const {
    if (!hospitals.count(id1) || !hospitals.count(id2)) { // Check if both hospitals exist
        return false; // Return false if either hospital is missing
    }
    if (id1 == id2) { // Check for self-loops
        return false; // Return false if source and destination are the same
    }
    if (distance <= 0.0) { // Check if distance is positive
        return false; // Return false if distance is invalid
    }
    for (const auto& neighbor : adjList.at(id1)) { // Iterate through connections of id1
        if (neighbor.first == id2) { // Check if connection to id2 already exists
            return false; // Return false if duplicate connection found
        }
    }
    return true; // Return true if all validations pass
}

// Save all data to a single CSV file
void Graph::saveToCSV() const {
    ofstream file(NETWORK_FILE); // Open CSV file for writing
    if (!file.is_open()) { // Check if file opened successfully
        throw runtime_error("Cannot open hospital_network.csv for writing"); // Throw error if file cannot be opened
    }
    file << "type,id,name,location,bed_capacity,has_icu,source_id,destination_id,distance\n"; // Write CSV header
    for (const auto& pair : hospitals) { // Iterate through all hospitals
        const Hospital& hospital = pair.second; // Get hospital object
        file << "hospital," << hospital.id << "," << hospital.name << "," << hospital.location << "," // Write hospital record
             << hospital.bed_capacity << "," << (hospital.has_icu ? "true" : "false") << ",,,\n"; // Write remaining fields as empty
    }
    for (const auto& pair : adjList) { // Iterate through adjacency list
        for (const auto& neighbor : pair.second) { // Iterate through connections
            if (pair.first < neighbor.first) { // Avoid duplicates by ordering IDs
                file << "connection,,,,,," << pair.first << "," << neighbor.first << "," // Write connection record
                     << neighbor.second << "\n"; // Write distance
            }
        }
    }
    file.close(); // Close the file
}

// Load data from single CSV file
void Graph::loadFromCSV() {
    ifstream file(NETWORK_FILE); // Open CSV file for reading
    if (file.is_open()) { // Check if file opened successfully
        string line, type; // Variables for reading line and type
        getline(file, line); // Skip header line
        while (getline(file, line)) { // Read each line
            stringstream ss(line); // Create stringstream to parse line
            getline(ss, type, ','); // Read record type (hospital or connection)
            if (type == "hospital") { // Handle hospital record
                Hospital hospital; // Create new Hospital object
                string token; // Variable for temporary token
                getline(ss, hospital.id, ','); // Read ID
                getline(ss, hospital.name, ','); // Read name
                getline(ss, hospital.location, ','); // Read location
                getline(ss, token, ','); // Read bed_capacity as string
                hospital.bed_capacity = token.empty() ? 0 : stoi(token); // Convert to integer or default
                getline(ss, token, ','); // Read has_icu as string
                hospital.has_icu = (token == "true"); // Convert to boolean
                if (validateHospital(hospital)) { // Validate the hospital
                    hospitals[hospital.id] = hospital; // Add to hospitals map
                    adjList[hospital.id]; // Initialize adjacency list entry
                }
            } else if (type == "connection") { // Handle connection record
                string source_id, dest_id, token; // Variables for IDs and distance
                for (int i = 0; i < 5; ++i) getline(ss, token, ','); // Skip hospital fields
                getline(ss, source_id, ','); // Read source ID
                getline(ss, dest_id, ','); // Read destination ID
                getline(ss, token, ','); // Read distance as string
                double distance = token.empty() ? 0.0 : stod(token); // Convert to double or default
                if (validateConnection(source_id, dest_id, distance)) { // Validate the connection
                    adjList[source_id].emplace_back(dest_id, distance); // Add connection to source
                    adjList[dest_id].emplace_back(source_id, distance); // Add reverse connection
                }
            }
        }
        file.close(); // Close the file
    }
}

// CRUD: Add a new hospital
bool Graph::addHospital(const Hospital& hospital) {
    if (!validateHospital(hospital)) { // Validate the hospital
        return false; // Return false if validation fails
    }
    hospitals[hospital.id] = hospital; // Add hospital to map
    adjList[hospital.id]; // Initialize adjacency list entry
    saveToCSV(); // Save updated data to CSV
    return true; // Return true on success
}

// CRUD: Get a hospital by ID
Hospital Graph::getHospital(const string& id) const {
    if (hospitals.count(id)) { // Check if hospital exists
        return hospitals.at(id); // Return the hospital
    }
    throw runtime_error("Hospital not found: " + id); // Throw error if not found
}

// CRUD: Get all hospitals
vector<Hospital> Graph::getAllHospitals() const {
    vector<Hospital> hospital_list; // Create vector to store hospitals
    for (const auto& pair : hospitals) { // Iterate through hospitals
        hospital_list.push_back(pair.second); // Add each hospital to vector
    }
    return hospital_list; // Return vector of all hospitals
}

// CRUD: Update a hospital
bool Graph::updateHospital(const string& id, const Hospital& newHospital) {
    if (!hospitals.count(id) || !validateHospital(newHospital)) { // Check if ID exists and new hospital is valid
        return false; // Return false if validation fails
    }
    hospitals[id] = newHospital; // Update hospital in map
    saveToCSV(); // Save updated data to CSV
    return true; // Return true on success
}

// CRUD: Delete a hospital
bool Graph::deleteHospital(const string& id) {
    if (!hospitals.count(id)) { // Check if hospital exists
        return false; // Return false if not found
    }
    hospitals.erase(id); // Remove hospital from map
    adjList.erase(id); // Remove its adjacency list entry
    for (auto& pair : adjList) { // Iterate through all adjacency lists
        auto& neighbors = pair.second; // Get neighbors list
        neighbors.erase(
            remove_if(neighbors.begin(), neighbors.end(),
                      [&id](const auto& neighbor) { return neighbor.first == id; }), // Remove connections to deleted hospital
            neighbors.end()); // Update end of vector
    }
    saveToCSV(); // Save updated data to CSV
    return true; // Return true on success
}

// Connection CRUD: Add a new connection
bool Graph::addConnection(const string& id1, const string& id2, double distance) {
    if (!validateConnection(id1, id2, distance)) { // Validate the connection
        return false; // Return false if validation fails
    }
    adjList[id1].emplace_back(id2, distance); // Add connection from id1 to id2
    adjList[id2].emplace_back(id1, distance); // Add reverse connection
    saveToCSV(); // Save updated data to CSV
    return true; // Return true on success
}

// Connection CRUD: Get connections for a hospital
vector<pair<string, double>> Graph::getConnections(const string& id) const {
    if (!adjList.count(id)) { // Check if hospital has connections
        return {}; // Return empty vector if not found
    }
    return adjList.at(id); // Return list of connections
}

// Connection CRUD: Get all connections
vector<tuple<string, string, double>> Graph::getAllConnections() const {
    vector<tuple<string, string, double>> connections; // Create vector to store connections
    for (const auto& pair : adjList) { // Iterate through adjacency list
        for (const auto& neighbor : pair.second) { // Iterate through connections
            if (pair.first < neighbor.first) { // Avoid duplicates by ordering IDs
                connections.emplace_back(pair.first, neighbor.first, neighbor.second); // Add connection
            }
        }
    }
    return connections; // Return vector of all connections
}

// Connection CRUD: Update a connection
bool Graph::updateConnection(const string& id1, const string& id2, double newDistance) {
    if (!validateConnection(id1, id2, newDistance)) { // Validate the updated connection
        return false; // Return false if validation fails
    }
    bool updated = false; // Flag to track if update occurred
    for (auto& neighbor : adjList[id1]) { // Iterate through id1’s connections
        if (neighbor.first == id2) { // Find connection to id2
            neighbor.second = newDistance; // Update distance
            updated = true; // Set flag to true
            break;
        }
    }
    if (updated) { // If connection was updated
        for (auto& neighbor : adjList[id2]) { // Update reverse connection
            if (neighbor.first == id1) { // Find connection to id1
                neighbor.second = newDistance; // Update distance
                break;
            }
        }
        saveToCSV(); // Save updated data to CSV
    }
    return updated; // Return true if update occurred
}

// Connection CRUD: Delete a connection
bool Graph::deleteConnection(const string& id1, const string& id2) {
    if (!hospitals.count(id1) || !hospitals.count(id2)) { // Check if both hospitals exist
        return false; // Return false if either is missing
    }
    bool removed = false; // Flag to track if removal occurred
    auto& neighbors1 = adjList[id1]; // Get id1’s connections
    auto newEnd1 = remove_if(neighbors1.begin(), neighbors1.end(),
                             [&id2](const auto& n) { return n.first == id2; }); // Remove id2 connection
    if (newEnd1 != neighbors1.end()) { // If connection was removed
        neighbors1.erase(newEnd1, neighbors1.end()); // Update vector
        removed = true; // Set flag to true
    }
    auto& neighbors2 = adjList[id2]; // Get id2’s connections
    auto newEnd2 = remove_if(neighbors2.begin(), neighbors2.end(),
                             [&id1](const auto& n) { return n.first == id1; }); // Remove id1 connection
    if (newEnd2 != neighbors2.end()) { // If reverse connection was removed
        neighbors2.erase(newEnd2, neighbors2.end()); // Update vector
        removed = true; // Set flag to true
    }
    if (removed) { // If any removal occurred
        saveToCSV(); // Save updated data to CSV
    }
    return removed; // Return true if removal occurred
}

// Find shortest path using Dijkstra’s algorithm
pair<vector<string>, double> Graph::findShortestPath(const string& startId, const string& endId) const {
    if (!hospitals.count(startId) || !hospitals.count(endId)) { // Check if both hospitals exist
        return {{}, 0.0}; // Return empty path if either is missing
    }
    unordered_map<string, double> distances; // Store shortest distances to each node
    unordered_map<string, string> previous; // Store previous node in shortest path
    priority_queue<pair<double, string>, vector<pair<double, string>>, greater<>> pq; // Min-heap for Dijkstra’s
    unordered_set<string> visited; // Track visited nodes
    for (const auto& pair : hospitals) { // Initialize distances
        distances[pair.first] = numeric_limits<double>::infinity(); // Set all distances to infinity
    }
    distances[startId] = 0.0; // Set start node distance to 0
    pq.push({0.0, startId}); // Add start node to priority queue
    while (!pq.empty()) { // Continue until queue is empty
        string current = pq.top().second; // Get node with minimum distance
        double currentDist = pq.top().first; // Get its distance
        pq.pop(); // Remove from queue
        if (visited.count(current)) continue; // Skip if already visited
        visited.insert(current); // Mark as visited
        if (current == endId) break; // Stop if destination reached
        if (!adjList.count(current)) continue; // Skip if no connections
        for (const auto& neighbor : adjList.at(current)) { // Iterate through neighbors
            string next = neighbor.first; // Get neighbor ID
            double weight = neighbor.second; // Get edge weight
            double newDist = currentDist + weight; // Calculate new distance
            if (newDist < distances[next]) { // If new distance is shorter
                distances[next] = newDist; // Update distance
                previous[next] = current; // Update previous node
                pq.push({newDist, next}); // Add to priority queue
            }
        }
    }
    vector<string> path; // Vector to store path
    double totalDistance = distances[endId]; // Get total distance to destination
    if (totalDistance == numeric_limits<double>::infinity()) { // Check if path exists
        return {{}, 0.0}; // Return empty path if no path exists
    }
    string current = endId; // Start from destination
    while (current != startId) { // Backtrack to start
        path.push_back(current); // Add node to path
        if (!previous.count(current)) return {{}, 0.0}; // Return empty if no path
        current = previous[current]; // Move to previous node
    }
    path.push_back(startId); // Add start node
    reverse(path.begin(), path.end()); // Reverse path to start->end order
    return {path, totalDistance}; // Return path and total distance
}

// Export the network to a Graphviz DOT file for visualization
void Graph::exportToDot(const string& filename) const {
    ofstream file(filename); // Open file for writing
    if (!file.is_open()) { // Check if file opened successfully
        throw runtime_error("Cannot open " + filename + " for writing"); // Throw error if file cannot be opened
    }
    file << "graph HospitalNetwork {\n"; // Start DOT graph definition (undirected graph)
    file << "  rankdir=LR;\n"; // Set layout direction (left to right)
    for (const auto& pair : hospitals) { // Iterate through all hospitals
        const Hospital& hospital = pair.second; // Get hospital object
        file << "  \"" << hospital.id << "\" [label=\"" << hospital.name << "\\n" // Define node with label
             << hospital.location << "\\nBeds: " << hospital.bed_capacity << "\"];\n"; // Include location and bed capacity
    }
    for (const auto& pair : adjList) { // Iterate through adjacency list
        for (const auto& neighbor : pair.second) { // Iterate through connections
            if (pair.first < neighbor.first) { // Avoid duplicates by ordering IDs
                file << "  \"" << pair.first << "\" -- \"" << neighbor.first << "\" [label=\"" // Define edge with distance label
                     << neighbor.second << " km\"];\n"; // Write distance as edge label
            }
        }
    }
    file << "}\n"; // End DOT graph definition
    file.close(); // Close the file
    cout << "Network exported to " << filename << ". Use Graphviz to visualize.\n"; // Inform user
}

// Generate an image from the DOT file using Graphviz
void Graph::generateImage(const string& filename) const {
    string dotFile = filename + ".dot"; // Generate DOT filename
    exportToDot(dotFile); // Export network to DOT file
    string imageFile = filename + ".png"; // Set image filename as PNG
    string command = "dot -Tpng " + dotFile + " -o " + imageFile; // Build Graphviz command
    int result = system(command.c_str()); // Execute Graphviz command to generate image
    if (result == 0) { // Check if command succeeded
        cout << "Image generated successfully as " << imageFile << ".\n"; // Inform user
    } else {
        cout << "Failed to generate image. Ensure Graphviz is installed and in PATH.\n"; // Inform user of failure
    }
    remove(dotFile.c_str()); // Delete the DOT file
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
        string label = get<0>(conn) + " -> " + get<1>(conn); // Create label (e.g., "HP001 -> HP002")
        double distance = get<2>(conn); // Get distance
        int barWidth = static_cast<int>(distance / maxDistance * maxBarWidth); // Scale bar width
        cout << label << string(15 - label.length(), ' ') << " |"; // Print label with padding
        for (int i = 0; i < barWidth; ++i) cout << "="; // Print bar
        cout << " " << distance << " km\n"; // Print distance value
    }
}