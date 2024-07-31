import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import { useLoaderData } from "react-router";
import { Ticket } from "@utils/ClassTypes";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// TicketScreen => Rename all instances to use (CTRL + SHIFT + L)
type TicketScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _TicketScreen = (props: TicketScreenProps) => {
  const tic = useLoaderData() as Ticket;

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <h2>See ticket:</h2>
      <p>Familia {tic.family}</p>
      <p>ID {tic.id}</p>
      <p>
        Miembros:
        <ul>
          {tic.members &&
            tic.members.map((memb, i) => (
              <li key={i}>
                {memb.name} =&gt; {memb.accepted}{" "}
                {memb.acceptedDate?.toISOString()}
              </li>
            ))}
        </ul>
      </p>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const TicketScreen = styled(_TicketScreen).attrs(
  (props: TicketScreenProps): TicketScreenProps => {
    return { ...props };
  }
)<TicketScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default TicketScreen;
// #endregion
