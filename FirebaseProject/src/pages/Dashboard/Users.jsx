import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../../Config/Firebase";
import { Table, Spin } from "antd";
import DashBoardLayout from "./DashBoardLayout";

const Users = () => {
  const [documents, setDocuments] = useState([]);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const readData = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, "users"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const flattenedData = {
          key: doc.id,
          fullName: docData.fullName,   // Correctly assign fullName
          email: docData.email,         // Correctly assign email
          status: docData.status,       // Correctly assign status
        };
        data.push(flattenedData);
        console.log(doc.id, " => ", docData);
      });
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsAppLoading(false);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  console.log('documents', documents);

  return (
    <DashBoardLayout>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center py-5">Users</h1>
            {isAppLoading ? (
              <Spin size="large"  className="d-flex justify-content-center align-items-center" />
            ) : (
              <Table dataSource={documents} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Users;
