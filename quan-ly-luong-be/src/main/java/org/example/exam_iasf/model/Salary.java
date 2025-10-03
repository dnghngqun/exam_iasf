package org.example.exam_iasf.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "salary")
public class Salary {
    @Id
    private Long id;

    private double salary; // Lương cứng
    private double bonus;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    @JsonBackReference
    private Employee employee;

    // Các trường được tính toán, không lưu vào DB
    @Transient
    public double getThueThuNhapCaNhan() {
        return this.salary * 0.10; // 10% lương cứng
    }

    @Transient
    public double getSoTienDongBaoHiem() {
        return 600000.0; // Cố định
    }

    @Transient
    public double getLuongThucNhan() {
        return this.salary + this.bonus - getThueThuNhapCaNhan() - getSoTienDongBaoHiem();
    }
}
