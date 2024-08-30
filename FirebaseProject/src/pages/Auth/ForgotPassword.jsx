import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail } from 'firebase/auth'; // Adjust import based on your setup
import { auth } from "../../Config/Firebase";

const { Title } = Typography;

const initialState = {
  email: '',
};

export default function ForgotPassword() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = state;

    setIsProcessing(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent successfully!');
        setState(initialState); // Optionally reset the form
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Error: ${errorMessage}`);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <>
      <main className="auth">
        <div className="card p-3 p-md-4 w-100">
          <Title level={2} className="text-center">
            Forgot Password
          </Title>

          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            <Row gutter={[16, 16]}>
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
                <Button
                  type="primary"
                  size="large"
                  block
                  loading={isProcessing}
                  htmlType="submit"
                >
                  Send
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </main>
    </>
  );
}
