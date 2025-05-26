#include "CityRoadSystem.h"
#include <iostream>
#include <sstream>
#include <algorithm>

using namespace std;

// Constructor: Calls loadData to initialize the system from files
CityRoadSystem::CityRoadSystem() {
    loadData();
}

// Load existing data from cities.txt and roads.txt at startup
void CityRoadSystem::loadData() {
    // Load cities from cities.txt
    ifstream city_file(cities_file);
    if (city_file.is_open()) {
        string line;
        getline(city_file, line); // Skip header line "Index,CityName"
        while (getline(city_file, line)) {
            stringstream ss(line);
            string index_str, city_name;
            getline(ss, index_str, ','); // Read index (not used for loading)
            getline(ss, city_name, ','); // Read city name
            cities.push_back(city_name); // Add city to the vector
        }
        city_file.close();
    }

    // Initialize adjacency matrices based on the number of cities
    size_t n = cities.size();
    road_matrix.resize(n, vector<int>(n, 0));    // Initialize road matrix with zeros
    budget_matrix.resize(n, vector<double>(n, 0.0)); // Initialize budget matrix with zeros in billions RWF

    // Load roads and budgets from roads.txt
    ifstream road_file(roads_file);
    if (road_file.is_open()) {
        string line;
        getline(road_file, line); // Skip header line "Road,Budget"
        while (getline(road_file, line)) {
            stringstream ss(line);
            string road, budget_str;
            getline(ss, road, ',');      // Read road (e.g., "Kigali-Huye")
            getline(ss, budget_str, ','); // Read budget in billions RWF
            double budget = stod(budget_str); // Convert budget to double

            // Parse road string to extract city names
            size_t dash_pos = road.find('-');
            string city1 = road.substr(0, dash_pos);
            string city2 = road.substr(dash_pos + 1);

            // Find indices of the cities
            int idx1 = getCityIndex(city1);
            int idx2 = getCityIndex(city2);
            if (idx1 != -1 && idx2 != -1) {
                // Update matrices (symmetric because roads are bidirectional)
                road_matrix[idx1][idx2] = road_matrix[idx2][idx1] = 1;
                budget_matrix[idx1][idx2] = budget_matrix[idx2][idx1] = budget;
            }
        }
        road_file.close();
    }
}

// Check if a city already exists in the cities vector
bool CityRoadSystem::cityExists(const string& city_name) const {
    return find(cities.begin(), cities.end(), city_name) != cities.end();
}

// Get the index of a city in the cities vector, return -1 if not found
int CityRoadSystem::getCityIndex(const string& city_name) const {
    auto it = find(cities.begin(), cities.end(), city_name);
    if (it == cities.end()) return -1;
    return distance(cities.begin(), it);
}

// Save the list of cities to cities.txt
void CityRoadSystem::saveCitiesToFile() const {
    ofstream file(cities_file);
    file << "Index,CityName\n"; // Write header
    for (size_t i = 0; i < cities.size(); ++i) {
        file << i << "," << cities[i] << "\n"; // Write each city with its index
    }
    file.close();
}

// Save roads and their budgets to roads.txt
void CityRoadSystem::saveRoadsToFile() const {
    ofstream file(roads_file);
    file << "Road,Budget\n"; // Write header
    for (size_t i = 0; i < cities.size(); ++i) {
        for (size_t j = i + 1; j < cities.size(); ++j) {
            if (road_matrix[i][j] == 1) {
                // Write road and budget in billions RWF (e.g., "Kigali-Huye,5")
                file << cities[i] << "-" << cities[j] << "," << budget_matrix[i][j] << "\n";
            }
        }
    }
    file.close();
}

// Add a specified number of cities to the system
void CityRoadSystem::addCities(int num_cities) {
    for (int i = 0; i < num_cities; ++i) {
        string city_name;
        cout << "Enter city " << (i + 1) << " name: ";
        getline(cin, city_name);
        if (cityExists(city_name)) {
            cout << "City " << city_name << " already exists.\n";
            --i; // Retry this iteration
            continue;
        }
        cities.push_back(city_name); // Add the new city

        // Resize adjacency matrices to accommodate the new city
        size_t n = cities.size();
        road_matrix.resize(n);
        budget_matrix.resize(n);
        for (size_t j = 0; j < n; ++j) {
            road_matrix[j].resize(n, 0);
            budget_matrix[j].resize(n, 0.0);
        }
        road_matrix[n-1].resize(n, 0);
        budget_matrix[n-1].resize(n, 0.0);
    }
    saveCitiesToFile(); // Save the updated city list
    cout << num_cities << " cities added successfully.\n";
}

