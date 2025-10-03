// src/App.js

import { Layout, Menu } from "antd";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeAdd from "./pages/EmployeeAdd";
import EmployeeDetail from "./pages/EmployeeDetail";
import EmployeeList from "./pages/EmployeeList";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Danh Sách Nhân Viên</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/add">Thêm Nhân Viên</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/dashboard">Thống Kê</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: "20px" }}>
          <div
            className="site-layout-content"
            style={{ background: "#fff", padding: 24, minHeight: "80vh" }}
          >
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/add" element={<EmployeeAdd />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Hệ Thống Quản Lý Lương ©2025
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
