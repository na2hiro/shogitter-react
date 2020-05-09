const MIN_PIECES_ON_HANDS = 3;
const MAX_PIECES_ON_HANDS = 5;

const BODY_MARGIN = 6;

// 43*48
export const zoomToPieceSizeX = {
    lg: 43,
    md: 33,
    sm: 33,
}
export const zoomToPieceSizeY = {
    lg: 48,
    md: 37,
    sm: 37,
}

export const lgBreakPoint = (9+MIN_PIECES_ON_HANDS*2)*(zoomToPieceSizeX.lg+1)+1+BODY_MARGIN*2; // TODO 9
export const mdBreakPoint = (9+MIN_PIECES_ON_HANDS*2)*(zoomToPieceSizeX.md+1)+1+BODY_MARGIN*2;

export const minWidth = (sizeX: number, zoom: string) => (
    zoom=="sm" ?
        sizeX*(zoomToPieceSizeX[zoom]+1)+1:
        (sizeX+MIN_PIECES_ON_HANDS*2)*(zoomToPieceSizeX[zoom]+1)+1
)
export const maxWidth = (sizeX: number, zoom: string) => (
    (sizeX+MAX_PIECES_ON_HANDS*2)*(zoomToPieceSizeX[zoom]+1)+1
)

export const boardHeight = (sizeY: number, zoom: string) => (
    sizeY*(zoomToPieceSizeY[zoom]+1)+1+(zoom=="sm"?zoomToPieceSizeY[zoom]*2*2:0)
)
