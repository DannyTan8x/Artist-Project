import { Link, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";

import axiosInstance from "../axiosConfig";
import CountDown from "./CountDown";
import AddFavoriteBtn from "./AddFavoriteBtn";
import { MainContext } from "./ContextProvider/MainContext";

export default function Auction() {
  const { id } = useParams();
  const [biddingHistory, setBiddingHistory] = useState();
  const [painting, setPainting] = useState();
  const [breadcrumb, setBreadcrumb] = useState();
  const [highestBre, setHighestBre] = useState();
  const [breAmoutArray, setBreAmoutArray] = useState();
  const [auctionList, setAuctionList] = useState();

  const [formData, setFormData] = useState({
    paintingId: "",
    bidAmount: 0,
  });
  const [selectedOption, setSelectedOption] = useState("");

  const [inputValue, setInputValue] = useState("");

  const [selectinOptionList, setSelectinOptionList] = useState();
  const [isvalid, setIsvalid] = useState();
  const [placeBidBtn, setPlaceBidBtn] = useState();
  const {
    reLoadBiddingHistory,
    setReLoadBiddingHistory,
    showLoginModal,
    showBiddingHistoryRef,
  } = useContext(MainContext);
  const path = import.meta.env.VITE_DATA_HOST_API;

  // Fetch painting data
  const getdata = async () => {
    setSelectedOption("");
    const api = path + "/api/bidding";

    try {
      const result = await axiosInstance.get(`${api}/${id}`);
      // setData(result.data.paintingsList);

      // console.log(result.data);
      setPainting(result.data.painting);
      setBiddingHistory(result.data.biddingHistory);

      console.log("step 3: get auction data");
    } catch (error) {
      console.log(error);
      console.log("step 3: get auction data erro");
    }
  };

  useEffect(() => {
    getdata();
  }, [id, reLoadBiddingHistory]);
  const buildAcutionList = () => {
    if (!biddingHistory || biddingHistory.length === 0) {
      return <p>No bidding history available.</p>;
    }

    console.log("step 4: buil AuctionList");
    return biddingHistory.map((b, i) => {
      return (
        <div key={i} className="auctionList">
          <div className="row m-2">
            <div className="col">{b.nickName}</div>
            <div className="col">{b.bidTime}</div>
            <div className="col">
              ${" "}
              {new Intl.NumberFormat("en-IN", {
                // maximumSignificantDigits: 3,
              }).format(b.bidAmount)}
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    setAuctionList(buildAcutionList());
    console.log("step 5: setAuctionList");
  }, [biddingHistory]);

  const buildBreadCrumb = useCallback(() => {
    if (!painting) return; // Exit if painting is undefined
    setBreadcrumb(
      <div className="Breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">ARTIST</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/home/${painting.artistId}`}>
                {painting.artisName}
              </Link>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              id="paintingId"
            >
              {painting.paintingId}
            </li>
          </ol>
        </nav>
      </div>
    );
  }, [painting]);

  useEffect(() => {
    if (biddingHistory && biddingHistory.length > 0) {
      setHighestBre(biddingHistory[0].bidAmount);
    } else {
      setHighestBre(painting?.price);
    }
  }, [biddingHistory]);

  useEffect(() => {
    setBreAmoutArray(
      Array.from({ length: 3 }, (_, i) => highestBre + 50 * (i + 1))
    );
    console.log("step 4: get highestBre and set setBreAmoutArray");
  }, [highestBre]);

  //build selection option
  useEffect(() => {
    if (breAmoutArray) console.log("step 5: setSelectinOptionList");
    setSelectinOptionList(
      breAmoutArray?.map((b, i) => {
        console.log(b);
        return (
          <option key={i} value={b}>
            ${" "}
            {new Intl.NumberFormat("en-IN", {
              // maximumSignificantDigits: 4,
            }).format(b)}
          </option>
        );
      })
    );
  }, [breAmoutArray]);

  useEffect(() => {
    buildBreadCrumb();
  }, [painting]);
  const handleTimeUp = (state) => {
    setIsvalid(state);
    // Perform any actions like disabling the parent component here
  };
  useEffect(() => {
    console.log(isvalid);
    isvalid
      ? setPlaceBidBtn(
          <button
            type="submit"
            className="btn btn-primary mx-3"
            onClick={handleClickPlaceBid}
          >
            PLACE BID
          </button>
        )
      : setPlaceBidBtn(<></>);
  }, [isvalid]);

  // Function to handle changes in the textbox

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    if (name === "selction") {
      setInputValue(""); // Clear the text input when selection changes
      setSelectedOption(value);
    } else {
      setSelectedOption(""); // Clear the selection when input changes
      setInputValue(value);
    }
  };

  //Post placeBid

  const handleClickPlaceBid = async (e) => {
    e.preventDefault();
    const authorization = localStorage.getItem("token");
    if (authorization == null) {
      console.log(authorization);
      showLoginModal();
      return;
    }

    const inputValue = document.getElementById("inputValue").value;
    const selectedValue = document.getElementById("selectedValue").value;
    const finalvalue = inputValue === "" ? selectedValue : inputValue;
    if (finalvalue) {
      const newFormData = {
        ...formData,
        paintingId: document.getElementById("paintingId").innerText,
        bidAmount: finalvalue,
      };

      setFormData(newFormData);
      console.log(newFormData);

      try {
        const api = path + "/api/bidding/bid";
        const result = await axiosInstance.post(`${api}`, newFormData);
        console.log(result);
        setReLoadBiddingHistory((prev) => !prev);
        showBiddingHistoryRef();
      } catch (e) {
        alert(e.response.data);
        console.log(e);
      }
    } else {
      alert("Please confirm you amount");
    }
  };

  if (painting)
    return (
      <>
        <div className="container my-5">
          {breadcrumb}
          <h2>{painting.paintingName}</h2>
          <div className="row">
            <div className="col d-flex flex-column align-items-center">
              <img
                style={{
                  // width: "250px",
                  height: "250px",
                  backgroundColor: "blue",
                }}
                className="m-4"
                src={painting.largUrl}
                alt="Painting IMG"
              />
              <div className="context h6">
                <div className="row">
                  <div className="col-4 text-end">ARTIST</div>
                  <div className="col-1 ">:</div>
                  <div className="col text-center">{painting.artisName}</div>
                </div>
                <div className="row">
                  <div className="col-4  text-end">SINCE</div>
                  <div className="col-1 ">:</div>
                  <div className="col text-center">{painting.date}</div>
                </div>
                <div className="row">
                  <div className="col-4  text-end">STYLE</div>
                  <div className="col-1 ">:</div>
                  <div className="col text-center">{painting.style}</div>
                </div>
                <div className="row">
                  <div className="col-4  text-end">Genre</div>
                  <div className="col-1 ">:</div>
                  <div className="col text-center">{painting.genre}</div>
                </div>
              </div>
            </div>
            <div className="col d-flex flex-column">
              <div className="countdown d-flex justify-content-center align-items-center m-3">
                <CountDown
                  datetime={painting.uploadDate}
                  config={{
                    days: true,
                    hours: true,
                    minutes: true,
                    seconds: true,
                    CountDownClass:
                      "d-flex justify-content-end align-items-end",
                    textClass: "h4",
                    clockClass: "h1",
                  }}
                  onTimeUp={handleTimeUp} // Pass the callback
                />
              </div>
              <p className="price h4 text-center mb-5">
                ${" "}
                {new Intl.NumberFormat("en-IN", {
                  // maximumSignificantDigits: 3,
                }).format(painting.price)}{" "}
              </p>
              <form action="">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="selectedValue"
                  name="selction"
                  value={selectedOption}
                  onChange={handleInputChange}
                  // onChange={handleSelectChange}
                >
                  <option value={null}>Bidding amount ...</option>
                  {selectinOptionList}
                </select>
                <span className="small text-danger">
                  Once a bid is placed, it cannot be canceled. Please bid
                  carefully.
                </span>
                <input
                  className="form-control"
                  placeholder="optional amount"
                  name="textbox"
                  id="inputValue"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                ></input>

                <div className="cardBtn d-flex justify-content-center m-5">
                  <AddFavoriteBtn paintingId={painting.paintingId} />

                  {placeBidBtn}
                </div>
              </form>

              <div className="row shipment">
                <div className="row m-3">
                  <div className="col-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-airplane-engines"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0M7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1s.458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7z" />
                    </svg>
                  </div>
                  <div className="col">
                    @ 120 from Taiwan, arrives in 3-5 days
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col-1">
                    <span className="material-symbols-outlined">gavel</span>
                  </div>
                  <div className="col">Byer Protection fee: 10%</div>
                </div>
                {/* <div className="row m-3">
                  <div className="col-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-clock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    </svg>
                  </div>
                </div> */}
                <hr />
                {auctionList}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
