import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import axios from "axios";
import { GROUPED_COLUMNS } from "./Columns";
import { GlobalFilter } from "../globalFilter/GlobalFilter";
import "./Users.css";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import AddUpdateUser from "../addUpdateUser/AddUpdateUser";
import Footer from "../footer/Footer";
import Dropdown from "../dropDownMenu/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUsers } from "../redux/userSlice";

export default function Users({ users, setUsers }) {
  const [num, setNum] = useState("1");

  const [searchValue, setSearchValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [setErrorMessage] = useState("");

  const columns = useMemo(() => GROUPED_COLUMNS, []);

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.users, console.log(state);
  });

  const usersData = useMemo(() => [...users], [users]);

  const [selectedRow, setSelectedRow] = useState(null);

  const [editedRow, setEditedRow] = useState(null);

  const deleteUser = (id, e) => {
    setUsers(users.filter((user, i) => i !== id));
  };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "edit",
        Cell: ({ row }) => {
          return (
            <button
              className="edit-button"
              onClick={() => {
                setEditedRow(row.original);
              }}
            >
              Edit
            </button>
          );
        },
      },
      {
        id: "menu",
        Cell: ({ row }) => {
          return (
            <Dropdown
              trigger={<button className="three-dots-menu"></button>}
              menu={[<button>Menu 1</button>, <button>Menu 2</button>]}
            />
          );
        },
      },
    ]);
  };

  const table = useTable(
    { columns: columns, data: usersData },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = table;

  const fetchUsers = () => {
    const body = {
      content: {
        organizationCode: "Ivory",
        searchText: searchValue,
        pageNum: num,
      },
      userId: "264",
      userName: "lior1",
      sessionId: "123-123",
    };
    setIsLoading(true);
    // dispatch(getUsers());
    axios
      .post(`http://54.194.238.190:8080/admin_get_organization_users`, body)
      .then((res) => {
        const users = res.data.content.list;
        setUsers(users);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch list");
      });
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    // dispatch(getUsers());
    fetchUsers();
    // }, 3 * 1000);
    // return () => clearInterval(interval);
  }, [num]);

  const renderUser = (
    <>
      {usersData.length >= 1 ? (
        <>
          <table id="users-table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                const rowProps = row.getRowProps();
                if (row.original.status === "1") {
                  return (
                    <tr
                      {...rowProps}
                      className={selectedRow?.id === row.id ? "highlight" : ""}
                      onClick={() => setSelectedRow(row)}
                    >
                      {row.cells.map((cell, index) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                      <td>
                        <button
                          className="delete-user"
                          onClick={(e) => deleteUser(index, e)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
  return (
    <>
      <div className="users-table">
        <div className="header">
          <div className="left-header">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={`${users.length} users...`}
            />
            <button onClick={fetchUsers}>Search</button>
          </div>
          <div className="right-header">
            <button onClick={() => fetchUsers()}>Refresh</button>
          </div>
        </div>
        <div className="table-container">
          {isLoading ? <LoadingSpinner /> : renderUser}
        </div>
        {editedRow ? (
          <AddUpdateUser
            setEditedRow={setEditedRow}
            editedRow={editedRow}
            setUsers={setUsers}
          />
        ) : null}
      </div>
      <Footer num={num} users={users} setNum={setNum} />
    </>
  );
}
