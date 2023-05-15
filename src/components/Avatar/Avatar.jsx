import cn from "classnames";
import cls from "./Avatar.module.scss";

export const Avatar = props => {
    // eslint-disable-next-line react/prop-types
    const {className, alt, src} = props;

    return (
        <img
            className={cn(cls.Avatar, {}, [className])}
            src={src}
            alt={alt}
            // style={{
            //     height: size,
            //     width: size,
            // }}
        />
    );
};
