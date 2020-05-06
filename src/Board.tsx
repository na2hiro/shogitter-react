import React, {FunctionComponent} from "react";
import { BanObj } from "shogitter-ts/lib/Ban";
import Backend from "react-dnd-multi-backend";
import {DndProvider} from "react-dnd";
import Cell from "./Cell";
import MouseToTouch from "./dnd/MouseToTouch";
import PiecePreview from "./PiecePreview";

export type XYObj = {x: number, y: number};
type BoardProps = {
    board: BanObj;
    onClick: (xy: XYObj) => void;
    onDrag: (xy: XYObj) => void;
    onDrop: (xy: XYObj) => void;
    onClear: () => void;
    activeCells: XYObj[];
    moving: XYObj | null;
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
                <Cell data={board[x-1][y-1]} xy={{x, y}} active={active} moving={moving!==null && (moving.x==x && moving.y==y)}
                    {...rest} />
            </td>);
        }
        trs.push(<tr key={y}>{tds}</tr>);
    }
    return <div className="Shogitter-Board">
        <DndProvider backend={Backend} options={MouseToTouch}>
            <PiecePreview />
            <table>
                <tbody>
                {trs}
                </tbody>
            </table>
        </DndProvider>
    </div>
}
export default Board;
