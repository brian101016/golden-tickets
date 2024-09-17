import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import FlowerBranches from "./FlowerBranches";
import FlowerBunch from "./FlowerBunch";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// FlowerEmphasis => Rename all instances to use (CTRL + SHIFT + L)
type FlowerEmphasisProps = {
  _reverse?: boolean;
  _type?: "FlowerBranches" | "FlowerBunch";
  children?: React.ReactNode;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _FlowerEmphasis = (props: FlowerEmphasisProps) => {
  const rev = props._reverse;

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " flower-emphasis text-ellipsis"}>
      <div className="border-item flex-col-center">
        {props._type === "FlowerBranches" ? (
          <FlowerBranches
            _rotate={rev ? 180 : 0}
            _style={{
              width: "auto",
            }}
          />
        ) : (
          <FlowerBunch
            _scale={rev ? "-1, 1" : ""}
            _style={{
              width: "auto",
            }}
          />
        )}
      </div>

      {props.children}

      <div className="border-item flex-col-center">
        {props._type === "FlowerBranches" ? (
          <FlowerBranches
            _rotate={rev ? 0 : 180}
            _style={{
              width: "auto",
            }}
          />
        ) : (
          <FlowerBunch
            _scale={rev ? "" : "-1, 1"}
            _style={{
              width: "auto",
            }}
          />
        )}
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerEmphasis = styled(_FlowerEmphasis).attrs(
  (props: FlowerEmphasisProps): FlowerEmphasisProps => {
    return {
      _type: "FlowerBranches",
      ...props,
    };
  }
)<FlowerEmphasisProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    display: grid;
    justify-content: space-around;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;

    .border-item {
      align-self: stretch;
      min-height: 4.5rem;
    }

    @media screen and (max-width: 500px) {
      grid-template-columns: minmax(10%, 33%) minmax(33%, 80%) minmax(10%, 33%);

      .border-item {
        align-self: center;
        width: 100%;
        min-height: 0;
        aspect-ratio: 1 / 1;
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default FlowerEmphasis;
// #endregion
