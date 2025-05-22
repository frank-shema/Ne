#include "HospitalManagement.h"
#include <iostream>
#include <fstream>
#include <sstream>
#include <algorithm>
#include <queue>
#include <limits>
#include <unordered_set>

using namespace std;

// Hospital class implementation
Hospital::Hospital(const string& id, const string& n) : hospital_id(id), name(n), patients_head(nullptr),
    doctors_head(nullptr), appointments_head(nullptr) {
    // Define file names based on hospital_id
    patients_file = "hospital_" + hospital_id + "_patients.csv";
    doctors_file = "hospital_" + hospital_id + "_doctors.csv";
    appointments_file = "hospital_" + hospital_id + "_appointments.csv";
}

Hospital::~Hospital() {
    // Clean up linked lists
    Patient* p = patients_head;
    while (p) {
        Patient* temp = p;
        p = p->next;
        delete temp;
    }
    Doctor* d = doctors_head;
    while (d) {
        Doctor* temp = d;
        d = d->next;
        delete temp;
    }
    Appointment* a = appointments_head;
    while (a) {
        Appointment* temp = a;
        a = a->next;
        delete temp;
    }
}

void Hospital::loadData() {
    // Load patients
    ifstream p_file(patients_file);
    if (p_file.is_open()) {
        string line;
        getline(p_file, line); // Skip header
        while (getline(p_file, line)) {
            stringstream ss(line);
            string token;
            int patient_id;
            string name, dob, gender;
            getline(ss, token, ','); patient_id = stoi(token);
            getline(ss, name, ',');
            getline(ss, dob, ',');
            getline(ss, gender, ',');
            addPatient(patient_id, name, dob, gender);
        }
        p_file.close();
    }

    // Load doctors
    ifstream d_file(doctors_file);
    if (d_file.is_open()) {
        string line;
        getline(d_file, line); // Skip header
        while (getline(d_file, line)) {
            stringstream ss(line);
            string token;
            int doctor_id;
            string name, specialization;
            getline(ss, token, ','); doctor_id = stoi(token);
            getline(ss, name, ',');
            getline(ss, specialization, ',');
            addDoctor(doctor_id, name, specialization);
        }
        d_file.close();
    }

    // Load appointments
    ifstream a_file(appointments_file);
    if (a_file.is_open()) {
        string line;
        getline(a_file, line); // Skip header
        while (getline(a_file, line)) {
            stringstream ss(line);
            string token;
            int appointment_id, patient_id, doctor_id;
            string appointment_date;
            getline(ss, token, ','); appointment_id = stoi(token);
            getline(ss, token, ','); patient_id = stoi(token);
            getline(ss, token, ','); doctor_id = stoi(token);
            getline(ss, appointment_date, ',');
            addAppointment(appointment_id, patient_id, doctor_id, appointment_date);
        }
        a_file.close();
    }
}

bool Hospital::patientExists(int patient_id) const {
    Patient* current = patients_head;
    while (current) {
        if (current->patient_id == patient_id) return true;
        current = current->next;
    }
    return false;
}

bool Hospital::doctorExists(int doctor_id) const {
    Doctor* current = doctors_head;
    while (current) {
        if (current->doctor_id == doctor_id) return true;
        current = current->next;
    }
    return false;
}

bool Hospital::appointmentExists(int appointment_id) const {
    Appointment* current = appointments_head;
    while (current) {
        if (current->appointment_id == appointment_id) return true;
        current = current->next;
    }
    return false;
}

void Hospital::savePatientsToFile() const {
    ofstream file(patients_file);
    file << "patient_id,name,dob,gender\n";
    Patient* current = patients_head;
    while (current) {
        file << current->patient_id << "," << current->name << "," << current->dob << "," << current->gender << "\n";
        current = current->next;
    }
    file.close();
    // TODO: Replace with SQL INSERT/UPDATE for database integration
}

void Hospital::saveDoctorsToFile() const {
    ofstream file(doctors_file);
    file << "doctor_id,name,specialization\n";
    Doctor* current = doctors_head;
    while (current) {
        file << current->doctor_id << "," << current->name << "," << current->specialization << "\n";
        current = current->next;
    }
    file.close();
    // TODO: Replace with SQL INSERT/UPDATE for database integration
}

