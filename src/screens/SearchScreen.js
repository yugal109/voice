import React, { useState, useEffect } from "react";
import "../css/search.css";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button,Avatar } from "@material-ui/core";

import axios from "../axy";
const SearchScreen = () => {
  const token =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo")).token;
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [notfound,setNotFound]=useState(false)
  const handelSearch = (e) => {
      e.preventDefault()
      setNotFound(false)
    axios
      .get(`/search?username=${username}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setResults(response.data);
        response.data.length===0 && setNotFound(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="search-card">
      <form onSubmit={handelSearch} className="search">
        <TextField
          style={{ width: 900 }}
          value={username}
          label="Search"
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
        />
        <Button
          style={{ marginLeft: 10 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Search
        </Button>
      </form>
      <div className="search-results">
        {results?.map((result) => (
            
          <div className="results" key={result._id}>
              <Avatar src={result.image}/>
            <Link
              style={{ color: "white", fontWeight: 800,textDecoration:"none"}}
              to={`/profile/${result._id}`}
            >
              {result.username}
            </Link>
          </div>
        ))}
        {notfound && 
        <div className="notfound">
            <h3>User Not Found.</h3>
        </div>
        
        }
      </div>
    </div>
  );
};
export default SearchScreen;
