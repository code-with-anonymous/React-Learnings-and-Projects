import React, { useState } from "react";
import backgroundImage from "../../assets/bg-hero.jpg";
import { getId, validateEmail } from "../../Config/global";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { fireStore, storage } from "../../Config/Firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Progress, Button, Spin } from "antd"; // Import Ant Design components

export default function Contact() {
  const initialState = {
    name: "",
    email: "",
    Subject: "",
    message: "",
    msgId: getId(), // Initialize msgId with a unique ID
  };

  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    const { name, email, Subject, message } = state;

    // Apply email validation
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      setLoading(false); // Reset loading state on error
      return;
    }

    // Check if all fields are filled
    if (!name || !email || !Subject || !message) {
      toast.error("All fields are required");
      setLoading(false); // Reset loading state on error
      return;
    }

    if (file) {
      await uploadFile();
    } else {
      await createDocument(state);
    }
  };

  const createDocument = async (contactData) => {
    try {
      await setDoc(doc(fireStore, "message", contactData.msgId), contactData);
      toast.success("Message sent successfully!");
      setState(initialState); // Reset the form after successful submission
      setFile(null); // Reset file state
      setUploadProgress(0); // Reset progress
    } catch (e) {
      toast.error("Error adding document: " + e.message);
    } finally {
      setLoading(false); // Reset loading state after completion
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Accessing the first file in the FileList
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error("File is not set");
      setLoading(false); // Reset loading state on error
      return;
    }

    const fileName = state.msgId + "-" + file.name;
    const storageRef = ref(storage, `messages/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error("Error uploading file: " + error.message);
        setLoading(false); // Reset loading state on error
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            ...state,
            imageName: file.name,
            imageUrl: downloadURL,
          };
          createDocument(data);
        });
      }
    );
  };

  return (
    <>
      <div className="contact-section" style={styles.headerSection}>
        <div style={styles.overlay}>
          <h2 style={styles.headerText}>Contact Us</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={styles.breadcrumb}>
              <li className="breadcrumb-item">
                <a href="#" style={styles.breadcrumbLink}>
                  Home /
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#" style={styles.breadcrumbLink}>
                  Pages /
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={styles.activeBreadcrumb}>
                Contact
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-5 fw-bolder mt-2">Contact For Any Query</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={state.name}
                    onChange={(e) => setState({ ...state, name: e.target.value })}
                    style={styles.inputField}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                    style={styles.inputField}
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="Subject"
                  className="form-control"
                  placeholder="Subject"
                  value={state.Subject}
                  onChange={(e) => setState({ ...state, Subject: e.target.value })}
                  style={styles.inputField}
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Message"
                  value={state.message}
                  onChange={(e) => setState({ ...state, message: e.target.value })}
                  style={{ ...styles.inputField, minHeight: "150px" }}
                ></textarea>
              </div>
              {/* <div className="mb-3">
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div> */}
              {/* <div className="mb-3">
               
                <Progress
                  percent={uploadProgress}
                  size={[300, 20]}
                  status={uploadProgress === 100 ? "success" : "active"}
                />
              </div> */}
              <Button
                type="primary"
                htmlType="submit"
                className="w-100"
                style={styles.submitButton}
                loading={loading} // Show loading spinner
              >
                SEND MESSAGE
              </Button>
            </form>
          </div>
          <div className="col-md-6 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509592!2d144.95592531531963!3d-37.81720997975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727a12fdf8852!2sGoogle!5e0!3m2!1sen!2sin!4v1532582698430"
              width="100%"
              height="330"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button style={styles.floatingButton} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fa fa-arrow-up" style={styles.floatingButtonIcon}></i>
      </button>
    </>
  );
}


const styles = {
  headerSection: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "60vh",
    color: "#fff",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: "3rem",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  breadcrumb: {
    backgroundColor: "transparent",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1.2rem",
  },
  breadcrumbLink: {
    color: "#FFA500",
    textDecoration: "none",
  },
  activeBreadcrumb: {
    color: "#fff",
  },
  inputField: {
    height: "50px",
    padding: "10px",
    fontSize: "16px",
  },
  submitButton: {
    backgroundColor: "#FFA500",
    border: "none",
    padding: "15px 0",
    fontSize: "18px",
    color: "#fff",
  },
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#FFA500",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  floatingButtonIcon: {
    color: "white",
    fontSize: "20px",
  },
};
