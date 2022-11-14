import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const body = {
    content: {
      organizationCode: "Ivory",
      searchText: "",
      pageNum: "1",
    },
    userId: "264",
    userName: "lior1",
    sessionId: "123-123",
  };
  const { data } = await axios.post(
    "http://54.194.238.190:8080/admin_get_organization_users",
    body
  );
  console.log(data.content.list);
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState: { data: [], isSuccess: false, loading: false, message: "" },
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.loading = true;
      state.message = payload;
      state.isSuccess = false;
    },
  },
});

export default userSlice;
