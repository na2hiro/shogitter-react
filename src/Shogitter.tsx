import Shogi, {ShogiSerialization, KifuCommand} from "shogitter-ts";
import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from "react";
import History from "./History";

import Board from "./Board";
import Hand from "./Hand";
import {DndProvider} from "react-dnd-multi-backend";
import MouseToTouch from "./dnd/MouseToTouch";
import {boardHeight, maxWidth, minWidth} from "./utils/responsive";
import usePieceCallback from "./hooks/usePieceCallback";
import useZoom from "./hooks/useZoom";
import {PiecePreview} from "./Piece";
import ContextWrapper from "./utils/ContextWrapper";
import useReverse from "./hooks/useReverse";
import Control from "./Control";
import useControlCallback from "./hooks/useControlCallback";

export type UIConfig = {
    initialReverse?: boolean;
    publicPath: string;
    allowSpeculative?: boolean;
}

export const DndWrapper = ({children}) => {
    return <DndProvider options={MouseToTouch}>
        {children}
    </DndProvider>;
}

export type Props = {
    data: ShogiSerialization;
    onCommand: (command: KifuCommand) => void;
    config?: UIConfig;
}
export const ShogitterWithoutDnDWrapper: FunctionComponent<Props> = ({data, onCommand, config}) => {
    const [speculative, setSpeculative] = useState(false);
    const [shogitter, setShogitter] = useState(() => new Shogi(data));
    const sound = useCallback(() => {
        try {
            new Audio(`${config?.publicPath}/piece-effect.mp3`).play();
        } catch (e) {
        }
    }, [config])
    const onLocalCommand = useCallback((command)=>{
        if(speculative) {
            alert("Not synchronized with server. Please wait for a while or refresh the page.")
            return;
        }
        onCommand(command);
        if(config?.allowSpeculative) {
            try {
                shogitter.runCommand(command);
                setSpeculative(true);
                sound();
            } catch (e) {
                setShogitter(new Shogi(data));
            }
        }
    }, [shogitter, data, speculative]);
    const {moving, activeCells, onDrag, onDrop, onClear, onCellClick, onHandClick} = usePieceCallback(shogitter, onLocalCommand);
    const {rollback, resign, initialize} = useControlCallback(shogitter, onLocalCommand);
    useEffect(() => {
        if (!speculative) {
            sound();
        }
        setShogitter(new Shogi(data));
        setSpeculative(false);
    }, [data]);
    const [isReverse, reverse] = useReverse(config?.initialReverse);
    const zoom = useZoom();

    const previousMove = shogitter.kifu.getXYByTesuu(shogitter.kifu.getTesuu() - 1);
    const {ban, players, kifu, ...rest} = speculative ? shogitter.getObject() : data;

    return (
        <ContextWrapper zoom={zoom} rule={shogitter.rule} reverse={isReverse} config={config || {publicPath: ""}}>
            <PiecePreview/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto"
            }}>
                <Control shogitter={shogitter} reverse={reverse} rollback={rollback} resign={resign}
                         initialize={initialize}/>
                <div style={{
                    overflowX: "auto",
                    height: `${boardHeight(shogitter.rule.size[1], zoom)}px`,
                }}>
                    <div style={{
                        display: "flex",
                        height: `${boardHeight(shogitter.rule.size[1], zoom)}px`,
                        flexDirection: zoom == "sm" ? "column" : "row",
                        minWidth: minWidth(shogitter.rule.size[0], zoom),
                        maxWidth: maxWidth(shogitter.rule.size[0], zoom),
                        margin: "0 auto",
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: zoom == "sm" ? "row" : "column",
                            flexGrow: 1,
                            [zoom == "sm" ? "height" : "width"]: 0
                        }}>
                            <div style={{flex: "1 1 0px", [zoom == "sm" ? "width" : "height"]: 0}}>
                                <Hand data={players[isReverse ? 0 : 1]} direction={isReverse ? 0 : 1}
                                      turnDirection={shogitter.teban.getNowDirection()} {...{onDrag, onDrop, onClear}}
                                      onClick={onHandClick} moving={moving}/>
                            </div>
                            <div style={{flex: "1 1 0px", [zoom == "sm" ? "width" : "height"]: 0}}>
                                <History data={kifu}/>
                            </div>
                        </div>
                        <Board board={ban} onClick={onCellClick} activeCells={activeCells} moving={moving} {...{
                            onDrag,
                            onDrop,
                            onClear
                        }} previousMove={previousMove}/>
                        <div style={{
                            display: "flex",
                            flexDirection: zoom == "sm" ? "row" : "column",
                            flexGrow: 1,
                            [zoom == "sm" ? "height" : "width"]: 0
                        }}>
                            <div style={{flex: "1 1 0px", [zoom == "sm" ? "width" : "height"]: 0, overflowY: "scroll"}}>
                                <pre>
                                    {JSON.stringify(rest, null, 2)}
                                </pre>
                            </div>
                            <div style={{flex: "1 1 0px", [zoom == "sm" ? "width" : "height"]: 0}}>
                                <Hand data={players[isReverse ? 1 : 0]} direction={isReverse ? 1 : 0}
                                      turnDirection={shogitter.teban.getNowDirection()} {...{onDrag, onDrop, onClear}}
                                      onClick={onHandClick} moving={moving}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContextWrapper>
    );
};

export const Shogitter: FunctionComponent<Props> = (props) => {
    return <DndWrapper>
        <ShogitterWithoutDnDWrapper {...props}/>
    </DndWrapper>
}

export default Shogitter;