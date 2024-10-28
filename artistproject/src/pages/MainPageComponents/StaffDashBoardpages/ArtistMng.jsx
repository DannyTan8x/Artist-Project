import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function ArtistMng() {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const [artistList, setArtisList] = useState([]); //所有作家名單 目前for navBar 選單用
  const [artistTable, setArtistTable] = useState();
  const [uploadToggle, setUploadToggle] = useState(false);
  const [readData, setReadData] = useState();
  const [inputData, setInputData] = useState();

  const {
    register, //Form state
    handleSubmit, //submit action
    unregister,
    reset,
    watch, //watching form control change
    setValue, //set value from watched control
  } = useForm();

  // methods for loading data
  const getArtistList = async () => {
    const api = path + "/ArtController/findall";
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axiosInstance.get(`${api}`);
      console.log(result.data);
      setArtisList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtistList();
  }, [uploadToggle]);
  //將資料更新至table
  useEffect(() => {
    if (artistList) setArtistTable(buildArtistTable());
  }, [artistList]);

  const editartist = async (event) => {
    const id = event.target.id;
    console.log(id);
    const api = path + "/ArtController/" + id;
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axiosInstance.get(`${api}`);
      console.log(result.data);
      setReadData(result.data);
      // setInputData(result.data);
 
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (readData) {
      document.getElementById("artistId").value = readData.artistId;
      setValue("artistId", readData.artistId);
      document.getElementById("artistName").value = readData.artistName;
      setValue("artistName", readData.artistName);
      document.getElementById("desciption").value = readData.desciption;
      setValue("desciption", readData.desciption);
      document.getElementById("url").value = readData.url;
      setValue("url", readData.url);
    }
  }, [readData]);
  //刪除
  const deleteArtist = async (event) => {
    const id = event.target.id;
    console.log(id);
    const api = path + "/ArtController/";
    // 等同 $.ajax(" get blablablba ")
    try {
      const result = await axios.delete(`${api}${id}`);
      console.log(result.data);
      //刷新頁面用
      setUploadToggle(!uploadToggle)
      alert("刪除成功")
    } catch (error) {
      console.log("delete" + error);
    }
  };

  const buildArtistTable = () => {
    return artistList.map((a, i) => {
      console.log(a);
      return (
        <tr key={i}>
          <th scope="row">{a.artistId}</th>
          <td>{a.artistName}</td>
          <td className="d-flex align-items-center justify-content-center">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="btn col-5" id={a.artistId} onClick={editartist}>
                Edit
              </div>
              <div
                className="btn btn-danger col-5"
                id={a.artistId}
                onClick={deleteArtist}
              >
                Delete
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };
  //有id就對資料進行修改
  const updataArtist = async () => {
    const api = path + "/ArtController/editArtist";

    const result = await axios.put(`${api}`, inputData);
    // console.log(result.data);
    //刷新頁面用
    setUploadToggle(!uploadToggle)
    reset();
    alert("修改成功")
  };
  //沒有id時就建立一個新的
  const createArtist = async () => {
    console.log(inputData);
    try {
      const api = path + "/ArtController/createArtist";
      const result = await axiosInstance.post(api, inputData);
      // console.log(result.data);
      //刷新頁面用
      setUploadToggle(!uploadToggle)
      reset();
      alert("新增成功")
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if(inputData)
    try {
      //確認有沒有id
      if (inputData.artistId == "") {      
        if(inputData.artistName&&inputData.desciption&&inputData.url){
          console.log(inputData);
          createArtist();
        }else{
          alert("欄位不能為空")
        }
      } else {
        // setInputData(inputData);
        updataArtist();
      }
    } catch (error) {
      console.log(error);
    }
    console.log(inputData);
  }, [inputData]);

  const onSubmit = (data) => {
    console.log(data);
    //確認資料
    if (data.confirmed) {
    // unregister("confirmed");
    // console.log("unregister: ", data);
    setInputData(data);
    } else {
    alert("Please Confirmed");
    }
  };

  // for 監聽輸入用。 目前先註解
  // useEffect(() => {
  //   //監聽行為 for 即時性變更值， 會搭配SetValue 使用。
  //   const subcription = watch((value, { name }) => {
  //     console.log(value, name);
  //     // setValue(name, value);
  //     if (name == "artistId") setValue(name, value);
  //     if (name == "artistName") setValue(name, value);
  //     if (name == "desciption") setValue(name, value);
  //     if (name == "url") setValue(name, value);
  //   });

  //   return subcription.unsubscribe(); // useEffect 裡面有監聽行為需要移除避免無窮低迴
  // }, [watch]);

  return (
    <>
      <div className="h1 mt-5">Artist Managerment</div>
      <div className="row">
        <form className="col-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="artistId" className="form-label">
              Id
            </label>
            <input
              type="text"
              className="form-control"
              id="artistId"
              aria-describedby="emailHelp"
              {...register("artistId")}
              readOnly
            />
            <label htmlFor="artistName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="artistName"
              aria-describedby="emailHelp"
              {...register("artistName")}
            />
            {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="desciption" className="form-label">
              Desciption
            </label>
            <textarea
              type="text"
              rows="5"
              className="form-control"
              id="desciption"
              {...register("desciption")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profileUrl" className="form-label">
              Profile URL
            </label>
            <input
              type="text"
              className="form-control"
              id="url"
              {...register("url")}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="confirmed"
              {...register("confirmed")}
            />
            <label className="form-check-label" htmlFor="confirmed">
              Confirmed
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="col"></div>
        <div
          className="table-responsive col-8"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">Name</th>
                <th scope="col" className="text-center">
                  Modify
                </th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "380px", overflowY: "auto" }}>
              {artistTable}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
