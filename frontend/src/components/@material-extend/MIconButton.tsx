// material
import { IconButton } from "@mui/material";
import { forwardRef } from "react";
//
import { ButtonAnimate } from "../animate";

// ----------------------------------------------------------------------

const MIconButton = forwardRef(({ children, ...other }: any, ref: any) => (
    <ButtonAnimate>
        <IconButton ref={ref} {...other}>
            {children}
        </IconButton>
    </ButtonAnimate>
));

export default MIconButton;
