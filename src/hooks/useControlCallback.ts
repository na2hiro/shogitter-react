import {useCallback} from "react";

const useControlCallback = (shogitter, onCommand) => {
    const rollback = useCallback(() => {
        onCommand({type: "rollback"})
    }, [shogitter]);
    const resign = useCallback(() => {
        onCommand({type: "resign"})
    }, [shogitter]);
    const initialize = useCallback((ruleId: number) => {
        onCommand({type: "initialize", ruleId})
    }, [shogitter]);

    return {
        rollback,
        resign,
        initialize,
    }
}

export default useControlCallback;