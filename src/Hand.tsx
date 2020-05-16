import React, {FunctionComponent} from "react";
import Piece, {InHand} from "./Piece";
import { Direction } from "shogitter-ts/lib/Ban";
import { Player } from "shogitter-ts";
import { Teban } from "shogitter-ts/lib/Teban";

type Props = {
    data: Player;
    direction: Direction;
    turnDirection: Direction;
    onClick: (pos: InHand) => void;
    onDrag: (pos: InHand) => void;
    onClear: () => void;
}
const Hand: FunctionComponent<Props> = (props) => {
    const {data, direction, turnDirection, ...rest} = props;
    const pieces: JSX.Element[] = [];
    for(const species in data.mochigoma) {
        for(let i=0; i<data.mochigoma[species]; i++) {
            pieces.push(<Piece key={species+i} species={species} direction={direction} {...rest} position={{direction, species}} />);
        }
    }
    return <div style={{display: "flex", flexDirection: "column", backgroundColor: "#eee", height: "100%"}}>
        <div style={{backgroundColor: turnDirection==direction ? "#aaf" : "#ddd", textAlign: "center"}}>
            {Teban.getMark(direction)}
            {data.user.map(user=>user.name).join(" ") || <>&nbsp;</>}
        </div>
        <div style={{height: "100%"}}>
            {pieces}
        </div>
    </div>
}

export default Hand;
