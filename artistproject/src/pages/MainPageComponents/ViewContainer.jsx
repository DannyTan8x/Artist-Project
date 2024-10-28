import axios from "axios";
import axiosInstance from "../../axiosConfig";
import MyCard from "../../components/MyCard";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Carousel from "../../components/Carousel";
import { MainContext } from "../../components/ContextProvider/MainContext";
import PresaleExhibitionContainer from "./PresaleExhibitionContainer";
import MaybeLiked from "./MaybeLiked";
import { useNavigate } from "react-router-dom";

export default function ViewContainer() {
  const navigate = useNavigate();
  const path = import.meta.env.VITE_DATA_HOST_API;
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  // const [requestPageNumber, setRequestPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cardsView, setCardsView] = useState();
  const {
    search,
    searchParams,
    requestPageNumber,
    setRequestPageNumber,
    searchResultRef,
  } = useContext(MainContext);

  // Fetch data
  const getdata = async () => {
    const api = path + "/PTController/findByPage";
    setLoading(true);
    try {
      const result = await axios.get(
        `${api}?currentPage=${requestPageNumber}&pageSize=${pageSize}`
      );
      setData(result.data.paintingsList);
      setTotalPage(result.data.totalPage || 1);
      // console.log("viewcontainer: ", result);
    } catch (error) {
      console.log(error);
      alert("Server is out");
      navigate("/");
    }
    setLoading(false);
  };

  const getSearch = async () => {
    try {
      const api = path + `/PTController/search?${searchParams}`;
      const result = await axiosInstance.get(api);
      setSearchData(result.data);

      setData(result.data);
    } catch (e) {
      // if (e.response.status == 400) {
      //   setData(["Nothing found..."]);
      //   setSearchData(["Nothing found..."]);
      console.log(e);
    }
    // setTotalPage(1);
  };
  useEffect(() => {
    if (searchData) {
      // console.log(Math.ceil(searchData.length / 10));
      setTotalPage(Math.ceil(searchData.length / 10));
      const startIndex = (requestPageNumber - 1) * 10;
      const endIndex = requestPageNumber * 10;
      const dataArray = searchData.slice(startIndex, endIndex);
      // console.log("dataArray:", dataArray);
      setData(searchData.slice(startIndex, endIndex));
    }
  }, [searchData]);

  useEffect(() => {
    if (search) {
      getSearch();
    } else {
      getdata();
    }
  }, [requestPageNumber, search, searchParams]); // Fetch data when page changes
  useEffect(() => {
    if (data)
      setCardsView(
        <>
          <div className="container" ref={searchResultRef}>
            {search ? <h2> Search result...</h2> : <h2>And More...</h2>}
            {totalPage == 1 ? (
              ""
            ) : (
              <Pagination
                totalPage={totalPage}
                requestPageNumber={requestPageNumber}
                onPageChange={setRequestPageNumber}
              />
            )}

            <div className="container d-flex flex-wrap">
              {loading ? (
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                data.map((d, i) => {
                  return (
                    <MyCard
                      key={i}
                      Paintings={d}
                      minWidth="15rem"
                      imgHeight="15rem"
                      textSize="12px"
                    />
                  );
                })
              )}
              <hr></hr>
            </div>
            {totalPage == 1 ? (
              ""
            ) : (
              <Pagination
                totalPage={totalPage}
                requestPageNumber={requestPageNumber}
                onPageChange={setRequestPageNumber}
              />
            )}
          </div>
        </>
      );
  }, [data]);
  return (
    <>
      <MaybeLiked />
      <PresaleExhibitionContainer />

      <br></br>

      {cardsView}
    </>
  );
}
