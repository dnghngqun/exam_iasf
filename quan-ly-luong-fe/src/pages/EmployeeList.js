// src/pages/EmployeeList.js

import { DatePicker, Input, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../services/apiService";

const { Search } = Input;
const { RangePicker } = DatePicker;

const EmployeeList = () => {
  const [employees, setEmployees] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState({});

  const fetchEmployees = React.useCallback(async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== "")
      );
      const response = await getEmployees(cleanFilters);

      if (Array.isArray(response.data)) {
        setEmployees(response.data);
      } else {
        console.error("Dữ liệu nhận được không phải là mảng:", response.data);
        setEmployees([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
      setEmployees([]);
    }
    setLoading(false);
  }, [filters]);

  React.useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // ... phần còn lại của component không thay đổi
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (dates) => {
    setFilters((prev) => ({
      ...prev,
      startDate: dates ? dates[0].format("YYYY-MM-DD") : null,
      endDate: dates ? dates[1].format("YYYY-MM-DD") : null,
    }));
  };

  const columns = [
    { title: "Mã nhân viên", dataIndex: "code", key: "code" },
    { title: "Họ và Tên", dataIndex: "fullName", key: "fullName" },
    {
      title: "Vị trí làm việc",
      dataIndex: "viTriCongViec",
      key: "viTriCongViec",
    },
    { title: "Ngày onboard", dataIndex: "timeOnboard", key: "timeOnboard" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Link to={`/employee/${record.id}`}>Xem chi tiết</Link>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh Sách Nhân Viên Đang Hoạt Động</h2>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm theo mã nhân viên"
          onSearch={(value) => handleFilterChange("code", value)}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Tìm kiếm theo vị trí làm việc"
          onChange={(e) => handleFilterChange("viTriCongViec", e.target.value)}
          style={{ width: 200 }}
        />
        <RangePicker onChange={handleDateChange} />
      </Space>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default EmployeeList;
