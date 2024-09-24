import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import Input from "@components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className={props.className + " screen"}>
      <h2>
        Ingrese el código de su ticket <br />
        para ver más información
      </h2>

      <form className="controls-wrapper" onSubmit={handleSubmit}>
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
      </form>
    </div>
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

    .controls-wrapper {
      display: flex;
      flex-direction: column;
      margin: var(--margin-section);
      align-items: stretch;
      width: min-content;
      gap: 2rem;

      > button {
        font-size: var(--size-thirdtitle);
        font-family: var(--font-poppins);
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LandingScreen;
// #endregion
