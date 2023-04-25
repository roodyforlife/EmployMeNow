import Login from "./pages/Login";
import RegistCompany from "./pages/RegistCompany";
import MainPage from "./pages/MainPage";
import Admin from "./pages/Admin";
import { LOGIN_ROUTE, REGIST_COMPANY_ROUTE, DEFAULT_ROUTE, MAIN_ROUTE, ADMIN_ROUTE, ADMIN_COMPANIES_ROUTE, ADMIN_WORKERS_ROUTE, ADMIN_SKILLS_ROUTE, MY_COMPANY, GOOGLE_REGIST_COMPANY_ROUTE, MY_COMPANY_JOB } from "./utils/consts";
import { Navigate } from "react-router-dom";
import AdminCompanies from "./pages/AdminCompanies";
import AdminWorkers from "./pages/AdminWorkers";
import AdminSkills from "./pages/AdminSkills";
import MyCompany from "./pages/MyCompany";
import Job from "./pages/Job";
import GoogleRegistCompany from "./pages/GoogleRegistCompany";

export const authRoutes = [
    {path: ADMIN_ROUTE, component: <Admin />, role: ["Admin"]},
    {path: ADMIN_COMPANIES_ROUTE, component: <AdminCompanies />, role: ["Admin"]},
    {path: ADMIN_WORKERS_ROUTE, component: <AdminWorkers />, role: ["Admin"]},
    {path: ADMIN_SKILLS_ROUTE, component: <AdminSkills />, role: ["Admin"]},
    {path: MY_COMPANY, component: <MyCompany />, role: ["Company"]},
    {path: MY_COMPANY_JOB, component: <Job />, role: ["Company"]},
];

export const publicRoutes = [
    { path: LOGIN_ROUTE, component: <Login /> },
    { path: MAIN_ROUTE, component: <MainPage /> },
    { path: REGIST_COMPANY_ROUTE, component: <RegistCompany /> },
    { path: GOOGLE_REGIST_COMPANY_ROUTE, component: <GoogleRegistCompany /> },
    { path: DEFAULT_ROUTE, component: <Navigate to={MAIN_ROUTE}/> }
];