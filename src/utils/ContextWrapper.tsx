import {RuleContext, ZoomContext, ReverseContext} from "./contexts";
import React, {FunctionComponent} from "react";
import {Rule} from "shogitter-ts/lib/ShogitterDB";

type Props = {
    zoom: string;
    rule: Rule;
    reverse: boolean;
}
const ContextWrapper: FunctionComponent<Props> = ({children, zoom, rule, reverse}) => {
    return <ZoomContext.Provider value={zoom}>
        <RuleContext.Provider value={rule}>
            <ReverseContext.Provider value={reverse}>
                {children}
            </ReverseContext.Provider>
        </RuleContext.Provider>
    </ZoomContext.Provider>;
}
export default ContextWrapper;