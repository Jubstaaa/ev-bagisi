import React from "react";
import { logout } from "../firebaseConfig";
function Header({ all, bank, panel, setPanel, auth, setAuth, setReset }) {
  return (
    <div className="navbar flex flex-wrap justify-center lg:justify-between gap-5 items-center bg-base-100">
      <div className="flex flex-wrap justify-center sm:justify-between items-center">
        <a className="btn btn-ghost normal-case text-xl">
          <span> Toplam Bağış</span>
          <div className="badge badge-lg ml-2">{all} TL</div>
        </a>
        <a className="btn btn-ghost normal-case text-xl">
          <span> Kasa</span>
          <div className="badge badge-lg ml-2">{bank} TL</div>
        </a>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <a href="#my-modal-1" className="btn">
          Ödeme Bildirimi
        </a>
        <label htmlFor="my-modal-3" className="btn">
          İhtiyaç Listesi
        </label>
        {panel ? (
          <a
            onClick={() => {
              setPanel(false);
            }}
            className="btn btn-secondary"
          >
            Ana Sayfa
          </a>
        ) : (
          <a
            onClick={() => {
              setPanel(true);
            }}
            className="btn btn-secondary"
          >
            Panel
          </a>
        )}
        <a href="#my-modal-5" className="btn btn-primary text-white">
          Kullanıcı Ekle
        </a>
        {auth && panel && (
          <>
            <a
              onClick={() => {
                logout(setAuth);
              }}
              className="btn btn-error text-white"
            >
              Çıkış Yap
            </a>
          </>
        )}
        <button
          onClick={() => {
            setReset((currentState) => !currentState);
          }}
          className="btn"
        >
          Yenile
        </button>
      </div>
    </div>
  );
}

export default Header;
