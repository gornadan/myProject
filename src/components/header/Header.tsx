import { NavLink } from "react-router-dom";
import { PATH } from "../routes/Routes";
import s from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "../../bll/store";
import { logOutTC } from "../../bll/authReducer";

function Header() {
  const isLogined = useSelector<AppStoreType, boolean>((state) => state.login.isLogined);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOutTC());
  };

  return (
    <div className={s.menuWrapper}>
      <nav className={s.containerMenuLinks}>
        {isLogined ? (
          <button className={s.link} onClick={logoutHandler}>
            logout
          </button>
        ) : (
          <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.activeLink}>
            login
          </NavLink>
        )}
        <NavLink to={PATH.REGISTRED} className={s.link} activeClassName={s.activeLink}>
          registred
        </NavLink>
        <NavLink to={PATH.FORGOT} className={s.link} activeClassName={s.activeLink}>
          forgot
        </NavLink>
        <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.activeLink}>
          profile
        </NavLink>
        <NavLink to={PATH.PACKS} className={s.link} activeClassName={s.activeLink}>
          packs
        </NavLink>
        {/* <NavLink to={PATH.CARDS} className={s.link} activeClassName={s.activeLink}>
          cards
        </NavLink> */}
        {/* <NavLink to={PATH.TESTING} className={s.link}>
          testing
        </NavLink>
        <NavLink to={PATH.PASSWORD_RECOVERY} className={s.link}>
          password-recovery
        </NavLink> */}
        {/*<NavLink to={PATH.ENTERING_NEW_PASSWORD} className={s.link} activeClassName={s.activeLink}>*/}
        {/*  entering-new-password*/}
        {/*</NavLink>*/}
      </nav>
    </div>
  );
}

export default Header;
