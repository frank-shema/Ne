#include <string> // Include string library for string handling
#include <vector> // Include vector for dynamic arrays (e.g., adjacency list)
#include <utility> // Include utility for pair and tuple
#include <unordered_map> // Include unordered_map for efficient key-value storage

using namespace std; // Use standard namespace to avoid prefixing std::

// Define Hospital structure to represent a hospital (node)
struct Hospital {
    string id; // Unique identifier for the hospital
    string name; // Name of the hospital (e.g., "Kigali General")
    string location; // Location of the hospital (e.g., city name)
    int bed_capacity; // Number of beds the hospital can hold
    bool has_icu; // True if the hospital has an ICU, false otherwise

    // Constructor for easy initialization of Hospital objects
    Hospital(const string& _id = "", const string& _name = "", const string& _loc = "",
             int _beds = 0, bool _icu = false)
        : id(_id), name(_name), location(_loc), bed_capacity(_beds), has_icu(_icu) {} // Initialize members using initializer list
};

// Graph class declaration to manage hospitals and connections
class Graph {
private:
    unordered_map<string, Hospital> hospitals; // Store hospitals in a hash map for O(1) lookups
    unordered_map<string, vector<pair<string, double>>> adjList; // Adjacency list for connections
    const string NETWORK_FILE = "hospital_network.csv"; // Single CSV file for all data

    // Private helper methods for validation and CSV handling
    bool validateHospital(const Hospital& hospital) const; // Validate hospital data
    bool validateConnection(const string& id1, const string& id2, double distance) const; // Validate connection data
    void saveToCSV() const; // Save all data to single CSV file

public:
    void loadFromCSV(); // Load data from single CSV file
    bool addHospital(const Hospital& hospital); // Add a new hospital
    Hospital getHospital(const string& id) const; // Get a hospital by ID
    vector<Hospital> getAllHospitals() const; // Get all hospitals
    bool updateHospital(const string& id, const Hospital& newHospital); // Update a hospital
    bool deleteHospital(const string& id); // Delete a hospital
    bool addConnection(const string& id1, const string& id2, double distance); // Add a connection
    vector<pair<string, double>> getConnections(const string& id) const; // Get connections for a hospital
    vector<tuple<string, string, double>> getAllConnections() const; // Get all connections
    bool updateConnection(const string& id1, const string& id2, double newDistance); // Update a connection
    bool deleteConnection(const string& id1, const string& id2); // Delete a connection
    pair<vector<string>, double> findShortestPath(const string& startId, const string& endId) const; // Find shortest path using Dijkstra’s
    void exportToDot(const string& filename) const; // Export network to Graphviz DOT file
    void generateImage(const string& filename) const; // Generate image from DOT file using Graphviz
    void printDistanceChart() const; // Print ASCII chart of connection distances
};