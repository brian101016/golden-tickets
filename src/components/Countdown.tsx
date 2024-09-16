import styled, { css } from "styled-components";
import { parseCSS, timeBetween } from "scripts/FunctionsBundle";
import React, { useEffect, useState } from "react";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// Countdown => Rename all instances to use (CTRL + SHIFT + L)
type CountdownProps = {
  _goal?: Date;
  _includeDays?: boolean;
  _includeHours?: boolean;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _Countdown = (props: CountdownProps) => {
  const [time, setTime] = useState<React.ReactNode>("Calculando...");

  useEffect(() => {
    const intv = setInterval(() => {
      const tb = timeBetween(new Date("2024-12-21T20:00:00Z"));
      let str = (
        <span>
          {tb.month && (
            <>
              <span className="text-number">{tb.month}</span>
              {" meses "}
            </>
          )}
          {tb.date && (
            <>
              <span className="text-number">{tb.date}</span>
              {" días "}
            </>
          )}
          {tb.hours && (
            <>
              <span className="text-number">{tb.hours}</span>
              {" horas "}
            </>
          )}
        </span>
      );

      setTime(str);
    }, 1000);

    return () => clearInterval(intv);
  }, []);

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className}>
      <span>{time}</span>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const Countdown = styled(_Countdown).attrs(
  (props: CountdownProps): CountdownProps => {
    return { ...props };
  }
)<CountdownProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default Countdown;
// #endregion
