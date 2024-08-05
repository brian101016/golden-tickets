import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import Input from "@components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IP from "@utils/ImageProvider";
import Countdown from "@components/Countdown";
import Column from "@components/Column";
import Paralax from "@components/Paralax";

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
      <p className="big-title">
        Bodas
        <br />
        de Oro
      </p>

      <h1 style={{ letterSpacing: "0.5ch" }}>
        <span>Y</span>
        <img src={IP.icon.heart} alt="heart" style={{ margin: "0 1.5rem" }} />
        <span>J</span>
      </h1>

      <Paralax _src={IP.shape.aniversario} _shape={"circle"} />

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

      <Paralax _src={IP.bg.standing_light} _filter="grayscale(1)" />

      <h2>
        Tenemos el gusto de invitarle
        <br />
        en este día tan importante
        <br />
        de nuestras vidas
      </h2>

      <Paralax _src={IP.bg.argollas} _childmax>
        <div className="flex-col-betw">
          <h3 className="remark">Sábado, 21/Diciembre/2024</h3>

          <h3 className="remark">
            <Countdown />
          </h3>
        </div>
      </Paralax>

      <h2>En compañía de nuestros hijos y nietos</h2>

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

      <h2>Misa de acción de gracias</h2>

      <Paralax _src={IP.bg.church} _childmax _filter="brightness(0.85)">
        <div className="flex-col-betw">
          <h1 className="remark">1:00 pm</h1>
          <h1>Ubicacion</h1>
          <h1 className="remark">P. Ntra Sra del Carmen</h1>
        </div>
      </Paralax>

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

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default LandingScreen;
// #endregion
