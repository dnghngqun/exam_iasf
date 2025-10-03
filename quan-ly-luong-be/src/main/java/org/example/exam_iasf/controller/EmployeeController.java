package org.example.exam_iasf.controller;

import org.example.exam_iasf.dto.EmployeeDTO;
import org.example.exam_iasf.model.Employee;
import org.example.exam_iasf.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> createNewEmployee(@RequestBody EmployeeDTO dto) {
        return ResponseEntity.ok(employeeService.createNewEmployee(dto));
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getActiveEmployees(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String viTriCongViec,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(employeeService.getActiveEmployees(code, viTriCongViec, startDate, endDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeDetails(@PathVariable Long id) {
        return employeeService.getEmployeeDetails(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statistics/cost")
    public ResponseEntity<Map<String, Double>> getPersonnelCostStatistics() {
        return ResponseEntity.ok(employeeService.getPersonnelCostStatistics());
    }
}