import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import { useEffect, useRef, useState } from "react";
import BG_MUSIC from "@theme/SFX/bg/bg-piano.mp3";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// SecretMessage => Rename all instances to use (CTRL + SHIFT + L)
type SecretMessageProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _SecretMessage = (props: SecretMessageProps) => {
  const [open, setOpen] = useState(true);
  const [enableButton, setEnableButton] = useState(false);
  const [bgMusic] = useState(new Audio(BG_MUSIC));
  const ref = useRef<HTMLDivElement>(null);

  function handleMusic() {
    if (ref.current === null) return;

    let option = 0;
    // IF IS MUTED, WILL TURN ON
    if (ref.current.classList.contains("bi-volume-mute-fill")) {
      ref.current.classList.remove("bi-volume-mute-fill");
      ref.current.classList.add("bi-volume-up-fill");
      option = 3;
    } else if (ref.current.classList.contains("bi-volume-up-fill")) {
      ref.current.classList.remove("bi-volume-up-fill");
      ref.current.classList.add("bi-volume-down-fill");
      option = 2;
    } else if (ref.current.classList.contains("bi-volume-down-fill")) {
      ref.current.classList.remove("bi-volume-down-fill");
      ref.current.classList.add("bi-volume-off-fill");
      option = 1;
    } else {
      ref.current.classList.remove("bi-volume-off-fill");
      ref.current.classList.add("bi-volume-mute-fill");
    }

    if (bgMusic.paused && option > 0) {
      bgMusic.play();
    } else if (!bgMusic.paused && option <= 0) {
      bgMusic.pause();
    }

    bgMusic.loop = true;
    bgMusic.volume = option / 3;
  }

  function handleClose() {
    handleMusic();
    setOpen(false);
    setEnableButton(false);
  }

  useEffect(() => {
    return () => {
      if (!bgMusic.paused) bgMusic.pause();
    };
  }, [bgMusic]);

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
    <>
      <div
        className={
          props.className + " modal-container " + (open ? "" : "hidden")
        }
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
              Tu discreción es fundamental para que esta sorpresa sea
              inolvidable.
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

      <div
        className="bi-volume-mute-fill bg-music"
        hidden={open}
        ref={ref}
        onClick={handleMusic}
      />
    </>
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
