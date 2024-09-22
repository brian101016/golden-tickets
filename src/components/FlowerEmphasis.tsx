import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import FlowerDecoration from "./FlowerDecoration";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
type FDprops = import("./FlowerDecoration").FlowerDecorationProps;
type _type = FDprops["_type"];
// FlowerEmphasis => Rename all instances to use (CTRL + SHIFT + L)
type FlowerEmphasisProps = {
  /** Shows the items flipped. */
  _reverse?: boolean;
  /** Type of the decoration to render. */
  _type: _type;

  children?: React.ReactNode;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _FlowerEmphasis = (props: FlowerEmphasisProps) => {
  const aux: FDprops = {
    _type: props._type,
  };
  const aux2: FDprops = {
    _type: props._type,
  };

  function checkRev<T>(item1: T, item2: T): [T, T] {
    return props._reverse ? [item2, item1] : [item1, item2];
  }

  if (props._type === "branches") {
    [aux._rotate, aux2._rotate] = checkRev(0, 180);
  } else if (props._type === "bunch") {
    [aux._scale, aux2._scale] = checkRev("1", "-1, 1");
  }

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " flower-emphasis text-ellipsis"}>
      <div className="border-item flex-col-center">
        <FlowerDecoration
          {...aux}
          _style={{
            width: "auto",
          }}
        />
      </div>

      {props.children}

      <div className="border-item flex-col-center">
        <FlowerDecoration
          {...aux2}
          _style={{
            width: "auto",
          }}
        />
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const FlowerEmphasis = styled(_FlowerEmphasis).attrs(
  (props: FlowerEmphasisProps): FlowerEmphasisProps => {
    return {
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
