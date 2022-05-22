import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface AccountProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    account?: string
}