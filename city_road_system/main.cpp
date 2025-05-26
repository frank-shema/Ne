#include "CityRoadSystem.h"
#include <iostream>
#include <limits>

using namespace std;

// Clear the input buffer to prevent issues with getline
void clearInputBuffer() {
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

// Get string input from the user with a prompt
string getStringInput(const string& prompt) {
    string input;
    cout << prompt;
    getline(cin, input);
    return input;
}

// Get integer input with validation
int getIntInput(const string& prompt) {
    string input;
    while (true) {
        cout << prompt;
        getline(cin, input);
        try {
            int value = stoi(input);
            if (value >= 0) return value; // Ensure non-negative
            cout << "Please enter a non-negative number.\n";
        } catch (...) {
            cout << "Invalid input. Please enter a number.\n";
        }
    }
}

// Get double input with validation
double getDoubleInput(const string& prompt) {
    string input;
    while (true) {
        cout << prompt;
        getline(cin, input);
        try {
            double value = stod(input);
            if (value >= 0) return value; // Ensure non-negative
            cout << "Please enter a non-negative number.\n";
        } catch (...) {
            cout << "Invalid input. Please enter a number.\n";
        }
    }
}

// Main function: Entry point with menu-driven interface
int main() {
    CityRoadSystem system; // Create an instance of the system
    cout << "Welcome to the City and Road Management System!\n";
    cout << "Current Date and Time: 11:49 AM CAT, Friday, May 23, 2025\n";

    while (true) {
        // Display the main menu
        cout << "\nMain Menu:\n";
        cout << "1. Add Cities\n";
        cout << "2. Add Road Between Cities\n";
        cout << "3. Read Budget for Road\n";
        cout << "4. Update Budget for Road\n";
        cout << "5. Delete Budget for Road\n";
        cout << "6. Update City Name (by Index)\n";
        cout << "7. Search for a City (by Index)\n";
        cout << "8. Display Cities\n";
        cout << "9. Display Roads\n";
        cout << "10. Display Adjacency Matrices\n";
        cout << "11. Display All Recorded Data\n";
        cout << "12. Display Cities and Road Matrix\n";
        cout << "13. Generate Graph Image\n";
        cout << "14. Exit\n";
        cout << "Enter choice (1-14): ";
        string choice;
        getline(cin, choice);

        // Handle user choice
        if (choice == "1") {
            // Add cities
            int num_cities = getIntInput("Enter the number of cities to add: ");
            system.addCities(num_cities);
        } else if (choice == "2") {
            // Add a road with budget
            system.displayCities(); // Show cities to help user choose
            string city1 = getStringInput("Enter first city: ");
            string city2 = getStringInput("Enter second city: ");
            double budget = getDoubleInput("Enter budget for the road (billions RWF): ");
            system.addRoad(city1, city2, budget);
        } else if (choice == "3") {
            // Read budget for a road
            system.displayCities(); // Show cities to help user choose
            string city1 = getStringInput("Enter first city: ");
            string city2 = getStringInput("Enter second city: ");
            system.readBudget(city1, city2);
        } else if (choice == "4") {
            // Update budget for a road
            system.displayCities(); // Show cities to help user choose
            string city1 = getStringInput("Enter first city: ");
            string city2 = getStringInput("Enter second city: ");
            double new_budget = getDoubleInput("Enter new budget for the road (billions RWF): ");
            system.updateBudget(city1, city2, new_budget);
        } else if (choice == "5") {
            // Delete budget for a road
            system.displayCities(); // Show cities to help user choose
            string city1 = getStringInput("Enter first city: ");
            string city2 = getStringInput("Enter second city: ");
            system.deleteBudget(city1, city2);
        } else if (choice == "6") {
            // Update city name by index
            system.displayCities(); // Show cities to help user choose index
            int index = getIntInput("Enter city index to update: ");
            string new_name = getStringInput("Enter new city name: ");
            system.updateCityName(index, new_name);
        } else if (choice == "7") {
            // Search for a city by index
            system.displayCities(); // Show cities to help user choose index
            int index = getIntInput("Enter city index to search: ");
            system.searchCity(index);
        } else if (choice == "8") {
            // Display all cities
            system.displayCities();
        } else if (choice == "9") {
            // Display all roads
            system.displayRoads();
        } else if (choice == "10") {
            // Display adjacency matrices
            system.displayAdjacencyMatrices();
        } else if (choice == "11") {
            // Display all recorded data
            system.displayAllData();
        } else if (choice == "12") {
            // Display cities and road matrix
            system.displayCitiesAndRoadMatrix();
        } else if (choice == "13") {
            // Generate Graphviz image
            system.generateGraphImage();
        } else if (choice == "14") {
            // Exit the program
            cout << "Exiting program.\n";
            break;
        } else {
            cout << "Invalid choice.\n";
        }
    }
    return 0;
}