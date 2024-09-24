import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import IP from "utils/ImageProvider";
import { useState } from "react";
import Input from "@components/Input";
import { GS, LogIn, LogOut, auth } from "App";
import {
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

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

  if (auth.currentUser && !GS.isAdmin) {
    GS.setAlert({
      _message: "Acceso denegado.",
      _type: "error",
    });
  }

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

      <form className="login-container" onSubmit={handleLogin}>
        <Input
          _store={LS}
          _placeholder="Usuario"
          _store_var={"email"}
          _preset={"email"}
          _label={""}
          _width={"max"}
        />
        <div className="pass-container">
          <Input
            _store={LS}
            _placeholder="Contraseña"
            _store_var={"pass"}
            _type={passInput ? "text" : "password"}
            _label=""
            _required="*"
            _width={"max"}
            _className="pass"
          />
          <button type="button" onClick={visiblePass} className="eye">
            <img
              src={passInput ? IP.icon.eye_off : IP.icon.eye_on}
              alt={passInput ? "Mostrar contraseña" : "Ocultar contraseña"}
              width="27.5px"
              height="27.5px"
            />
          </button>
        </div>
        <div className="save-pass-container">
          <Input
            _store={LS}
            _store_var={"savePass"}
            _type="checkbox"
            _label="Recordar mi constraseña"
            _className="checkbox"
          />
        </div>
        <button className="input login">Iniciar sesión</button>
      </form>

      {auth.currentUser && (
        <button onClick={handleLogout}>
          Cerrar sesión "{auth.currentUser.displayName}"
        </button>
      )}
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
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${IP.bg.petals});

    // Ingresa aquí todos los estilos.
    .login-container {
      display: flex;
      justify-content: baseline;
      padding: 4.25rem 3.2rem 4.25rem 3.2rem;
      gap: 2rem;
      flex-direction: column;
      background-color: white;
      width: 31.375rem;
      height: 33.25rem;
      border-radius: 2.6875rem;
      background: rgba(255, 255, 255, 0.78);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .pass-container {
      display: flex;
      border-bottom: #814603 solid 3px;

      .wrapper {
        display: flex;
        width: 90%;
        margin: 0;

        .pass {
          margin: unset;
          border: none;
          width: 100%;
        }
      }

      &:hover,
      &:invalid,
      &:focus,
      &:focus-visible,
      &:focus-within {
        border-color: #da1919;
        box-shadow: none;
      }
    }

    .save-pass-container {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    .img {
      border-radius: 1.875rem;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .input:not(.checkbox) {
      border-radius: 0;
      border: none;
      background-color: transparent;
      border-bottom: #814603 solid 3px;
      font-size: 1rem;

      &.login {
        width: 12rem;
        background-color: #814603;
        margin: 0;
        border: none;
      }

      &:hover,
      &:invalid,
      &:focus,
      &:focus-visible,
      &:focus-within {
        border-color: #da1919;
        box-shadow: none;
      }
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

    .label {
      display: flex;
      margin: 0 5rem 1rem 5rem;
      text-align: left;
    }

    // ---------------------------------------------------------------------- MEDIA QUERY
    @media screen and (max-width: 890px) {
      .login-container {
        padding: 4.25rem 3.2rem 4.25rem 3.2rem;
        gap: 2rem;
        width: 30rem;
        height: 29rem;
      }
    }

    @media screen and (max-width: 750px) {
      .login-container {
        padding: 4.25rem 3.2rem 4.25rem 3.2rem;
        gap: 2rem;
        width: 26rem;
        height: 28rem;
      }
    }

    @media screen and (max-width: 680px) {
      .login-container {
        padding: 4.25rem 3.2rem 4.25rem 3.2rem;
        gap: 2rem;
        width: 23rem;
        height: 27.25rem;
      }
    }

    @media screen and (max-width: 590px) {
      .login-container {
        padding: 2.35rem 3.2rem 4.25rem 3.2rem;
        gap: 2rem;
        width: 20.375rem;
        height: 25.95rem;
      }
      label {
        font-size: 0.8rem;
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LoginScreen;
// #endregion
