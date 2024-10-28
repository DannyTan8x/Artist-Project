import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

export default function Thumbnail({ paintingID }) {
  const path = import.meta.env.VITE_DATA_HOST_API;
  const [painting, setPainting] = useState(null);

  const findPainting = async () => {
    try {
      const api = `${path}/PTController/findpaintingid/${paintingID}`;
      const result = await axiosInstance.get(api);
      setPainting(result.data); // Sets painting data once retrieved
    } catch (e) {
      console.log("Error fetching painting:", e);
    }
  };

  // Re-fetch painting data when paintingID changes
  useEffect(() => {
    findPainting();
  }, [paintingID]);

  return (
    <div className="card" style={{ width: "8rem" }}>
      {painting ? (
        <img
          className="card-img-top"
          src={`data:image/jpeg;base64,${painting.image}`}
          alt={paintingID}
        />
      ) : (
        <div>Loading...</div> // Placeholder while painting data loads
      )}
      <div className="card-body">
        <p className="card-text">{painting?.paintingId}</p>
      </div>
    </div>
  );
}

Thumbnail.propTypes = {
  paintingID: PropTypes.string.isRequired,
};
