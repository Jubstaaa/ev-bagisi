import React, { useState } from "react";
import { setPayment } from "../firebaseConfig";

function Pay({ users }) {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const handleHavale = () => {
    name && price && setPayment(name, price, "havale");
    setName("");
    setPrice("");
    fetch(`https://api.telegram.org/bot5995427299:AAFgoj09zStEdJG8lAPAh0qZgbARwccW0CQ/sendMessage?chat_id=1148020002&text="${name} tarafından havale türünde ${price} TL ödeme bildirimi yapıldı."`)
  };
  const handleNakit = () => {
    name && price && setPayment(name, price, "nakit");
    setName("");
    setPrice("");
    fetch(`https://api.telegram.org/bot5995427299:AAFgoj09zStEdJG8lAPAh0qZgbARwccW0CQ/sendMessage?chat_id=1148020002&text="${name} tarafından nakit türünde ${price} TL ödeme bildirimi yapıldı.")
  };
  return (
    <div className="modal" id="my-modal-1">
      <div className="modal-box">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Kişi</span>
          </label>
          {/* <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Bilge Kaan Hacımustafaoğlu"
            className="input input-bordered w-full"
          /> */}
          <select
            className="select select-ghost w-full"
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <option disabled selected>
              Kişi
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Miktar</span>
          </label>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
            type="number"
            placeholder="31420.69"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <div className="modal-action items-center flex-wrap sm:flex-nowrap justify-start">
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-secondary">
                <span className="font-semibold">IBAN:</span>
                <span>TR11 0011 1000 0000 0094 7897 77</span>
                <br />
                <span className="font-semibold">İlker Balcılar</span>
              </div>
            </div>
            <a href="#" className="btn btn-error text-white">
              Vazgeç
            </a>
            <a href="#" onClick={handleHavale} className="btn ">
              Havale
            </a>
            <a href="#" onClick={handleNakit} className="btn ">
              Nakit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pay;
