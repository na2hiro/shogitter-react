import React, {FunctionComponent, useContext} from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./dnd/Constants";
import {Direction, Species} from "shogitter-ts/lib/Ban";
import {XYObj} from "./Board";
import {zoomToPieceSizeX, zoomToPieceSizeY} from "./utils/responsive";
import {ConfigContext, ReverseContext, ZoomContext} from "./utils/contexts";
import {usePreview} from "react-dnd-multi-backend";
import { Teban } from "shogitter-ts/lib/Teban";

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
    return <RawPiece {...{direction, species}} onClick={() => onClick(position)} ref={drag} style={{
            opacity: isDragging ? 0 : 1,
        }
    }/>
}

export const PiecePreview = () => {
    const {display, itemType, item, style} = usePreview();
    return display && <RawPiece direction={item.direction} species={item.species} style={style} />;
}

export const NullPiece = (props) => {
    return <RawPiece {...props} />
}

type RawPieceProps = {
    direction?: Direction;
    species?: Species;
    [prop: string]: any
}

const RawPiece = React.forwardRef<HTMLImageElement, RawPieceProps>(({direction, species, ...props}, ref) => {
    const zoom = useContext(ZoomContext);
    const isReverse = useContext(ReverseContext);
    const {publicPath} = useContext(ConfigContext);
    if(!props.style) {
        props.style = {};
    }
    props.style = {
        ...props.style,
        width: `${zoomToPieceSizeX[zoom]}px`,
        height: `${zoomToPieceSizeY[zoom]}px`,
        verticalAlign: "middle",
    }
    let filename = "___";
    if(species && (typeof direction !== "undefined")) {
        filename = (isReverse ? Teban.reverse(direction) : direction)+species
    }
    return <img src={`${publicPath}/img/koma/${filename}.png`} {...props} ref={ref} />
});


export default Piece;
