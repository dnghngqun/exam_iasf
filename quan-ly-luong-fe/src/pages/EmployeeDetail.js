import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/apiService'; // Cập nhật
import { Card, Descriptions, Spin } from 'antd';

const EmployeeDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await getEmployeeById(id); // Cập nhật
                setEmployee(response.data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết:", error);
            }
            setLoading(false);
        };
        fetchDetail();
    }, [id]);

    if (loading) return <Spin tip="Loading..." />;
    if (!employee) return <p>Employee not found.</p>;

    const { salary } = employee;

    return (
        <Card title={`Chi tiết nhân viên: ${employee.fullName}`}>
            <Descriptions title="Thông tin cá nhân" bordered>
                <Descriptions.Item label="Mã nhân viên">{employee.code}</Descriptions.Item>
                <Descriptions.Item label="Vị trí công việc">{employee.viTriCongViec}</Descriptions.Item>
                <Descriptions.Item label="Thời gian onboard">{employee.timeOnboard}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">{employee.status}</Descriptions.Item>
            </Descriptions>
            <br />
            {salary && (
                <Descriptions title="Thông tin lương" bordered>
                    <Descriptions.Item label="Lương cơ bản">{salary.salary?.toLocaleString()} VND</Descriptions.Item>
                    <Descriptions.Item label="Thưởng">{salary.bonus?.toLocaleString()} VND</Descriptions.Item>
                    <Descriptions.Item label="Thuế thu nhập cá nhân (10%)">{salary.thueThuNhapCaNhan?.toLocaleString()} VND</Descriptions.Item>
                    <Descriptions.Item label="Bảo hiểm">{salary.soTienDongBaoHiem?.toLocaleString()} VND</Descriptions.Item>
                    <Descriptions.Item label="Lương thực nhận" span={2} style={{fontWeight: 'bold', color: '#1890ff'}}>
                        {salary.luongThucNhan?.toLocaleString()} VND
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Card>
    );
};

export default EmployeeDetail;