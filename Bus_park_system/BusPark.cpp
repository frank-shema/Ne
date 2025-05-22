#include "BusPark.h" // Include header file for BusPark and Graph declarations
#include <fstream> // Include file stream library for CSV file handling
#include <sstream> // Include string stream library for parsing CSV lines
#include <limits> // Include limits for numeric_limits in Dijkstra’s algorithm
#include <algorithm> // Include algorithm for remove_if in connection deletion
#include <queue> // Include queue for priority_queue in Dijkstra’s algorithm
#include <unordered_set> // Include unordered_set for tracking visited nodes
#include <stdexcept> // Include stdexcept for exception handling
#include <cstdlib> // Include cstdlib for system command

using namespace std; // Use standard namespace to avoid prefixing std::

// Validate bus park data before adding or updating
bool Graph::validateBusPark(const BusPark& park) const {
    if (park.id.empty() || park.name.empty() || park.location.empty()) { // Check if required fields are non-empty
        return false; // Return false if any required field is empty
    }
    if (park.capacity < 0) { // Check if capacity is non-negative
        return false; // Return false if capacity is invalid
    }
    if (busParks.count(park.id) && busParks.at(park.id).name != park.name) { // Check for ID uniqueness
        return false; // Return false if ID exists with a different name
    }
    return true; // Return true if all validations pass
}

// Validate connection data before adding or updating
bool Graph::validateConnection(const string& id1, const string& id2, double distance) const {
    if (!busParks.count(id1) || !busParks.count(id2)) { // Check if both bus parks exist
        return false; // Return false if either bus park is missing
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
        throw runtime_error("Cannot open bus_park_network.csv for writing"); // Throw error if file cannot be opened
    }
    file << "type,id,name,location,capacity,has_toilets,source_id,destination_id,distance\n"; // Write CSV header
    for (const auto& pair : busParks) { // Iterate through all bus parks
        const BusPark& park = pair.second; // Get bus park object
        file << "park," << park.id << "," << park.name << "," << park.location << "," // Write park record
             << park.capacity << "," << (park.has_toilets ? "true" : "false") << ",,,\n"; // Write remaining fields as empty
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
            getline(ss, type, ','); // Read record type (park or connection)
            if (type == "park") { // Handle bus park record
                BusPark park; // Create new BusPark object
                string token; // Variable for temporary token
                getline(ss, park.id, ','); // Read ID
                getline(ss, park.name, ','); // Read name
                getline(ss, park.location, ','); // Read location
                getline(ss, token, ','); // Read capacity as string
                park.capacity = token.empty() ? 0 : stoi(token); // Convert to integer or default
                getline(ss, token, ','); // Read has_toilets as string
                park.has_toilets = (token == "true"); // Convert to boolean
                if (validateBusPark(park)) { // Validate the bus park
                    busParks[park.id] = park; // Add to busParks map
                    adjList[park.id]; // Initialize adjacency list entry
                }
            } else if (type == "connection") { // Handle connection record
                string source_id, dest_id, token; // Variables for IDs and distance
                for (int i = 0; i < 5; ++i) getline(ss, token, ','); // Skip park fields
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

// CRUD: Add a new bus park
bool Graph::addBusPark(const BusPark& park) {
    if (!validateBusPark(park)) { // Validate the bus park
        return false; // Return false if validation fails
    }
    busParks[park.id] = park; // Add bus park to map
    adjList[park.id]; // Initialize adjacency list entry
    saveToCSV(); // Save updated data to CSV
    return true; // Return true on success
}

// CRUD: Get a bus park by ID
BusPark Graph::getBusPark(const string& id) const {
    if (busParks.count(id)) { // Check if bus park exists
        return busParks.at(id); // Return the bus park
    }
    throw runtime_error("Bus park not found: " + id); // Throw error if not found
}

// CRUD: Get all bus parks
vector<BusPark> Graph::getAllBusParks() const {
    vector<BusPark> parks; // Create vector to store bus parks
    for (const auto& pair : busParks) { // Iterate through bus parks
        parks.push_back(pair.second); // Add each bus park to vector
    }
    return parks; // Return vector of all bus parks
}

// CRUD: Update a bus park
bool Graph::updateBusPark(const string& id, const BusPark& newPark) {
    if (!busParks.count(id) || !validateBusPark(newPark)) { // Check if ID exists and new park is valid
        return false; // Return false if validation fails
    }
    busParks[id] = newPark; // Update bus park in map
    saveToCSV(); // Save updated data to CSV
    return true; // Return true on success
}

// CRUD: Delete a bus park
bool Graph::deleteBusPark(const string& id) {
    if (!busParks.count(id)) { // Check if bus park exists
        return false; // Return false if not found
    }
    busParks.erase(id); // Remove bus park from map
    adjList.erase(id); // Remove its adjacency list entry
    for (auto& pair : adjList) { // Iterate through all adjacency lists
        auto& neighbors = pair.second; // Get neighbors list
        neighbors.erase(
            remove_if(neighbors.begin(), neighbors.end(),
                      [&id](const auto& neighbor) { return neighbor.first == id; }), // Remove connections to deleted park
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

// Connection CRUD: Get connections for a bus park
vector<pair<string, double>> Graph::getConnections(const string& id) const {
    if (!adjList.count(id)) { // Check if bus park has connections
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
    if (!busParks.count(id1) || !busParks.count(id2)) { // Check if both bus parks exist
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
    if (!busParks.count(startId) || !busParks.count(endId)) { // Check if both bus parks exist
        return {{}, 0.0}; // Return empty path if either is missing
    }
    unordered_map<string, double> distances; // Store shortest distances to each node
    unordered_map<string, string> previous; // Store previous node in shortest path
    priority_queue<pair<double, string>, vector<pair<double, string>>, greater<>> pq; // Min-heap for Dijkstra’s
    unordered_set<string> visited; // Track visited nodes
    for (const auto& pair : busParks) { // Initialize distances
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
    file << "graph BusParkNetwork {\n"; // Start DOT graph definition (undirected graph)
    file << "  rankdir=LR;\n"; // Set layout direction (left to right)
    for (const auto& pair : busParks) { // Iterate through all bus parks
        const BusPark& park = pair.second; // Get bus park object
        file << "  \"" << park.id << "\" [label=\"" << park.name << "\\n" // Define node with label
             << park.location << "\\nCapacity: " << park.capacity << "\"];\n"; // Include location and capacity
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
    // Optionally remove the DOT file after generating the image
    remove(dotFile.c_str()); // Delete the DOT file (uncomment if desired)
}