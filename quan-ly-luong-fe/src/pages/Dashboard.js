import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Spin } from 'antd';
import { UserOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { getStatistics } from '../services/apiService';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStatistics();
                setStats(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu thống kê:", error);
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading) {
        return <Spin size="large" style={{ display: 'block', marginTop: '50px' }} />;
    }

    if (!stats) {
        return <p>Không thể tải dữ liệu thống kê.</p>;
    }

    return (
        <div>
            <h2>Bảng Điều Khiển - Thống Kê Nhân Sự</h2>
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Tổng Chi Phí Nhân Sự Hàng Tháng (Cho NV đang làm việc)"
                            value={stats.tongChiPhiNhanSu}
                            precision={0}
                            prefix={<DollarCircleOutlined />}
                            suffix="VND"
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Số Lượng Nhân Viên Đang Làm Việc"
                            value={stats.soLuongNhanVien}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;