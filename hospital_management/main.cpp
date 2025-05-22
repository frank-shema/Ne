#include "HospitalManagement.h"
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
            if (value > 0) return value;
            cout << "Please enter a positive number.\n";
        } catch (...) {
            cout << "Invalid input. Please enter a number.\n";
        }
    }
}

void hospitalMenu(Hospital* hospital, HospitalNetwork& network) {
    while (true) {
        cout << "\nManaging " << hospital->getName() << ":\n";
        cout << "1. Register Patient\n";
        cout << "2. Register Doctor\n";
        cout << "3. Register Appointment\n";
        cout << "4. Display Patients\n";
        cout << "5. Display Doctors\n";
        cout << "6. Display Appointments\n";
        cout << "7. Go to Another Hospital\n";
        cout << "8. Update Patient\n";
        cout << "9. Update Doctor\n";
        cout << "10. Update Appointment\n";
        cout << "11. Delete Patient\n";
        cout << "12. Delete Doctor\n";
        cout << "13. Delete Appointment\n";
        cout << "14. Exit\n";
        cout << "Enter choice (1-14): ";
        string choice;
        getline(cin, choice);

        if (choice == "1") {
            int patient_id = getIntInput("Enter patient ID: ");
            string name = getStringInput("Enter name: ");
            string dob = getStringInput("Enter DOB (YYYY-MM-DD): ");
            string gender = getStringInput("Enter gender: ");
            if (hospital->addPatient(patient_id, name, dob, gender)) {
                cout << "Patient added successfully.\n";
            }
        } else if (choice == "2") {
            int doctor_id = getIntInput("Enter doctor ID: ");
            string name = getStringInput("Enter name: ");
            string specialization = getStringInput("Enter specialization: ");
            if (hospital->addDoctor(doctor_id, name, specialization)) {
                cout << "Doctor added successfully.\n";
            }
        } else if (choice == "3") {
            int appointment_id = getIntInput("Enter appointment ID: ");
            int patient_id = getIntInput("Enter patient ID: ");
            int doctor_id = getIntInput("Enter doctor ID: ");
            string date = getStringInput("Enter appointment date (YYYY-MM-DD): ");
            if (hospital->addAppointment(appointment_id, patient_id, doctor_id, date)) {
                cout << "Appointment added successfully.\n";
            }
        } else if (choice == "4") {
            hospital->displayPatients();
        } else if (choice == "5") {
            hospital->displayDoctors();
        } else if (choice == "6") {
            hospital->displayAppointments();
        } else if (choice == "7") {
            network.displayHospitals();
            string new_hospital_id = getStringInput("Enter hospital ID to switch to: ");
            Hospital* new_hospital = network.getHospital(new_hospital_id);
            if (new_hospital) {
                hospitalMenu(new_hospital, network);
            } else {
                cout << "Hospital not found.\n";
            }
        } else if (choice == "8") {
            int patient_id = getIntInput("Enter patient ID to update: ");
            string name = getStringInput("Enter new name: ");
            string dob = getStringInput("Enter new DOB (YYYY-MM-DD): ");
            string gender = getStringInput("Enter new gender: ");
            if (hospital->updatePatient(patient_id, name, dob, gender)) {
                cout << "Patient updated successfully.\n";
            }
        } else if (choice == "9") {
            int doctor_id = getIntInput("Enter doctor ID to update: ");
            string name = getStringInput("Enter new name: ");
            string specialization = getStringInput("Enter new specialization: ");
            if (hospital->updateDoctor(doctor_id, name, specialization)) {
                cout << "Doctor updated successfully.\n";
            }
        } else if (choice == "10") {
            int appointment_id = getIntInput("Enter appointment ID to update: ");
            int patient_id = getIntInput("Enter new patient ID: ");
            int doctor_id = getIntInput("Enter new doctor ID: ");
            string date = getStringInput("Enter new appointment date (YYYY-MM-DD): ");
            if (hospital->updateAppointment(appointment_id, patient_id, doctor_id, date)) {
                cout << "Appointment updated successfully.\n";
            }
        } else if (choice == "11") {
            int patient_id = getIntInput("Enter patient ID to delete: ");
            if (hospital->deletePatient(patient_id)) {
                cout << "Patient deleted successfully.\n";
            }
        } else if (choice == "12") {
            int doctor_id = getIntInput("Enter doctor ID to delete: ");
            if (hospital->deleteDoctor(doctor_id)) {
                cout << "Doctor deleted successfully.\n";
            }
        } else if (choice == "13") {
            int appointment_id = getIntInput("Enter appointment ID to delete: ");
            if (hospital->deleteAppointment(appointment_id)) {
                cout << "Appointment deleted successfully.\n";
            }
        } else if (choice == "14") {
            break;
        } else {
            cout << "Invalid choice.\n";
        }
    }
}

