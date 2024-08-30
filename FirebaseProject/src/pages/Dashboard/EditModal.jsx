import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Assuming you're using react-bootstrap

function EditModal({ show, onClose, item, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        price: item.price || "",
        description: item.description || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave({ ...formData, key: item.key });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              className="form-control"
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
