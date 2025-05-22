#include <string>
#include <vector>
#include <unordered_map>
#include <utility>

// Passenger structure
struct Passenger {
    int passenger_id;
    std::string destination;
    Passenger* next;
    Passenger(int id, const std::string& dest) : passenger_id(id), destination(dest), next(nullptr) {}
};

// Bus structure
struct Bus {
    std::string bus_id;
    std::string route;
    std::string zone;
    std::string status;
    double location_x, location_y;
    Passenger* passengers_head;
    Bus* next;
    Bus(const std::string& id, const std::string& r, const std::string& z)
        : bus_id(id), route(r), zone(z), status("Parked"), location_x(0.0), location_y(0.0),
          passengers_head(nullptr), next(nullptr) {}
};

// BusPark class to manage zones, buses, and paths
class BusPark {
private:
    std::string park_id;
    std::unordered_map<std::string, Bus*> zones; // Zone ID -> Linked list of buses
    std::unordered_map<std::string, std::vector<std::pair<std::string, double>>> adjList; // Graph for paths
    std::string network_file = "bus_park_network.csv";

    // Helper methods for linked list and file operations
    Bus* findBus(const std::string& bus_id, Bus* head) const;
    bool passengerExists(int passenger_id, Bus* bus) const;
    void saveNetworkToFile() const;
    void saveBusesToFile(const std::string& zone_id) const;
    void savePassengersToFile(const std::string& bus_id) const;

public:
    BusPark(const std::string& id);
    ~BusPark();
    void loadData();
    bool addZone(const std::string& zone_id);
    bool addBus(const std::string& zone_id, const std::string& bus_id, const std::string& route);
    bool updateBusLocation(const std::string& bus_id, double x, double y);
    bool addPassengerToBus(const std::string& bus_id, int passenger_id, const std::string& destination);
    bool deletePassengerFromBus(const std::string& bus_id, int passenger_id);
    bool addPath(const std::string& start, const std::string& end, double distance);
    std::pair<std::vector<std::string>, double> findShortestPath(const std::string& start, const std::string& end) const;
    void displayZones() const;
    void displayBusesInZone(const std::string& zone_id) const;
    void displayPassengersInBus(const std::string& bus_id) const;
    void displayPaths() const;
};