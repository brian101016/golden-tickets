import styled, { css } from "styled-components";
import { parseCSS, parseDate, useRefresh } from "scripts/FunctionsBundle";
import { useLoaderData } from "react-router";
import { Ticket } from "@utils/ClassTypes";
import { Link } from "react-router-dom";
import Modal from "@components/Modal";
import { useState } from "react";
import { GS } from "App";
import LoginScreen from "./LoginScreen";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// AdminScreen => Rename all instances to use (CTRL + SHIFT + L)
type AdminScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _AdminScreen = (props: AdminScreenProps) => {
  /** `Ticket[]` - Todos los tickets de la BD. */
  const data = useLoaderData() as Ticket[];
  const [tick, setTick] = useState<Ticket | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [refresh, volkey] = useRefresh();

  // ---------------------------------------------------------------------- HANDLER FUNCTIONS
  function handleEdit(ticket: Ticket) {
    setTick(structuredClone(ticket));
    refresh();
  }

  function handleDelete(ticket: Ticket) {
    setIsDelete(true);
    handleEdit(ticket);
  }

  function handleModalClose() {
    setTick(null);
    setIsDelete(false);
    refresh();
  }

  // ---------------------------------------------------------------------- HANDLE LOGIN SCREEN
  if (!GS.isAdmin || !data) return <LoginScreen />;

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " screen"}>
      <h1>Admin page</h1>

      <Modal
        key={volkey}
        _item={tick}
        _isDelete={isDelete}
        _onClose={handleModalClose}
      />

      <div className="tickets-container">
        {data.map((tic, index) => {
          return (
            <div className="family-container" key={index}>
              <div className="family-header">
                <h2>Familia {tic.family}</h2>
                <button className="secondary" onClick={() => handleEdit(tic)}>
                  Editar
                </button>
                <button className="danger" onClick={() => handleDelete(tic)}>
                  Eliminar
                </button>
              </div>
              <p>
                Copiar enlace:{" "}
                <Link to={`/tickets/${tic.id}`} target="_blank">
                  {tic.id}
                </Link>{" "}
                (Visto por última vez:{" "}
                <b>
                  {tic.lastSeen ? parseDate(tic.lastSeen, true, false) : "N/A"}
                </b>
                )
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Confirmado?</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {tic.members &&
                    tic.members.map((memb, i) => (
                      <tr key={i}>
                        <td>{memb.name}</td>
                        <td className="cent">{memb.accepted ? "Si" : "No"}</td>
                        <td className="cent">
                          {memb.acceptedDate
                            ? parseDate(memb.acceptedDate, true, false)
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const AdminScreen = styled(_AdminScreen).attrs(
  (props: AdminScreenProps): AdminScreenProps => {
    return { ...props };
  }
)<AdminScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.

    .tickets-container {
      margin: var(--margin-big);
    }

    .family-container {
      border: 2px solid black;
      margin-top: 1.25rem;
      padding-top: 1.25rem;
    }

    .family-container:nth-child(2) {
      background-color: var(--color-shadow-semilight);
    }

    .family-header {
      display: flex;
      flex-direction: row;

      h2 {
        margin: 0;
        width: auto;
        flex-grow: 1;
      }
    }

    table {
      width: 100%;
      margin-top: 1rem;

      th {
        border-bottom: 1px solid black;
      }

      .cent {
        text-align: center;
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default AdminScreen;
// #endregion
