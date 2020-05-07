import React, {FunctionComponent} from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./dnd/Constants";
import {Direction, Species} from "shogitter-ts/lib/Ban";
import {XYObj} from "./Board";

export type Position = XYObj | InHand;
export type InHand = {
    direction: Direction;
    species: Species
};

type Props = {
    species: Species;
    direction: Direction;
    onClick: (pos: Position) => void;
    onDrag: (pos: Position) => void;
    onClear: () => void;
    position: Position;
}
const Piece: FunctionComponent<Props> = ({species, direction, onClick, onDrag, onClear, position}) => {
    const [{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.PIECE_ON_BOARD,
            species,
            direction
        },
        begin: monitor => onDrag(position),
        end: (item, monitor) => {
            if (monitor && !monitor.didDrop()) {
                onClear();
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return <>
        <img src={`./img/koma/${direction}${species}.png`} onClick={() => onClick(position)} ref={drag}
             style={{opacity: isDragging ? 0 : 1}}/>
    </>;

}

export default Piece;
