import React from "react";
import {Rule} from "shogitter-ts/lib/ShogitterDB";

export const RuleContext = React.createContext<Rule | null>(null);

export const ZoomContext = React.createContext<string>("lg");
