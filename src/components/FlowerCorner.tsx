import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import IP from "@utils/ImageProvider";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// FlowerCorner => Rename all instances to use (CTRL + SHIFT + L)
type FlowerCornerProps = {
  /** X coord for the `transform` property. It also needs a measure unit (px, rem). */
  _x?: string;
  /** Y coord for the `transform` property.  It also needs a measure unit (px, rem). */
  _y?: string;
  /** Number for the `scale(x)` function. */
  _scale?: number;
  /** Number of degrees for the `rotate(x)` function. */
  _rotate?: number;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _FlowerCorner = (props: FlowerCornerProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <div
        style={{
          width: "145.956px",
          height: "132.156px",
          transform: "translate(135.986px, 275.724px)",
        }}
      >
        <img src={IP.shape.flower_dark} alt="flower dark" />
      </div>

      <div
        style={{
          width: "110.506px",
          height: "103.072px",
          transform: "translate(285.501px, 189.596px)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower white" />
      </div>

      <div
        style={{
          width: "185.162px",
          height: "217.605px",
          transform: "translate(391.481px, 25.1261px) rotate(60.7628deg)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower branch" />
      </div>

      <div
        style={{
          width: "233.094px",
          height: "180.966px",
          transform: "translate(250.967px, 47.3527px)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower blue" />
      </div>

      <div
        style={{
          width: "199.36px",
          height: "180.511px",
          transform: "translate(141.394px, 77.9051px)",
        }}
      >
        <img src={IP.shape.flower_dark} alt="flower dark" />
      </div>

      <div
        style={{
          width: "185.162px",
          height: "217.605px",
          transform: "translate(43.4055px, 330.807px) rotate(148.241deg)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower branch" />
      </div>

      <div
        style={{
          width: "191.069px",
          height: "190.374px",
          transform: "translate(42.9573px, 123.945px)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower blue" />
      </div>

      <div
        style={{
          width: "161.083px",
          height: "158.74px",
          transform: "translate(72.9429px, 44.5746px)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower gray" />
      </div>

      <div
        style={{
          width: "186.058px",
          height: "173.542px",
          transform: "translate(42.9573px, 247.799px)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower white" />
      </div>

      <div
        style={{
          width: "117.683px",
          height: "115.971px",
          transform: "translate(196.839px, 194.262px)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower gray" />
      </div>

      <div
        style={{
          width: "141.578px",
          height: "144.836px",
          transform: "translate(96.4908px, 72.0364px) rotate(-180deg)",
        }}
      >
        <img src={IP.shape.flower_yellow} alt="flower yellow" />
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerCorner = styled(_FlowerCorner).attrs(
  (props: FlowerCornerProps): FlowerCornerProps => {
    return {
      _x: "0px",
      _y: "0px",
      _scale: 1,
      _rotate: 0,
      ...props,
    };
  }
)<FlowerCornerProps>`
  ${(props) => css`
    position: absolute;
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
export default FlowerCorner;
// #endregion
