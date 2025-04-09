"use client";
import FirestoreTable from "../../_components/show-data";

const UsersPage = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "portfolioName", label: "Portfolio Name" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "message", label: "Message" },
    { key: "createdAt", label: "CreatedAt" },
    // { key: "machine", label: "Machine" },
  ];

  return (
    <FirestoreTable
      collectionName="messages"
      columns={columns}
      searchField="email"
      title="Manage Messages"
      description="View and manage messages from users."
    />
  );
};

export default UsersPage;