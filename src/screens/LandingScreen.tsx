import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import Input from "@components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IP from "@utils/ImageProvider";
import Countdown from "@components/Countdown";
import Column from "@components/Column";
import Paralax from "@components/Paralax";
import FlowerWrapper from "@components/FlowerWrapper";
import FlowerEmphasis from "@components/FlowerEmphasis";
import FlowerStrip from "@components/FlowerStrip";

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
    <div className={props.className + " vertical-screen"}>
      <FlowerWrapper>
        <p className="big-title">
          Bodas
          <br />
          de Oro
        </p>
      </FlowerWrapper>

      <FlowerEmphasis>
        <h1 style={{ letterSpacing: "0.5ch" }}>
          <span>Y</span>
          <img src={IP.icon.heart} style={{ margin: "0 1.5rem" }} alt="heart" />
          <span>J</span>
        </h1>
      </FlowerEmphasis>

      <FlowerWrapper _reverse className="pseudo-shadow">
        <Paralax _src={IP.misc.aniversario} _shape={"circle"} />
      </FlowerWrapper>

      <FlowerWrapper>
        <h1
          style={{
            fontSize: "6.75rem",
            lineHeight: 0.8,
          }}
        >
          Yolanda
          <br />
          &
          <br />
          Javier
        </h1>
      </FlowerWrapper>

      <Paralax _src={IP.bg.standing_light} _filter="grayscale(1)" />

      <FlowerWrapper _reverse>
        <h2>
          Tenemos el gusto de invitarle
          <br />
          en este día tan importante
          <br />
          de nuestras vidas
        </h2>
      </FlowerWrapper>

      <Paralax _src={IP.bg.argollas} _childmax _autoheight="100svh">
        <div className="flex-col-betw">
          <h3 className="remark">
            Sábado, <span className="text-number">21</span>/Diciembre/
            <span className="text-number">2024</span>
          </h3>

          <h3 className="remark">
            <Countdown />
          </h3>
        </div>
      </Paralax>

      <h2>
        En compañía de nuestros hijos y nietos
        <FlowerStrip _type="gold" _style={{ marginBottom: "-3.5rem" }} />
      </h2>

      <Paralax
        _src={IP.bg.common_decoration}
        _filter="blur(3px) brightness(0.85)"
        _autoheight
      >
        <Column
          _items={[
            { title: "María Yolanda", children: ["Arturo"] },
            { title: "Denisse Elisa", children: ["Brian", "Evan", "Alan"] },
            { title: "Thelma Georgina" },
            { title: "Roberto Javier", children: ["Nancy", "Nathalia"] },
            { title: "Emmanuel" },
          ]}
        />
      </Paralax>

      <h2>
        <FlowerStrip _style={{ marginTop: "-3.5rem", marginBottom: "1rem" }} />

        <FlowerEmphasis _style={{ overflow: "visible" }}>
          Misa de acción de gracias
        </FlowerEmphasis>

        <FlowerStrip _style={{ marginBottom: "-3.5rem", marginTop: "1rem" }} />
      </h2>

      <Paralax _src={IP.bg.carmen} _childmax _filter="brightness(1)">
        <div className="flex-col-betw">
          <h1 className="remark">
            <span className="text-number">{"1:00 "}</span>pm
          </h1>
          <div style={{ margin: "0 auto", zIndex: 1 }}>
            <a
              href="https://maps.app.goo.gl/CMvfimr8XFqJRudt5"
              className="as-button login"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "var(--size-thirdtitle)",
                fontFamily: "var(--font-cinzel)",
              }}
            >
              Abrir ubicación
            </a>
          </div>
          <h1 className="remark text-clear">Parroquia Ntra Sra del Carmen</h1>
        </div>
      </Paralax>

      <h2>
        <FlowerEmphasis _style={{ overflow: "visible" }}>
          Banquete
        </FlowerEmphasis>

        <FlowerStrip _style={{ marginBottom: "-3.5rem", marginTop: "1rem" }} />
      </h2>

      <Paralax
        _src={IP.bg.terranova}
        _childmax
        _filter="brightness(1) grayscale(0) contrast(0.75 )"
      >
        <div className="flex-col-betw">
          <h1 className="remark text-clear">
            <span className="text-number">{"3:00 "}</span>pm
          </h1>
          <div style={{ margin: "0 auto", zIndex: 1 }}>
            <a
              href="https://maps.app.goo.gl/qF3qoZ27oTebaKW37"
              className="as-button login"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "var(--size-thirdtitle)",
                fontFamily: "var(--font-cinzel)",
              }}
            >
              Abrir ubicación
            </a>
          </div>
          <h1 className="remark text-clear">
            Av. Nayarit <span className="text-number">97A</span>, esq.{" "}
            <span className="text-number">5</span> de Mayo
          </h1>
        </div>
      </Paralax>

      <FlowerWrapper>
        <h2>
          <FlowerEmphasis _type="FlowerBunch">
            <b style={{ color: "var(--color-palette-blue-royal)" }}>
              Mesa de regalo
            </b>
          </FlowerEmphasis>
          <br />
          Nuestro mejor regalo es tu presencia, <br />
          pero si deseas tener un presente con <br />
          nosotros te dejamos nuestra sugerencia <br /> <br />
        </h2>
      </FlowerWrapper>

      <Paralax _src={IP.bg.common_decoration} _childmax>
        <div className="flex-col-center">
          <h1
            className="remark text-clear"
            style={{
              WebkitTextStroke: "0.5px",
              fontSize: "6rem",
            }}
          >
            <img className="envelope" src={IP.icon.envelope} alt="Envelope" />
            ¡Lluvia de sobres!
          </h1>
        </div>
      </Paralax>

      <h2>
        Deseamos que puedas acompañarnos
        <FlowerStrip _type="gold" _style={{ marginBottom: "-3.5rem" }} />
      </h2>

      <Paralax _src={IP.bg.standing_dark} _childmax _bgPosition="center 40%">
        <div className="flex-col-even">
          <h1
            className="remark"
            style={{
              color: "var(--color-shadow-dark)",
            }}
          >
            Reservado solo para adultos
          </h1>
          <div style={{ margin: "0 auto", zIndex: 1 }}>
            <Link
              to="/tickets"
              className="as-button warning"
              style={{
                fontSize: "var(--size-thirdtitle)",
                fontFamily: "var(--font-cinzel)",
              }}
            >
              Confirma tu asistencia
            </Link>
          </div>
        </div>
      </Paralax>

      <FlowerWrapper>
        <p className="big-title">
          <FlowerStrip _type="gold" />
          ¡Te esperamos!
          <FlowerStrip />
        </p>
      </FlowerWrapper>

      <FlowerWrapper _reverse className="pseudo-shadow">
        <FlowerWrapper>
          <Paralax
            _src={IP.misc.aniversario}
            _autoheight="100svh"
            _bgPosition="center 30%"
          />
        </FlowerWrapper>
      </FlowerWrapper>

      {/*
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
      */}
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

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LandingScreen;
// #endregion
