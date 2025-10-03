package org.example.exam_iasf.service;

import org.example.exam_iasf.dto.EmployeeDTO;
import org.example.exam_iasf.model.Salary;
import org.example.exam_iasf.model.Employee;
import org.example.exam_iasf.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public Employee createNewEmployee(EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setCode(dto.getCode());
        emp.setFullName(dto.getFullName());
        emp.setTimeOnboard(dto.getTimeOnboard());
        emp.setViTriCongViec(dto.getViTriCongViec());
        emp.setStatus(Employee.TrangThai.DANG_LAM_VIEC);

        Salary sal = new Salary();
        sal.setSalary(dto.getSalary());
        sal.setBonus(dto.getBonus());

        emp.setSalary(sal);
        sal.setEmployee(emp);

        return employeeRepository.save(emp);
    }

    public List<Employee> getActiveEmployees(String code, String position, LocalDate startDate, LocalDate endDate) {
        return employeeRepository.findActiveEmployees(code, position, startDate, endDate);
    }

    public Optional<Employee> getEmployeeDetails(Long id) {
        return employeeRepository.findById(id);
    }

    public Map<String, Double> getPersonnelCostStatistics() {
        List<Employee> employees = employeeRepository.findByStatus(Employee.TrangThai.DANG_LAM_VIEC);
        double totalCost = 0.0;

        for (Employee emp : employees) {
            Salary salary = emp.getSalary();
            if (salary != null) {
                double employeeCost = salary.getLuongThucNhan()
                        + (2 * salary.getSoTienDongBaoHiem())
                        + salary.getBonus();
                totalCost += employeeCost;
            }
        }

        Map<String, Double> result = new HashMap<>();
        result.put("tongChiPhiNhanSu", totalCost);
        result.put("soLuongNhanVien", (double) employees.size());

        return result;
    }
}