import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { LogOut } from "App";
import { Link } from "react-router-dom";
import IP from "utils/ImageProvider";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// NavBar => Rename all instances to use (CTRL + SHIFT + L)
type NavBarProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _NavBar = (props: NavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ifLogged, setIfLogged] = useState(false);

  useEffect(() => {
    setIfLogged(!location.pathname.startsWith("/login"));
  }, [location]);

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " navbar " + (ifLogged ? "" : "hidden")}>
      <Link to="/">Home</Link>

      <Link to="/admin">Admin</Link>

      <Link to="/login">Login</Link>

      {ifLogged && (
        <>
          <button
            onClick={async () => {
              await LogOut(true);
              navigate("/login");
            }}
            className="logout button"
          >
            Cerrar sesión
          </button>

          <button
            onClick={async () => {
              await LogOut(true);
              navigate("/login");
            }}
            className="logout logout-resp bg-img"
          ></button>
        </>
      )}
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const NavBar = styled(_NavBar).attrs((props: NavBarProps): NavBarProps => {
  return { ...props };
})<NavBarProps>`
  ${(props) => css`
    .logo {
      background-image: url(${IP.shape.ring_empty});
    }

    .logout-resp {
      background-image: url(${IP.icon.close});
    }

    .logout {
      white-space: pre;
      &.logout-resp {
        aspect-ratio: 1 / 1;
      }
    }

    .breadcrumbs {
      position: absolute;
      top: 100%;
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default NavBar;
// #endregion
