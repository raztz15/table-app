import Users from "./components/users/Users";
import UserInfo from "./components/userInfo/UserInfo";
import { useState } from "react";
import DropdownApp from "./components/dropDownMenu/Dropdown";
import ReduxTry from "./components/reduxTry/ReduxTry";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      {/* <ReduxTry /> */}
      <Users users={users} setUsers={setUsers} />
      {/* <DropdownApp /> */}
      {/* <UserInfo /> */}
    </div>
  );
}

export default App;
