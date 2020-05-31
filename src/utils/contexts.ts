import React from "react";
import {Rule} from "shogitter-ts/lib/ShogitterDB";
import {UIConfig} from "../Shogitter";

export const RuleContext = React.createContext<Rule | null>(null);

export const ZoomContext = React.createContext<string>("lg");

export const ReverseContext = React.createContext<boolean>(false);

export const ConfigContext = React.createContext<UIConfig>({publicPath: ""});
