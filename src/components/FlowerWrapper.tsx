import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import FlowerCorner from "./FlowerCorner";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// FlowerWrapper => Rename all instances to use (CTRL + SHIFT + L)
type FlowerWrapperProps = {
  _reverse?: boolean;
  children?: React.ReactNode;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _FlowerWrapper = (props: FlowerWrapperProps) => {
  const rev = props._reverse;

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " text-ellipsis"}>
      {rev ? (
        <FlowerCorner
          _scale={"-1, 1"}
          _abs
          _position={{ top: 0, right: 0 }}
          _x="17.6%"
          _y="-22.35%"
        />
      ) : (
        <FlowerCorner
          _scale={"1, 1"}
          _abs
          _position={{ top: 0, left: 0 }}
          _x="-17.6%"
          _y="-22.35%"
        />
      )}

      {props.children}

      {rev ? (
        <FlowerCorner
          _rotate={180}
          _scale={"-1, 1"}
          _abs
          _position={{ bottom: 0, left: 0 }}
          _x="-17.6%"
          _y="22.35%"
        />
      ) : (
        <FlowerCorner
          _rotate={180}
          _scale={"1, 1"}
          _abs
          _position={{ bottom: 0, right: 0 }}
          _x="17.6%"
          _y="22.35%"
        />
      )}
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerWrapper = styled(_FlowerWrapper).attrs(
  (props: FlowerWrapperProps): FlowerWrapperProps => {
    return { ...props };
  }
)<FlowerWrapperProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    position: relative;
    display: flow-root;

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default FlowerWrapper;
// #endregion
