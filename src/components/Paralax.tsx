import styled, { css } from "styled-components";
import {
  getImageSize,
  parseCSS,
  parseNumber,
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
  /** Overrides the default `background-position: top center;` from the `bg-img` element.
   * `string`s are used as is. `number`s are used as percentage where 0.1 = 10%. */
  _bgPosition?: [string | number, string | number | undefined];

  /** Children to append to the container generated. */
  children?: React.ReactNode;
  /** If the children would get a `height: 100%;` by selector `bg-image > *`. */
  _childmax?: boolean;

  _debug?: boolean;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _Paralax = (props: ParalaxProps) => {
  const onMount = useCallback(
    async (el: HTMLElement) => {
      const size = await getImageSize(props._src);
      const aspc = size.width / size.height;
      let prev = {
        y: -100,
        x: -100,
      };

      function handleAdjustSize() {
        // Support for mobile showing or not the URL bar
        const screenY = parseNumber(
          getComputedStyle(document.documentElement).maxHeight
        );
        const screenX = el.offsetWidth;

        // CHECK CACHE
        if (prev.x === screenX && prev.y === screenY) return;
        prev.x = screenX;
        prev.y = screenY;

        // CALCUALTE NEW RENDER COORDS
        const [rx, ry] =
          screenX / screenY > aspc
            ? [screenX, screenX / aspc]
            : [screenY * aspc, screenY];
        el.style.backgroundSize = `${rx}px ${ry}px`;

        // ADJUST POSITIONS
        if (!props._bgPosition) return;
        const percX = props._bgPosition[0];
        const percY = props._bgPosition[1] ?? percX;

        const posX =
          typeof percX === "number" ? (screenX - rx) * percX + "px" : percX;
        const posY =
          typeof percY === "number" ? (screenY - ry) * percY + "px" : percY;

        el.style.backgroundPositionX = posX;
        el.style.backgroundPositionY = posY;
      }

      handleAdjustSize();

      window.addEventListener("resize", handleAdjustSize);
      return () => window.removeEventListener("resize", handleAdjustSize);
    },
    [props._src, props._bgPosition]
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
