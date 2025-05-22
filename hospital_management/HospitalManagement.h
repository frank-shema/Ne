#include <string>
#include <vector>
#include <unordered_map>
#include <utility>

// Patient structure
struct Patient {
    int patient_id;
    std::string name;
    std::string dob;
    std::string gender;
    Patient* next;
    Patient(int id, const std::string& n, const std::string& d, const std::string& g)
        : patient_id(id), name(n), dob(d), gender(g), next(nullptr) {}
};

// Doctor structure
struct Doctor {
    int doctor_id;
    std::string name;
    std::string specialization;
    Doctor* next;
    Doctor(int id, const std::string& n, const std::string& s)
        : doctor_id(id), name(n), specialization(s), next(nullptr) {}
};

// Appointment structure
struct Appointment {
    int appointment_id;
    int patient_id;
    int doctor_id;
    std::string appointment_date;
    Appointment* next;
    Appointment(int id, int pid, int did, const std::string& date)
        : appointment_id(id), patient_id(pid), doctor_id(did), appointment_date(date), next(nullptr) {}
};

// Hospital class to manage linked lists and internal data
class Hospital {
private:
    std::string hospital_id;
    std::string name;
    Patient* patients_head;
    Doctor* doctors_head;
    Appointment* appointments_head;
    std::string patients_file;
    std::string doctors_file;
    std::string appointments_file;

    // Helper methods for linked list operations
    bool patientExists(int patient_id) const;
    bool doctorExists(int doctor_id) const;
    bool appointmentExists(int appointment_id) const;
    void savePatientsToFile() const;
    void saveDoctorsToFile() const;
    void saveAppointmentsToFile() const;

public:
    Hospital(const std::string& id, const std::string& n);
    ~Hospital();
    void loadData();
    std::string getId() const { return hospital_id; }
    std::string getName() const { return name; }
    void setName(const std::string& new_name);
    bool addPatient(int patient_id, const std::string& name, const std::string& dob, const std::string& gender);
    bool updatePatient(int patient_id, const std::string& new_name, const std::string& new_dob, const std::string& new_gender);
    bool deletePatient(int patient_id);
    bool addDoctor(int doctor_id, const std::string& name, const std::string& specialization);
    bool updateDoctor(int doctor_id, const std::string& new_name, const std::string& new_specialization);
    bool deleteDoctor(int doctor_id);
    bool addAppointment(int appointment_id, int patient_id, int doctor_id, const std::string& appointment_date);
    bool updateAppointment(int appointment_id, int new_patient_id, int new_doctor_id, const std::string& new_date);
    bool deleteAppointment(int appointment_id);
    void displayPatients() const;
    void displayDoctors() const;
    void displayAppointments() const;
};

// HospitalNetwork class to manage the graph of hospitals
class HospitalNetwork {
private:
    std::unordered_map<std::string, Hospital*> hospitals;
    std::unordered_map<std::string, std::vector<std::pair<std::string, double>>> adjList;
    std::string network_file = "hospitals_network.csv";

    void saveNetworkToFile() const;

public:
    HospitalNetwork();
    ~HospitalNetwork();
    void loadNetworkFromFile();
    bool addHospital(const std::string& hospital_id, const std::string& name);
    bool updateHospital(const std::string& hospital_id, const std::string& new_name);
    bool deleteHospital(const std::string& hospital_id);
    bool addConnection(const std::string& hospital_id1, const std::string& hospital_id2, double distance);
    void displayHospitals() const;
    void displayConnections() const;
    Hospital* getHospital(const std::string& hospital_id);
    std::pair<std::vector<std::string>, double> findShortestPath(const std::string& start_id, const std::string& end_id) const;
};