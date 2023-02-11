import { useState, useEffect } from "react";

import { getItems, updateItem } from "../firebaseConfig";
function ItemsTable({ reset }) {
  const [items, setItems] = useState([]);

  const handleSubmit = (item) => {
    updateItem(item);
  };

  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, [reset]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Fiyat</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price} TL</td>
              <th>
                <button
                  onClick={() => {
                    handleSubmit(item);
                  }}
                  className="btn btn-primary text-white"
                  disabled={item.isBought}
                >
                  {item.isBought ? "Hayırlı Olsun :)" : "Satın Al"}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemsTable;
