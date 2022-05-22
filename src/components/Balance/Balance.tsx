import {BalanceProps} from "./Balance.props";
import cn from "classnames";
import styles from "./Balance.module.css";
import {Account} from "../Account/Account";

export const Balance = ({ children, className, ...props }: BalanceProps): JSX.Element => {

    return (
        <div
            className={cn(styles.balance, className)}
            {...props}
        >
            <Account />
        </div>
    )
}