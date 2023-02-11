import { useState, useEffect } from "react";
import { getUsers } from "../firebaseConfig";
import AddUser from "./AddUser";
import PaymentsTable from "./PaymentsTable";
import UsersTable from "./UsersTable";
import ItemsTable from "./ItemsTable";
function Panel({ reset }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, [reset]);

  return (
    <div>
      <PaymentsTable users={users} reset={reset} />
      <UsersTable users={users} reset={reset} />
      <ItemsTable />
      <AddUser />
    </div>
  );
}

export default Panel;
