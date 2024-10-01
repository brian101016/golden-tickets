import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";
import DecorationWrapper from "@components/DecorationWrapper";
import FlowerStrip from "@components/FlowerStrip";
import IP from "@utils/ImageProvider";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// BackgroundScreen => Rename all instances to use (CTRL + SHIFT + L)
type BackgroundScreenProps = {} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _BackgroundScreen = (props: BackgroundScreenProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <DecorationWrapper
        _wrappers={[{ _type: "corner", _reverse: true }, { _type: "clouds" }]}
      >
        <FlowerStrip _type="blue" _vertical />
      </DecorationWrapper>

      <div />

      <DecorationWrapper
        _wrappers={[{ _type: "corner" }, { _type: "clouds", _reverse: true }]}
      >
        <FlowerStrip _type="blue" _vertical />
      </DecorationWrapper>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const BackgroundScreen = styled(_BackgroundScreen).attrs(
  (props: BackgroundScreenProps): BackgroundScreenProps => {
    return { ...props };
  }
)<BackgroundScreenProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    position: fixed;
    inset: 0;

    display: grid;
    grid-template-columns: 1fr minmax(auto, 1024px) 1fr;

    background-image: url(${IP.bg.granular});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    ${parseCSS(props._style)};
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default BackgroundScreen;
// #endregion
