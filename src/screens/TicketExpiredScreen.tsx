import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import BackgroundScreen from "./BackgroundScreen";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IP from "@utils/ImageProvider";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// TicketExpiredScreen => Rename all instances to use (CTRL + SHIFT + L)
type TicketExpiredScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _TicketExpiredScreen = (props: TicketExpiredScreenProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <>
      <BackgroundScreen />

      <div className={props.className + " vertical-screen"}>
        <Helmet>
          <title>Ticket expirado | Golden Tickets</title>
        </Helmet>

        <h2>Este evento ya ha expirado.</h2>

        <h3>¡Gracias por confiar en Golden Tickets!</h3>

        <img
          src={IP.shape.party_ended}
          alt="Expired Ticket"
          className="img-not-found"
        />

        <Link to="/" className="as-button login">
          Volver al inicio
        </Link>
      </div>
    </>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const TicketExpiredScreen = styled(_TicketExpiredScreen).attrs(
  (props: TicketExpiredScreenProps): TicketExpiredScreenProps => {
    return { ...props };
  }
)<TicketExpiredScreenProps>`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2,
    h3 {
      margin-top: 0;
      margin-bottom: 0;
    }

    .img-not-found {
      width: 240px;
      border-radius: 50%;
      display: block;
      margin: 0 auto;
    }

    .as-button {
      margin-top: 1rem;
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default TicketExpiredScreen;
// #endregion
