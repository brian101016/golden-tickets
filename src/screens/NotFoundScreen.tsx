import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import ImageProvider from "utils/ImageProvider";
import { useNavigate, useRouteError } from "react-router";
import { Helmet } from "react-helmet";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// NotFoundScreen => Rename all instances to use (CTRL + SHIFT + L)
type NotFoundScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _NotFoundScreen = (props: NotFoundScreenProps) => {
  const navigate = useNavigate();
  const error = useRouteError() as any;
  const errtext =
    error?.statusText ||
    error?.message ||
    error?.toString?.() ||
    "Ocurrió un error...";
  if (error) console.warn(error);

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " screen"}>
      <Helmet>
        <title>No encontrado | Golden Tickets</title>
      </Helmet>

      <img
        src={ImageProvider.shape.not_found_ticket}
        alt="Unable to load content"
        className="img-not-found"
      />

      {<h4>{errtext}</h4>}

      <button
        className="login"
        onClick={() => {
          navigate("/");
        }}
      >
        Regresar
      </button>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const NotFoundScreen = styled(_NotFoundScreen).attrs(
  (props: NotFoundScreenProps): NotFoundScreenProps => {
    return { ...props };
  }
)<NotFoundScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-shadow-white);

    .img-not-found {
      width: 300px;
      border-radius: 50%;
    }

    h4 {
      color: var(--color-palette-brown);
      font-weight: 400;
      font-size: 1.5rem;
      margin: var(--margin-medium);
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default NotFoundScreen;
// #endregion
