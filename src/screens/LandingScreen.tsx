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

  function handleClick() {
    navig("tickets/" + LS.ticketid);
  }

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <p>Ingrese el código de su ticket para ver más información:</p>
      <Input
        _store={LS}
        _store_var="ticketid"
        _label="Código del Ticket"
        _length={[undefined, 32, true]}
        _width={"m"}
      />

      <button className="primary" onClick={handleClick}>
        Buscar
      </button>
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
    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LandingScreen;
// #endregion
