import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import IP from "@utils/ImageProvider";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// FlowerBranches => Rename all instances to use (CTRL + SHIFT + L)
type FlowerBranchesProps = {
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
const _FlowerBranches = (props: FlowerBranchesProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <div
        style={{
          width: "56.3511%",
          height: "91.7288%",
          transform: "translate(39.1807%, -21.3790%) rotate(89.7379deg)",
        }}
      >
        <img src={IP.shape.flower_lilac} alt="flower lilac" />
      </div>

      <div
        style={{
          width: "39.2287%",
          height: "63.8569%",
          transform: "translate(35.8123%, 49.1149%) rotate(151.653deg)",
        }}
      >
        <img src={IP.shape.flower_lilac} alt="flower lilac" />
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerBranches = styled(_FlowerBranches).attrs(
  (props: FlowerBranchesProps): FlowerBranchesProps => {
    return {
      _x: "0px",
      _y: "0px",
      _scale: 1,
      _rotate: 0,
      ...props,
    };
  }
)<FlowerBranchesProps>`
  ${(props) => css`
    position: relative;
    /* width: 142.544px;
    height: 154.209px; */
    width: 500px;
    aspect-ratio: 142.544 / 154.209;
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
export default FlowerBranches;
// #endregion
