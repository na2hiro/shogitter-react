import React, {FunctionComponent} from "react";
import { PlayerInfo } from "shogitter-ts/lib/Teban";
import Piece, {Position} from "./Piece";
import { Direction } from "shogitter-ts/lib/Ban";

type Props = {
    data: PlayerInfo;
    direction: Direction;
    onClick: (pos: Position) => void;
    onDrag: (pos: Position) => void;
    onClear: () => void;
}
const Hand: FunctionComponent<Props> = (props) => {
    const {data, direction, ...rest} = props;
    const pieces: JSX.Element[] = [];
    for(const species in data.mochigoma) {
        for(let i=0; i<data.mochigoma[species]; i++) {
            pieces.push(<Piece species={species} direction={direction} {...rest} position={{direction, species}} />);
        }
    }
    return <div style={{display: "flex", flexDirection: "column", backgroundColor: "#eee", height: "100%"}}>
        <div style={{backgroundColor: "#ddd"}}>
            {data.user.map(user=>user.name).join(" ") || <>&nbsp;</>}
        </div>
        <div style={{height: "100%"}}>
            {pieces}
        </div>
    </div>
}

export default Hand;
