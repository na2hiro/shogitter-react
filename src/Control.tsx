import React, {FunctionComponent} from "react";
import Shogi from "shogitter-ts";
import { shogitterDB } from "shogitter-ts/lib/ShogitterDB";

type ControlProps = {
    shogitter: Shogi;
    reverse: () => void;
    rollback: () => void;
    resign: () => void;
    initialize: (ruleId: number) => void;
}

const allowedRules = [0, 44, 45, 46, 47];

const Control: FunctionComponent<ControlProps> = ({shogitter, reverse, rollback, resign, initialize}) => {
    var rules = shogitterDB.getAllRules();
    return <div style={{textAlign: "center"}}>
        <button onClick={reverse}>🔃</button>
        <b>
            Rule:
            <select value={shogitter.rule._id} onChange={(e)=>{
                const ruleId = parseInt(e.target.value);
                initialize(ruleId)
            }}>
                <optgroup label="Available rules">
                    {rules.filter(rule=>allowedRules.indexOf(rule._id)>=0).map(rule => <option key={rule._id} value={rule._id}>
                        {rule._id}: {rule.name}
                    </option>)}
                </optgroup>
                <optgroup label="Under construction">
                    {rules.filter(rule=>allowedRules.indexOf(rule._id)<0).map(rule => <option key={rule._id} value={rule._id}>
                        {rule._id}: {rule.name}
                    </option>)}
                </optgroup>
            </select>
        </b>{' '}
        <button onClick={(e) => {e.preventDefault(); alert(shogitter.rule.abstract)}}>❓</button>{' '}
        <a href={`http://shogitter.com/rule/${shogitter.rule._id}`} target={"_blank"}>📖</a>
        <button onClick={rollback}>🤚</button>
        <button onClick={resign}>🙇</button>
    </div>
}

export default Control;
