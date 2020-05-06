import Shogi, {ShogiSerialization, KifuCommand} from "shogitter-ts";
import React, {FunctionComponent, useCallback, useMemo, useState} from "react";
import {PlayerInfo} from "shogitter-ts/lib/Teban";

import "./Board.css";
import XY from "shogitter-ts/lib/XY";
import Board, {XYObj} from "./Board";

export type Props = {
    data: ShogiSerialization;
    onCommand: (command: KifuCommand) => void
}
const Shogitter: FunctionComponent<Props> = ({data, onCommand}) => {
    const {ban, players, ...rest} = data;
    const [activeCells, setActiveCells] = useState<XYObj[]>([]);
    const [moving, setMoving] = useState<XYObj | null>(null);
    const shogitter: Shogi = useMemo(() => new Shogi(data), [data]);

    const onDrag = useCallback((xy: XYObj) => {
        setMoving(xy);
        setActiveCells(shogitter.ban.get(new XY(xy.x, xy.y)).getMovable().map(xy => ({x: xy.XY.x, y: xy.XY.y})))
    }, [shogitter])
    const onDrop = useCallback((xy: XYObj) => {
        onCommand({
            from: [moving!.x, moving!.y],
            to: [xy.x, xy.y],
            nari: false
        })
        onClear();
    }, [shogitter, moving]);
    const onClear = useCallback(() => {
        setMoving(null);
        setActiveCells([])
    }, [shogitter]);

    return <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex"}}>
            <Player player={players[1]}/>
            <Board board={ban} onClick={({x, y}) => {
                const xy = new XY(x, y);
                if(moving){
                    if(activeCells.filter(cell=>cell.x==x&&cell.y==y).length>0) {
                        // TODO: Unless nakamaware, we don't want to drop to a piece on the same side
                        onDrop({x, y});
                    } else if(shogitter.ban.exists(xy)) {
                        onDrag({x, y});
                    } else {
                        onClear();
                    }
                }else if (shogitter.ban.exists(xy)) {
                    onDrag(xy);
                }
            }} activeCells={activeCells} moving={moving} {...{onDrag, onDrop, onClear}} />
            <Player player={players[0]}/>
        </div>
        <pre>
            {JSON.stringify(rest, null, 2)}
        </pre>
    </div>
};

type PlayerProps = {
    player: PlayerInfo;
}
const Player: FunctionComponent<PlayerProps> = ({player}) => {
    return <div>
        <pre>
            {JSON.stringify(player, null, 2)}
        </pre>
    </div>
}

export default Shogitter;