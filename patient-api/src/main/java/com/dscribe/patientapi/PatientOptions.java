package com.dscribe.patientapi;

import java.util.List;

public class PatientOptions {
    public static final List<String> GENDERS = List.of("Male", "Female", "Other");
    public static final List<String> WARDS = List.of("General Ward", "ICU", "Maternity", "Pediatrics", "Orthopedic");
    public static final List<String> DEPARTMENTS = List.of("Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Medicine");
    public static final List<String> DOCTORS = List.of("Dr. Rao", "Dr. Sharma", "Dr. Iyer", "Dr. Khan", "Dr. Mehta");
}