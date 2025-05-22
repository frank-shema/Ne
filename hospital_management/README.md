g++ -std=c++17 HospitalManagement.cpp main.cpp -o hospital_management
./hospital_management

Multi-Hospital Management System
Project Overview
The Multi-Hospital Management System is a C++ application designed for managing patient appointments across a network of hospitals. It uses linked lists to manage patients, doctors, and appointments within each hospital, a graph data structure to represent the network of hospitals and distances between them, and file synchronization to persist data in CSV files. This system was developed for Ruhengeri Referral Hospital to handle internal records and scale to a multi-hospital network.
Features

Linked Lists per Hospital:
Manage patients (PatientsLL), doctors (DoctorsLL), and appointments (AppointmentsLL) using singly linked lists.
Validate uniqueness of IDs and ensure appointments reference existing patients and doctors.
Support CRUD operations (Create, Read, Update, Delete) for patients, doctors, and appointments.

Graph Structure:
Represent hospitals as nodes and distances between them as edges in a bidirectional graph.
Support CRUD operations (Create, Read, Update, Delete) for hospitals and connections.
Navigate between hospitals to manage their records.
Implement shortest path functionality using Dijkstra’s algorithm for patient transfers between hospitals.

File Persistence:
Synchronize all data (hospitals, patients, doctors, appointments) with CSV files for persistence across sessions.
Enhance file handling to support more complex data formats or potential database integration (e.g., SQLite).
Separate files for each hospital's data (e.g., hospital_H1_patients.csv) and a network file (hospitals_network.csv).

Menu-Driven Interface:
Main menu for managing the hospital network (add/update/delete hospitals, connect hospitals, etc.).
Hospital-specific menu for managing internal records (register/update/delete/display patients, doctors, appointments).

File Contents

1. HospitalManagement.h

Purpose: Header file containing class and struct definitions for the hospital management system.
Contents:
Structs:
Patient: Represents a patient with fields patient_id, name, dob, gender, and a pointer to the next patient in the linked list.
Doctor: Represents a doctor with fields doctor_id, name, specialization, and a pointer to the next doctor.
Appointment: Represents an appointment with fields appointment_id, patient_id, doctor_id, appointment_date, and a pointer to the next appointment.

Class Hospital:
Manages linked lists for patients, doctors, and appointments within a single hospital.
Methods for adding, updating, deleting, displaying, and validating data, as well as file handling for persistence.

Class HospitalNetwork:
Manages the graph of hospitals using an adjacency list.
Methods for adding, updating, deleting hospitals, connecting them with distances, navigating the network, and finding the shortest path.

2. HospitalManagement.cpp

Purpose: Implementation file for the Hospital and HospitalNetwork classes.
Contents:
Hospital Class Methods:
Constructor and destructor for initializing and cleaning up linked lists.
Methods to load data from CSV files (loadData) and save data to files (savePatientsToFile, saveDoctorsToFile, saveAppointmentsToFile).
Validation methods (patientExists, doctorExists, appointmentExists) to ensure ID uniqueness and appointment validity.
CRUD operations: addPatient, updatePatient, deletePatient, addDoctor, updateDoctor, deleteDoctor, addAppointment, updateAppointment, deleteAppointment, displayPatients, displayDoctors, displayAppointments.

HospitalNetwork Class Methods:
Constructor and destructor for managing the graph and hospital objects.
Methods to load and save the network to hospitals_network.csv (loadNetworkFromFile, saveNetworkToFile).
Graph operations: addHospital, updateHospital, deleteHospital, addConnection, displayHospitals, displayConnections.
Shortest path method (findShortestPath) using Dijkstra’s algorithm for patient transfers.
Navigation method getHospital to switch between hospitals.

Enhanced File Handling:
Supports structured CSV parsing with error handling.
Prepared for database integration with comments indicating where SQLite or other databases could be integrated.

3. main.cpp

Purpose: Entry point of the program with a menu-driven interface for interacting with the system.
Contents:
Helper Functions:
clearInputBuffer: Clears the input buffer to handle getline correctly.
getStringInput, getIntInput, getDoubleInput: Utility functions for safe user input.

Hospital Menu (hospitalMenu):
Provides options to manage a specific hospital: register/update/delete/display patients, doctors, appointments, and switch to another hospital.

Main Menu (main):
Provides options to manage the hospital network: add/update/delete hospitals, connect hospitals, display the network, find shortest paths, and manage a specific hospital.

