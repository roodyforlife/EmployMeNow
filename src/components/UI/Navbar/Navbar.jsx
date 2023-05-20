import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../..";
import cl from "./Navbar.module.css";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MY_COMPANY, REGIST_COMPANY_ROUTE} from '../../../utils/consts'
import { observer } from "mobx-react-lite";

 const Navbar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    user.setIsAuth(false)
    user.setUser({});
    localStorage.removeItem('token');
    navigate(LOGIN_ROUTE);
  }
  return (
    <div className={cl.header}>
      <div className={cl.content}>
          {
                user.isAuth ?
                    <div className={cl.block}>
                        <NavLink to={MAIN_ROUTE} className={cl.nav}>EmployMeNow</NavLink>
                        {
                          user.user.role === 'Admin' &&
                          <NavLink to={ADMIN_ROUTE} className={cl.nav}>Admin panel</NavLink>   
                        }
                        {
                          user.user.role === "Company" &&
                          <NavLink to={MY_COMPANY} className={cl.nav}>My company</NavLink>    
                        }
                        <div onClick={logout} className={cl.nav}>Выйти</div>
                    </div>
                :
                <div className={cl.block}>
                <NavLink to={MAIN_ROUTE} className={cl.nav}>EmployMeNow</NavLink>
                    <NavLink to={LOGIN_ROUTE} className={cl.nav}>Login</NavLink>
                    <NavLink to={REGIST_COMPANY_ROUTE} className={cl.nav}>Regist company</NavLink>
                </div>
            }
            <div className={cl.block}>
              {
                user.isAuth &&
                <div className={cl.nav}>Hello, {user.user.email}. Role: {user.user.role}</div>
              }
            </div>
      </div>
    </div>
  );
});

export default Navbar;