import {RuleContext, ZoomContext, ReverseContext, ConfigContext} from "./contexts";
import React, {FunctionComponent} from "react";
import {Rule} from "shogitter-ts/lib/ShogitterDB";
import {UIConfig} from "../Shogitter";

type Props = {
    zoom: string;
    rule: Rule;
    reverse: boolean;
    config: UIConfig;
}
const ContextWrapper: FunctionComponent<Props> = ({children, zoom, rule, reverse, config}) => {
    return <ZoomContext.Provider value={zoom}>
        <RuleContext.Provider value={rule}>
            <ReverseContext.Provider value={reverse}>
                <ConfigContext.Provider value={config}>
                    {children}
                </ConfigContext.Provider>
            </ReverseContext.Provider>
        </RuleContext.Provider>
    </ZoomContext.Provider>;
}
export default ContextWrapper;