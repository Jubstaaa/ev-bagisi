import React, { useState } from "react";
import { uploadFile, setUser } from "../firebaseConfig";

function AddUser() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    uploadFile(e, setFile);
  };
  const handleSubmit = () => {
    setUser(name, file);
    setName("");
    setFile("");
  };
  return (
    <div className="modal" id="my-modal-5">
      <div className="modal-box flex flex-col gap-5">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">İsim</span>
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <input
            onChange={handleFile}
            type="file"
            className="file-input file-input-bordered w-full"
          />
        </div>
        {file && (
          <div className="avatar">
            <div className="w-full rounded">
              <img src={file} />
            </div>
          </div>
        )}

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

export default AddUser;
