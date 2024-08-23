import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import pages
import Header from "../components/header";
import Home from "../pages/home";
import Footer from "../components/footer";
import ResetPasswordPage from "../pages/password-reset";

function Navigation(): React.JSX.Element {
  return (
    <>
      <Router>
          <Header></Header>
        <div className="py-3" />
        <Routes>
        <Route path="/" Component={Home} />
        <Route path="/password-reset" Component={ResetPasswordPage} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default Navigation;
