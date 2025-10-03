package org.example.exam_iasf.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    private String fullName;
    private LocalDate timeOnboard;

    @Enumerated(EnumType.STRING)
    private TrangThai status; // ENUM: DANG_LAM_VIEC, DA_NGHI_VIEC

    private String viTriCongViec;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Salary salary;

    public enum TrangThai {
        DANG_LAM_VIEC,
        DA_NGHI_VIEC
    }
}
