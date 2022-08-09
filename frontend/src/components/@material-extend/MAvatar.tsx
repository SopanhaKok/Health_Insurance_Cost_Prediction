import { Avatar, Theme, useTheme } from "@mui/material";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

const MAvatar = forwardRef(
    ({ color = "default", sx, children, ...other }: any, ref: any) => {
        const theme: Theme = useTheme();

        if (color === "default") {
            return (
                <Avatar ref={ref} sx={sx} {...other}>
                    {children}
                </Avatar>
            );
        }

        return (
            <Avatar
                ref={ref}
                sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    // @ts-ignore
                    color: theme.palette[color].contrastText,
                    // @ts-ignore
                    backgroundColor: theme.palette[color].main,
                    ...sx,
                }}
                {...other}
            >
                {children}
            </Avatar>
        );
    },
);

export default MAvatar;
