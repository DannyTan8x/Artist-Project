import MyCard from "../../components/MyCard";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { MainContext } from "../../components/ContextProvider/MainContext";
import axiosInstance from "../../axiosConfig";

export default function PresaleExhibitionContainer() {
  // const api = "http://localhost:8080/PTController/findall";
  const path = import.meta.env.VITE_DATA_HOST_API;
  const api = path + "/PTController/findAllPresaleExhibition";
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [requestPageNumber, setRequestPageNumber] = useState(1);
  // const [artisList, setArtisList] = useState([]);
  // const { requestPageNumber, setRequestPageNumber } = useContext(MainContext);

  //撈取資料庫
  const getdata = async () => {
    try {
      const result = await axiosInstance.get(
        `${api}?currentPage=${requestPageNumber}&pageSize=5`
      );
      setData(result.data.paintingsList);
      // console.log("presales:", result.data);
      setTotalPage(result.data.totalPage || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, [requestPageNumber]);

  useEffect(() => {
    const plaintingTypeName = data
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.artisName === item.artisName)
      )
      .map((t) => t.artisName);
    // console.log(plaintingTypeName);
    // setArtisList(plaintingTypeName);
  }, [data]);

  if (data.length > 0) {
    return (
      <>
        <div className="container ">
          <div className="h2 mt-5"> Coming Soon</div>
          {totalPage == 1 ? (
            ""
          ) : (
            <Pagination
              totalPage={totalPage}
              requestPageNumber={requestPageNumber}
              onPageChange={setRequestPageNumber}
            />
          )}

          <div className="divByArtis ">
            <div className="list">
              {data.map((d, i) => {
                // console.log("d:", d);
                return (
                  <MyCard
                    key={i}
                    Paintings={d}
                    minWidth="22rem"
                    imgHeight="18rem"
                    cardClass="shadow"
                  />
                );
              })}
              {/* {artisList.map((d, i) => {
          return (
            <>
              <div className="divByArtis ">
                <p className="h2">Artis： {d}</p>
                <div className="list">
                  {
                    data
                      .filter((item) => item.artisName === d)
                      .map((d, i) => {
                        return (
                          <MyCard
                            key={i}
                            Paintings={d}
                            minWidth="22rem"
                            imgHeight="18rem"
                          />
                        );
                      })
                    // data.map((d, i) => {
                    //   return <MyCard key={i} Paintings={d} />;
                    //   // return <MyCard key={i} photo={d.smallUrl} altText={d.paintingName} />;
                    // })
                  }
                </div>
              </div>
              <hr></hr>
            </>
          );
        })} */}
            </div>
          </div>
          <hr />
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
