function List({ all, bank, items }) {
  return (
    <div className="modal">
      <div className="modal-box relative">
        <a
          href="#my-modal-2"
          className="btn btn-sm btn-circle absolute right-12 top-2"
        >
          {" "}
          ➕
        </a>
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">İhtiyaç Listesi</h3>
        {items.map((item) => (
          <div key={item.id}>
            <p className="pt-4">
              {item.name}
              {item.isBought && <span>✅</span>}
            </p>
            <div className="flex justify-between items-center gap-5 relative">
              <progress
                className="progress progress-info relative"
                value={(all * 100) / item.price}
                max="100"
              ></progress>
              <div
                className={`tooltip w-full h-full absolute inset-0`}
                data-tip={`${bank} TL`}
              ></div>
              <span className="whitespace-nowrap">{item.price} TL</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
