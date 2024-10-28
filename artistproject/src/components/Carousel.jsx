import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useState, useEffect } from "react";
export default function Carousel() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const api = path + "/PTController/topbiddings";
  const [paintingsCount, setPaintingsCount] = useState([]);
  const [paintingsList, setPaintingsList] = useState();
  const [CarouselItem, setCarouselItem] = useState();
  const navigate = useNavigate();
  //撈取資料庫
  const getdata = async () => {
    try {
      const result = await axiosInstance.get(`${api}?pageSize=3`);
      setPaintingsList(result.data.paintingsList);
      setPaintingsCount(result.data.paintingsCount);
      console.log("Carousel:", result.data);
      // setTotalPage(result.data.totalPage || 1);
    } catch (error) {
      console.log(error);
    }
  };
  const placeBid = (e) => {
    console.log("placeBid");
    console.log(e.target.id);
    navigate(`/home/auction/${e.target.id}`);
  };
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (paintingsCount) {
      console.log("paintingsCount", paintingsCount);
      setCarouselItem(buildCarouselItems());
    }
    if (paintingsList) {
      console.log("paintingsList", paintingsList);
      setCarouselItem(buildCarouselItems());
    }
  }, [paintingsList, paintingsCount]);
  const buildCarouselItems = () => {
    if (paintingsList)
      return paintingsList.map((p, i) => {
        return (
          <div key={i} className="carousel-item active">
            {/* <div
              className="position-relative"
              style={{
                // position: "relative",
                display: "flex",
                height: "380px",
              }}
            > */}
            <div className="card ">
              <img
                src={p.smallUrl}
                className="img-fluid shawdown-sm"
                alt={p.paintingName}
              />
              <div className="card-body"></div>
            </div>
            <div className="text ">
              <p className="pName">{p.paintingName}</p>
              <p className="aName ms-5"> by {p.artisName}</p>
              <p className="pDate ms-5">since: {p.date}</p>
              <p className="ms-5">
                Has{" "}
                <span className="text-secondary h1">
                  {" "}
                  {paintingsCount[i].count}{" "}
                </span>{" "}
                bids
              </p>
              <div className="row">
                <span
                  className="btn btn-primary col-2"
                  id={p.paintingId}
                  onClick={placeBid}
                >
                  PLACE BID
                </span>
              </div>
            </div>
          </div>
          // </div>
        );
      });
  };

  return (
    <>
      <div className="container">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {CarouselItem}
            {/* <div className="carousel-item active">
              <img
                src="../../src/assets/Carousel1.png"
                className="d-block w-100"
                alt="picture 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="../../src/assets/Carousel2.png"
                className="d-block w-100"
                alt="picture 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="../../src/assets/Carousel3.png"
                className="d-block w-100"
                alt="picture 3"
              />
            </div> */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
