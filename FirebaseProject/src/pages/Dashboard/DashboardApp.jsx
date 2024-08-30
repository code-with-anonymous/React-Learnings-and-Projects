import React, { useEffect, useState } from "react";
import { Spin, Table, Button, Popconfirm, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { fireStore } from "../../Config/Firebase";
import DashBoardLayout from "./DashBoardLayout";
import "../../Scss/Dashboard.scss";
import EditModal from "./EditModal";

const DashboardApp = () => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const readItems = async () => {
    setIsAppLoading(true);
    try {
      const querySnapshot = await getDocs(collection(fireStore, "items"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        // Check if formData exists and use it
        const itemData = docData.formData || docData;
        const flattenedData = {
          key: doc.id,
          ...itemData,
        };
        data.push(flattenedData);
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsAppLoading(false);
    }
  };

  const handleEdit = (record) => {
    setUpdatedItem(record);
    setIsModalVisible(true);
  };

  const saveEdit = async (data) => {
    try {
      await updateDoc(doc(fireStore, "items", data.key), {
        formData: {
          name: data.name,
          description: data.description,
          price: data.price,
        },
      });
      readItems();
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(fireStore, "items", id));
      setItems(items.filter((item) => item.key !== id));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  useEffect(() => {
    readItems();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (imageUrl) => (
        <Image
          src={imageUrl}
          alt="Item"
          style={{  height: '48px', width:"55px" }}
          className="img-fuild rounded-circle "
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            className="custom-action-button"
            type="link"
            icon={<EditOutlined className="custom-edit-icon" onClick={() => handleEdit(record)} />}
          />
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => deleteItem(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="custom-action-button"
              type="link"
              icon={<DeleteOutlined className="custom-delete-icon" />}
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <DashBoardLayout>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center py-5">Items</h1>
            {isAppLoading ? (
              <Spin size="large" 
              className="d-flex justify-content-center align-items-center" />
            ) : (
              <div className="table-responsive">
                <Table dataSource={items} columns={columns} />
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalVisible && (
        <EditModal
          show={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          item={updatedItem}
          onSave={saveEdit}
        />
      )}
    </DashBoardLayout>
  );
};

export default DashboardApp;
