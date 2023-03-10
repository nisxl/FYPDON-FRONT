import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Body from "../components/Layout/Body";
const HomePage = () => {
  let [notes, setNotes] = useState([]);

  return (
    <div>
      <Header />

      <Body />
      <Footer />
    </div>
  );
};

export default HomePage;
