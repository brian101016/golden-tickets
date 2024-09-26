import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import Column from "@components/Column";
import Countdown from "@components/Countdown";
import DecorationWrapper from "@components/DecorationWrapper";
import FlowerEmphasis from "@components/FlowerEmphasis";
import FlowerStrip from "@components/FlowerStrip";
import Paralax from "@components/Paralax";
import IP from "@utils/ImageProvider";
import { Link } from "react-router-dom";
import BackgroundScreen from "./BackgroundScreen";
import SecretMessage from "@components/SecretMessage";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// GoldenTicket => Rename all instances to use (CTRL + SHIFT + L)
type GoldenTicketProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _GoldenTicket = (props: GoldenTicketProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <>
      <BackgroundScreen />

      <div className={props.className + " vertical-screen"}>
        <SecretMessage />

        <DecorationWrapper wrappers={[{ _type: "corner" }]}>
          <p className="big-title">
            Bodas
            <br />
            de Oro
          </p>
        </DecorationWrapper>

        <FlowerEmphasis _type="branches">
          <h1 style={{ letterSpacing: "0.5ch", whiteSpace: "pre" }}>
            <span>Y</span>
            <img
              src={IP.icon.heart}
              style={{ margin: "0 1.5rem" }}
              alt="heart"
            />
            <span>J</span>
          </h1>
        </FlowerEmphasis>

        <DecorationWrapper
          wrappers={[{ _type: "corner", _reverse: true }]}
          className="pseudo-shadow"
        >
          <Paralax _src={IP.misc.aniversario} _shape={"circle"} />
        </DecorationWrapper>

        <DecorationWrapper wrappers={[{ _type: "corner" }]}>
          <h1 className="title-names">
            Yolanda
            <br />
            &
            <br />
            Javier
          </h1>
        </DecorationWrapper>

        <Paralax _src={IP.bg.standing_light} _filter="grayscale(1)" />

        <DecorationWrapper wrappers={[{ _type: "corner", _reverse: true }]}>
          <h2>
            Tenemos el gusto de invitarle
            <br />
            en este día tan importante
            <br />
            de nuestras vidas
          </h2>
        </DecorationWrapper>

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
          <FlowerStrip
            _style={{
              marginTop: "-3.5rem",
              marginBottom: "1rem",
              bottom: "100%",
            }}
          />

          <FlowerEmphasis _type="branches" _style={{ overflow: "visible" }}>
            {"Misa\nde acción\nde gracias"}
          </FlowerEmphasis>

          <FlowerStrip
            _style={{ marginBottom: "-3.5rem", marginTop: "1rem" }}
          />
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
            <h1 className="remark text-clear">
              {"Parroquia\nNtra. Sra. del\nCarmen"}
            </h1>
          </div>
        </Paralax>

        <h2>
          <FlowerEmphasis _type="branches" _style={{ overflow: "visible" }}>
            Banquete
          </FlowerEmphasis>

          <FlowerStrip
            _style={{ marginBottom: "-3.5rem", marginTop: "1rem" }}
          />
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
              Av. Nayarit <span className="text-number">97A</span>
              {",\nesq. "}
              <span
                className="text-number"
                style={{ fontSize: "4.25rem", fontWeight: 500 }}
              >
                5
              </span>{" "}
              de Mayo
            </h1>
          </div>
        </Paralax>

        <DecorationWrapper wrappers={[{ _type: "corner" }]}>
          <h2>
            <FlowerEmphasis _type="bunch" _style={{ overflow: "visible" }}>
              <b
                style={{
                  color: "var(--color-palette-blue-royal)",
                  fontFamily: "var(--font-pinyon)",
                  fontSize: " 4rem",
                }}
              >
                Mesa
                <br />
                de regalo
              </b>
            </FlowerEmphasis>
            <br />
            Nuestro mejor regalo es tu presencia. <br /> <br />
            Si deseas tener un presente con nosotros, <br />
            te dejamos nuestra sugerencia...
            <br /> <br />
          </h2>
        </DecorationWrapper>

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
              {"\n¡Lluvia de sobres!"}
            </h1>
          </div>
        </Paralax>

        <h2>
          Deseamos que puedas acompañarnos
          <br />
          sin niños
          <FlowerStrip _type="gold" _style={{ marginBottom: "-3.5rem" }} />
        </h2>

        <Paralax
          _src={IP.bg.standing_dark}
          _childmax
          _bgPosition={["center", 0.4]}
        >
          <div className="flex-col-even">
            <h1
              className="remark"
              style={{
                color: "var(--color-shadow-dark)",
              }}
            >
              {"Reservado solo\npara adultos"}
            </h1>
            <div style={{ margin: "0 auto", zIndex: 1 }}>
              <Link
                to="confirm"
                className="as-button warning pulse"
                style={{
                  fontSize: "var(--size-thirdtitle)",
                  fontFamily: "var(--font-poppins)",
                }}
              >
                {"Confirma tu\nasistencia"}
              </Link>
            </div>
          </div>
        </Paralax>

        <DecorationWrapper wrappers={[{ _type: "corner" }]}>
          <p className="big-title title-final">
            <FlowerStrip _type="gold" _noResponsive />
            ¡Te esperamos!
            <FlowerStrip _noResponsive />
          </p>
        </DecorationWrapper>

        <DecorationWrapper
          wrappers={[
            { _type: "corner", _reverse: false },
            { _type: "corner", _reverse: true },
          ]}
          className="pseudo-shadow"
        >
          <Paralax
            _src={IP.misc.aniversario}
            _autoheight="100lvh"
            _bgPosition={["center", 0.3]}
            _debug
          />
        </DecorationWrapper>
      </div>
    </>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const GoldenTicket = styled(_GoldenTicket).attrs(
  (props: GoldenTicketProps): GoldenTicketProps => {
    return { ...props };
  }
)<GoldenTicketProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.

    .title-names {
      font-size: 6.75rem;
      line-height: 0.8;
    }

    @media screen and (max-width: 500px) {
      .title-final {
        font-size: 3.5rem;
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default GoldenTicket;
// #endregion
