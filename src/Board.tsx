/** @jsx jsx */
import {jsx, css} from "@emotion/core";
import React, {FunctionComponent, useContext} from "react";
import { BanObj } from "shogitter-ts/lib/Ban";
import { PreviousMove } from "shogitter-ts/lib/Kifu";
import Cell from "./Cell";
import {Position} from "./Piece";
import {ReverseContext, RuleContext} from "./utils/contexts";

export type XYObj = {x: number, y: number};
type BoardProps = {
    board: BanObj;
    onClick: (xy: XYObj) => void;
    onDrag: (pos: Position) => void;
    onDrop: (xy: XYObj) => void;
    onClear: () => void;
    activeCells: XYObj[];
    moving: Position | null;
    previousMove: PreviousMove | null
}
const Board: FunctionComponent<BoardProps> = (props) => {
    const {board, activeCells, moving, previousMove, ...rest} = props;
    const {size} = useContext(RuleContext)!;
    const reversed = useContext(ReverseContext);
    // TODO size
    const trs: JSX.Element[] = [];

    const handleCell = (x, y, tds) => {
        const active = activeCells.filter(xy=>xy.x==x && xy.y==y).length>0;
        const lastTo = !!previousMove && previousMove.to.x==x && previousMove.to.y == y;
        tds.push(<td key={x}>
            <Cell data={board[x-1][y-1]} xy={{x, y}} active={active} moving={moving!==null && ("x" in moving) && (moving.x==x && moving.y==y)}
                  {...rest} lastTo={lastTo} />
        </td>);
    }
    if(reversed) {
        for(let y=size[1]; y>=1; y--) {
            const tds: JSX.Element[] = [];
            for(let x=1; x<=size[0]; x++) {
                handleCell(x, y, tds);
            }
            trs.push(<tr key={y}>{tds}</tr>);
        }
    } else{
        for(let y=1; y<=size[1]; y++) {
            const tds: JSX.Element[] = [];
            for(let x=size[0]; x>=1; x--) {
                handleCell(x, y, tds);
            }
            trs.push(<tr key={y}>{tds}</tr>);
        }
    }
    return <div>
        <table css={css`
border-collapse: collapse;
margin: 0 auto;

td {
    border: 1px black solid;
    padding: 0;
}
`}>
            <tbody>
            {trs}
            </tbody>
        </table>
    </div>
}
export default Board;
