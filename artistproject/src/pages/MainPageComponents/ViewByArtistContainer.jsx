// import ArtistViewContainer from "./ArtistViewContainer";
import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import MyCard from "../../components/MyCard";
// import { MainPageContext } from "../../components/ContextProvider/MainPageContext";
import { MainContext } from "../../components/ContextProvider/MainContext";
import * as bootstrap from "bootstrap"; // Import Bootstrap as a module

export default function ViewByArtistContainer() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const api = path + "/PTController/artists";
  const { id } = useParams();
  // const { artistList, getArtistList } = useContext(MainPageContext);
  const { artistList, getArtistList } = useContext(MainContext);
  const [selectedArtist, setSelectedArtist] = useState({});
  const [data, setData] = useState([]);
  const [requestPageNumber, setRequestPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch artist list when the component mounts
    getArtistList();
  }, []);
  useEffect(() => {
    // const findArtist = artistList.find((ar) => ar.artistId == id);
    // setSelectedArtist(findArtist);
    // Check if artistList has data before searching for the artist
    if (artistList.length > 0) {
      const findArtist = artistList.find((ar) => ar.artistId == id);
      setSelectedArtist(findArtist || null); // Handle case when artist is not found
    }
    if (!selectedArtist) {
      return <p className="container mt-5 pt-5">plase select an artist...</p>; // Handle loading or no artist found
    }
  }, [id, selectedArtist, artistList, requestPageNumber, loading]);

  // // Fetch painting data
  // const getdata = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await axios.get(
  //       `${api}?artistId=${selectedArtist.artistId}&currentPage=${requestPageNumber}&pageSize=${pageSize}`
  //     );
  //     setData(result.data.paintingsList);
  //     setTotalPage(result.data.totalPage || 1);
  //     // console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };
  const getdata = useCallback(async () => {
    if (!selectedArtist || !selectedArtist.artistId) return; // Prevent call if artistId is not available
    setLoading(true);
    try {
      const result = await axios.get(
        `${api}?artistId=${selectedArtist.artistId}&currentPage=${requestPageNumber}&pageSize=${pageSize}`
      );
      setData(result.data.paintingsList);
      setTotalPage(result.data.totalPage || 1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [selectedArtist, requestPageNumber, pageSize]);

  useEffect(() => {
    if (selectedArtist) {
      getdata();
    }
  }, [selectedArtist, requestPageNumber, pageSize, getdata]);

  return (
    <>
      <div className="container mt-5 pt-5">
        <h2>Artist: {selectedArtist.artistName}</h2>
        <p>ArtistID : {id}</p>
        <p>
          Wikipidia:{" "}
          <a target="_blank" href={selectedArtist.url}>
            {selectedArtist.url}
          </a>
        </p>
        <h4>Description:</h4>
        <p>{selectedArtist.desciption}</p>
      </div>
      <div className="container">
        <Pagination
          totalPage={totalPage}
          requestPageNumber={requestPageNumber}
          onPageChange={setRequestPageNumber}
        />
        <div className="container d-flex flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : (
            // <div className="spinner-border text-info" role="status">
            // <span className="visually-hidden">Loading...</span>
            // </div>
            data.map((d, i) => {
              return (
                <MyCard
                  key={i}
                  Paintings={d}
                  minWidth="15rem"
                  imgHeight="15rem"
                />
              );
            })
          )}
          <hr></hr>
        </div>
        <Pagination
          totalPage={totalPage}
          requestPageNumber={requestPageNumber}
          onPageChange={setRequestPageNumber}
        />
      </div>
      {/* <ArtistViewContainer></ArtistViewContainer> */}
    </>
  );
}
