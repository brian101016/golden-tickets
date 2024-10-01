import styled, { css } from "styled-components";
import { parseCSS, useRefresh } from "scripts/FunctionsBundle";
import { useLoaderData } from "react-router";
import { Ticket } from "@utils/ClassTypes";
import Modal from "@components/Modal";
import { useState } from "react";
import { GS } from "App";
import LoginScreen from "./LoginScreen";
import ShowTable from "@components/ShowTable";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>Administrador | Golden Tickets</title>
      </Helmet>

      <h1>Admin page</h1>

      <Modal
        key={volkey}
        _item={tick}
        _isDelete={isDelete}
        _onClose={handleModalClose}
      />

      <ShowTable
        _data={data}
        _handleEdit={handleEdit}
        _handleDelete={handleDelete}
      />
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
