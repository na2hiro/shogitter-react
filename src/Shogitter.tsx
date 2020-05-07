import Shogi, {ShogiSerialization, KifuCommand} from "shogitter-ts";
import React, {FunctionComponent, useCallback, useMemo, useState} from "react";
import History from "./History";

import "./Board.css";
import XY from "shogitter-ts/lib/XY";
import Board, {XYObj} from "./Board";
import Hand from "./Hand";
import {Position} from "./Piece";
import {DndProvider} from "react-dnd-multi-backend";
import MouseToTouch from "./dnd/MouseToTouch";
import PiecePreview from "./PiecePreview";

export type Props = {
    data: ShogiSerialization;
    onCommand: (command: KifuCommand) => void
}
const Shogitter: FunctionComponent<Props> = ({data, onCommand}) => {
    const {ban, players, kifu, ...rest} = data;
    const [activeCells, setActiveCells] = useState<XYObj[]>([]);
    const [moving, setMoving] = useState<Position | null>(null);
    const shogitter: Shogi = useMemo(() => new Shogi(data), [data]);

    const onDrag = useCallback((pos: Position) => {
        console.log("drag", pos)
        setMoving(pos);
        if("x" in pos) {
            // Don't block UI
            setTimeout(() => {
                setActiveCells(shogitter.ban.get(new XY(pos.x, pos.y)).getMovable().map(xy => ({x: xy.XY.x, y: xy.XY.y})))
            })
        }
    }, [shogitter])
    const onDrop = useCallback((xy: XYObj) => {
        if(moving===null) {

        }else if("species" in moving) {
            onCommand({
                put: moving.species,
                to: [xy.x, xy.y],
                id: 0 // TODO
            });
            onClear();
            return true;
        }else if(activeCells.filter(cell=>cell.x==xy.x&&cell.y==xy.y).length>0) {
            console.log("drop: execute", xy)
            // TODO: Unless nakamaware, we don't want to drop to a piece on the same side
            onCommand({
                from: [moving.x, moving.y],
                to: [xy.x, xy.y],
                nari: false
            })
            onClear();
            return true;
        } else if(("x" in moving && xy.x == moving!.x && xy.y == moving!.y) || !shogitter.ban.exists(new XY(xy.x, xy.y))) {
            console.log("drop: clear", xy)
            onClear();
            return true;
        } else {
            console.log("drop: drag", xy)
            return false;
        }
    }, [shogitter, moving, activeCells]);
    const onClear = useCallback(() => {
        setMoving(null);
        setActiveCells([])
    }, [shogitter]);

    const onCellClick = useCallback(({x, y}) => {
        console.log("click")
        const xy = new XY(x, y);
        if(moving){
            onDrop({x, y}) || onDrag({x, y});
        }else if (shogitter.ban.exists(xy)) {
            onDrag({x, y});
        }
    }, [shogitter, moving]);
    const onHandClick = useCallback(()=>{

    }, [shogitter, moving]);

    return <DndProvider options={MouseToTouch}>
        <PiecePreview />
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", height: "442px"}}>
                <div style={{display: "flex", flexDirection: "column", flexGrow: 1, width: 0}}>
                    <div style={{flex: "1 1 0px", height: 0}}>
                        <Hand data={players[1]} direction={1} {...{onDrag, onDrop, onClear}} onClick={onHandClick}/>
                    </div>
                    <div style={{flex: "1 1 0px", height: 0}}>
                        <History data={kifu}/>
                    </div>
                </div>
                <Board board={ban} onClick={onCellClick} activeCells={activeCells} moving={moving} {...{onDrag, onDrop, onClear}} />
                <div style={{display: "flex", flexDirection: "column", flexGrow: 1, width: 0}}>
                    <div style={{flex: "1 1 0px", height: 0}}>
                    </div>
                    <div style={{flex: "1 1 0px", height: 0}}>
                        <Hand data={players[0]} direction={0} {...{onDrag, onDrop, onClear}} onClick={onHandClick}/>
                    </div>
                </div>
            </div>
            <pre>
                {JSON.stringify(rest, null, 2)}
            </pre>
        </div>
    </DndProvider>
};

export default Shogitter;