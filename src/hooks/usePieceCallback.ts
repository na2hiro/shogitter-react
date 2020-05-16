import {useCallback, useState, useEffect} from "react";
import {InHand, Position} from "../Piece";
import {XYObj} from "../Board";
import XY from "shogitter-ts/lib/XY";
import Shogi, { KifuCommand } from "shogitter-ts";
import { Direction } from "shogitter-ts/lib/Ban";

const usePieceCallback = (shogitter: Shogi, onCommand: (command: KifuCommand) => void) => {
    const [activeCells, setActiveCells] = useState<XYObj[]>([]);
    const [moving, setMoving] = useState<Position | null>(null);
    useEffect(() => {
        setActiveCells([]);
        setMoving(null);
    }, [shogitter]);

    const onDrag = useCallback((pos: Position) => {
        console.log("drag", pos)
        setMoving(pos);
        if("x" in pos) {
            // Don't block UI
            setTimeout(() => {
                const cells = shogitter.ban.get(new XY(pos.x, pos.y)).getMovable().map(xy => ({x: xy.XY.x, y: xy.XY.y}));
                setActiveCells(cells)
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
                nari: canPromote(shogitter.teban.getNowDirection(), moving, xy) && confirm("Promote?")
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
    }, [shogitter, moving, activeCells]);
    const onHandClick = useCallback((xy: InHand)=>{
        console.log("hand click")
        if (moving) {
            onClear();
        }
        onDrag(xy);
    }, [shogitter, moving]);

    return {
        moving,
        activeCells,
        onDrag,
        onDrop,
        onClear,
        onCellClick,
        onHandClick,
    }
}

/**
 * TODO: Proper promotion confirmation using PromotionStrategy
 */
const canPromote = (tebanDirection: Direction, from: XYObj, to: XYObj) => {
    switch(tebanDirection){
        case Direction.BLACK:
            return from.y<=3 || to.y<=3;
        case Direction.WHITE:
            return from.y>=7 || to.y>=7;
    }
}

export default usePieceCallback;