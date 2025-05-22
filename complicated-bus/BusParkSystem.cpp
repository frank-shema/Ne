#include "BusParkSystem.h"
#include <iostream>
#include <fstream>
#include <sstream>
#include <algorithm>
#include <queue>
#include <limits>
#include <unordered_set>

using namespace std;

// BusPark class implementation
BusPark::BusPark(const string& id) : park_id(id) {
    loadData();
}

BusPark::~BusPark() {
    for (auto& zone : zones) {
        Bus* current = zone.second;
        while (current) {
            Bus* temp = current;
            Passenger* p = current->passengers_head;
            while (p) {
                Passenger* p_temp = p;
                p = p->next;
                delete p_temp;
            }
            current = current->next;
            delete temp;
        }
    }
}

void BusPark::loadData() {
    // Load network (zones and paths)
    ifstream file(network_file);
    if (file.is_open()) {
        string line;
        getline(file, line); // Skip header
        while (getline(file, line)) {
            stringstream ss(line);
            string zone_id, token;
            getline(ss, zone_id, ',');
            // Skip bus-related fields
            for (int i = 0; i < 3; ++i) getline(ss, token, ',');
            addZone(zone_id);
            string connected_to;
            double distance;
            getline(ss, connected_to, ',');
            getline(ss, token, ',');
            distance = token.empty() ? 0.0 : stod(token);
            if (!connected_to.empty() && distance > 0) {
                addPath(zone_id, connected_to, distance);
            }
        }
        file.close();
    }

    // Load buses for each zone
    for (const auto& zone : zones) {
        string zone_file = "buses_" + zone.first + ".csv";
        ifstream z_file(zone_file);
        if (z_file.is_open()) {
            string line;
            getline(z_file, line); // Skip header
            while (getline(z_file, line)) {
                stringstream ss(line);
                string bus_id, route, status, token;
                double x, y;
                getline(ss, bus_id, ',');
                getline(ss, route, ',');
                getline(ss, status, ',');
                getline(ss, token, ','); x = stod(token);
                getline(ss, token, ','); y = stod(token);
                Bus* new_bus = new Bus(bus_id, route, zone.first);
                new_bus->status = status;
                new_bus->location_x = x;
                new_bus->location_y = y;
                new_bus->next = zones[zone.first];
                zones[zone.first] = new_bus;

                // Load passengers for this bus
                string passenger_file = "passengers_" + bus_id + ".csv";
                ifstream p_file(passenger_file);
                if (p_file.is_open()) {
                    string p_line;
                    getline(p_file, p_line); // Skip header
                    while (getline(p_file, p_line)) {
                        stringstream p_ss(p_line);
                        string p_id_str, destination;
                        getline(p_ss, p_id_str, ',');
                        getline(p_ss, destination, ',');
                        int passenger_id = stoi(p_id_str);
                        addPassengerToBus(bus_id, passenger_id, destination);
                    }
                    p_file.close();
                }
            }
            z_file.close();
        }
    }
}

Bus* BusPark::findBus(const string& bus_id, Bus* head) const {
    Bus* current = head;
    while (current) {
        if (current->bus_id == bus_id) return current;
        current = current->next;
    }
    return nullptr;
}

bool BusPark::passengerExists(int passenger_id, Bus* bus) const {
    Passenger* current = bus->passengers_head;
    while (current) {
        if (current->passenger_id == passenger_id) return true;
        current = current->next;
    }
    return false;
}

void BusPark::saveNetworkToFile() const {
    ofstream file(network_file);
    file << "Zone_ID,Buses,Status,Location_X,Location_Y,Connected_To,Distance\n";
    for (const auto& pair : adjList) {
        string zone_id = pair.first;
        file << zone_id << ",,,,";
        bool first_connection = true;
        for (const auto& conn : pair.second) {
            if (!first_connection) file << "\n,,,,,";
            file << conn.first << "," << conn.second;
            first_connection = false;
        }
        if (pair.second.empty()) file << ",";
        file << "\n";
    }
    file.close();
    // TODO: Replace with SQL INSERT/UPDATE for database integration
}

