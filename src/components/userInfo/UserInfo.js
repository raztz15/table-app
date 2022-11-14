import React, { useEffect } from "react";
import axios from "axios";

function UserInfo() {
  const body = {
    content: {
      userId: "1",
    },
    userId: "",
    userName: "",
    sessionId: "123-123",
  };

  function fetchUserInfo() {
    axios
      .post("http://54.194.238.190:8080/admin_get_user_accounts", body)
      .then((res) => {
        const response = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    fetchUserInfo();
  });

  return <div>UserInfo</div>;
}

export default UserInfo;
