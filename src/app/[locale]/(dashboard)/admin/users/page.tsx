"use client";
import FirestoreTable from "../../_components/show-data";


/*
     uid: user.uid,
     email: user.email,
     displayName: user.displayName,
     photoURL: user.photoURL,
     phoneNumber: user.phoneNumber ?? null,
     emailVerified: user.emailVerified ?? null,
     role: "user",
     createdAt: new Date().toISOString(),
*/
const UsersPage = () => {
  const columns = [
    { key: "uid", label: "ID" },
    { key: "email", label: "Email" },
    { key: "displayName", label: "Display Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "emailVerified", label: "Email Verified" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "CreatedAt" },
  ];

  return (
    <FirestoreTable
      collectionName="users"
      columns={columns}
      searchField="email"
      title="Manage Users"
      description="View and manage user accounts."
    />
  );
};

export default UsersPage;