// Add a road between two cities with an initial budget in billions RWF (Create operation)
void CityRoadSystem::addRoad(const string& city1, const string& city2, double budget) {
    if (city1 == city2) {
        cout << "Cannot add a road between the same city.\n";
        return;
    }
    int idx1 = getCityIndex(city1);
    int idx2 = getCityIndex(city2);
    if (idx1 == -1 || idx2 == -1) {
        cout << "One or both cities not found.\n";
        return;
    }
    if (road_matrix[idx1][idx2] == 1) {
        cout << "Road between " << city1 << " and " << city2 << " already exists.\n";
        return;
    }
    if (budget <= 0) {
        cout << "Budget must be positive in billions RWF.\n";
        return;
    }
    // Set road existence and budget in the matrices (symmetric for bidirectional roads)
    road_matrix[idx1][idx2] = road_matrix[idx2][idx1] = 1;
    budget_matrix[idx1][idx2] = budget_matrix[idx2][idx1] = budget;
    saveRoadsToFile(); // Save the updated road data
    cout << "Road added successfully with budget " << budget << " billion RWF.\n";
}

// Read the budget for a road between two cities (Read operation)
void CityRoadSystem::readBudget(const string& city1, const string& city2) const {
    int idx1 = getCityIndex(city1);
    int idx2 = getCityIndex(city2);
    if (idx1 == -1 || idx2 == -1) {
        cout << "One or both cities not found.\n";
        return;
    }
    if (road_matrix[idx1][idx2] == 0) {
        cout << "No road exists between " << city1 << " and " << city2 << ".\n";
        return;
    }
    cout << "Budget for road " << city1 << " <-> " << city2 << ": " << budget_matrix[idx1][idx2] << " billion RWF\n";
}

// Update the budget for an existing road (Update operation)
void CityRoadSystem::updateBudget(const string& city1, const string& city2, double new_budget) {
    int idx1 = getCityIndex(city1);
    int idx2 = getCityIndex(city2);
    if (idx1 == -1 || idx2 == -1) {
        cout << "One or both cities not found.\n";
        return;
    }
    if (road_matrix[idx1][idx2] == 0) {
        cout << "No road exists between " << city1 << " and " << city2 << " to update budget.\n";
        return;
    }
    if (new_budget <= 0) {
        cout << "Budget must be positive in billions RWF.\n";
        return;
    }
    // Update the budget in the matrix (symmetric)
    budget_matrix[idx1][idx2] = budget_matrix[idx2][idx1] = new_budget;
    saveRoadsToFile(); // Save the updated budget
    cout << "Budget updated successfully to " << new_budget << " billion RWF.\n";
}

// Delete the budget for a road by setting it to 0 (Delete operation)
void CityRoadSystem::deleteBudget(const string& city1, const string& city2) {
    int idx1 = getCityIndex(city1);
    int idx2 = getCityIndex(city2);
    if (idx1 == -1 || idx2 == -1) {
        cout << "One or both cities not found.\n";
        return;
    }
    if (road_matrix[idx1][idx2] == 0) {
        cout << "No road exists between " << city1 << " and " << city2 << " to delete budget.\n";
        return;
    }
    // Reset the budget to 0 (symmetric)
    budget_matrix[idx1][idx2] = budget_matrix[idx2][idx1] = 0.0;
    saveRoadsToFile(); // Save the updated budget
    cout << "Budget deleted successfully for road " << city1 << " <-> " << city2 << ".\n";
}

// Update the name of an existing city using its index
void CityRoadSystem::updateCityName(int index, const string& new_name) {
    if (index < 0 || index >= static_cast<int>(cities.size())) {
        cout << "Invalid index: " << index << ". Must be between 0 and " << (cities.size() - 1) << ".\n";
        return;
    }
    if (cityExists(new_name)) {
        cout << "City name " << new_name << " already exists.\n";
        return;
    }
    cities[index] = new_name; // Update the city name at the given index
    saveCitiesToFile(); // Save the updated city list
    saveRoadsToFile(); // Update roads file to reflect new city name
    cout << "City name at index " << index << " updated successfully to " << new_name << ".\n";
}

// Search for a city by its index
bool CityRoadSystem::searchCity(int index) const {
    if (index < 0 || index >= static_cast<int>(cities.size())) {
        cout << "Invalid index: " << index << ". Must be between 0 and " << (cities.size() - 1) << ".\n";
        return false;
    }
    cout << "City found at index " << index << ": " << cities[index] << "\n";
    return true;
}

