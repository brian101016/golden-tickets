import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import ImageHolder from "./ImageHolder";
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
      <ImageHolder
        _image={{
          _position: rev ? 9 : 7,
        }}
        _canvas={{
          _position: {
            top: "-6.5rem",
            left: (rev ? "" : "-") + "5.5rem",
          },
          _style: { overflow: "visible" },
        }}
      >
        <FlowerCorner _scale={rev ? "-1, 1" : 1} />
      </ImageHolder>

      {props.children}

      <ImageHolder
        _image={{
          _position: rev ? 7 : 9,
        }}
        _canvas={{
          _position: {
            bottom: "-6.5rem",
            left: (rev ? "-" : "") + "5.5rem",
          },
          _style: { overflow: "visible" },
        }}
      >
        <FlowerCorner _rotate={180} _scale={rev ? "-1, 1" : 1} />
      </ImageHolder>
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
