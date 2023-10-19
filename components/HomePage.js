import React from "react";
import Nav from "./Nav";
import MainBody from "./MainBody";

const HomePage = () => {
  return (
    <div className="bg-blue-300 bg-[url('/picture.jpg')]">
      <Nav />
      <MainBody />
    </div>
  );
};

export default HomePage;