// Display the list of all cities
void CityRoadSystem::displayCities() const {
    if (cities.empty()) {
        cout << "No cities recorded.\n";
        return;
    }
    cout << "\nList of Cities:\n";
    for (size_t i = 0; i < cities.size(); ++i) {
        cout << "Index: " << i << ", City: " << cities[i] << "\n";
    }
}

// Display all roads and their budgets
void CityRoadSystem::displayRoads() const {
    bool has_roads = false;
    cout << "\nList of Roads:\n";
    for (size_t i = 0; i < cities.size(); ++i) {
        for (size_t j = i + 1; j < cities.size(); ++j) {
            if (road_matrix[i][j] == 1) {
                cout << cities[i] << " <-> " << cities[j] << ": Budget = " << budget_matrix[i][j] << " billion RWF\n";
                has_roads = true;
            }
        }
    }
    if (!has_roads) {
        cout << "No roads recorded.\n";
    }
}

// Display the road and budget adjacency matrices
void CityRoadSystem::displayAdjacencyMatrices() const {
    if (cities.empty()) {
        cout << "No cities to display matrices for.\n";
        return;
    }

    // Display road matrix
    cout << "\nRoad Adjacency Matrix:\n  ";
    for (const auto& city : cities) {
        cout << city.substr(0, 3) << " "; // Show first 3 letters of city name for brevity
    }
    cout << "\n";
    for (size_t i = 0; i < cities.size(); ++i) {
        cout << cities[i].substr(0, 3) << " ";
        for (size_t j = 0; j < cities.size(); ++j) {
            cout << road_matrix[i][j] << "  ";
        }
        cout << "\n";
    }

    // Display budget matrix
    cout << "\nBudget Adjacency Matrix:\n  ";
    for (const auto& city : cities) {
        cout << city.substr(0, 3) << " ";
    }
    cout << "\n";
    for (size_t i = 0; i < cities.size(); ++i) {
        cout << cities[i].substr(0, 3) << " ";
        for (size_t j = 0; j < cities.size(); ++j) {
            cout << (budget_matrix[i][j] == 0.0 ? "0" : to_string(static_cast<int>(budget_matrix[i][j]))) << (budget_matrix[i][j] == 0.0 ? "  " : " ");
        }
        cout << "\n";
    }
}

// Display all recorded data together (cities, roads, road matrix, budget matrix)
void CityRoadSystem::displayAllData() const {
    cout << "\n--- All Recorded Data ---\n";
    displayCities(); // Show cities
    displayRoads();  // Show roads and budgets
    displayAdjacencyMatrices(); // Show both matrices
}

// Display cities and road adjacency matrix together
void CityRoadSystem::displayCitiesAndRoadMatrix() const {
    if (cities.empty()) {
        cout << "No cities recorded.\n";
        return;
    }
    cout << "\n--- Cities and Road Adjacency Matrix ---\n";
    displayCities(); // Show cities
    // Show road matrix
    cout << "\nRoad Adjacency Matrix:\n  ";
    for (const auto& city : cities) {
        cout << city.substr(0, 3) << " ";
    }
    cout << "\n";
    for (size_t i = 0; i < cities.size(); ++i) {
        cout << cities[i].substr(0, 3) << " ";
        for (size_t j = 0; j < cities.size(); ++j) {
            cout << road_matrix[i][j] << "  ";
        }
        cout << "\n";
    }
}

// Generate a Graphviz DOT file for visualization
void CityRoadSystem::generateDotFile() const {
    ofstream dot_file("city_roads.dot");
    dot_file << "digraph city_roads {\n";
    dot_file << "    rankdir=LR;\n"; // Set layout direction to left-to-right
    // Add nodes (cities)
    for (size_t i = 0; i < cities.size(); ++i) {
        dot_file << "    " << i << " [label=\"" << cities[i] << "\"];\n";
    }
    // Add edges (roads) with budgets as labels in billions RWF
    for (size_t i = 0; i < cities.size(); ++i) {
        for (size_t j = i + 1; j < cities.size(); ++j) {
            if (road_matrix[i][j] == 1) {
                dot_file << "    " << i << " -> " << j << " [label=\"" << budget_matrix[i][j] << " billion RWF\", dir=both];\n";
            }
        }
    }
    dot_file << "}\n";
    dot_file.close();
}

// Generate the Graphviz DOT file and provide instructions to create an image
void CityRoadSystem::generateGraphImage() const {
    generateDotFile();
    cout << "Graphviz DOT file generated as city_roads.dot. Run 'dot -Tpng city_roads.dot -o city_roads.png' to visualize.\n";
}