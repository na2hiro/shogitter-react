/** @jsx jsx */
import {jsx, css} from "@emotion/core";
import React, {FunctionComponent} from "react";
import { BanObj } from "shogitter-ts/lib/Ban";
import Cell from "./Cell";
import {Position} from "./Piece";

export type XYObj = {x: number, y: number};
type BoardProps = {
    board: BanObj;
    onClick: (xy: XYObj) => void;
    onDrag: (pos: Position) => void;
    onDrop: (xy: XYObj) => void;
    onClear: () => void;
    activeCells: XYObj[];
    moving: Position | null;
}
const Board: FunctionComponent<BoardProps> = (props) => {
    const {board, activeCells, moving, ...rest} = props;
    // TODO size
    const trs: JSX.Element[] = [];
    for(let y=1; y<=9; y++) {
        const tds: JSX.Element[] = [];
        for(let x=9; x>=1; x--) {
            const active = activeCells.filter(xy=>xy.x==x && xy.y==y).length>0;
            tds.push(<td key={x}>
                <Cell data={board[x-1][y-1]} xy={{x, y}} active={active} moving={moving!==null && ("x" in moving) && (moving.x==x && moving.y==y)}
                    {...rest} />
            </td>);
        }
        trs.push(<tr key={y}>{tds}</tr>);
    }
    return <div className="Shogitter-Board">
        <table css={css`
border-collapse: collapse;

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
