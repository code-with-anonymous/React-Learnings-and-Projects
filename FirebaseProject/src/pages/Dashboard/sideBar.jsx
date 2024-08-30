import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../../Scss/sidebar.scss"; // Import custom styles
import { auth } from "../../Config/Firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapsed, defaultSelectedKeys }) => {
  const Items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Home</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/dashboard/users">Users</Link>,
    },
    {
      key: "3",
      icon: <PlusOutlined />,
      label: <Link to="/dashboard/create-menu">Create Menu</Link>,
    },
  ];
  
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("User is successfully logged out");
        navigate("/auth/login"); // Leading slash added
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        items={Items}
      />
      <div className="sidebar-footer p-0">
        <Menu theme="dark" mode="inline">
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/dashboard/profile">Profile</Link> 
          </Menu.Item>
          <Menu.Item key="signout">
            <Button 
              className="btn btn-outline-danger"
              icon={<LogoutOutlined />}
              onClick={handleLogOut}
            >
              Sign Out
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;