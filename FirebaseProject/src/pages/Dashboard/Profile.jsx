import React, { useState, useEffect } from "react";
import { Card, Avatar, Upload, Button, Typography } from "antd";
import { LogoutOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { auth, storage } from "../../Config/Firebase";
import DashboardLayout from "./DashBoardLayout";

const { Title } = Typography;

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    displayName: "User Name",  // Default username
    email: "",
    photoURL: "",
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserProfile({
        displayName: user.displayName || "User Name",  // Fall back to "User Name" if displayName is empty
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleUpload = async (file) => {
    const user = auth.currentUser;
    if (!user) return ;

    const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        setUploading(false);
        toast.error("Error uploading file");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          await updateProfile(user, { photoURL: downloadURL });
          setUserProfile((prev) => ({ ...prev, photoURL: downloadURL }));
          toast.success("Profile picture updated");
        } catch (error) {
          toast.error("Error updating profile");
        } finally {
          setUploading(false);
        }
      }
    );

    return false;
  };

  return (
    <DashboardLayout className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="mt-4"
        style={{
          width: 350,
          marginTop: "20px",
          margin: "auto",
          textAlign: "center",
          borderRadius: "10px",
          background: "linear-gradient(180deg, #FFA500 0%, #FF4500 100%)",
          color: "white",
          border: "none",
        }}
      >
        <Upload
          showUploadList={false}
          beforeUpload={handleUpload}
          customRequest={({ file }) => handleUpload(file)}
        >
          <Avatar
            size={100}  // Increase the size of the Avatar
            icon={
              userProfile.photoURL ? (
                <img src={userProfile.photoURL} alt="Profile" />
              ) : (
                <UserOutlined />
              )
            }
            style={{
              backgroundColor: "#fff",
              marginBottom: "16px",
              cursor: "pointer",
              position: "relative",
              border: uploading ? "2px solid #1890ff" : "2px solid transparent",
            }}
          >
            {!userProfile.photoURL && (
              <PlusOutlined
                style={{
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  backgroundColor: "#1890ff",
                  borderRadius: "50%",
                  padding: "4px",
                  color: "#fff",
                }}
              />
            )}
          </Avatar>
        </Upload>
        <Title level={3} style={{ color: "white", marginTop: "10px" }}>
          {userProfile.displayName}
        </Title>
        <p>{userProfile.email}</p>
        <hr style={{ borderColor: "rgba(255, 255, 255, 0.5)" }} />
        <h4>Your profile information</h4>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis in harum repellendus</p>
        <Button
          type="primary"
          shape="round"
          icon={<LogoutOutlined />}
          size="large"
          style={{ backgroundColor: "#000", borderColor: "#000" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Card>
    </DashboardLayout>
  );
};

export default Profile;
