import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import IP from "@utils/ImageProvider";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// FlowerDecoration => Rename all instances to use (CTRL + SHIFT + L)
export type FlowerDecorationProps = {
  /** The type of decoration to render. */
  _type: keyof typeof IMAGES;

  /** X coord for the `transform` property. It also needs a measure unit (px, rem). */
  _x?: string;
  /** Y coord for the `transform` property.  It also needs a measure unit (px, rem). */
  _y?: string;
  /** Number for the `scale(x)` function. */
  _scale?: number | string | [number, number?] | [string, string?];
  /** Number of degrees for the `rotate(x)` function. */
  _rotate?: number;
  /** top, left, bottom & right shorthand for the main image to be. */
  _position?: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
  };
  /** If the image will be absolute or relative. */
  _abs?: boolean;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _FlowerDecoration = (props: FlowerDecorationProps) => {
  // ---------------------------------------------------------------------- RETURN
  return <div className={props.className}>{IMAGES[props._type].elements}</div>;
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerDecoration = styled(_FlowerDecoration).attrs(
  (props: FlowerDecorationProps): FlowerDecorationProps => {
    return {
      _x: "0px",
      _y: "0px",
      _scale: 1,
      _rotate: 0,
      ...props,
    };
  }
)<FlowerDecorationProps>`
  ${(props) => css`
    position: ${props._abs ? "absolute" : "relative"};


    width: ${IMAGES[props._type].width};
    max-width: ${IMAGES[props._type].maxWidth};
    min-width: ${IMAGES[props._type].minWidth};
    aspect-ratio: ${IMAGES[props._type].ratio};
    transform: translate(${props._x}, ${props._y}) rotate(${props._rotate}deg)
      scale(${props._scale?.toString()});
    z-index: 1;

    ${props._position ? parseCSS(props._position) : ""}

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
export default FlowerDecoration;
// #endregion

const IMAGES = {
  corner: {
    elements: [
      <div
        key={0}
        style={{
          width: "23.3821%",
          height: "22.7522%",
          transform: "translate(93.1692%, 208.6352%)",
        }}
      >
        <img src={IP.shape.flower_dark} alt="flower dark" />
      </div>,

      <div
        key={1}
        style={{
          width: "17.7030%",
          height: "17.7450%",
          transform: "translate(258.3579%, 183.9452%)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower white" />
      </div>,

      <div
        key={2}
        style={{
          width: "29.6628%",
          height: "37.4632%",
          transform: "translate(211.4262%, 11.5467%) rotate(60.7628deg)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower branch" />
      </div>,

      <div
        key={3}
        style={{
          width: "37.3415%",
          height: "31.1554%",
          transform: "translate(107.6677%, 26.1666%)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower blue" />
      </div>,

      <div
        key={4}
        style={{
          width: "31.9374%",
          height: "31.0770%",
          transform: "translate(70.9240%, 43.1581%)",
        }}
      >
        <img src={IP.shape.flower_dark} alt="flower dark" />
      </div>,

      <div
        key={5}
        style={{
          width: "29.6628%",
          height: "37.4632%",
          transform: "translate(23.4419%, 152.0218%) rotate(148.241deg)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower branch" />
      </div>,

      <div
        key={6}
        style={{
          width: "30.6091%",
          height: "32.7751%",
          transform: "translate(22.4826%, 65.1061%)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower blue" />
      </div>,

      <div
        key={7}
        style={{
          width: "25.8054%",
          height: "27.3289%",
          transform: "translate(45.2828%, 28.0803%)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower gray" />
      </div>,

      <div
        key={8}
        style={{
          width: "29.8064%",
          height: "29.8772%",
          transform: "translate(23.0881%, 142.7891%)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower white" />
      </div>,

      <div
        key={9}
        style={{
          width: "18.8527%",
          height: "19.9657%",
          transform: "translate(167.2621%, 167.5091%)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower gray" />
      </div>,

      <div
        key={10}
        style={{
          width: "22.6807%",
          height: "24.9352%",
          transform: "translate(68.1538%, 49.7365%) rotate(-180deg)",
        }}
      >
        <img src={IP.shape.flower_yellow} alt="flower yellow" />
      </div>,
    ],
    width: "50%",
    maxWidth: "500px",
    minWidth: "200px",
    ratio: "624.222 / 580.85",
  },
  bunch: {
    elements: [
      <div
        key={0}
        style={{
          width: "54.3958%",
          height: "64.9349%",
          transform: "translate(0%, 54%) scale(-1, 1)",
        }}
      >
        <img src={IP.shape.flower_branch} alt="flower icon" />
      </div>,

      <div
        key={1}
        style={{
          width: "49.5953%",
          height: "68.5064%",
          transform: "translate(71.6%, 0%) scale(-1, 1)",
        }}
      >
        <img src={IP.shape.flower_gray} alt="flower icon" />
      </div>,

      <div
        key={2}
        style={{
          width: "41.8593%",
          height: "45.5667%",
          transform: "translate(56.2214%, 107.4457%) rotate(0deg)",
        }}
      >
        <img src={IP.shape.flower_blue} alt="flower icon" />
      </div>,

      <div
        key={3}
        style={{
          width: "54.3958%",
          height: "71.1328%",
          transform: "translate(83.8383%, 32.3500%)",
        }}
      >
        <img src={IP.shape.flower_white} alt="flower icon" />
      </div>,
    ],
    width: "500px",
    maxWidth: "",
    minWidth: "",
    ratio: "254.161 / 181.24",
  },
  branches: {
    elements: [
      <div
        key={0}
        style={{
          width: "56.3511%",
          height: "91.7288%",
          transform: "translate(39.1807%, -21.3790%) rotate(89.7379deg)",
        }}
      >
        <img src={IP.shape.flower_lilac} alt="flower lilac" />
      </div>,

      <div
        key={1}
        style={{
          width: "39.2287%",
          height: "63.8569%",
          transform: "translate(35.8123%, 49.1149%) rotate(151.653deg)",
        }}
      >
        <img src={IP.shape.flower_lilac} alt="flower lilac" />
      </div>,
    ],
    width: "500px",
    maxWidth: "",
    minWidth: "",
    ratio: "142.544 / 154.209",
  },
  clouds: {
    elements: [
      <div
        key={0}
        style={{
          width: "67.0171%",
          height: "37.5952%",
          transform: "translate(-4.6726%, -44.4516%) rotate(180deg)",
          opacity: 0.5,
        }}
      >
        <img src={IP.shape.cloud} alt="cloud background" />
      </div>,

      <div
        key={1}
        style={{
          width: "83.3569%",
          height: "100%",
          transform: "translate(-43.3252%, -30.9334%) rotate(25deg)",
        }}
      >
        <img src={IP.shape.dots} alt="golden dots" />
      </div>,
    ],
    width: "500px",
    maxWidth: "",
    minWidth: "",
    ratio: "792.928 / 659.993",
  },
};
