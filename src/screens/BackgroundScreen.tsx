import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import FlowerCorner from "@components/FlowerCorner";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// BackgroundScreen => Rename all instances to use (CTRL + SHIFT + L)
type BackgroundScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _BackgroundScreen = (props: BackgroundScreenProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <FlowerCorner
        _x="calc((-100vw + 1024px) / 2 + 75%)"
        _y="-25%"
        _rotate={0}
        _position={{ top: 0, right: 0 }}
        _style={{ width: "300px", position: "absolute" }}
      />

      <FlowerCorner
        _x="calc((100vw - 1024px) / 2 - 75%)"
        _y="-25%"
        _rotate={90}
        _position={{ top: 0, left: 0 }}
        _style={{ width: "300px", position: "absolute" }}
      />

      <FlowerCorner
        _x="25%"
        _y="25%"
        _rotate={180}
        _position={{ bottom: 0, right: 0 }}
        _style={{ width: "300px", position: "absolute" }}
      />

      <FlowerCorner
        _x="-25%"
        _y="25%"
        _rotate={270}
        _position={{ left: 0, bottom: 0 }}
        _style={{ width: "300px", position: "absolute" }}
      />
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const BackgroundScreen = styled(_BackgroundScreen).attrs(
  (props: BackgroundScreenProps): BackgroundScreenProps => {
    return { ...props };
  }
)<BackgroundScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    position: fixed;
    inset: 0;

    ${parseCSS(props._style)};
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default BackgroundScreen;
// #endregion
