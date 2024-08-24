import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User LoggedOut");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      // const url = "http://localhost:8080/products";
      // deployed url of backend
      const url = "https://mern-authentication-api-six.vercel.app/products";

      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} :: {item.price}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
