import styled, { css } from "styled-components";
import { parseCSS, useRefresh } from "scripts/FunctionsBundle";
import { useState } from "react";
import IP from "@utils/ImageProvider";
import { GS } from "App";
import { Member, Ticket } from "@utils/ClassTypes";
import Input from "./Input";
import { Form, useNavigation } from "react-router-dom";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// Modal => Rename all instances to use (CTRL + SHIFT + L)
export type ModalProps = {
  _item: Ticket | null;
  _isDelete?: boolean;
  _onClose?: () => void;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _Modal = (props: ModalProps) => {
  // ---------------------------------------------------------------------- HOOKS
  const [refresh, volkey] = useRefresh();
  const [LS, setLS] = useState<Ticket>(props._item || new Ticket());
  const [open, setOpen] = useState(!!props._item);
  const navi = useNavigation();

  // ---------------------------------------------------------------------- FUNCTION HANDLERS
  // ============================== HANDLE OPEN
  function handleOpen() {
    if (navi.state !== "idle") return;
    setLS(props._item || new Ticket());
    setOpen(true);
    refresh();
  }

  // ============================== HANDLE CLOSE
  function handleClose() {
    if (navi.state !== "idle") return;
    setLS(new Ticket());
    setOpen(false);

    if (props._item) props._onClose?.();
  }

  // ---------------------------------------------------------------------- HANDLE SUBMIT
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (navi.state !== "idle") return;

    GS.cache = {
      ticket: LS,
      action: props._isDelete ? "delete" : props._item ? "edit" : "add",
      closeModal: () => handleClose(),
    };
  };

  // ============================== SHORTCUT
  const loading = navi.state !== "idle";

  // ---------------------------------------------------------------------- RETURN
  return (
    <>
      {/* -------------------------------------------------- OPEN BUTTON */}
      <button
        className="success"
        disabled={open || loading}
        onClick={handleOpen}
      >
        {loading ? "Cargando..." : "Crear nuevo ticket"}
      </button>

      {/* -------------------------------------------------- MODAL CONTAINER */}
      {open && (
        <div className={props.className + " modal-container"}>
          {/* -------------------------------------------------- MODAL */}
          <div className="modal">
            {/* ============================== TITLE */}
            <div className="modal-title">
              <h3>
                {props._isDelete
                  ? "Eliminar"
                  : props._item
                  ? "Editar"
                  : "Nuevo"}{" "}
                Ticket
              </h3>
              <button
                className="exit"
                onClick={() => handleClose()}
                disabled={loading}
              >
                <img src={IP.icon.close} alt="close button" />
              </button>
            </div>

            {/* ============================== INPUTS */}
            <Form onSubmit={handleSubmit} method="POST">
              <Input
                _store={LS}
                _store_var="family"
                _label="Familia"
                _preset="name"
                _disabled={props._isDelete}
              />

              <div className="crud-container">
                <table className={props._isDelete ? "disabled" : ""}>
                  <thead>
                    <tr>
                      <th>Invitado</th>
                      <th>Aceptado?</th>
                      <th>Controles</th>
                    </tr>
                  </thead>
                  <tbody key={volkey}>
                    {LS.members.map((memb, ind) => (
                      <tr key={ind}>
                        <td>
                          <Input
                            _store={LS.members[ind]}
                            _store_var={"name"}
                            _preset="name"
                            _label=""
                            _disabled={props._isDelete}
                          />
                        </td>
                        <td>
                          <Input
                            _store={LS.members[ind]}
                            _store_var={"accepted"}
                            _type="checkbox"
                            _label=""
                            _disabled={props._isDelete}
                          />
                        </td>
                        <td>
                          <button
                            className="danger"
                            onClick={() => {
                              LS.members.splice(ind, 1);
                              refresh();
                            }}
                            disabled={props._isDelete}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!props._isDelete && (
                  <button
                    onClick={() => {
                      LS.members.push(new Member());
                      refresh();
                    }}
                  >
                    Crear nuevo
                  </button>
                )}
              </div>

              {/* ============================== MODAL CONTROLS */}
              <div className="modal-controls">
                <button
                  className="back"
                  onClick={() => handleClose()}
                  disabled={loading}
                >
                  <img src={IP.icon.eye_on} alt="previous" />
                  Regresar
                </button>

                <button className="login" disabled={loading}>
                  {loading ? "Enviando..." : "Confirmar"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const Modal = styled(_Modal).attrs((props: ModalProps): ModalProps => {
  return { ...props };
})<ModalProps>`
  ${(props) => css`
    .wrapper.reversed > label {
      font-size: 1rem;
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default Modal;
// #endregion
