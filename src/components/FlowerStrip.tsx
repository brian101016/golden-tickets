import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import IP from "@utils/ImageProvider";
import FlowerDecoration from "./FlowerDecoration";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// FlowerStrip => Rename all instances to use (CTRL + SHIFT + L)
type FlowerStripProps = {
  /** Type of the decoration to render. */
  _type?: "blue" | "gold";
  /** Tells if the component should shrink or not. */
  _noResponsive?: boolean;

  children?: React.ReactNode;
} & _Base;
// #endregion

// #region ##################################################################################### STYLES MAP
const map: {
  [x in NonNullable<FlowerStripProps["_type"]>]: {
    grid: string;
    imgs: (
      | {
          src: string;
          transform?: string;
        }
      | {
          element: "FlowerBunch";
          props?: { [x: string]: string | number };
        }
    )[];
  };
} = {
  blue: {
    grid: "2fr 3fr 4fr 5fr 4fr 3fr 2fr",
    imgs: [
      { src: IP.shape.flower_branch, transform: "rotate(270deg)" },
      { src: IP.shape.flower_gray, transform: "" },
      { src: IP.shape.flower_light, transform: "" },
      { src: IP.shape.flower_blue, transform: "" },
      { src: IP.shape.flower_light, transform: "scale(-1, 1)" },
      { src: IP.shape.flower_gray, transform: "scale(-1, 1)" },
      { src: IP.shape.flower_branch, transform: "rotate(270deg) scale(1, -1)" },
    ],
  },
  gold: {
    grid: "1fr 3fr 1fr",
    imgs: [
      { element: "FlowerBunch" },
      { src: IP.shape.golden_separator },
      { element: "FlowerBunch", props: { _scale: "-1, 1" } },
    ],
  },
};
// #endregion

// #region ##################################################################################### COMPONENT
const _FlowerStrip = (props: FlowerStripProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div
      className={props.className + " flower-strip"}
      style={{
        gridTemplateColumns: map[props._type || "blue"].grid,
      }}
    >
      {map[props._type || "blue"].imgs.map((v, i) => {
        if ("element" in v) {
          return (
            <FlowerDecoration key={i} _type="bunch" _scale={v.props?._scale} />
          );
        }

        return (
          <img
            key={i}
            src={v.src}
            alt="Flower icon"
            style={{ transform: v.transform }}
          />
        );
      })}
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerStrip = styled(_FlowerStrip).attrs(
  (props: FlowerStripProps): FlowerStripProps => {
    return {
      _type: "blue",
      ...props,
    };
  }
)<FlowerStripProps>`
  ${(props) => css`
    display: grid;
    justify-items: center;
    align-items: center;
    /* column-gap: 2.5rem; */
    column-gap: 0.5rem;

    margin: var(--margin-big);
    overflow: visible;

    > img,
    > div {
      width: 100%;
    }

    ${props._noResponsive
      ? ""
      : `
      @media screen and (max-width: 500px) {
        margin: 0;
        margin-left: calc(100vw - 100% * 1.5);
        margin-top: 1rem;
        width: 100vw;
        position: absolute;

        ${parseCSS(props._style)}
      }
    `}

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default FlowerStrip;
// #endregion
