import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/Firebase";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (password.length < 6) return toast.error("Password must be at least 6 chars.");

    setIsProcessing(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user", user);
      toast.success("User successfully logged in");
      navigate("/");
    } catch (error) {
      console.error("error", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email address already in use");
      } else {
        toast.error("Error logging in");
      }
      navigate("auth/register");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="auth">
      <div className="card p-3 p-md-4 w-100">
        <Title level={2} className="text-center">Login</Title>
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item>
                <Input size="large" type="email" placeholder="Enter your email" name="email" value={state.email} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input.Password size="large" placeholder="Enter your password" name="password" value={state.password} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" size="large" block loading={isProcessing} htmlType="submit">Login</Button>
            </Col>
            <Col span={24} className="text-center mt-3">
              <div>
                Don't have an account ? <Link to="/auth/register" className="btn btn-link mb-2">Register here</Link>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
}
