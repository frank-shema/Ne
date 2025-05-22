#include "BusParkSystem.h"
#include <iostream>
#include <limits>

using namespace std;

void clearInputBuffer() {
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

string getStringInput(const string& prompt) {
    string input;
    cout << prompt;
    getline(cin, input);
    return input;
}

int getIntInput(const string& prompt) {
    string input;
    while (true) {
        cout << prompt;
        getline(cin, input);
        try {
            int value = stoi(input);
            if (value >= 0) return value;
            cout << "Please enter a non-negative number.\n";
        } catch (...) {
            cout << "Invalid input. Please enter a number.\n";
        }
    }
}

double getDoubleInput(const string& prompt) {
    string input;
    while (true) {
        cout << prompt;
        getline(cin, input);
        try {
            double value = stod(input);
            if (value >= 0) return value;
            cout << "Please enter a non-negative number.\n";
        } catch (...) {
            cout << "Invalid input. Please enter a number.\n";
        }
    }
}

int main() {
    BusPark park("BP001");
    cout << "Welcome to the Complicated Bus Park System!\n";
    cout << "Current Date and Time: 09:47 PM CAT, Thursday, May 22, 2025\n";

    while (true) {
        cout << "\nMain Menu:\n";
        cout << "1. Add Zone\n";
        cout << "2. Add Bus\n";
        cout << "3. Update Bus Location\n";
        cout << "4. Add Passenger to Bus\n";
        cout << "5. Remove Passenger from Bus\n";
        cout << "6. Add Path Between Zones\n";
        cout << "7. Display Zones\n";
        cout << "8. Display Buses in Zone\n";
        cout << "9. Display Passengers in Bus\n";
        cout << "10. Display Paths\n";
        cout << "11. Find Shortest Path\n";
        cout << "12. Exit\n";
        cout << "Enter choice (1-12): ";
        string choice;
        getline(cin, choice);

        if (choice == "1") {
            string zone_id = getStringInput("Enter zone ID: ");
            if (park.addZone(zone_id)) {
                cout << "Zone added successfully.\n";
            }
        } else if (choice == "2") {
            string zone_id = getStringInput("Enter zone ID: ");
            string bus_id = getStringInput("Enter bus ID: ");
            string route = getStringInput("Enter route: ");
            if (park.addBus(zone_id, bus_id, route)) {
                cout << "Bus added successfully.\n";
            }
        } else if (choice == "3") {
            string bus_id = getStringInput("Enter bus ID: ");
            double x = getDoubleInput("Enter new X coordinate: ");
            double y = getDoubleInput("Enter new Y coordinate: ");
            if (park.updateBusLocation(bus_id, x, y)) {
                cout << "Bus location updated successfully.\n";
            }
        } else if (choice == "4") {
            string bus_id = getStringInput("Enter bus ID: ");
            int passenger_id = getIntInput("Enter passenger ID: ");
            string destination = getStringInput("Enter destination: ");
            if (park.addPassengerToBus(bus_id, passenger_id, destination)) {
                cout << "Passenger added successfully.\n";
            }
        } else if (choice == "5") {
            string bus_id = getStringInput("Enter bus ID: ");
            int passenger_id = getIntInput("Enter passenger ID to remove: ");
            if (park.deletePassengerFromBus(bus_id, passenger_id)) {
                cout << "Passenger removed successfully.\n";
            }
        } else if (choice == "6") {
            string start = getStringInput("Enter starting zone ID: ");
            string end = getStringInput("Enter ending zone ID: ");
            double distance = getDoubleInput("Enter distance (km): ");
            if (park.addPath(start, end, distance)) {
                cout << "Path added successfully.\n";
            }
        } else if (choice == "7") {
            park.displayZones();
        } else if (choice == "8") {
            string zone_id = getStringInput("Enter zone ID: ");
            park.displayBusesInZone(zone_id);
        } else if (choice == "9") {
            string bus_id = getStringInput("Enter bus ID: ");
            park.displayPassengersInBus(bus_id);
        } else if (choice == "10") {
            park.displayPaths();
        } else if (choice == "11") {
            string start = getStringInput("Enter starting zone ID: ");
            string end = getStringInput("Enter destination zone ID: ");
            auto [path, distance] = park.findShortestPath(start, end);
            if (!path.empty()) {
                cout << "\nShortest Path from " << start << " to " << end << ":\n";
                for (size_t i = 0; i < path.size(); ++i) {
                    cout << path[i];
                    if (i < path.size() - 1) cout << " -> ";
                }
                cout << " (Total: " << distance << " km)\n";
            }
        } else if (choice == "12") {
            cout << "Exiting program.\n";
            break;
        } else {
            cout << "Invalid choice.\n";
        }
    }
    return 0;
}