import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import Input from "@components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IP from "@utils/ImageProvider";
import Countdown from "@components/Countdown";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// LandingScreen => Rename all instances to use (CTRL + SHIFT + L)
type LandingScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _LandingScreen = (props: LandingScreenProps) => {
  const [LS] = useState({ ticketid: "" });
  const navig = useNavigate();

  function handleClick() {
    navig("tickets/" + LS.ticketid);
  }

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " landing-screen"}>
      <h1 className="boda-de-oro">
        Bodas
        <br />
        de Oro
      </h1>

      <h2 className="y-j" style={{ margin: "3.5rem 0" }}>
        Y<span>{" ♥"}</span>J
      </h2>

      <div className="aniversario-container">
        <div className="holder" />
      </div>

      <h3
        className="centered"
        style={{
          fontFamily: "Tangerine",
          fontSize: "6.7rem",
          lineHeight: 0.8,
          margin: "3.5rem 0",
        }}
      >
        Yolanda
        <br />
        &
        <br />
        Javier
      </h3>

      <div
        className="aniversario-container bg-image"
        style={{
          filter: "grayscale(1)",
        }}
      />

      <p
        className="p1"
        style={{
          margin: "7rem auto",
        }}
      >
        Tenemos el gusto de invitarle
        <br />
        en este día tan importante
        <br />
        de nuestras vidas
      </p>

      <div
        className="aniversario-container bg-image"
        style={{
          backgroundImage: `url(${IP.bg.argollas})`,
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundPosition: "center center",
          backgroundSize: "min(100%, 1024px)",
          backgroundRepeat: "no-repeat",
          height: "75svh",
          backgroundColor: "#ecf0f2",
          // backgroundBlendMode: "darken",
        }}
      >
        <h2 className="title-date">Sábado, 21/Diciembre/2024</h2>

        <h2 className="title-date">
          <Countdown />
        </h2>
      </div>

      <p
        className="p1"
        style={{
          margin: "4.5rem auto",
        }}
      >
        En compañía de nuestros hijos y nietos
      </p>

      <div className="hijos-container">
        <div className="bg"></div>

        <div className="hijos">
          <span> María Yolanda </span>

          <div className="sub-hijos">
            <span>Arturo</span>
          </div>
        </div>

        <div className="hijos">
          <span>Denisse Elisa</span>

          <div className="sub-hijos">
            <span>Brian</span>
            <span>Evan</span>
            <span>Alan</span>
          </div>
        </div>

        <div className="hijos">
          <span>Thelma Georgina</span>
        </div>

        <div className="hijos">
          <span>Roberto Javier</span>

          <div className="sub-hijos">
            <span>Nancy</span>
            <span>Nathalia</span>
          </div>
        </div>

        <div className="hijos">
          <span>Emmanuel</span>
        </div>
      </div>

      <hr style={{ marginTop: "30rem" }} />

      <p>Ingrese el código de su ticket para ver más información:</p>
      <Input
        _store={LS}
        _store_var="ticketid"
        _label="Código del Ticket"
        _length={[undefined, 32, true]}
        _width={"m"}
      />

      <button className="primary" onClick={handleClick}>
        Buscar
      </button>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const LandingScreen = styled(_LandingScreen).attrs(
  (props: LandingScreenProps): LandingScreenProps => {
    return { ...props };
  }
)<LandingScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    background-color: var(--color-shadow-white);
    box-shadow: 0 0 20px 0 #44515b;

    .aniversario-container {
      --color-gg: #a38e4a;
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 2.5rem 0;
      /* background-color: #ffdf73; */
      background-color: #f8e7aa;
      box-shadow: inset 0px 20px 20px -20px var(--color-gg),
        inset 0px -20px 20px -20px var(--color-gg);

      .holder {
        box-shadow: 0 0 20px 0 var(--color-gg);
        border-radius: 100%;
        /* text-align: center; */
        width: 75%;
        height: auto;
        aspect-ratio: 1 / 1;
        /* overflow: hidden; */
        /* clip-path: inset(0 0 0 0); */
        position: relative;
        background-image: url(${IP.shape.aniversario});
        background-size: min(768px, 100%) auto;
        background-attachment: fixed;
        background-position: center 25%;
      }
    }

    .bg-image {
      padding: 0;
      width: 100%;
      height: 90svh;
      /* aspect-ratio: 1 / 1; */
      background-image: url(${IP.bg.standing_light});
      background-size: cover;
      background-position: top center;
      /* filter: grayscale(1); */
      background-attachment: fixed;
    }

    .boda-de-oro {
      border: 10px solid;
      border-style: double;
      padding: 5rem 0;
      font-weight: 700;
      letter-spacing: 4px;
      font-size: 8rem;
      margin-top: 0;
    }

    .y-j {
      font-size: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        text-align: center;
        font-size: 3.4rem;
        white-space: pre;
      }
    }

    .p1 {
      font-family: "Raleway";
      font-weight: 300;
      font-size: 2.5rem;

      // font-family: var(--font-cinzel);
      // font-weight: 700;
      // font-size: 1.5rem;
      text-align: center;
      margin: 1.5rem auto;
      width: max(75%, 20rem);
    }

    .title-date {
      letter-spacing: 4px;
      font-weight: 700;
      height: min-content;
      padding: 1rem 0;
      width: 100%;
      backdrop-filter: blur(5px) brightness(1.25);
    }

    .hijos-container {
      padding: 5rem 0;
      overflow: hidden;
      /* background-color: indianred; // DEBUG */

      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
      text-align: center;

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        filter: blur(5px) brightness(0.9);
        background-image: url("${IP.bg.common_decoration}");
        background-size: cover;
        background-attachment: fixed;
        background-position: center 25%;
      }

      .hijos {
        z-index: 1;
      }

      .hijos > span {
        font-family: "Tangerine";
        font-size: 4rem;
        font-weight: 700;
        color: #ff9815;
        text-shadow: 2px 2px 2px #804b07;
      }

      .sub-hijos {
        display: flex;
        justify-content: center;
        gap: 3.5rem;
        font-size: 3.5rem;
        line-height: 0.7em;
        font-family: "Tangerine";
        color: #ffffff;
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LandingScreen;
// #endregion
