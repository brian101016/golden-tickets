import styled, { css } from "styled-components";
import { parseCSS, useRefresh } from "scripts/FunctionsBundle";
import { useLoaderData } from "react-router";
import { Ticket } from "@utils/ClassTypes";
import { Link } from "react-router-dom";
import Modal from "@components/Modal";
import { useState } from "react";

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
  const [action, setAction] = useState<"delete" | "edit" | null>(null);
  const [refresh, volkey] = useRefresh();

  // ---------------------------------------------------------------------- HANDLER FUNCTIONS
  function handleEdit(ticket: Ticket) {
    if (action !== "edit") {
      setTick(structuredClone(ticket));
      setAction("edit");
    }
  }

  function handleDelete(ticket: Ticket) {
    if (action !== "delete") {
      setTick(structuredClone(ticket));
      setAction("delete");
    }
  }

  function handleModalClose() {
    setTick(null);
    setAction(null);
    refresh();
  }

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " screen"}>
      <h1>Admin page</h1>

      <Modal
        key={volkey}
        _item={tick}
        _action={action}
        _onClose={handleModalClose}
      />

      <div className="tickets-container">
        {data &&
          data.map((tic, index) => {
            return (
              <div key={index}>
                <h2>Familia {tic.family}</h2>
                <button className="secondary" onClick={() => handleEdit(tic)}>
                  Editar
                </button>
                <button className="danger" onClick={() => handleDelete(tic)}>
                  Eliminar
                </button>
                <p>
                  URL: <Link to={`/tickets/${tic.id}`}>{tic.id}</Link>
                </p>
                <p>
                  Visto por ultima vez: {tic.lastSeen?.toISOString() || "N/A"}
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
                          <td>{memb.accepted ? "Si" : "No"}</td>
                          <td>{memb.acceptedDate?.toISOString() || "N/A"}</td>
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
    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default AdminScreen;
// #endregion
