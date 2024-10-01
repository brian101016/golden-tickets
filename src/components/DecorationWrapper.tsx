import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import FlowerDecoration from "./FlowerDecoration";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
type FDprops = import("./FlowerDecoration").FlowerDecorationProps;
type _type = FDprops["_type"];
type CommonWrapperProps = {
  /** Shows the items flipped. */
  _reverse?: boolean;
  /** Type of the decoration to render. */
  _type: _type;
};
// DecorationWrapper => Rename all instances to use (CTRL + SHIFT + L)
type DecorationWrapperProps = {
  /** Wrappers to render around the children passed. */
  _wrappers: [CommonWrapperProps, ...CommonWrapperProps[]];

  children?: React.ReactNode;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _DecorationWrapper = (props: DecorationWrapperProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " decoration-wrapper"}>
      {props._wrappers.map((v, i) => (
        <FlowerDecoration
          key={i}
          _type={v._type}
          _abs
          {...modCoords(v._type, true, v._reverse || false)}
        />
      ))}

      {props.children}

      {[...props._wrappers].reverse().map((v, i) => (
        <FlowerDecoration
          key={i}
          _type={v._type}
          _abs
          {...modCoords(v._type, false, v._reverse || false)}
        />
      ))}
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const DecorationWrapper = styled(_DecorationWrapper).attrs(
  (props: DecorationWrapperProps): DecorationWrapperProps => {
    return { ...props };
  }
)<DecorationWrapperProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    position: relative;
    display: flow-root;
    overflow: hidden;

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default DecorationWrapper;
// #endregion

function modCoords(from: _type, first: boolean, reverse: boolean) {
  const values: Omit<FDprops, "_type"> & {
    _position: {};
    _scale: [number, number];
  } = {
    _position: {},
    _x: IMAGES[from][0] + "%",
    _y: IMAGES[from][1] + "%",
    _scale: [1, 1],
  };

  if (first) {
    values._position.top = 0;
    values._y = "-" + values._y;
  } else {
    values._position.bottom = 0;
    values._scale[1] = -1;
  }

  if (first === reverse) {
    values._position.right = 0;
    values._scale[0] = -1;
  } else {
    values._position.left = 0;
    values._x = "-" + values._x;
  }

  return values;
}

const IMAGES: { [x in _type]: [number, number] } = {
  corner: [17.6, 22.35],
  bunch: [0, 0],
  branches: [0, 0],
  clouds: [7.5, 7.5],
};
