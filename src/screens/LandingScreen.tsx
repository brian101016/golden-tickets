import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import Input from "@components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundScreen from "./BackgroundScreen";
import IP from "@utils/ImageProvider";
import { Helmet } from "react-helmet";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// LandingScreen => Rename all instances to use (CTRL + SHIFT + L)
type LandingScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _LandingScreen = (props: LandingScreenProps) => {
  const [LS] = useState({ ticketid: "" });
  const navig = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    navig("tickets/" + (LS.ticketid.trim() || "unknown"));
  }

  // ---------------------------------------------------------------------- RETURN
  return (
    <>
      <BackgroundScreen />

      <div className={props.className + " vertical-screen"}>
        <Helmet>
          <title>Buscar ticket | Golden Tickets</title>
        </Helmet>

        <h2>
          Ingrese el código de su ticket <br />
          para ver más información
        </h2>

        <form className="controls-wrapper" onSubmit={handleSubmit}>
          <div>
            <Input
              _store={LS}
              _store_var="ticketid"
              _className="important"
              _label=""
              _length={[undefined, 24, true]}
              _required="*"
              _width={"m"}
            />

            <button className="primary">Buscar</button>
          </div>
        </form>
      </div>
    </>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const LandingScreen = styled(_LandingScreen).attrs(
  (props: LandingScreenProps): LandingScreenProps => {
    return { ...props };
  }
)<LandingScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    display: flex;
    flex-direction: column;

    > h2 {
      margin-bottom: 3.5rem;
    }

    .controls-wrapper {
      margin: 0;
      padding-top: 3.5rem;
      width: 100%;
      flex-grow: 1;
      position: relative;
      box-shadow: var(--shadow-updown);

      background-image: url(${IP.bg.flower_doodles});
      background-position: center;
      background-size: cover;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;

        position: relative;
        z-index: 10;

        > button {
          font-size: var(--size-thirdtitle);
          font-family: var(--font-poppins);
        }
      }

      &::before {
        content: "";
        width: 100%;
        height: 100%;
        backdrop-filter: blur(2px);
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LandingScreen;
// #endregion
