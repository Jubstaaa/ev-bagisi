import { useState, useEffect } from "react";
import { getPayment, updateUser, updatePayment } from "../firebaseConfig";

function PaymentsTable({ users, reset }) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayment().then((data) => {
      setPayments(data);
    });
  }, [{ reset }]);

  const handleSubmit = (payment) => {
    const user = users.find((user) => user.name === payment.name);
    updateUser(user, payment);
    updatePayment(payment);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Miktar</th>
            <th>Tür</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{payment.name}</div>
                  </div>
                </div>
              </td>
              <td>{payment.price} TL</td>
              <td>{payment.type}</td>
              <th>
                <button
                  onClick={() => {
                    handleSubmit(payment);
                  }}
                  className="btn btn-primary text-white"
                  disabled={payment.isAccepted}
                >
                  {payment.isAccepted ? "Onaylandı" : "Onayla"}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsTable;
