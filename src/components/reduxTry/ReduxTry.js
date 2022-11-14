import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/userSlice.js";

function ReduxTry() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return <div>ReduxTry</div>;
}

export default ReduxTry;
