import styled, { css } from "styled-components";
import { parseCSS } from "scripts/FunctionsBundle";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// Column => Rename all instances to use (CTRL + SHIFT + L)
type ColumnProps = {
  _items: Array<{
    title: string;
    children?: Array<string>;
  }>;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _Column = (props: ColumnProps) => {
  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " column"}>
      {props._items.map((item, ind) => (
        <div key={ind} className="column-item">
          <span className="column-title">{item.title}</span>

          {item.children && (
            <div className="column-children">
              {item.children.map((child, ind2) => (
                <span key={`${ind}-${ind2}`}>{child}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const Column = styled(_Column).attrs((props: ColumnProps): ColumnProps => {
  return { ...props };
})<ColumnProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default Column;
// #endregion