void Hospital::saveAppointmentsToFile() const {
    ofstream file(appointments_file);
    file << "appointment_id,patient_id,doctor_id,appointment_date\n";
    Appointment* current = appointments_head;
    while (current) {
        file << current->appointment_id << "," << current->patient_id << "," << current->doctor_id << ","
             << current->appointment_date << "\n";
        current = current->next;
    }
    file.close();
    // TODO: Replace with SQL INSERT/UPDATE for database integration
}

void Hospital::setName(const string& new_name) {
    name = new_name;
}

bool Hospital::addPatient(int patient_id, const string& name, const string& dob, const string& gender) {
    if (patientExists(patient_id)) {
        cout << "Patient ID " << patient_id << " already exists.\n";
        return false;
    }
    Patient* new_patient = new Patient(patient_id, name, dob, gender);
    new_patient->next = patients_head;
    patients_head = new_patient;
    savePatientsToFile();
    return true;
}

bool Hospital::updatePatient(int patient_id, const string& new_name, const string& new_dob, const string& new_gender) {
    Patient* current = patients_head;
    Patient* prev = nullptr;
    while (current) {
        if (current->patient_id == patient_id) {
            current->name = new_name;
            current->dob = new_dob;
            current->gender = new_gender;
            savePatientsToFile();
            return true;
        }
        prev = current;
        current = current->next;
    }
    cout << "Patient ID " << patient_id << " not found.\n";
    return false;
}

bool Hospital::deletePatient(int patient_id) {
    Patient* current = patients_head;
    Patient* prev = nullptr;
    while (current) {
        if (current->patient_id == patient_id) {
            if (prev) prev->next = current->next;
            else patients_head = current->next;
            delete current;
            savePatientsToFile();
            return true;
        }
        prev = current;
        current = current->next;
    }
    cout << "Patient ID " << patient_id << " not found.\n";
    return false;
}

bool Hospital::addDoctor(int doctor_id, const string& name, const string& specialization) {
    if (doctorExists(doctor_id)) {
        cout << "Doctor ID " << doctor_id << " already exists.\n";
        return false;
    }
    Doctor* new_doctor = new Doctor(doctor_id, name, specialization);
    new_doctor->next = doctors_head;
    doctors_head = new_doctor;
    saveDoctorsToFile();
    return true;
}

bool Hospital::updateDoctor(int doctor_id, const string& new_name, const string& new_specialization) {
    Doctor* current = doctors_head;
    Doctor* prev = nullptr;
    while (current) {
        if (current->doctor_id == doctor_id) {
            current->name = new_name;
            current->specialization = new_specialization;
            saveDoctorsToFile();
            return true;
        }
        prev = current;
        current = current->next;
    }
    cout << "Doctor ID " << doctor_id << " not found.\n";
    return false;
}

bool Hospital::deleteDoctor(int doctor_id) {
    Doctor* current = doctors_head;
    Doctor* prev = nullptr;
    while (current) {
        if (current->doctor_id == doctor_id) {
            if (prev) prev->next = current->next;
            else doctors_head = current->next;
            delete current;
            saveDoctorsToFile();
            return true;
        }
        prev = current;
        current = current->next;
    }
    cout << "Doctor ID " << doctor_id << " not found.\n";
    return false;
}

bool Hospital::addAppointment(int appointment_id, int patient_id, int doctor_id, const string& appointment_date) {
    if (appointmentExists(appointment_id)) {
        cout << "Appointment ID " << appointment_id << " already exists.\n";
        return false;
    }
    if (!patientExists(patient_id)) {
        cout << "Patient ID " << patient_id << " does not exist.\n";
        return false;
    }
    if (!doctorExists(doctor_id)) {
        cout << "Doctor ID " << doctor_id << " does not exist.\n";
        return false;
    }
    Appointment* new_appointment = new Appointment(appointment_id, patient_id, doctor_id, appointment_date);
    new_appointment->next = appointments_head;
    appointments_head = new_appointment;
    saveAppointmentsToFile();
    return true;
}

