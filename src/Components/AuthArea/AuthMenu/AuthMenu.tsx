import { NavLink, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import "./AuthMenu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../Stores/AuthState";
import authService from "../../../Services/AuthService";

function AuthMenu(): JSX.Element {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    setToken(authStore.getState().token);
    const unsubscribe = authStore.subscribe(() => {
      setToken(authStore.getState().token);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function logout() {
    authService
      .logout()
      .then(() => {
        navigate("/login");
      })
      .catch();
  }

  return (
    <div className="AuthMenu">
      {(!token && (
        <>
          <NavLink to={"/login"}>
            <button className="button">Login</button>
          </NavLink>
        </>
      )) || (
        <>
          <button className="button" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