Initializes a HospitalNetwork object and runs the main loop for user interaction.

Prerequisites

C++ Compiler: Requires a compiler supporting C++17 (e.g., g++).
Operating System: Tested on Unix-based systems (Linux/macOS), but should work on Windows with minor adjustments to file paths.
Optional for Database Integration: SQLite library (libsqlite3-dev on Ubuntu) if extending to database support.

Compilation and Execution

Save the Files:
Place HospitalManagement.h, HospitalManagement.cpp, and main.cpp in a directory (e.g., ~/Desktop/HospitalManagement).

Compile:g++ -std=c++17 HospitalManagement.cpp main.cpp -o hospital_management

For SQLite integration (optional), add -lsqlite3 and include SQLite headers.

Run:./hospital_management

Sample Data and Usage
Below is a sample dataset to test the system, along with instructions to input and verify the data.
Initial Data
Hospitals

Hospital 1:
ID: H1
Name: Ruhengeri Referral Hospital

Hospital 2:
ID: H2
Name: Kigali General Hospital

Patients (H1)

Patient 1:
ID: 1
Name: John Doe
DOB: 1990-05-12
Gender: Male

Patient 2:
ID: 2
Name: Jane Smith
DOB: 1995-03-15
Gender: Female

Doctors (H1)

Doctor 1:
ID: 1
Name: Dr. Smith
Specialization: Cardiology

Doctor 2:
ID: 2
Name: Dr. Jones
Specialization: Neurology

Appointments (H1)

Appointment 1:
ID: 1
Patient ID: 1
Doctor ID: 1
Date: 2025-05-23

Patients (H2)

Patient 1:
ID: 1
Name: Alice Brown
DOB: 1985-07-20
Gender: Female

Doctors (H2)

Doctor 1:
ID: 1
Name: Dr. Wilson
Specialization: Pediatrics

Connections

H1 to H2:
Distance: 2 km

Steps to Test

Add Hospitals:
From the main menu, select option 1:Enter choice (1-8): 1
Enter hospital ID: H1
Enter hospital name: Ruhengeri Referral Hospital

Repeat for H2 with name Kigali General Hospital.

Connect Hospitals:
Select option 4:Enter choice (1-8): 4
Enter first hospital ID: H1
Enter second hospital ID: H2
Enter distance (km): 2

Manage H1:
Select option 7, then H1:Enter choice (1-8): 7
Enter hospital ID to manage: H1

Add patients, doctors, and appointments using options 1, 2, and 3 as per the sample data above.
Use options 4, 5, and 6 to display the data.
Update a patient (e.g., change John Doe's name) with option 9.
Delete a patient with option 12.

Switch to H2:
From H1’s menu, select option 7 to switch to H2 and add its patient and doctor.

Verify Network:
From the main menu, use options 5 and 6 to display hospitals and connections.
Use option 8 to find the shortest path between H1 and H2.

Additional Test Scenarios:
Duplicate ID: Try adding a patient with ID 1 in H1 again to see the uniqueness validation.
Invalid Appointment: Attempt to create an appointment in H1 with a non-existent patient ID (e.g., 999).
Update Hospital: Use main menu option 2 to rename H2 to Kigali Central Hospital.
Delete Hospital: Add a third hospital H3, connect it to H2, then delete H3 using option 3 and verify the network.

Notes

File Persistence: Data is saved to CSV files after each operation (e.g., hospital_H1_patients.csv, hospitals_network.csv).
Shortest Path: Uses Dijkstra’s algorithm to find the shortest path for patient transfers, accessible via main menu option 8.
CRUD Operations: Update and delete operations for patients, doctors, and appointments are available in the hospital menu (options 9-14).
Enhanced File Handling: Supports structured CSV parsing with error handling. Comments in HospitalManagement.cpp indicate where SQLite or other database integration could be added (e.g., replacing file I/O with SQL queries).
Limitations: The current database integration is optional and requires additional libraries (e.g., SQLite). Large networks may require optimization for file I/O performance.

Future Improvements

Fully integrate a database (e.g., SQLite) for real-time data management.
Add advanced graph features, such as multi-path optimization or real-time distance updates.
Implement a graphical user interface (GUI) for better usability.

Current Date and Time

Today's date and time is 08:49 PM CAT on Thursday, May 22, 2025.
