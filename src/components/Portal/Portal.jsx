import {createPortal} from "react-dom";

export const Portal = props => {
    const {element = document.body, children} = props;

    return createPortal(children, element);
};
