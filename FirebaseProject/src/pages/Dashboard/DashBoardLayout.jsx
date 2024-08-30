import React, { useState } from "react";
import { Layout } from "antd";
import SideBar from "./sideBar";
import Header from "../../components/Header/Navbar";  // Assuming Header component exists

const { Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} defaultSelectedKeys={["1"]} />
      <Layout className="site-layout">
        <Header collapsed={collapsed} toggle={toggleCollapsed} />
        <Content >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