bool Hospital::updateAppointment(int appointment_id, int new_patient_id, int new_doctor_id, const string& new_date) {
    Appointment* current = appointments_head;
    Appointment* prev = nullptr;
    while (current) {
        if (current->appointment_id == appointment_id) {
            if (!patientExists(new_patient_id)) {
                cout << "New patient ID " << new_patient_id << " does not exist.\n";
                return false;
            }
            if (!doctorExists(new_doctor_id)) {
                cout << "New doctor ID " << new_doctor_id << " does not exist.\n";
                return false;
            }
            current->patient_id = new_patient_id;
            current->doctor_id = new_doctor_id;
            current->appointment_date = new_date;
            saveAppointmentsToFile();
            return true;
        }
        prev = current;
        current = current->next;
    }
    cout << "Appointment ID " << appointment_id << " not found.\n";
    return false;
}

bool Hospital::deleteAppointment(int appointment_id) {
    Appointment* current = appointments_head;
    Appointment* prev = nullptr;
    while (current) {
        if (current->appointment_id == appointment_id) {
            if (prev) prev->next = current->next;
            else appointments_head = current->next;
            delete current;
            saveAppointmentsToFile();
            return true;
        }
        prev = current;
        current = current->next;
    }
    cout << "Appointment ID " << appointment_id << " not found.\n";
    return false;
}

void Hospital::displayPatients() const {
    cout << "\nPatients in " << name << ":\n";
    Patient* current = patients_head;
    if (!current) cout << "No patients.\n";
    while (current) {
        cout << "ID: " << current->patient_id << ", Name: " << current->name << ", DOB: " << current->dob
             << ", Gender: " << current->gender << "\n";
        current = current->next;
    }
}

void Hospital::displayDoctors() const {
    cout << "\nDoctors in " << name << ":\n";
    Doctor* current = doctors_head;
    if (!current) cout << "No doctors.\n";
    while (current) {
        cout << "ID: " << current->doctor_id << ", Name: " << current->name << ", Specialization: "
             << current->specialization << "\n";
        current = current->next;
    }
}

void Hospital::displayAppointments() const {
    cout << "\nAppointments in " << name << ":\n";
    Appointment* current = appointments_head;
    if (!current) cout << "No appointments.\n";
    while (current) {
        cout << "ID: " << current->appointment_id << ", Patient ID: " << current->patient_id
             << ", Doctor ID: " << current->doctor_id << ", Date: " << current->appointment_date << "\n";
        current = current->next;
    }
}

// HospitalNetwork class implementation
HospitalNetwork::HospitalNetwork() {
    loadNetworkFromFile();
}

HospitalNetwork::~HospitalNetwork() {
    for (auto& pair : hospitals) {
        delete pair.second;
    }
}

void HospitalNetwork::loadNetworkFromFile() {
    ifstream file(network_file);
    if (file.is_open()) {
        string line;
        getline(file, line); // Skip header
        while (getline(file, line)) {
            stringstream ss(line);
            string hospital_id, name, token;
            getline(ss, hospital_id, ',');
            getline(ss, name, ',');
            // Skip patient, doctor, appointment fields
            for (int i = 0; i < 3; ++i) getline(ss, token, ',');
            if (!hospital_id.empty() && !name.empty()) {
                Hospital* hospital = new Hospital(hospital_id, name);
                hospital->loadData();
                hospitals[hospital_id] = hospital;
                adjList[hospital_id]; // Initialize adjacency list
            }
            string connected_to;
            double distance;
            getline(ss, connected_to, ',');
            getline(ss, token, ',');
            distance = token.empty() ? 0.0 : stod(token);
            if (!connected_to.empty() && distance > 0) {
                addConnection(hospital_id, connected_to, distance);
            }
        }
        file.close();
    }
}

void HospitalNetwork::saveNetworkToFile() const {
    ofstream file(network_file);
    file << "Hospital_ID,Name,Patients,Doctors,Appointments,Connected_To,Distance\n";
    for (const auto& pair : adjList) {
        string hospital_id = pair.first;
        Hospital* hospital = hospitals.at(hospital_id);
        file << hospital_id << "," << hospital->getName() << ",,,,";
        bool first_connection = true;
        for (const auto& conn : pair.second) {
            if (!first_connection) file << "\n,,,,,,";
            file << conn.first << "," << conn.second;
            first_connection = false;
        }
        if (pair.second.empty()) file << ",";
        file << "\n";
    }
    file.close();
    // TODO: Replace with SQL bulk insert for database integration
}

