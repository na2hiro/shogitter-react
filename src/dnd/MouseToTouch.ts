import MouseBackend from 'react-dnd-mouse-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { TouchTransition, MouseTransition } from 'react-dnd-multi-backend';

const MouseToTouch = {
    backends: [
        {
            backend: MouseBackend,
            preview: true,
            transition: MouseTransition
        },
        {
            backend: TouchBackend,
            options: {enableMouseEvents: true},
            preview: true,
            transition: TouchTransition
        },
    ]
};
export default MouseToTouch;