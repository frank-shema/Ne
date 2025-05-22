#include <string> // Include string library for string handling
#include <vector> // Include vector for dynamic arrays (e.g., adjacency list)
#include <utility> // Include utility for pair and tuple
#include <unordered_map> // Include unordered_map for efficient key-value storage

using namespace std; // Use standard namespace to avoid prefixing std::

// Define BusPark structure to represent a bus park (node)
struct BusPark {
    string id; // Unique identifier for the bus park
    string name; // Name of the bus park (e.g., "Kigali Central")
    string location; // Location of the bus park (e.g., city name)
    int capacity; // Maximum number of buses the park can hold
    bool has_toilets; // True if the bus park has toilets, false otherwise

    // Constructor for easy initialization of BusPark objects
    BusPark(const string& _id = "", const string& _name = "", const string& _loc = "",
            int _cap = 0, bool _toilets = false)
        : id(_id), name(_name), location(_loc), capacity(_cap), has_toilets(_toilets) {} // Initialize members using initializer list
};

// Graph class declaration to manage bus parks and connections
class Graph {
private:
    unordered_map<string, BusPark> busParks; // Store bus parks in a hash map for O(1) lookups
    unordered_map<string, vector<pair<string, double>>> adjList; // Adjacency list for connections
    const string NETWORK_FILE = "bus_park_network.csv"; // Single CSV file for all data

    // Private helper methods for validation and CSV handling
    bool validateBusPark(const BusPark& park) const; // Validate bus park data
    bool validateConnection(const string& id1, const string& id2, double distance) const; // Validate connection data
    void saveToCSV() const; // Save all data to single CSV file

public:
    void loadFromCSV(); // Load data from single CSV file
    bool addBusPark(const BusPark& park); // Add a new bus park
    BusPark getBusPark(const string& id) const; // Get a bus park by ID
    vector<BusPark> getAllBusParks() const; // Get all bus parks
    bool updateBusPark(const string& id, const BusPark& newPark); // Update a bus park
    bool deleteBusPark(const string& id); // Delete a bus park
    bool addConnection(const string& id1, const string& id2, double distance); // Add a connection
    vector<pair<string, double>> getConnections(const string& id) const; // Get connections for a bus park
    vector<tuple<string, string, double>> getAllConnections() const; // Get all connections
    bool updateConnection(const string& id1, const string& id2, double newDistance); // Update a connection
    bool deleteConnection(const string& id1, const string& id2); // Delete a connection
    pair<vector<string>, double> findShortestPath(const string& startId, const string& endId) const; // Find shortest path using Dijkstra’s
    void exportToDot(const string& filename) const; // Export network to Graphviz DOT file
    void generateImage(const string& filename) const; // Generate image from DOT file using Graphviz
};