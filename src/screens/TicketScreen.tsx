import styled, { css } from "styled-components";
import { parseCSS, parseDate, useRefresh } from "scripts/FunctionsBundle";
import { useLoaderData, useNavigation } from "react-router";
import { Ticket } from "@utils/ClassTypes";
import Input from "@components/Input";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { GS } from "App";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// TicketScreen => Rename all instances to use (CTRL + SHIFT + L)
type TicketScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _TicketScreen = (props: TicketScreenProps) => {
  const tic = useLoaderData() as Ticket;
  const [refresh, volkey] = useRefresh();
  const [LS, setLS] = useState(new Ticket());
  const navi = useNavigation();

  // ---------------------------------------------------------------------- HANDLERS
  // ============================== HANDLE SELECT ALL

  function handleSelectAll() {
    if (navi.state !== "idle") return;
    LS.members.forEach((mm) => (mm.accepted = true));
    refresh();
  }

  // ============================== HANDLE SUBMIT
  function handleSubmit() {
    if (navi.state !== "idle") return;

    GS.cache = {
      ticket: LS,
    };
  }

  // ============================== SYNC TIC
  useEffect(() => {
    setLS(structuredClone(tic) as Ticket);
  }, [tic]);

  // ============================== SHORTCUT
  const loading = navi.state !== "idle";

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " screen"}>
      <h1>Ticket de Oro</h1>
      <h2>Familia {tic.family}</h2>
      <h6>{tic.id}</h6>

      <Form onSubmit={handleSubmit} method="POST">
        <h3>Invitados:</h3>
        <table>
          <tbody>
            {tic.members?.length && LS.members.length ? (
              tic.members.map((memb, i) => (
                <tr key={volkey + "-" + i}>
                  <td className="as-label">{memb.name}</td>

                  <td>
                    <Input
                      _store={memb.accepted ? { ...memb } : LS.members[i]}
                      _store_var={"accepted"}
                      _type="checkbox"
                      _label=""
                      _disabled={loading || memb.accepted}
                    />
                  </td>

                  <td>
                    {memb.acceptedDate && (
                      <i>
                        Confirmado el{" "}
                        <b>{parseDate(memb.acceptedDate, true, false)}</b>
                      </i>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <b>No hay invitados!</b>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button type="button" onClick={handleSelectAll} disabled={loading}>
          Seleccionar todos
        </button>
        <button className="login" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </Form>
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
