import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, fireStore } from "../../Config/Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const { Title } = Typography;

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = state;

    if (fullName.trim().length < 3) return toast.error("Please enter your full name");
    if (password.length < 6) return toast.error("Password must be at least 6 chars.");
    if (confirmPassword !== password) return toast.error("Passwords don't match");

    setIsProcessing(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: fullName,
      });

      // Store user data in Firestore
      await setDoc(doc(fireStore, "users", user.uid), {
        fullName,
        email,
        dateCreated: serverTimestamp(),
        status: "active",
      });

      toast.success("User successfully registered");
      
      // Navigate to the home page after successful registration
      navigate("/home");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email address already in use");
      } else {
        toast.error("Error registering user");
      }
    } finally {
      setIsProcessing(false);
      setState(initialState);
    }
  };

  return (
    <main className="auth py-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <Title level={2} className="text-center mb-4">Register</Title>
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item>
                <Input
                  size="large"
                  type="text"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={state.fullName}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input
                  size="large"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input.Password
                  size="large"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={state.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                style={{ color: "#fadb14" }}
                size="large"
                block
                loading={isProcessing}
                htmlType="submit"
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
}
