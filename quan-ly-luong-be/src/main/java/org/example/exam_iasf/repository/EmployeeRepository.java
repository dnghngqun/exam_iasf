package org.example.exam_iasf.repository;

import org.example.exam_iasf.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE e.status = 'DANG_LAM_VIEC' " +
            "AND (:code IS NULL OR e.code LIKE %:code%) " +
            "AND (:viTriCongViec IS NULL OR e.viTriCongViec = :viTriCongViec) " +
            "AND (:startDate IS NULL OR e.timeOnboard >= :startDate) " +
            "AND (:endDate IS NULL OR e.timeOnboard <= :endDate)")
    List<Employee> findActiveEmployees(
            @Param("code") String code,
            @Param("viTriCongViec") String viTriCongViec,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    List<Employee> findByStatus(Employee.TrangThai status);
}