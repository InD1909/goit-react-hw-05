import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <header className={s.wrapper}>
      <h1 className={s.logo}>
        <span className={s.logoSpanU}>U</span>
        <span className={s.logoSpanA}>A</span> CINEMA
      </h1>
      <div className={s.li}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
      </div>
      <div className={s.li2}>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </div>
    </header>
  );
};

export default Navigation;

//  <nav>
//    <ul className={s.nav}>
//      <li className={s.li}>
//        <NavLink to="/" className={buildLinkClass}>
//          Home
//        </NavLink>
//      </li>
//      <li className={s.li2}>
//        <NavLink to="/movies" className={buildLinkClass}>
//          Movies
//        </NavLink>
//      </li>
//    </ul>
//  </nav>;
