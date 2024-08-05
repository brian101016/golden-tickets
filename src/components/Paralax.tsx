import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// Paralax => Rename all instances to use (CTRL + SHIFT + L)
type ParalaxProps = {
  /** URL from where to obtain the background image. */
  _src: string;

  /** Show the background through a frame with this shape. */
  _shape?: "square" | "circle";
  /** Filters to apply to the `::after` element. */
  _filter?: string;
  /** Overrides the default of `height: 90svh;` from the `bg-img` element. */
  _autoheight?: boolean;

  /** Children to append to the container generated. */
  children?: React.ReactNode;
  /** If the children would get a `height: 100%;` by selector `bg-image > *`. */
  _childmax?: boolean;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _Paralax = (props: ParalaxProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div
      className={props.className + (props._shape ? " bg-image-container" : "")}
    >
      <div className={"bg-image " + (props._shape || "")}>{props.children}</div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const Paralax = styled(_Paralax).attrs((props: ParalaxProps): ParalaxProps => {
  return { ...props };
})<ParalaxProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.

    .bg-image {
      background-image: url(${props._src});
      height: ${props._autoheight ? "auto" : ""};

      &::before {
        backdrop-filter: ${props._filter};
      }

      > * {
        height: ${props._childmax ? "100%" : ""};
      }
    }

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default Paralax;
// #endregion