void BusPark::saveBusesToFile(const string& zone_id) const {
    string filename = "buses_" + zone_id + ".csv";
    ofstream file(filename);
    file << "Bus_ID,Route,Status,Location_X,Location_Y\n";
    Bus* current = zones.at(zone_id);
    while (current) {
        file << current->bus_id << "," << current->route << "," << current->status << ","
             << current->location_x << "," << current->location_y << "\n";
        current = current->next;
    }
    file.close();
    // TODO: Replace with SQL INSERT/UPDATE for database integration
}

void BusPark::savePassengersToFile(const string& bus_id) const {
    string filename = "passengers_" + bus_id + ".csv";
    ofstream file(filename);
    file << "Passenger_ID,Destination\n";
    for (const auto& zone : zones) {
        Bus* bus = findBus(bus_id, zone.second);
        if (bus) {
            Passenger* current = bus->passengers_head;
            while (current) {
                file << current->passenger_id << "," << current->destination << "\n";
                current = current->next;
            }
            break;
        }
    }
    file.close();
    // TODO: Replace with SQL INSERT/UPDATE for database integration
}

bool BusPark::addZone(const string& zone_id) {
    if (zones.count(zone_id)) {
        cout << "Zone ID " << zone_id << " already exists.\n";
        return false;
    }
    zones[zone_id] = nullptr;
    adjList[zone_id];
    saveNetworkToFile();
    return true;
}

bool BusPark::addBus(const string& zone_id, const string& bus_id, const string& route) {
    if (!zones.count(zone_id)) {
        cout << "Zone ID " << zone_id << " not found.\n";
        return false;
    }
    Bus* current = zones[zone_id];
    while (current) {
        if (current->bus_id == bus_id) {
            cout << "Bus ID " << bus_id << " already exists in zone " << zone_id << ".\n";
            return false;
        }
        current = current->next;
    }
    Bus* new_bus = new Bus(bus_id, route, zone_id);
    new_bus->next = zones[zone_id];
    zones[zone_id] = new_bus;
    saveBusesToFile(zone_id);
    return true;
}

bool BusPark::updateBusLocation(const string& bus_id, double x, double y) {
    for (auto& zone : zones) {
        Bus* bus = findBus(bus_id, zone.second);
        if (bus) {
            bus->location_x = x;
            bus->location_y = y;
            bus->status = "Moving";
            saveBusesToFile(zone.first);
            return true;
        }
    }
    cout << "Bus ID " << bus_id << " not found.\n";
    return false;
}

bool BusPark::addPassengerToBus(const string& bus_id, int passenger_id, const string& destination) {
    for (auto& zone : zones) {
        Bus* bus = findBus(bus_id, zone.second);
        if (bus) {
            if (passengerExists(passenger_id, bus)) {
                cout << "Passenger ID " << passenger_id << " already exists on bus " << bus_id << ".\n";
                return false;
            }
            Passenger* new_passenger = new Passenger(passenger_id, destination);
            new_passenger->next = bus->passengers_head;
            bus->passengers_head = new_passenger;
            savePassengersToFile(bus_id);
            return true;
        }
    }
    cout << "Bus ID " << bus_id << " not found.\n";
    return false;
}

bool BusPark::deletePassengerFromBus(const string& bus_id, int passenger_id) {
    for (auto& zone : zones) {
        Bus* bus = findBus(bus_id, zone.second);
        if (bus) {
            Passenger* current = bus->passengers_head;
            Passenger* prev = nullptr;
            while (current) {
                if (current->passenger_id == passenger_id) {
                    if (prev) prev->next = current->next;
                    else bus->passengers_head = current->next;
                    delete current;
                    savePassengersToFile(bus_id);
                    return true;
                }
                prev = current;
                current = current->next;
            }
            cout << "Passenger ID " << passenger_id << " not found on bus " << bus_id << ".\n";
            return false;
        }
    }
    cout << "Bus ID " << bus_id << " not found.\n";
    return false;
}