bool HospitalNetwork::addHospital(const string& hospital_id, const string& name) {
    if (hospitals.count(hospital_id)) {
        cout << "Hospital ID " << hospital_id << " already exists.\n";
        return false;
    }
    Hospital* hospital = new Hospital(hospital_id, name);
    hospitals[hospital_id] = hospital;
    adjList[hospital_id];
    saveNetworkToFile();
    return true;
}

bool HospitalNetwork::updateHospital(const string& hospital_id, const string& new_name) {
    if (!hospitals.count(hospital_id)) {
        cout << "Hospital ID " << hospital_id << " not found.\n";
        return false;
    }
    hospitals[hospital_id]->setName(new_name);
    saveNetworkToFile();
    return true;
}

bool HospitalNetwork::deleteHospital(const string& hospital_id) {
    if (!hospitals.count(hospital_id)) {
        cout << "Hospital ID " << hospital_id << " not found.\n";
        return false;
    }
    delete hospitals[hospital_id];
    hospitals.erase(hospital_id);
    adjList.erase(hospital_id);
    for (auto& pair : adjList) {
        auto& neighbors = pair.second;
        neighbors.erase(
            remove_if(neighbors.begin(), neighbors.end(),
                      [&hospital_id](const auto& n) { return n.first == hospital_id; }),
            neighbors.end());
    }
    saveNetworkToFile();
    return true;
}

bool HospitalNetwork::addConnection(const string& hospital_id1, const string& hospital_id2, double distance) {
    if (!hospitals.count(hospital_id1) || !hospitals.count(hospital_id2)) {
        cout << "One or both hospital IDs not found.\n";
        return false;
    }
    if (hospital_id1 == hospital_id2 || distance <= 0) {
        cout << "Invalid connection data.\n";
        return false;
    }
    for (const auto& conn : adjList[hospital_id1]) {
        if (conn.first == hospital_id2) {
            cout << "Connection already exists.\n";
            return false;
        }
    }
    adjList[hospital_id1].emplace_back(hospital_id2, distance);
    adjList[hospital_id2].emplace_back(hospital_id1, distance);
    saveNetworkToFile();
    return true;
}

void HospitalNetwork::displayHospitals() const {
    cout << "\nAll Hospitals:\n";
    for (const auto& pair : hospitals) {
        cout << pair.first << ": " << pair.second->getName() << "\n";
    }
}

void HospitalNetwork::displayConnections() const {
    cout << "\nConnections:\n";
    for (const auto& pair : adjList) {
        for (const auto& conn : pair.second) {
            if (pair.first < conn.first) {
                cout << pair.first << " <-> " << conn.first << ": " << conn.second << " km\n";
            }
        }
    }
}

Hospital* HospitalNetwork::getHospital(const string& hospital_id) {
    if (hospitals.count(hospital_id)) {
        return hospitals[hospital_id];
    }
    return nullptr;
}

pair<vector<string>, double> HospitalNetwork::findShortestPath(const string& start_id, const string& end_id) const {
    if (!hospitals.count(start_id) || !hospitals.count(end_id)) {
        cout << "One or both hospital IDs not found.\n";
        return {{}, 0.0};
    }
    unordered_map<string, double> distances;
    unordered_map<string, string> previous;
    priority_queue<pair<double, string>, vector<pair<double, string>>, greater<>> pq;
    unordered_set<string> visited;
    for (const auto& pair : hospitals) {
        distances[pair.first] = numeric_limits<double>::infinity();
    }
    distances[start_id] = 0.0;
    pq.push({0.0, start_id});
    while (!pq.empty()) {
        string current = pq.top().second;
        double currentDist = pq.top().first;
        pq.pop();
        if (visited.count(current)) continue;
        visited.insert(current);
        if (current == end_id) break;
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
    double totalDistance = distances[end_id];
    if (totalDistance == numeric_limits<double>::infinity()) {
        cout << "No path exists between " << start_id << " and " << end_id << ".\n";
        return {{}, 0.0};
    }
    string current = end_id;
    while (current != start_id) {
        path.push_back(current);
        if (!previous.count(current)) return {{}, 0.0};
        current = previous[current];
    }
    path.push_back(start_id);
    reverse(path.begin(), path.end());
    return {path, totalDistance};
}