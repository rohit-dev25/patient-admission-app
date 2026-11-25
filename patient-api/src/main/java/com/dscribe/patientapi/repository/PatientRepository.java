package com.dscribe.patientapi.repository;

import com.dscribe.patientapi.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PatientRepository extends MongoRepository<Patient, String> {
}