int main() {
    HospitalNetwork network;
    cout << "Welcome to the Multi-Hospital Management System!\n";

    while (true) {
        cout << "\nMain Menu:\n";
        cout << "1. Add Hospital\n";
        cout << "2. Update Hospital\n";
        cout << "3. Delete Hospital\n";
        cout << "4. Connect Hospitals\n";
        cout << "5. Display Hospitals\n";
        cout << "6. Display Connections\n";
        cout << "7. Manage Hospital\n";
        cout << "8. Find Shortest Path\n";
        cout << "9. Exit\n";
        cout << "Enter choice (1-9): ";
        string choice;
        getline(cin, choice);

        if (choice == "1") {
            string hospital_id = getStringInput("Enter hospital ID: ");
            string name = getStringInput("Enter hospital name: ");
            if (network.addHospital(hospital_id, name)) {
                cout << "Hospital added successfully.\n";
            }
        } else if (choice == "2") {
            string hospital_id = getStringInput("Enter hospital ID to update: ");
            string new_name = getStringInput("Enter new hospital name: ");
            if (network.updateHospital(hospital_id, new_name)) {
                cout << "Hospital updated successfully.\n";
            }
        } else if (choice == "3") {
            string hospital_id = getStringInput("Enter hospital ID to delete: ");
            if (network.deleteHospital(hospital_id)) {
                cout << "Hospital deleted successfully.\n";
            }
        } else if (choice == "4") {
            string hospital_id1 = getStringInput("Enter first hospital ID: ");
            string hospital_id2 = getStringInput("Enter second hospital ID: ");
            double distance = getDoubleInput("Enter distance (km): ");
            if (network.addConnection(hospital_id1, hospital_id2, distance)) {
                cout << "Connection added successfully.\n";
            }
        } else if (choice == "5") {
            network.displayHospitals();
        } else if (choice == "6") {
            network.displayConnections();
        } else if (choice == "7") {
            network.displayHospitals();
            string hospital_id = getStringInput("Enter hospital ID to manage: ");
            Hospital* hospital = network.getHospital(hospital_id);
            if (hospital) {
                hospitalMenu(hospital, network);
            } else {
                cout << "Hospital not found.\n";
            }
        } else if (choice == "8") {
            string start_id = getStringInput("Enter starting hospital ID: ");
            string end_id = getStringInput("Enter destination hospital ID: ");
            auto [path, distance] = network.findShortestPath(start_id, end_id);
            if (!path.empty()) {
                cout << "\nShortest Path from " << start_id << " to " << end_id << ":\n";
                for (size_t i = 0; i < path.size(); ++i) {
                    cout << network.getHospital(path[i])->getName();
                    if (i < path.size() - 1) cout << " -> ";
                }
                cout << " (Total: " << distance << " km)\n";
            }
        } else if (choice == "9") {
            cout << "Exiting program.\n";
            break;
        } else {
            cout << "Invalid choice.\n";
        }
    }
    return 0;
}