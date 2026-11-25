package com.dscribe.patientapi.controller;

import com.dscribe.patientapi.PatientOptions;
import com.dscribe.patientapi.model.Patient;
import com.dscribe.patientapi.repository.PatientRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientRepository repo;
    private final MongoTemplate mongo;

    public PatientController(PatientRepository repo, MongoTemplate mongo) {
        this.repo = repo;
        this.mongo = mongo;
    }

    // GET /api/patients?search=an&ward=ICU&department=Cardiology&doctor=Dr. Rao
    @GetMapping
    public List<Patient> list(@RequestParam(required = false) String search,
                              @RequestParam(required = false) String ward,
                              @RequestParam(required = false) String department,
                              @RequestParam(required = false) String doctor) {
        List<Criteria> conditions = new ArrayList<>();

        if (search != null && !search.isBlank()) {
            conditions.add(Criteria.where("name").regex(Pattern.quote(search.trim()), "i"));
        }
        if (ward != null && !ward.isBlank()) conditions.add(Criteria.where("ward").is(ward));
        if (department != null && !department.isBlank()) conditions.add(Criteria.where("department").is(department));
        if (doctor != null && !doctor.isBlank()) conditions.add(Criteria.where("doctor").is(doctor));

        Query query = new Query();
        if (!conditions.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(conditions));
        }
        query.with(Sort.by(Sort.Direction.DESC, "id")); // newest first
        return mongo.find(query, Patient.class);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Patient create(@Valid @RequestBody Patient patient) {
        checkAllowedValues(patient);
        patient.setId(null);
        patient.setStatus("Admitted");
        patient.setName(patient.getName().trim());
        return repo.save(patient);
    }

    @PutMapping("/{id}")
    public Patient update(@PathVariable String id, @Valid @RequestBody Patient data) {
        Patient existing = findOrFail(id);
        checkAllowedValues(data);
        existing.setName(data.getName().trim());
        existing.setAge(data.getAge());
        existing.setGender(data.getGender());
        existing.setWard(data.getWard());
        existing.setDepartment(data.getDepartment());
        existing.setDoctor(data.getDoctor());
        existing.setAdmissionDate(data.getAdmissionDate());
        return repo.save(existing);
    }

    @PatchMapping("/{id}/discharge")
    public Patient discharge(@PathVariable String id) {
        Patient existing = findOrFail(id);
        existing.setStatus("Discharged");
        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        findOrFail(id);
        repo.deleteById(id);
    }

    private Patient findOrFail(String id) {
        return repo.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found"));
    }

    // value must be one of the allowed lists
    private void checkAllowedValues(Patient p) {
        List<String> errors = new ArrayList<>();
        if (!PatientOptions.GENDERS.contains(p.getGender())) errors.add("Gender must be one of " + PatientOptions.GENDERS);
        if (!PatientOptions.WARDS.contains(p.getWard())) errors.add("Ward must be one of " + PatientOptions.WARDS);
        if (!PatientOptions.DEPARTMENTS.contains(p.getDepartment())) errors.add("Department must be one of " + PatientOptions.DEPARTMENTS);
        if (!PatientOptions.DOCTORS.contains(p.getDoctor())) errors.add("Doctor must be one of " + PatientOptions.DOCTORS);
        if (!errors.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.join("; ", errors));
        }
    }
}