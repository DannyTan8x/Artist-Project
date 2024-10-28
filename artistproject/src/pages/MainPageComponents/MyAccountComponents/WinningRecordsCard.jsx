import { useEffect, useState } from "react";

import PropTypes from "prop-types";

export default function WinningRecordsCard({
  WinningRecordsCardProps,
  isSelecAllChecked,
  setIsSelecAll,
  setSelectedItems,
}) {
  useEffect(() => {
    console.log("re");
    setIsCheck(isSelecAllChecked);
  }, [isSelecAllChecked]);

  const [isChecked, setIsCheck] = useState();
  // 處理單個 item checkbox 的變化
  // const handleItemChange = (e) => {
  //   setIsSelecAll(false);
  //   setIsCheck(e.checked);
  //   console.log(e.target.id);
  //   if (e.checked) setSelectedItems(selectedItems.push(e.target.id));
  //   else setSelectedItems(selectedItems.filter((e) => e !== e.target.id));
  // };

  const handleItemChange = (e) => {
    setIsSelecAll(false);
    const isChecked = e.target.checked;
    const orderNumber = e.target.id;
    setIsCheck(isChecked);

    if (isChecked) {
      setSelectedItems((prevSelected) => [...prevSelected, orderNumber]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== orderNumber)
      );
    }
  };

  return (
    <div className="pb-5 border-bottom">
      <div className="d-flex justify-content-between row  align-items-center">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={WinningRecordsCardProps.orderNumber}
          checked={isChecked} // 確保 checkbox 的狀態同步
          onChange={handleItemChange} // 當狀態改變時觸發事件處理
        />

        <div className="d-flex justify-content-center col-6">
          <img
            className="w-50"
            src={WinningRecordsCardProps.smallUrl}
            alt="product1"
          />
        </div>
        <label className="form-check-label col-4" htmlFor="select">
          <div className="h3  mt-3">{WinningRecordsCardProps.paintingName}</div>
          <p>{WinningRecordsCardProps.artisName}</p>
          <br />
          <br />
          <div className="h4 grayfont mt-5">
            ${WinningRecordsCardProps.price}
          </div>
        </label>
        <div className="d-flex justify-content-center align-items-center col-1">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
          </svg> */}
        </div>
      </div>
    </div>
  );
}

WinningRecordsCard.propTypes = {
  WinningRecordsCardProps: PropTypes.shape({
    artisName: PropTypes.string.isRequired,
    paintingId: PropTypes.string.isRequired,
    orderNumber: PropTypes.string.isRequired,
    paintingName: PropTypes.string.isRequired,
    smallUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  isSelecAllChecked: PropTypes.bool,
  handleItemChange: PropTypes.func,
  setIsSelecAll: PropTypes.func,
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  setSelectedItems: PropTypes.func,
};
