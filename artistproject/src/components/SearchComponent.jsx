import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainContext } from "./ContextProvider/MainContext";

const SearchComponent = () => {
  const [search, setSearch] = useState(""); // State to store the search term
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResultRef } = useContext(MainContext);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    setSearchParam();
  };

  function setSearchParam() {
    if (search.trim() === "") {
      console.log("empty search", search);
      setSearchParams({}); // Clear the query string
      navigate("/home", { replace: true });
      // Scroll to the results section if there's a valid query
    } else {
      setSearchParams({ keyword: search }); // Update the URL query param
      navigate("/home?keyword=" + search, { replace: true });
      // searchResultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (search) setSearchParam();
  }, [search]);

  return (
    <form onSubmit={handleSearch}>
      <input
        className="form-control ms-2"
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          console.log(e.target.value);
          navigate("/home", { replace: true });
          searchResultRef.current.scrollIntoView({ behavior: "smooth" });
        }} // Capture input changes
        aria-label="Search"
      />
      {/* <button type="submit">Search</button> */}
    </form>
  );
};

export default SearchComponent;
