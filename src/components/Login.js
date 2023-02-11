import React, { useState } from "react";
import { login } from "../firebaseConfig";

function Login({ setAuth }) {
  const [email, setEMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login(email, password, setAuth);
  };

  return (
    <>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          onChange={(e) => {
            setEMail(e.target.value);
          }}
          value={email}
          type="text"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Şifre</span>
        </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control w-full">
        <div className="modal-action">
          <a
            href="#"
            onClick={handleSubmit}
            className="btn btn-primary text-white"
          >
            Giriş
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
