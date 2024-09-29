import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import { useEffect, useMemo, useState } from "react";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// CopyLink => Rename all instances to use (CTRL + SHIFT + L)
type CopyLinkProps = {
  _ticketid: string;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _CopyLink = (props: CopyLinkProps) => {
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");

  function handleClick() {
    setStatus((p) => p + 1);
  }

  const copyURL = useMemo(
    () => window.location.origin + "/tickets/" + props._ticketid,
    [props._ticketid]
  );

  useEffect(() => {
    if (status > 0) {
      navigator.clipboard
        .writeText(copyURL)
        .then(() => setMessage("Copiado!"))
        .catch(() => setMessage("Ha ocurrido un error!"));

      const tim = setTimeout(() => {
        setStatus(0);
        setMessage("");
      }, 3000);
      return () => clearTimeout(tim);
    }
  }, [status, copyURL]);

  // ---------------------------------------------------------------------- RETURN
  return (
    <button className={props.className} onClick={handleClick} title={copyURL}>
      {message || "Copiar enlace"}
    </button>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const CopyLink = styled(_CopyLink).attrs(
  (props: CopyLinkProps): CopyLinkProps => {
    return { ...props };
  }
)<CopyLinkProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default CopyLink;
// #endregion
