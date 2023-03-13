import { useState, useEffect } from "react";
import { getUsers, getItems, getLogs } from "./firebaseConfig";
import Header from "./components/Header";
import List from "./components/List";
import AddItem from "./components/AddItem";
import Pay from "./components/Pay";
import Login from "./components/Login";
import Panel from "./components/Panel";
import AddUser from "./components/AddUser";
import { Timestamp } from "firebase/firestore";
function App() {
  const [users, setUsers] = useState([]);
  const [all, setAll] = useState(0);
  const [month, setMonth] = useState(0);
  const [ath, setAth] = useState(0);
  const [bank, setBank] = useState(0);
  const [panel, setPanel] = useState(false);
  const [auth, setAuth] = useState(false);
  const [items, setItems] = useState([]);
  const [reset, setReset] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let all = 0;
    getUsers().then((data) => {
      data.map((data) => {
        all = all + data.donate;
      });
      const month = Math?.max(...data.map((o) => o.month));
      setMonth(data.find((item) => item.month == month));
      const ath = Math?.max(...data.map((o) => o.donate));
      setAth(data.find((item) => item.donate == ath));
      setAll(all);
      setUsers(data.sort((a, b) => b.donate - a.donate));
    });
    getItems().then((data) => {
      setItems(data);
      let spent = 0;
      data.map((data) => {
        if (data.isBought) {
          spent = spent + data.price;
        }
      });
      setBank(all - spent);
    });
    getLogs().then((data) => {
      setLogs(data.sort((a, b) => b.date.seconds - a.date.seconds));
    });
  }, [reset]);

  return (
    <div className="container mx-auto p-4 lg:p-10 xl:p-0">
      <Header
        all={all}
        bank={bank}
        panel={panel}
        setPanel={setPanel}
        auth={auth}
        setAuth={setAuth}
        setReset={setReset}
      />
      {panel ? (
        <>
          {auth ? (
            <Panel />
          ) : (
            <Login auth={auth} setAuth={setAuth} reset={reset} />
          )}
        </>
      ) : (
        <>
          <div className="overflow-x-auto overflow-y-scroll h-56">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Olay</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.log}</td>
                    <td>{log.date.toDate().toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-start items-center gap-5">
            <div className="flex flex-wrap xl:flex-nowrap justify-center sm:justify-between items-center w-full gap-5 md:gap-0 lg:gap-5">
              <div className="bg-base-100 rounded-box col-span-3 row-span-3 mx-2 grid w-full flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0">
                <div className="text-xl font-extrabold">
                  Tüm Zamanların Bağışcısı
                </div>
                <div className="avatar">
                  <div className="w-36 rounded">
                    <img src={ath?.photoUrl} />
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    <div className="text-lg font-extrabold">{ath?.name}</div>{" "}
                    <h2 className="text-3xl font-extrabold whitespace-nowrap">
                      {ath?.donate} TL
                    </h2>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full gap-5">
              {users.map((user, i) => (
                <div
                  key={user.id}
                  className="bg-base-100 rounded-box mx-2 p-4 py-8 shadow-xl w-full xl:w-auto"
                >
                  <div className="text-lg font-extrabold inline-block h-fit px-4">
                    {user.name}
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4">
                    <div className="indicator gap-3">
                      <span className="indicator-item indicator-top indicator-start badge badge-secondary w-8 h-8">
                        #{i + 1}
                      </span>
                      <div className="avatar">
                        <div className="w-24 rounded-xl">
                          <img src={`${user.photoUrl}`} />
                        </div>
                      </div>
                      <div className="bg-secondary text-accent-content rounded-box flex items-center p-4 shadow-xl">
                        <div className="flex-1 px-2">
                          <h2 className="text-3xl font-extrabold whitespace-nowrap">
                            {user.donate} TL
                          </h2>{" "}
                          <p className="text-sm text-opacity-80 whitespace-nowrap">
                            Bağış
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start items-center space-y-2 ">
                      <div
                        className="radial-progress text-primary"
                        style={{ "--value": (user.donate * 100) / all }}
                      >
                        {((user.donate * 100) / all).toFixed(2)}%
                      </div>
                      <div className="badge badge-secondary w-full">Hisse</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <List all={all} bank={bank} items={items} />
          <AddItem />
          <Pay users={users} />
          <AddUser />
        </>
      )}
    </div>
  );
}

export default App;
