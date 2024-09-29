import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import IP from "utils/ImageProvider";
import { useState } from "react";
import Input from "@components/Input";
import { LogIn, LogOut, auth } from "App";
import {
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { Link } from "react-router-dom";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// LoginScreen => Rename all instances to use (CTRL + SHIFT + L)
type LoginScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _LoginScreen = (props: LoginScreenProps) => {
  const [passInput, setPassInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [LS] = useState({ email: "", pass: "", savePass: true });

  const visiblePass = () => setPassInput(!passInput);

  // ---------------------------------------------------------------------- HANDLE LOG IN
  async function handleLogin(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (LS.savePass) auth.setPersistence(browserLocalPersistence);
    else auth.setPersistence(browserSessionPersistence);

    await LogIn(LS.email, LS.pass);
    setLoading(false);
  }

  // ---------------------------------------------------------------------- HANDLE LOG OUT
  async function handleLogout() {
    if (loading) return;
    setLoading(true);

    await LogOut();
    setLoading(false);
  }

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " screen"}>
      {loading && <div className="spinner">Cargando...</div>}

      <div className="floating-controls">
        <Link to={"/"} className="as-button warning">
          {"< Volver al inicio"}
        </Link>
      </div>

      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Iniciar sesión</legend>

          <Input
            _store={LS}
            _store_var={"email"}
            _preset={"email"}
            _label={"Usuario"}
            _width={"l"}
            _withWrapper={false}
          />

          <Input
            _store={LS}
            _store_var={"pass"}
            _type={passInput ? "text" : "password"}
            _label="Contraseña"
            _required={"*"}
            _width={"m"}
          >
            <button type="button" onClick={visiblePass} className="eye">
              <img
                src={passInput ? IP.icon.eye_off : IP.icon.eye_on}
                alt={passInput ? "Mostrar contraseña" : "Ocultar contraseña"}
                width="27.5px"
                height="27.5px"
              />
            </button>
          </Input>

          <Input
            _store={LS}
            _store_var={"savePass"}
            _type="checkbox"
            _label="Recordar mi constraseña"
            _withWrapper={false}
          />

          <button className="login">Iniciar sesión</button>

          {auth.currentUser && (
            <button onClick={handleLogout} className="danger">
              Cerrar sesión "{auth.currentUser.displayName}"
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const LoginScreen = styled(_LoginScreen).attrs(
  (props: LoginScreenProps): LoginScreenProps => {
    return { ...props };
  }
)<LoginScreenProps>`
  ${(props) => css`
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${IP.bg.petals});

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
      display: flex;
      background-image: url(${IP.bg.granular});
      background-size: cover;
      border-radius: 1rem;
      box-shadow: 0px 4px 10px #0008;
    }

    .wrapper {
      display: flex;
      gap: 0.5rem;
    }

    legend {
      width: auto;
      text-align: center;
      font-weight: 700;
      font-family: var(--font-cinzel);
      letter-spacing: normal;
    }

    .eye {
      width: 27.5px;
      height: 27.5px;
      margin: unset;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LoginScreen;
// #endregion
