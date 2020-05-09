import {useMediaQuery} from "react-responsive";
import {lgBreakPoint, mdBreakPoint} from "../utils/responsive";

const useZoom = () => {
    const lg = useMediaQuery({query: `(min-width: ${lgBreakPoint}px)`});
    const md = useMediaQuery({query: `(min-width: ${mdBreakPoint}px)`});

    return lg ? "lg" : (md ? "md" : "sm");
}
export default useZoom;