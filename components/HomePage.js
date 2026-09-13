import React from "react";
import Nav from "./Nav";
import MainBody from "./MainBody";

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-[url('/picture.jpg')]"
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-base-200/90" aria-hidden="true" />
      <div className="relative">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <MainBody />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
