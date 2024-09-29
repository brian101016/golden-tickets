import AlertMessage from "@components/AlertMessage";
import { auth, GS } from "App";
import { Outlet, useLocation, useNavigate, useNavigation } from "react-router";
import NotFoundScreen from "./NotFoundScreen";
import { NavLink } from "react-router-dom";
import { useCallback } from "react";
import { useRefresh } from "scripts/FunctionsBundle";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// HomeScreen => Rename all instances to use (CTRL + SHIFT + L)
type HomeScreenProps = {
  isNotFound?: boolean;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const HomeScreen = (props: HomeScreenProps) => {
  const [refresh] = useRefresh();
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  // ---------------------------------------------------------------------- TRIGGER FUNCTION
  const retriggerLoaders = useCallback(
    () => navigate(location.pathname, { replace: true }),
    [navigate, location]
  );

  // ---------------------------------------------------------------------- GLOBAL STATE
  GS.refresh = () => {
    GS.firstTime = false;
    retriggerLoaders();
    refresh();
    console.log("REFRESH-ED HOME");
  };

  console.log("RENDER HOME");

  // ---------------------------------------------------------------------- RETURN
  return (
    <>
      <AlertMessage />

      {props.isNotFound ? (
        <NotFoundScreen />
      ) : (
        <>
          {GS.isAdmin && auth.currentUser && (
            <div className="admin-bubble">
              {location.pathname === "/admin" ? (
                <NavLink className="as-button login" to="/">
                  Ver página principal
                </NavLink>
              ) : (
                <NavLink className="as-button login" to="/admin">
                  Ir a la página de administrador
                </NavLink>
              )}
            </div>
          )}

          {location.pathname !== "/" && GS.firstTime ? (
            <div className="spinner">Bienvenido</div>
          ) : (
            <Outlet />
          )}
        </>
      )}

      {navigation.state === "loading" ? (
        <div className="spinner">Cargando...</div>
      ) : navigation.state === "submitting" ? (
        <div className="spinner">Enviando...</div>
      ) : (
        <></>
      )}
    </>
  );
};
// #endregion

// #region ##################################################################################### EXPORTS
export default HomeScreen;
// #endregion
