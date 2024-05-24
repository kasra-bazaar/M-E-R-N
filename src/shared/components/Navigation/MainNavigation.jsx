import { Link, Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import Backdrop from "../UIElements/Backdrop";

export default function MainNavigation() {
  const [DrawIsOpen, setDrawIsOpen] = useState(false);
 

  const OpenDrawHandler = () => {
    setDrawIsOpen(true);
  };
  const CloseDrawHandler = () => {
    setDrawIsOpen(false);
  };
  return (
    <>
      {DrawIsOpen && <Backdrop onClick={CloseDrawHandler} />}
      <SideDrawer OnClick={CloseDrawHandler} show={DrawIsOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={OpenDrawHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces </Link>
        </h1>
        <nav className="main-navigation__header-nav ">
          <NavLinks />
        </nav>
      </MainHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
}
