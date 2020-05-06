import MouseBackend from 'react-dnd-mouse-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { TouchTransition, MouseTransition } from 'react-dnd-multi-backend';

const MouseToTouch = {
    backends: [
        // The first backend cannot show preview?
        // https://github.com/LouisBrunner/dnd-multi-backend/issues/46
        {
            backend: TouchBackend,
            options: {enableMouseEvents: true},
            preview: true,
            transition: TouchTransition
        },
        {
            backend: MouseBackend,
            preview: true,
            transition: MouseTransition
        },
    ]
};
export default MouseToTouch;