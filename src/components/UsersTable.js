function UsersTable({ users }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Aylık Bağış</th>
            <th>Toplam Bağış</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="avatar">
                  <div className="w-24 rounded">
                    <img src={user.photoUrl} />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </div>
              </td>
              <td>{user.month} TL</td>
              <td>{user.donate} TL</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
