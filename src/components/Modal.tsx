import styled, { css } from "styled-components";
import { parseCSS, useRefresh } from "scripts/FunctionsBundle";
import { useCallback, useEffect, useState } from "react";
import IP from "@utils/ImageProvider";
import { FSAction, GS } from "App";
import { Member, Ticket } from "@utils/ClassTypes";
import Input from "./Input";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// Modal => Rename all instances to use (CTRL + SHIFT + L)
export type ModalProps = {
  _item: Ticket | null;
  _action: "delete" | "edit" | null;
  _onClose?: () => void;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _Modal = (props: ModalProps) => {
  // ---------------------------------------------------------------------- HOOKS
  const [loading, setLoading] = useState("");
  const [refresh, volkey] = useRefresh();
  const [LS, setLS] = useState<Ticket>(new Ticket());
  const [open, setOpen] = useState(!!props._item);

  // ---------------------------------------------------------------------- FUNCTION HANDLERS
  function handleClose() {
    setLS(new Ticket());
    setOpen(false);
    props._onClose?.();
  }

  const handleOpen = useCallback(() => {
    setLS(props._item || new Ticket());
    setOpen(true);
  }, [props._item]);

  // ---------------------------------------------------------------------- HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("Guardando...");
    let success: object | null = null;

    if (props._action === "delete") {
      success = await FSAction("delete", LS.id || "error", {});
    } else if (props._action === "edit") {
      success = await FSAction("update", LS.id || "error", LS);
    } else {
      success = await FSAction("add", "n/a", LS);
    }

    if (success) {
      GS.setAlert({
        _message: "Se han guardado los cambios!",
        _type: "success",
      });

      handleClose();
    }

    setLoading("");
  };

  useEffect(() => {
    if (props._item) handleOpen();
  }, [handleOpen, props._item]);

  // ---------------------------------------------------------------------- RETURN
  return (
    <>
      {/* -------------------------------------------------- OPEN BUTTON */}
      {loading && <div className="spinner">{loading}</div>}

      <button
        className="success"
        disabled={open || !!loading}
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
                {props._action === "delete"
                  ? "Eliminar"
                  : props._action === "edit"
                  ? "Editar"
                  : "Nuevo"}{" "}
                Ticket
              </h3>
              <button
                className="exit"
                onClick={handleClose}
                disabled={!!loading}
              >
                <img src={IP.icon.close} alt="close button" />
              </button>
            </div>

            {/* ============================== INPUTS */}
            <form onSubmit={handleSubmit}>
              <Input
                _store={LS}
                _store_var="family"
                _label="Familia"
                _preset="name"
                _disabled={props._action === "delete"}
              />

              <div className="crud-container">
                <table className={props._action === "delete" ? "disabled" : ""}>
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
                            _disabled={props._action === "delete"}
                          />
                        </td>
                        <td>
                          <Input
                            _store={LS.members[ind]}
                            _store_var={"accepted"}
                            _type="checkbox"
                            _label=""
                            _disabled={props._action === "delete"}
                          />
                        </td>
                        <td>
                          <button
                            className="danger"
                            onClick={() => {
                              LS.members.splice(ind, 1);
                              refresh();
                            }}
                            disabled={props._action === "delete"}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {props._action !== "delete" && (
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
                  onClick={handleClose}
                  disabled={!!loading}
                >
                  <img src={IP.icon.eye_on} alt="previous" />
                  Regresar
                </button>

                <button className="login" disabled={!!loading}>
                  {loading ? "Enviando..." : "Confirmar"}
                </button>
              </div>
            </form>
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
