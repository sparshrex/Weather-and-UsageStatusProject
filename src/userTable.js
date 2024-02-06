import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { db } from "./Config";
import "./UserTable.css";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

async function fetchDataFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return [];
  }
}

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromFirestore();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddUser = () => {
    
  };

  const handleDeleteUser = async (userId) => {
    try {
      
      await deleteDoc(doc(db, "users", userId));

      
      setUserData((prevData) => prevData.filter((user) => user.id !== userId));

      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
  
    try {
      
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        status: newStatus, 
      });

     
      setUserData((prevData) => {
        return prevData.map((user) => {
          if (user.id === userId) {
            return { ...user, status: newStatus };
          }
          return user;
        });
      });

      console.log("User status changed successfully");
    } catch (error) {
      console.error("Error changing user status:", error.message);
    }
  };

  return (
    <div className="user-table-container">
      <h2>User Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Added Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.addedDate}</td>
              <td>
                {user.status}
                <button
                  className="active-button"
                  onClick={() => handleStatusChange(user.id, user.status)}
                >
                  {user.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-user">
        <button className="add-user-button" onClick={handleAddUser}>
          Add User
        </button>
        <Link to ="/">
        <button className="back-button">
          Back to Main
        </button>
        </Link>
      </div>
    </div>
  );
}

export default UserTable;
