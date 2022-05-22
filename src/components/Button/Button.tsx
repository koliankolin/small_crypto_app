import {ButtonProps} from "./Button.props";
import cn from "classnames";
import styles from "./Button.module.css";

export const Button = ({ size, children, className, ...props }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.small]: size
            })}
            {...props}
        >
            {children}
        </button>
    )
}