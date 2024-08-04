import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// LandingScreen => Rename all instances to use (CTRL + SHIFT + L)
type ImageHolderProps = {
  children?: React.ReactNode;

  _debug?: boolean;
  _selectable?: boolean;

  _image?: {
    _src?: string;
    _alt?: string;
    _size?: [string, string] | string;
    _position?: number;
    _layer?: "top" | "bottom";
  } & _Base;

  _canvas?: {
    _width?: string;
    _height?: string;
    _position?:
      | {
          top?: string;
          left?: string;
          bottom?: string;
          right?: string;
        }
      | "top"
      | "bottom"
      | "bottom-in"
      | "top-in";
  } & _Base;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _ImageHolder = (props: ImageHolderProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <div
        className={props._canvas?.className + " imageholder-canvas"}
        onTouchStart={(e) => {
          e.preventDefault();
        }}
      >
        {props.children ? (
          props.children
        ) : (
          <img
            className={
              props._image?.className + " imageholder-image singleImage"
            }
            src={props._image?._src}
            alt={props._image?._alt}
          />
        )}
      </div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const ImageHolder = styled(_ImageHolder).attrs(
  (props: ImageHolderProps): ImageHolderProps => {
    var canvasPosition = {};
    var canvasDisplay = {};

    if (props._canvas?._position === "bottom-in")
      canvasPosition = { bottom: "0%" };
    else if (
      props._canvas?._position === "bottom" ||
      props._canvas?._position === undefined
    )
      canvasPosition = { top: "100%" };
    else if (props._canvas?._position === "top")
      canvasPosition = { bottom: "100%" };
    else if (props._canvas?._position === "top-in")
      canvasPosition = { top: "0%" };
    else canvasPosition = { ...props._canvas?._position };

    if ([2, 5, 8].includes(props._image?._position || 0))
      canvasDisplay = { justifyContent: "center" };
    else if ([3, 6, 9].includes(props._image?._position || 0))
      canvasDisplay = { justifyContent: "flex-end" };
    else canvasDisplay = { justifyContent: "flex-start" };

    if ([4, 5, 6].includes(props._image?._position || 0))
      canvasDisplay = { ...canvasDisplay, alignItems: "center" };
    else if ([1, 2, 3].includes(props._image?._position || 0))
      canvasDisplay = { ...canvasDisplay, alignItems: "flex-end" };
    else canvasDisplay = { ...canvasDisplay, alignItems: "flex-start" };

    return {
      _debug: false,
      _selectable: false,
      ...props,

      _canvas: {
        _position: "bottom",
        _width: "100%",
        _height: "auto",
        ...props._canvas,
        _style: {
          ...canvasDisplay,
          ...canvasPosition,
          ...props._canvas?._style,
        },
      },

      _image: {
        _position: 7,
        _alt: "Displayed Image",
        _size: "auto",
        _src: "https://picsum.photos/200/300",
        _layer: "bottom",
        ...props._image,
      },
    };
  }
)`
  ${(props) => css`
    position: relative;

    .imageholder-canvas {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow: hidden;
      position: absolute;
      width: 100%;
      height: max-content;
      pointer-events: inherit;
      z-index: inherit;

      width: ${props._canvas?._width};
      height: ${props._canvas?._height};
      background: ${props._debug
        ? `repeating-linear-gradient(45deg, #606cbc2a, #606cbc2a 10px, #4652982a 10px, #4652982a 20px)`
        : ""};

      ${parseCSS(props._canvas?._style)}

      .imageholder-image {
        position: relative;
        pointer-events: inherit;
        z-index: inherit;

        width: ${typeof props._image?._size !== "string"
          ? props._image?._size![0]
          : props._image?._size} !important;
        height: ${typeof props._image?._size !== "string"
          ? props._image?._size![1]
          : props._image?._size} !important;

        ${parseCSS(props._image?._style)}

        span {
          display: block !important;
          position: relative !important;
          pointer-events: inherit !important;
          width: 100% !important;
          height: 100% !important;
          z-index: inherit !important;
        }

        &.singleImage {
          position: relative;
          pointer-events: inherit;
          z-index: inherit;

          width: ${typeof props._image?._size !== "string"
            ? props._image?._size![0]
            : props._image?._size} !important;
          height: ${typeof props._image?._size !== "string"
            ? props._image?._size![1]
            : props._image?._size} !important;

          ${parseCSS(props._image?._style)}
        }
      }
    }

    ${props._selectable === false &&
    css`
      pointer-events: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -o-user-select: none;
      * {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -o-user-select: none;
      }
    `}

    z-index: ${props._image?._layer === "top" ? "5" : "-5"};

    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default ImageHolder;
// #endregion
