import React, { useState, useRef } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fireStore, storage } from "../../Config/Firebase";
import DashBoardLayout from "./DashBoardLayout";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Progress } from "antd"; // Importing Progress component

const { Title } = Typography;

const initialState = {
  name: "",
  description: "",
  price: "",
};

export default function Menu() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(5); // Progress state
  const fileInputRef = useRef(null); // Ref for file input

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Accessing the first file in the FileList
  };

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function getId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    return `${timestamp}-${randomNum}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { name, description, price } = state;

    name = name.trim();

    if (name.length < 3) {
      return toast.error("Please enter the name of the item");
    }

    if (price.length < 1) {
      return toast.error("Please enter a valid price.");
    }

    let formData = {
      name,
      description,
      price,
      dateCreated: serverTimestamp(),
      status: "active",
      id: getId(),
    };

    setIsProcessing(true);

    if (file) {
      uploadFile(formData);
    } else {
      createDocument(formData);
    }
  };

  const createDocument = async (formData) => {
    try {
      await setDoc(doc(fireStore, "items", formData.id), formData);
      toast.success("Item has been successfully added");
      resetForm(); // Reset form and states
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Something went wrong while adding the item");
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadFile = async (formData) => {
    const fileName = formData.id + "-" + file.name; // Accessing the file name directly
    const storageRef = ref(storage, `images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Update progress state
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        toast.error("Something went wrong while uploading the image");
        setIsProcessing(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const data = {
            ...formData,
            imageName: file.name,
            imageUrl: downloadURL,
          };
          console.log("data=>", data);
          createDocument(data);
          setUploadProgress(100); // Set progress to 100% on completion
        });
      }
    );
  };

  const resetForm = () => {
    setState(initialState);
    setFile(null);
    setUploadProgress(0); // Reset progress bar

    // Reset the file input field using the ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <DashBoardLayout style={{ margin: "0px", padding: 0 }}>
      <main className="">
        <div className="card p-3 p-md-4 w-100">
          <Title level={2} className="text-center">
            Add Item
          </Title>

          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item>
                  <Input
                    size="large"
                    type="text"
                    placeholder="Enter the name of the item"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Input
                    size="large"
                    type="text"
                    placeholder="Enter the description of the item"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Input
                    size="large"
                    placeholder="Enter the price of the item"
                    name="price"
                    value={state.price}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <input
                    type="file"
                    size="large"
                    className="form-control p-2"
                    onChange={handleFileChange}
                    ref={fileInputRef} // Attach the ref to the file input
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                {/* Display the progress bar */}
                <Progress
                  percent={uploadProgress}
                  size={[300, 20]}
                  status={uploadProgress === 100 ? "success" : "active"}
                />
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  size="large"
                  block
                  loading={isProcessing}
                  htmlType="submit"
                >
                  Add Item
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </main>
    </DashBoardLayout>
  );
}
