import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { fireStore } from "../../Config/Firebase";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment'; // Import moment for date formatting

export default function ContactTable() {
  const [msgData, setMsgData] = useState([]);
  const [editingMsg, setEditingMsg] = useState(null); // State for editing
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Callback function to fetch messages
  const fetchMessages = () => {
    const q = query(collection(fireStore, "message"));

    // Real-time listener for Firestore collection
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.forEach((doc) => {
        const data = { key: doc.id, ...doc.data() };
        array.push(data);
      });
      setMsgData(array);
    });

    // Return the unsubscribe function
    return unsubscribe;
  };

  useEffect(() => {
    // Fetch messages initially
    const unsubscribe = fetchMessages();

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Function to delete a message
  const delMsg = async (msgId) => {
    try {
      await deleteDoc(doc(fireStore, "message", msgId));
      message.success('Message deleted successfully');
    } catch (error) {
      console.error("Error deleting message: ", error);
      message.error('Failed to delete message');
    }
  };

  // Function to handle form submission
  const handleEdit = async (values) => {
    const { key, name, email, Subject, message: msg, dateCreated } = editingMsg;
    try {
      await updateDoc(doc(fireStore, "message", key), {
        name: values.name || name,
        email: values.email || email,
        Subject: values.Subject || Subject,
        message: values.message || msg,
        dateCreated: values.dateCreated ? values.dateCreated.format('YYYY-MM-DD') : dateCreated
      });
      message.success('Message updated successfully');
      setIsModalVisible(false); // Close the modal
      setEditingMsg(null); // Clear editing state
    } catch (error) {
      console.error("Error updating message: ", error);
      message.error('Failed to update message');
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Image"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "subject",
    },
    {
      title: "Description",
      dataIndex: "message",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button 
            type="link"
            icon={<EditOutlined />} 
            style={{ color: 'green', marginRight: 8 }} 
            aria-label="edit" 
            onClick={() => {
              setEditingMsg(record);
              setIsModalVisible(true); // Open the modal
            }} 
          />
          <Button 
            type="link"
            icon={<DeleteOutlined />} 
            style={{ color: 'red' }} 
            aria-label="delete" 
            onClick={() => delMsg(record.key)} // Call delMsg with document ID
          />
        </span>
      ),
    },
  ];

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="py-5 text-center fw-bold text-warning">
              Contact Message
            </h1>
          </div>
          <div className="col">
            {isModalVisible ? (
              <Modal
                title="Edit Message"
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)} // Close the modal
                style={{ top: 20 }}
              >
                <Form
                  layout="vertical"
                  initialValues={{
                    name: editingMsg?.name,
                    email: editingMsg?.email,
                    Subject: editingMsg?.Subject,
                    message: editingMsg?.message,
                    dateCreated: editingMsg?.dateCreated ? moment(editingMsg.dateCreated) : null
                  }}
                  onFinish={handleEdit}
                >
                  <Form.Item name="name" label="Name">
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email">
                    <Input />
                  </Form.Item>
                  <Form.Item name="Subject" label="Subject">
                    <Input />
                  </Form.Item>
                  <Form.Item name="message" label="Description">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  <Form.Item name="dateCreated" label="Date Created">
                    <DatePicker 
                      format="YYYY-MM-DD" 
                      defaultValue={moment(editingMsg?.dateCreated)} 
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            ) : (
              <div className="table-responsive mb-4">
                <Table columns={columns} dataSource={msgData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
