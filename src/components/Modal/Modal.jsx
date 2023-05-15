import {useCallback, useEffect, useState} from "react";
import {Portal} from "../Portal/Portal";
import styles from "./Modal.module.scss";
import cn from "classnames";

const Modal = props => {
    // eslint-disable-next-line react/prop-types
    const {className, children, isOpen, onClose} = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            onClose();
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        e => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
            return () => {
                window.removeEventListener("keydown", onKeyDown);
            };
        }
    }, [isOpen, onKeyDown]);

    const clickContentHandler = e => {
        e.stopPropagation();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={cn(styles.Modal, mods, className)}>
                <div className={styles.overlay}>
                    <div className={styles.content} onClick={clickContentHandler}>
                        {/* <button onClick={closeHandler}>×</button> */}
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
