import Shogi, {ShogiSerialization} from "shogitter-ts";
import React, {FunctionComponent, useMemo} from "react";
import {PlayerInfo} from "shogitter-ts/lib/Teban";
import {BanObj, Direction, Species} from "shogitter-ts/lib/Ban";

import "./Board.css";
import XY from "shogitter-ts/lib/XY";

export type Props = {
    data: ShogiSerialization
}
const Shogitter: FunctionComponent<Props> = ({data}) => {
    const {ban, players, ...rest} = data;
    const shogitter: Shogi = useMemo(() => new Shogi(data), [data]);
    return <div style={{display: "flex", flexDirection: "column"}}>
        <pre>
            {JSON.stringify(rest, null, 2)}
        </pre>
        <div style={{display: "flex"}}>
            <Player player={players[1]}/>
            <Board board={ban} onClick={({x, y}) => {
                console.log(shogitter.ban.get(new XY(x+1, y+1)).getMovable().map(xy=>xy.XY.toString()));
            }}/>
            <Player player={players[0]}/>
        </div>
    </div>
};
type XYObj = {x: number, y: number};

type BoardProps = {
    board: BanObj;
    onClick: (xy: XYObj) => void;
}
const Board: FunctionComponent<BoardProps> = ({board, onClick}) => {
    // TODO size
    const trs = [];
    for(let y=0; y<9; y++) {
        const tds = [];
            for(let x=8; x>=0; x--) {
            tds.push(<td key={x}><Cell data={board[x][y]} onClick={() => onClick({x, y})}/></td>);
        }
        trs.push(<tr key={y}>{tds}</tr>);
    }
    return <div className="Shogitter-Board">
        <table>
            <tbody>
                {trs}
            </tbody>
        </table>
    </div>
}

type CellProps = {
    data: [Direction, Species] | [];
    onClick: () => void;
}

const Cell: FunctionComponent<CellProps> = ({data, onClick}) => {
    if(data.length==0) {
        return <img src={`./img/koma/___.png`} onClick={onClick} />;
    } else {
        return <Piece direction={data[0]} species={data[1]} onClick={onClick} />
    }

}

type PieceProps = {
    species: Species;
    direction: Direction;
    onClick: () => void;
}
const Piece: FunctionComponent<PieceProps> = ({species, direction, onClick}) => {
    return <img src={`./img/koma/${direction}${species}.png`} onClick={onClick}/>;
}

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