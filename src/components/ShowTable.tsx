import styled, { css } from "styled-components";
import {
  parseCSS,
  parseDate,
  parseID,
  useRefresh,
} from "scripts/FunctionsBundle";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as _T from "@utils/ClassTypes";
import Input from "./Input";
import CopyLink from "./CopyLink";

// #region ##################################################################################### PROPS
type _Base = import("@utils/ClassTypes")._Base;
// ShowTable => Rename all instances to use
export type ShowTableProps = {
  _data: _T.Ticket[];
  _handleDelete: (d: _T.Ticket) => void;
  _handleEdit: (d: _T.Ticket) => void;
} & _Base;
// #endregion

// #region ##################################################################################### COMPONENT
const _ShowTable = (props: ShowTableProps) => {
  const [LS] = useState({
    family: "",
    member: "",
    showRecentFirst: false,
  });
  const [refresh] = useRefresh();
  const [sortedData, setSortedData] = useState<_T.Ticket[]>([]);
  const [accepted, setAccepted] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  // ---------------------------------------------------------------------- USE EFFECT - SORT
  const updateSorting = useCallback(() => {
    const a = [...props._data].sort((a, b) => {
      if (LS.showRecentFirst) {
        const aa = a.lastSeen || 0;
        const bb = b.lastSeen || 0;

        return aa > bb ? -1 : aa < bb ? 1 : 0;
      }

      const aa = parseID(a.family);
      const bb = parseID(b.family);
      return aa > bb ? 1 : aa < bb ? -1 : 0;
    });

    setSortedData(a);
  }, [LS.showRecentFirst, props._data]);
  useEffect(updateSorting, [updateSorting]);

  // ---------------------------------------------------------------------- USE CALLBACK - FILTER
  const getFilter = useMemo(() => {
    // -------------------------------------------------- AUX DATA
    let acceptedMemberCount = 0;
    let totalMemberCount = 0;
    let prev = "";
    const returnData: React.JSX.Element[] = [];
    let aux: React.JSX.Element[] = [];
    function scut() {
      if (!prev)
        return <h2 className="no-results">No hay información a mostrar</h2>;

      return (
        <div className="table-entry" key={prev}>
          <h2
            className="table-entry-title no-selectable"
            title="Pulsa para contraer"
            onClick={(e) =>
              (e.target as HTMLElement).classList.toggle("collapsed")
            }
          >
            {prev}
          </h2>
          <div className="table-entry-content">{aux}</div>
        </div>
      );
    }

    // -------------------------------------------------- FOR EACH
    sortedData.forEach((d, index) => {
      // ============================== COUNT PERCENTAGE
      const memFil = parseID(LS.member);
      let filPassed = !LS.member;
      for (const member of d.members) {
        if (member.accepted) acceptedMemberCount++;
        if (!filPassed) filPassed = parseID(member.name).includes(memFil);
      }
      totalMemberCount += d.members.length;

      // ============================== FILTER
      const n = parseID(d.family);
      if (!filPassed || (LS.family && !n.includes(parseID(LS.family)))) return;

      // ============================== RETURN
      const rt = (
        <div className="family-container" key={index}>
          <div className="family-header">
            <h2 className="family-title">{d.family}</h2>
            <i>
              (Último acceso:{" "}
              <b>{d.lastSeen ? parseDate(d.lastSeen, true, false) : "N/A"}</b>)
            </i>
            <CopyLink _ticketid={d.id || ""} />
            <button className="secondary" onClick={() => props._handleEdit(d)}>
              Editar
            </button>
            <button className="danger" onClick={() => props._handleDelete(d)}>
              Eliminar
            </button>
          </div>

          <div className="family-content">
            <span className="family-content-header">Nombre</span>
            <span className="family-content-header">Confirmado?</span>
            <span className="family-content-header">Fecha</span>

            {d.members &&
              d.members.map((memb, i) => {
                const cln = memb.accepted ? "accepted" : "";
                return (
                  <Fragment key={i}>
                    <span className={cln}>{memb.name}</span>
                    <span className={cln}>{memb.accepted ? "Si" : "No"}</span>
                    <span className={cln}>
                      {memb.acceptedDate
                        ? parseDate(memb.acceptedDate, true, false)
                        : "N/A"}
                    </span>
                  </Fragment>
                );
              })}
          </div>
        </div>
      );

      // ============================== PREV CHANGE
      const x = n[0].toUpperCase();
      if (prev < x) {
        if (!prev) {
          // SAVE CURRENT
          prev = x;
          aux.push(rt);
          return;
        }

        // SAVE PREV
        returnData.push(scut());

        prev = x;
        aux = [];
      }

      // SAVE CURRENT
      aux.push(rt);
    });

    // SAVE LAST PREV
    returnData.push(scut());
    setAccepted(acceptedMemberCount);
    setTotalMembers(totalMemberCount);

    return returnData;
  }, [sortedData, LS.family, LS.member, props]);

  // ---------------------------------------------------------------------- RETURN
  return (
    <div className={props.className + " show-table"}>
      {/* -------------------------------------------------- CONTROLS CONTAINER */}
      <div className="controls-container">
        <Input
          _store={LS}
          _store_var={"family"}
          _label={"Familia"}
          _placeholder={"Buscar"}
          _width={"max"}
          _type={"search"}
        />

        <Input
          _store={LS}
          _store_var={"member"}
          _label={"Invitado"}
          _placeholder={"Buscar"}
          _width={"max"}
          _type={"search"}
        />

        <Input
          _store={LS}
          _store_var={"showRecentFirst"}
          _label={"Últimos confirmados"}
          _type={"checkbox"}
        />

        <div style={{ flexGrow: 1 }}>
          <button className="logout" onClick={refresh}>
            Buscar
          </button>
        </div>
      </div>

      <span>
        Ha(n) aceptado <b>{accepted}</b> invitado(s) de <b>{totalMembers}</b> (
        {Math.floor((accepted / (totalMembers || 1)) * 100)}%).
      </span>

      {/* -------------------------------------------------- TICKETS CONTAINER */}
      <div className="table-container">{getFilter}</div>
    </div>
  );
};
// #endregion

// #region ##################################################################################### STYLES
const ShowTable = styled(_ShowTable).attrs((props: _Base): _Base => {
  return props;
})<ShowTableProps>`
  ${(props) => css`
    // Ingresa aquí todos los estilos.
    ${parseCSS(props._style)}
  `}
`;
// #endregion

// #region ##################################################################################### EXPORTS
export default ShowTable;
// #endregion
