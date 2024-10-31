import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    save = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    disable = false,
    classNames,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    if (disable) {
        Object.keys(props).map((key) => {
            if (typeof props[key] == 'function' && key.startsWith('on')) {
                delete props[key];
            }
        });
    }
    const classes = cx('wrapper', {
        primary,
        save,
        outline,
        small,
        large,
        text,
        disable,
        [classNames]: classNames,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
