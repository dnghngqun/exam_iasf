package org.example.exam_iasf.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EmployeeDTO {
    private String code;
    private String fullName;
    private LocalDate timeOnboard;
    private String viTriCongViec;

    private double salary;
    private double bonus;
}