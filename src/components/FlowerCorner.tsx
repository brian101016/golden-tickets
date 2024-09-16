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
  _scale?: number | string;
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
          width: "23.3821%",
          height: "22.7522%",
          transform: "translate(93.1692%, 208.6352%)",
        }}
      >
        <img src={IP.shape.flower_dark} alt="flower dark" />
      </div>

      <div
        style={{
          width: "17.7030%",
          height: "17.7450%",
          transform: "translate(258.3579%, 183.9452%)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower white" />
      </div>

      <div
        style={{
          width: "29.6628%",
          height: "37.4632%",
          transform: "translate(211.4262%, 11.5467%) rotate(60.7628deg)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower branch" />
      </div>

      <div
        style={{
          width: "37.3415%",
          height: "31.1554%",
          transform: "translate(107.6677%, 26.1666%)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower blue" />
      </div>

      <div
        style={{
          width: "31.9374%",
          height: "31.0770%",
          transform: "translate(70.9240%, 43.1581%)",
        }}
      >
        <img src={IP.shape.flower_dark} alt="flower dark" />
      </div>

      <div
        style={{
          width: "29.6628%",
          height: "37.4632%",
          transform: "translate(23.4419%, 152.0218%) rotate(148.241deg)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower branch" />
      </div>

      <div
        style={{
          width: "30.6091%",
          height: "32.7751%",
          transform: "translate(22.4826%, 65.1061%)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower blue" />
      </div>

      <div
        style={{
          width: "25.8054%",
          height: "27.3289%",
          transform: "translate(45.2828%, 28.0803%)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower gray" />
      </div>

      <div
        style={{
          width: "29.8064%",
          height: "29.8772%",
          transform: "translate(23.0881%, 142.7891%)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower white" />
      </div>

      <div
        style={{
          width: "18.8527%",
          height: "19.9657%",
          transform: "translate(167.2621%, 167.5091%)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower gray" />
      </div>

      <div
        style={{
          width: "22.6807%",
          height: "24.9352%",
          transform: "translate(68.1538%, 49.7365%) rotate(-180deg)",
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
    position: relative;
    /* width: 624.222px;
    height: 580.85px; */
    width: 500px;
    aspect-ratio: 624.222 / 580.85;
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
