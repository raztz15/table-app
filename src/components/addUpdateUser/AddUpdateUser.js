import React, { useState } from "react";
import "./AddUpdateUser.css";

function AddUpdateUser({ setEditedRow, editedRow, setUsers }) {
  function submitForm(e) {
    e.preventDefault();
    let newUserName = e.target[0].value;
    let newUserLastName = e.target[1].value;
    let newUserOrganization = e.target[2].value;
    let newUserloginDate = e.target[3].value;
    let newUserEmail = e.target[4].value;
    let newUserStatus = e.target[5].value;
    let newUser = editedRow;
    newUser.firstName =
      newUserName.length > 0 ? newUserName : editedRow.firstName;
    newUser.lastName =
      newUserLastName.length > 0 ? newUserLastName : editedRow.lastName;
    newUser.organizationCode =
      newUserOrganization.length > 0
        ? newUserOrganization
        : editedRow.organizationCode;
    newUser.lastLoginDate =
      newUserloginDate.length > 0 ? newUserloginDate : editedRow.lastLoginDate;
    newUser.email = newUserEmail.length > 0 ? newUserEmail : editedRow.email;
    newUser.status =
      newUserStatus.length > 0 ? newUserStatus : editedRow.status;
    setUsers((prevUsers) => {
      const updatedUsers = [
        ...prevUsers.map((user) => {
          if (user.userId === editedRow.userId) {
            return newUser;
          }
          return user;
        }),
      ];

      return updatedUsers;
    });
    setEditedRow(null);
  }
  return (
    <div className="modal">
      <form className="modal-content" onSubmit={submitForm}>
        <span onClick={() => setEditedRow(undefined)} className="close">
          &times;
        </span>
        <label>Name:</label>
        <input type="text" defaultValue={editedRow.firstName} />

        <label>Last Name:</label>
        <input defaultValue={editedRow.lastName} />

        <label>Organization:</label>
        <input defaultValue={editedRow.organizationCode} />

        <label>Last Login Date:</label>
        <input defaultValue={editedRow.lastLoginDate} />
        <label>Email:</label>
        <input defaultValue={editedRow.email} />
        <label>Status:</label>
        <input defaultValue={editedRow.status} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default AddUpdateUser;
