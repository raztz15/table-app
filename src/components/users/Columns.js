export const COLUMNS = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Organization",
    accessor: "organizationCode",
  },
  {
    Header: "Last Login Date",
    accessor: "lastLoginDate",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Personal info",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Organization",
        accessor: "organizationCode",
      },
    ],
  },
  {
    Header: "General info",
    columns: [
      {
        Header: "Last Login Date",
        accessor: "lastLoginDate",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
  },
];
