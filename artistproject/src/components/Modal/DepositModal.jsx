import React, { useState, useContext } from "react";
import { MainContext } from "../ContextProvider/MainContext";

export default function DepositModal(){
  const {
    cardNumber2Ref,
    cardNumber3Ref,
    cardNumber4Ref,
    handleCardNumberChange,
    handleExpirationDateChange,
    handleCvvChange,
    errors,
    paymentInfo
  } = useContext(MainContext);
    return(
        <div
        className="modal modal-lg fade"
        id="Deposit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="Deposit ">
              <div className="row d-flex justify-content-center">
                <div className="col-10 border-bottom m-2">
                <h3>Deposit</h3>
                </div>
              <div className="row d-flex flex-column justify-content-center">
                  <div className="word mt-5 col-8 mx-auto align-items-start">To participate in this auction, a refundable deposit is required. This<br/>
                      deposit will be used as a guarantee of your bids and will be refunded if<br/>
                      you do not win any items.The deposit amount is calculated as a<br/>
                      percentage of the current bid. You are required to pay a deposit of 10%<br/>
                      of your current bid amount during the bid.
                  </div>
                <form action="">    
                <div className="row d-flex justify-content-center m-4 gap-2">
            <input
              type="text"
              className="txtbox col-2 text-center"
              onChange={(e) =>
                handleCardNumberChange(e, "cardNumber1", cardNumber2Ref)
              }
              maxLength="4"
            />{" "}
            —
            <input
              type="text"
              className="txtbox col-2 text-center"
              ref={cardNumber2Ref}
              onChange={(e) =>
                handleCardNumberChange(e, "cardNumber2", cardNumber3Ref)
              }
            />{" "}
            —
            <input
              type="text"
              className="txtbox col-2 text-center"
              ref={cardNumber3Ref}
              onChange={(e) =>
                handleCardNumberChange(e, "cardNumber3", cardNumber4Ref)
              }
            />{" "}
            —
            <input
              type="text"
              className="txtbox col-2 text-center"
              ref={cardNumber4Ref}
              onChange={(e) => handleCardNumberChange(e, "cardNumber4", null)}
              maxLength="4"
            />
            <div className="row d-flex justify-content-center  m-3 ">
              Expiration Date :
              <input
                type="text"
                className="Date col-2 mx-3 text-center"
                placeholder="MM/YY"
                value={paymentInfo.expirationDate}
                onChange={handleExpirationDateChange}
              />
              cvv:
              <input
                type="text"
                name="cvv"
                className="col-2 mx-3 text-center"
                value={paymentInfo.cvv}
                onChange={handleCvvChange}
                maxLength="3"
              />
            </div>
          </div>
          <div>
            {/* 顯示卡號的錯誤訊息 */}
            {errors.cardNumber && (
              <div className="text-danger">{errors.cardNumber}</div>
            )}
            {/* 顯示過期日期的錯誤訊息 */}
            {errors.expirationDate && (
              <div className="text-danger">{errors.expirationDate}</div>
            )}
            {/* 顯示 CVC 的錯誤訊息 */}
            {errors.cvv && <div className="text-danger">{errors.cvv}</div>}
          </div>
                  <div className="place-Bid d-flex justify-content-center m-5 ">
                      <div className="btn">Place Bid</div>
                  </div>
                </form>
              </div>
              
              </div>
              </div>
            </div>
        </div>
      </div>
    );
}