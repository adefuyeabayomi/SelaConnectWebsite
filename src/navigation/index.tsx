import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import pages
import Header from "../components/header";
import Home from "../pages/home";
import Footer from "../components/footer";

function Navigation(): React.JSX.Element {
  return (
    <>
      <Router>
          <Header></Header>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default Navigation;
