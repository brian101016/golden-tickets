import styled, { css } from "styled-components";
import { parseCSS, parseDate, useRefresh } from "scripts/FunctionsBundle";
import { useLoaderData, useNavigation } from "react-router";
import { Ticket } from "@utils/ClassTypes";
import Input from "@components/Input";
import { Fragment, useEffect, useState } from "react";
import { Link, useSubmit } from "react-router-dom";
import { GS } from "App";
import IP from "@utils/ImageProvider";
import { Helmet } from "react-helmet";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// ConfirmationScreen => Rename all instances to use (CTRL + SHIFT + L)
type ConfirmationScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _ConfirmationScreen = (props: ConfirmationScreenProps) => {
  const tic = useLoaderData() as Ticket;
  const [refresh, volkey] = useRefresh();
  const [LS, setLS] = useState(new Ticket());
  const navigation = useNavigation();
  const submit = useSubmit();

  // ============================== SHORTCUT
  const loading = navigation.state !== "idle";

  // ---------------------------------------------------------------------- HANDLERS
  // ============================== HANDLE SELECT ALL
  function handleSelectAll() {
    if (loading) return;
    LS.members.forEach((mm) => (mm.accepted = true));
    refresh();
  }

  // ============================== HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    GS.cache = {
      ticketid: tic.id,
      members: LS.members,
    };

    submit(null, { method: "POST" });
  }

  useEffect(() => {
    setLS(structuredClone(tic));
  }, [tic]);

  if (!tic || !LS) return <div className="spinner">En espera...</div>;

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " screen"}>
      <Helmet>
        <title>Confirmar reservación | Golden Tickets</title>
      </Helmet>

      <Link
        to={"/tickets/" + tic.id}
        className="as-button login floating-controls"
      >
        {"< Volver a la invitación"}
      </Link>

      <h1>Ticket de Oro</h1>

      <h2>{"Familia \n" + tic.family}</h2>
      <h6>({tic.id})</h6>

      <form onSubmit={handleSubmit}>
        <h3 style={{ margin: 0, padding: 0 }}>
          {"Confirmar la\nasistencia de..."}
        </h3>

        <div className="grid-container">
          {tic?.members?.length && LS?.members?.length ? (
            <>
              {tic.members.map((memb, i) => (
                <Fragment key={volkey + "-" + i}>
                  <span className="as-label">{memb.name}</span>

                  <Input
                    _store={memb.accepted ? { ...memb } : LS.members[i]}
                    _store_var={"accepted"}
                    _type="checkbox"
                    _label=""
                    _disabled={loading || memb.accepted}
                    _withWrapper={false}
                  />

                  {memb.acceptedDate ? (
                    <i className="break-spaces">
                      {"Confirmado el\n"}
                      <b>{parseDate(memb.acceptedDate, true, false)}</b>
                    </i>
                  ) : (
                    <br />
                  )}
                </Fragment>
              ))}

              <button
                type="button"
                onClick={handleSelectAll}
                disabled={loading}
                className="all-btn"
              >
                Seleccionar todos
              </button>

              <button className="login send-btn" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </>
          ) : (
            <b>No hay invitados!</b>
          )}
        </div>
      </form>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const ConfirmationScreen = styled(_ConfirmationScreen).attrs(
  (props: ConfirmationScreenProps): ConfirmationScreenProps => {
    return { ...props };
  }
)<ConfirmationScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${IP.bg.petals});

    h6 {
      margin: 0 auto;
      font-style: italic;
      width: max-content;
    }

    h2 {
      margin: 0;
    }

    form,
    h2 {
      max-width: 50rem;
      margin-left: auto;
      margin-right: auto;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1.75rem 0;

      background-image: url(${IP.bg.granular});
      background-size: cover;
      border-radius: 1rem;
      box-shadow: 0px 4px 10px #0008;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 3fr max-content 4fr;
      gap: 0.5rem 1rem;
      border-bottom: 2px solid;
      padding-bottom: 0.5rem;
      align-items: center;
    }

    .grid-controls {
      display: flex;
      justify-content: space-evenly;
    }

    .all-btn {
      margin-right: 0;
      grid-column: 1 / 3;
      justify-self: end;
    }

    .send-btn {
      justify-self: center;
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default ConfirmationScreen;
// #endregion