bool BusPark::addPath(const string& start, const string& end, double distance) {
    if (!adjList.count(start) || !adjList.count(end)) {
        cout << "One or both zone IDs not found.\n";
        return false;
    }
    if (start == end || distance <= 0) {
        cout << "Invalid path data.\n";
        return false;
    }
    for (const auto& conn : adjList[start]) {
        if (conn.first == end) {
            cout << "Path already exists.\n";
            return false;
        }
    }
    adjList[start].emplace_back(end, distance);
    adjList[end].emplace_back(start, distance);
    saveNetworkToFile();
    return true;
}

pair<vector<string>, double> BusPark::findShortestPath(const string& start, const string& end) const {
    if (!adjList.count(start) || !adjList.count(end)) {
        cout << "One or both zone IDs not found.\n";
        return {{}, 0.0};
    }
    unordered_map<string, double> distances;
    unordered_map<string, string> previous;
    priority_queue<pair<double, string>, vector<pair<double, string>>, greater<>> pq;
    unordered_set<string> visited;
    for (const auto& pair : adjList) {
        distances[pair.first] = numeric_limits<double>::infinity();
    }
    distances[start] = 0.0;
    pq.push({0.0, start});
    while (!pq.empty()) {
        string current = pq.top().second;
        double currentDist = pq.top().first;
        pq.pop();
        if (visited.count(current)) continue;
        visited.insert(current);
        if (current == end) break;
        if (!adjList.count(current)) continue;
        for (const auto& neighbor : adjList.at(current)) {
            string next = neighbor.first;
            double weight = neighbor.second;
            double newDist = currentDist + weight;
            if (newDist < distances[next]) {
                distances[next] = newDist;
                previous[next] = current;
                pq.push({newDist, next});
            }
        }
    }
    vector<string> path;
    double totalDistance = distances[end];
    if (totalDistance == numeric_limits<double>::infinity()) {
        cout << "No path exists between " << start << " and " << end << ".\n";
        return {{}, 0.0};
    }
    string current = end;
    while (current != start) {
        path.push_back(current);
        if (!previous.count(current)) return {{}, 0.0};
        current = previous[current];
    }
    path.push_back(start);
    reverse(path.begin(), path.end());
    return {path, totalDistance};
}

void BusPark::displayZones() const {
    cout << "\nAll Zones:\n";
    for (const auto& pair : zones) {
        cout << pair.first << "\n";
    }
}

void BusPark::displayBusesInZone(const string& zone_id) const {
    if (!zones.count(zone_id)) {
        cout << "Zone ID " << zone_id << " not found.\n";
        return;
    }
    cout << "\nBuses in Zone " << zone_id << ":\n";
    Bus* current = zones.at(zone_id);
    if (!current) cout << "No buses.\n";
    while (current) {
        cout << "Bus ID: " << current->bus_id << ", Route: " << current->route << ", Status: " << current->status
             << ", Location: (" << current->location_x << ", " << current->location_y << ")\n";
        current = current->next;
    }
}

void BusPark::displayPassengersInBus(const string& bus_id) const {
    for (const auto& zone : zones) {
        Bus* bus = findBus(bus_id, zone.second);
        if (bus) {
            cout << "\nPassengers on Bus " << bus_id << ":\n";
            Passenger* current = bus->passengers_head;
            if (!current) cout << "No passengers.\n";
            while (current) {
                cout << "Passenger ID: " << current->passenger_id << ", Destination: " << current->destination << "\n";
                current = current->next;
            }
            return;
        }
    }
    cout << "Bus ID " << bus_id << " not found.\n";
}

void BusPark::displayPaths() const {
    cout << "\nPaths:\n";
    for (const auto& pair : adjList) {
        for (const auto& conn : pair.second) {
            if (pair.first < conn.first) {
                cout << pair.first << " <-> " << conn.first << ": " << conn.second << " km\n";
            }
        }
    }
}