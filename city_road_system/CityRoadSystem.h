#include <string>
#include <vector>
#include <fstream>

// Class to manage a network of cities and roads with budgets in RWF (billions)
class CityRoadSystem {
private:
    // Vector to store city names (e.g., "Kigali", "Huye")
    std::vector<std::string> cities;
    // Adjacency matrix for roads: road_matrix[i][j] = 1 if a road exists between city i and city j, 0 otherwise
    std::vector<std::vector<int>> road_matrix;
    // Adjacency matrix for budgets: budget_matrix[i][j] holds the budget in billions RWF for the road between city i and city j
    std::vector<std::vector<double>> budget_matrix;
    // File names for persisting data
    const std::string cities_file = "cities.txt"; // Stores city names with indices
    const std::string roads_file = "roads.txt";   // Stores roads and their budgets in billions RWF

    // Helper methods (private to encapsulate internal logic)
    // Check if a city exists in the cities vector
    bool cityExists(const std::string& city_name) const;
    // Get the index of a city in the cities vector, returns -1 if not found
    int getCityIndex(const std::string& city_name) const;
    // Save the list of cities to cities.txt in the format "Index,CityName"
    void saveCitiesToFile() const;
    // Save roads and budgets to roads.txt in the format "Road,Budget" (e.g., "Kigali-Huye,5")
    void saveRoadsToFile() const;
    // Generate a Graphviz DOT file (city_roads.dot) to visualize the city-road network
    void generateDotFile() const;

public:
    // Constructor: Initializes the system by loading existing data from files
    CityRoadSystem();
    // Load cities, roads, and budgets from files at startup
    void loadData();
    // Add a specified number of cities to the system
    void addCities(int num_cities);
    // Add a road between two cities with a specified budget in billions RWF (Create operation for road and budget)
    void addRoad(const std::string& city1, const std::string& city2, double budget);
    // Read the budget for a road between two cities (Read operation for budget)
    void readBudget(const std::string& city1, const std::string& city2) const;
    // Update the budget for an existing road between two cities (Update operation for budget)
    void updateBudget(const std::string& city1, const std::string& city2, double new_budget);
    // Delete the budget for a road by setting it to 0 (Delete operation for budget)
    void deleteBudget(const std::string& city1, const std::string& city2);
    // Update the name of an existing city using its index
    void updateCityName(int index, const std::string& new_name);
    // Search for a city by its index
    bool searchCity(int index) const;
    // Display the list of all cities with their indices
    void displayCities() const;
    // Display all roads and their budgets
    void displayRoads() const;
    // Display the road and budget adjacency matrices
    void displayAdjacencyMatrices() const;
    // Display all recorded data (cities, roads, road matrix, budget matrix)
    void displayAllData() const;
    // Display cities and road adjacency matrix together
    void displayCitiesAndRoadMatrix() const;
    // Generate a Graphviz DOT file and provide instructions to create a visual graph image
    void generateGraphImage() const;
};
