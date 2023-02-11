import React, { useState } from "react";
import { setItems } from "../firebaseConfig";

function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    name && price && setItems(name, price);
    setName("");
    setPrice("");
  };
  return (
    <div className="modal" id="my-modal-2">
      <div className="modal-box">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">İhtiyaç Adı</span>
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Ağza sıkmalı çikolata"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">İhtiyaç Fiyatı</span>
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
          <div className="modal-action">
            <a href="#" className="btn btn-error text-white">
              Vazgeç
            </a>
            <a
              href="#"
              onClick={handleSubmit}
              className="btn btn-primary text-white"
            >
              Ekle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
