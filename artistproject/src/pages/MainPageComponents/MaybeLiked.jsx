import MyCard from "../../components/MyCard";
import { useEffect, useState } from "react";

import axiosInstance from "../../axiosConfig";

export default function MaybeLiked() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const api = path + "/PTController/topfavorites";
  const [data, setData] = useState([]);

  //撈取資料庫
  const getdata = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const result = await axiosInstance.get(
        `${api}?token=${token}&pageSize=3`
      );
      setData(result.data.paintingsList);
      // console.log("maybeliked:", result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

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

  return (
    <>
      <div className="container ">
        <div className="h2 mt-5"> Most liked...</div>

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
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
