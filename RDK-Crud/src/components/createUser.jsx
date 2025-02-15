import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button, Table, Modal } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
} from "../features/userDetailSlice";

const CreateUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);

  // 📝 Separate form instances
  const [registerForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // 🛠 Fetch Users on Mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // 📝 Handle User Registration
  const onFinish = (values) => {
    // if (values.gender.length !== 1) {
    //   toast.error("Please select only one gender");
    //   return;
    // }
    dispatch(createUser(values)).then(() => dispatch(fetchUser()));
    toast.success("Registration successful");
    registerForm.resetFields();
  };

  // ❌ Handle User Deletion
  const handleDelete = (id) => {
    dispatch(deleteUser(id)).then(() => dispatch(fetchUser()));
  };

  // ✏️ Open Edit Modal & Pre-fill Fields
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
    setTimeout(() => {
      editForm.setFieldsValue(user);
    }, 0);
  };

  // ✅ Handle User Update
  const handleUpdate = () => {
    editForm.validateFields().then((values) => {
      dispatch(updateUser({ id: editingUser.id, data: values })).then(() =>
        dispatch(fetchUser())
      );
      toast.success("User updated successfully");
      setIsModalOpen(false);
      editForm.resetFields();
    });
  };

  // 📊 Table Columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            className="m-2"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {/* 📝 Registration Form */}
      <h2 className="text-center mt-4 mb-4">Create User</h2>
      <Form
        form={registerForm} // ✅ Separate form instance
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Age" name="age" rules={[{ required: true, message: "Please enter your age" }]}>
          <Input type="number" placeholder="Enter your age" />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select your gender" }]}>
          <Checkbox.Group>
            <Checkbox value="Male">Male</Checkbox>
            <Checkbox value="Female">Female</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>

      {/* 📊 User Table */}
      <div className="container">
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={users.map((user) => ({ ...user, key: user.id }))}
            style={{ marginTop: 20 }}
          />
        </div>
      </div>

      {/* ✏️ Edit User Modal */}
      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdate}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age" rules={[{ required: true, message: "Please enter your age" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select your gender" }]}>
            <Checkbox.Group>
              <Checkbox value="Male">Male</Checkbox>
              <Checkbox value="Female">Female</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUser;


// import React, { useEffect, useState } from "react";
// import { Form, Input, Checkbox, Button, Table, Modal } from "antd";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createUser,
//   deleteUser,
//   fetchUser,
//   updateUser,
// } from "../features/userDetailSlice";

// const CreateUser = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.app.users);
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   // Fetch users on component mount
//   useEffect(() => {
//     dispatch(fetchUser());
//   }, [dispatch]);

//   // Update form fields when editingUser changes
//   useEffect(() => {
//     if (editingUser) {
//       form.setFieldsValue(editingUser);
//     }
//   }, [editingUser, form]);

//   // Handle form submission
//   const onFinish = (values) => {
//     console.log("Submitted values:", values);

//     if (values.gender.length !== 1) {
//       toast.error("Please select only one gender.");
//       return;
//     }

//     dispatch(createUser(values))
//       .then(() => dispatch(fetchUser()))
//       .then(() => {
//         toast.success("Registration successful!");
//         form.resetFields();
//       });
//   };

//   // Handle delete user
//   const handleDelete = (id) => {
//     dispatch(deleteUser(id))
//       .then(() => dispatch(fetchUser()))
//       .then(() => toast.success("User deleted successfully!"));
//   };

//   // Handle edit user
//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   // Handle update user
//   const handleUpdate = () => {
//     form.validateFields().then((values) => {
//       console.log("Updating user:", values);

//       dispatch(updateUser({ id: editingUser.id, data: values }))
//         .then(() => dispatch(fetchUser()))
//         .then(() => {
//           toast.success("User updated successfully!");
//           setIsModalOpen(false);
//           setEditingUser(null);
//         });
//     });
//   };

//   // Define table columns
//   const columns = [
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Age", dataIndex: "age", key: "age" },
//     { title: "Gender", dataIndex: "gender", key: "gender" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <>
//           <Button type="primary" onClick={() => handleEdit(record)}>
//             Edit
//           </Button>
//           <Button
//             type="primary"
//             danger
//             className="m-1"
//             onClick={() => handleDelete(record.id)}
//           >
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <h2 className="text-center mt-4 mb-4">Create User</h2>
      
//       {/* Registration Form */}
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         style={{ maxWidth: 400, margin: "auto" }}
//       >
//         <Form.Item
//           label="Name"
//           name="name"
//           rules={[{ required: true, message: "Please enter your name" }]}
//         >
//           <Input placeholder="Enter your name" />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: "Please enter your email" },
//             { type: "email", message: "Please enter a valid email" },
//           ]}
//         >
//           <Input placeholder="Enter your email" />
//         </Form.Item>

//         <Form.Item
//           label="Age"
//           name="age"
//           rules={[{ required: true, message: "Please enter your age" }]}
//         >
//           <Input type="number" placeholder="Enter your age" />
//         </Form.Item>

//         <Form.Item
//           label="Gender"
//           name="gender"
//           rules={[{ required: true, message: "Please select your gender" }]}
//         >
//           <Checkbox.Group>
//             <Checkbox value="Male">Male</Checkbox>
//             <Checkbox value="Female">Female</Checkbox>
//           </Checkbox.Group>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             Register
//           </Button>
//         </Form.Item>
//       </Form>

//       {/* Users Table */}
//       <div className="container">
//         <div className="table-responsive">
//           <Table
//             columns={columns}
//             dataSource={users.map((user) => ({ ...user, key: user.id }))}
//             style={{ marginTop: 20 }}
//           />
//         </div>
//       </div>

//       {/* Edit User Modal */}
//       <Modal
//         title="Edit User"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         onOk={handleUpdate}
//         okText="Update"
//         cancelText="Cancel"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please enter your email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Age"
//             name="age"
//             rules={[{ required: true, message: "Please enter your age" }]}
//           >
//             <Input type="number" />
//           </Form.Item>

//           <Form.Item
//             label="Gender"
//             name="gender"
//             rules={[{ required: true, message: "Please select your gender" }]}
//           >
//             <Checkbox.Group>
//               <Checkbox value="Male">Male</Checkbox>
//               <Checkbox value="Female">Female</Checkbox>
//             </Checkbox.Group>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default CreateUser;

