import styled, { css } from "styled-components";
import {
  getImageSize,
  parseCSS,
  useRefCallback,
} from "scripts/FunctionsBundle";
import { useCallback } from "react";
import IP from "@utils/ImageProvider";

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
  _autoheight?: boolean | string;
  /** Overrides the default `background-position: top center;` from the `bg-img` element. */
  _bgPosition?: string;

  /** Children to append to the container generated. */
  children?: React.ReactNode;
  /** If the children would get a `height: 100%;` by selector `bg-image > *`. */
  _childmax?: boolean;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _Paralax = (props: ParalaxProps) => {
  const onMount = useCallback(
    async (el: HTMLElement) => {
      const size = await getImageSize(props._src);
      // console.log("Mounted on image", props._src, "with size", size);

      function handleAdjustSize() {
        const num = visualViewport!.height * size.width;

        if (el.offsetWidth > num / size.height)
          el.style.backgroundSize = el.offsetWidth + "px auto";
        else el.style.backgroundSize = "auto 100%";
      }

      handleAdjustSize();

      window.addEventListener("resize", handleAdjustSize);
      return (el: HTMLElement) => {
        window.removeEventListener("resize", handleAdjustSize);
        // console.log("unmounted on image", props._src, "with elem", el);
      };
    },
    [props._src]
  );

  const setref = useRefCallback(onMount);

  // ---------------------------------------------------------------------- RETURN
  return (
    <div
      className={props.className + (props._shape ? " bg-image-container" : "")}
    >
      <div className={"bg-image " + (props._shape || "")} ref={setref}>
        {props.children}
      </div>
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

    background-image: url(${IP.bg.granular});
    background-position: center;
    background-size: cover;

    .bg-image {
      background-image: url(${props._src});
      background-size: auto 100%;

      background-position: ${props._bgPosition};
      height: ${props._autoheight === true ? "auto" : props._autoheight || ""};

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
