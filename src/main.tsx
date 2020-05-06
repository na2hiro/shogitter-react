import React from "react";
import {render} from "react-dom";
import Shogitter from "./Shogitter";
// @ts-ignore
import Shogi from "shogitter-ts";

const shogi = new Shogi(0, -1);

render(<Shogitter data={shogi.getObject()} />, document.getElementById("main"));