import Shogi, {ShogiSerialization, KifuCommand} from "shogitter-ts";
import React, {FunctionComponent, useMemo} from "react";
import History from "./History";

import Board from "./Board";
import Hand from "./Hand";
import {DndProvider} from "react-dnd-multi-backend";
import MouseToTouch from "./dnd/MouseToTouch";
import PiecePreview from "./PiecePreview";
import {boardHeight, maxWidth, minWidth, zoomToPieceSizeX, zoomToPieceSizeY} from "./utils/responsive";
import { RuleContext, ZoomContext } from "./utils/contexts";
import usePieceCallback from "./hooks/usePieceCallback";
import useZoom from "./hooks/useZoom";

export type Props = {
    data: ShogiSerialization;
    onCommand: (command: KifuCommand) => void
}
const Shogitter: FunctionComponent<Props> = ({data, onCommand}) => {
    const {ban, players, kifu, ...rest} = data;
    const shogitter: Shogi = useMemo(() => new Shogi(data), [data]);
    const {moving, activeCells, onDrag, onDrop, onClear, onCellClick, onHandClick} = usePieceCallback(shogitter, onCommand);

    const zoom = useZoom();

    return <DndProvider options={MouseToTouch}>
        <ZoomContext.Provider value={zoom}>
            <RuleContext.Provider value={shogitter.rule}>
                <PiecePreview />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto"
                }}>
                    <div style={{textAlign: "center"}}>
                        <b>
                            Rule: <a href={`http://shogitter.com/rule/${shogitter.rule._id}`} target={"_blank"}>
                                {shogitter.rule.name}
                            </a></b> <a href={"#"} onClick={(e) => {e.preventDefault(); alert(shogitter.rule.abstract)}}>❓</a>
                    </div>
                    <div style={{
                        overflowX: "auto",
                        height: `${boardHeight(shogitter.rule.size[1], zoom)}px`,
                    }}>
                        <div style={{
                            display: "flex",
                            height: `${boardHeight(shogitter.rule.size[1], zoom)}px`,
                            flexDirection: zoom=="sm"?"column":"row",
                            minWidth: minWidth(shogitter.rule.size[0], zoom),
                            maxWidth: maxWidth(shogitter.rule.size[0], zoom),
                            margin: "0 auto",
                        }}>
                            <div style={{display: "flex", flexDirection: zoom=="sm"?"row":"column", flexGrow: 1, [zoom=="sm"?"height":"width"]: 0}}>
                                <div style={{flex: "1 1 0px", [zoom=="sm"?"width":"height"]: 0}}>
                                    <Hand data={players[1]} direction={1} {...{onDrag, onDrop, onClear}} onClick={onHandClick}/>
                                </div>
                                <div style={{flex: "1 1 0px", [zoom=="sm"?"width":"height"]: 0}}>
                                    <History data={kifu}/>
                                </div>
                            </div>
                            <Board board={ban} onClick={onCellClick} activeCells={activeCells} moving={moving} {...{onDrag, onDrop, onClear}} />
                            <div style={{display: "flex", flexDirection: zoom=="sm"?"row":"column", flexGrow: 1, [zoom=="sm"?"height":"width"]: 0}}>
                                <div style={{flex: "1 1 0px", [zoom=="sm"?"width":"height"]: 0, overflowY: "scroll"}}>
                                    <pre>
                                        {JSON.stringify(rest, null, 2)}
                                    </pre>
                                </div>
                                <div style={{flex: "1 1 0px", [zoom=="sm"?"width":"height"]: 0}}>
                                    <Hand data={players[0]} direction={0} {...{onDrag, onDrop, onClear}} onClick={onHandClick}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RuleContext.Provider>
        </ZoomContext.Provider>
    </DndProvider>
};

export default Shogitter;