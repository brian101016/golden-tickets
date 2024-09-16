import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import IP from "@utils/ImageProvider";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// FlowerBunch => Rename all instances to use (CTRL + SHIFT + L)
type FlowerBunchProps = {
  /** X coord for the `transform` property. It also needs a measure unit (px, rem). */
  _x?: string;
  /** Y coord for the `transform` property.  It also needs a measure unit (px, rem). */
  _y?: string;
  /** Number for the `scale(x)` function. */
  _scale?: string | number;
  /** Number of degrees for the `rotate(x)` function. */
  _rotate?: number;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _FlowerBunch = (props: FlowerBunchProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " text-ellipsis"}>
      <div
        style={{
          width: "54.3958%",
          height: "64.9349%",
          transform: "translate(0%, 54%) scale(-1, 1)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower icon" />
      </div>

      <div
        style={{
          width: "49.5953%",
          height: "68.5064%",
          transform: "translate(71.6%, 0%) scale(-1, 1)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower icon" />
      </div>

      <div
        style={{
          width: "41.8593%",
          height: "45.5667%",
          transform: "translate(56.2214%, 107.4457%) rotate(0deg)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower icon" />
      </div>

      <div
        style={{
          width: "54.3958%",
          height: "71.1328%",
          transform: "translate(83.8383%, 32.3500%)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower icon" />
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerBunch = styled(_FlowerBunch).attrs(
  (props: FlowerBunchProps): FlowerBunchProps => {
    return {
      _x: "0px",
      _y: "0px",
      _scale: 1,
      _rotate: 0,
      ...props,
    };
  }
)<FlowerBunchProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.

    position: relative;
    /* width: 510.687px;
    height: 552.478px; */
    width: 500px;
    aspect-ratio: 254.161 / 181.24;
    transform: translate(${props._x}, ${props._y}) scale(${props._scale})
      rotate(${props._rotate}deg);

    > div {
      position: absolute;
    }

    img {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default FlowerBunch;
// #endregion
