import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import { useEffect, useState } from "react";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// SecretMessage => Rename all instances to use (CTRL + SHIFT + L)
type SecretMessageProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _SecretMessage = (props: SecretMessageProps) => {
  const [open, setOpen] = useState(true);
  const [enableButton, setEnableButton] = useState(false);

  function handleClose() {
    setOpen(false);
    setEnableButton(false);
  }

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("stuck");
      const timeout = setTimeout(() => setEnableButton(true), 3000);
      return () => clearTimeout(timeout);
    }
    document.documentElement.classList.remove("stuck");
  }, [open]);

  // ---------------------------------------------------------------------- RETURN
  return (
    <div
      className={props.className + " modal-container " + (open ? "" : "hidden")}
    >
      <div className="modal">
        <h3 className="secret-title">
          ¡Shhh! <br />
          <span className="to-shrink">¡Es una sorpresa!</span>
        </h3>

        <p className="secret-body">
          <span>
            Esta invitación es estrictamente confidencial. <br />
            <b>¡No reveles nada a Yolanda & Javier!</b>
          </span>

          <span>
            Tu discreción es fundamental para que esta sorpresa sea inolvidable.
          </span>

          <span>¡Muchas gracias por tu colaboración!</span>
        </p>

        <button
          className="secret-confirm input important success"
          disabled={!enableButton}
          onClick={handleClose}
        >
          Guardaré el secreto
        </button>
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const SecretMessage = styled(_SecretMessage).attrs(
  (props: SecretMessageProps): SecretMessageProps => {
    return { ...props };
  }
)<SecretMessageProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    backdrop-filter: blur(10px);

    .secret-title {
      font-family: var(--font-raleway);
      color: var(--color-palette-blue-royal);
      padding: 0;
      margin: 0;
      white-space: nowrap;
    }

    .secret-body {
      text-align: justify;
      margin: var(--margin-subtitle);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      font-size: 1.15rem;

      > span {
        text-align: center;
        display: block;
      }
    }

    .secret-confirm {
      width: 100%;
      margin: 0;
    }

    @media screen and (max-width: 400px) {
      .to-shrink {
        font-size: 2.15rem;
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default SecretMessage;
// #endregion

/*
  formal: {
    title: "Te invitamos a celebrar con nosotros un evento muy especial.",
    body: "Por favor, considera esta invitación como estrictamente confidencial para garantizar una sorpresa inolvidable. ¡Agradecemos tu colaboración!",
    button: "Guardaré el secreto",
  },
  note: {
    title: "¡IMPORTANTE!",
    body: "Por favor, mantén esta invitación en secreto. No queremos arruinar la fiesta. ¡Gracias por tu ayuda!",
    button: "Guardaré el secreto",
  },
*/
