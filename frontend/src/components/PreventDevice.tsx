import { WarningAmberRounded } from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import _ from "lodash";
import React from "react";

type PreventDeviceProps = {
    type: "below" | "above";
    width?: number;
};

const PreventDevice = (props: PreventDeviceProps) => {
    const { type, width } = props;
    const allowed = useMediaQuery(
        type === "above"
            ? `(max-width: ${width}px)`
            : `(min-width: ${width}px)`,
    );

    return (
        <Stack
            sx={{
                width: "100vw",
                height: "100vh",
                bgcolor: "background.paper",
                display: allowed ? "none" : "block",
                zIndex: 999,
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <Stack
                flex={1}
                direction="column"
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ height: "100%" }}
            >
                <WarningAmberRounded
                    color="warning"
                    sx={{ fontSize: "120px" }}
                />
                <Typography color="disabled" variant="body2" align={"center"}>
                    {_.capitalize("This Page is not allow on this device")}
                </Typography>
                <Typography
                    sx={{ color: "GrayText" }}
                    variant="caption"
                    align={"center"}
                >
                    {_.capitalize(
                        `(device width must be ${
                            type == "below" ? "above" : "below"
                        } ${width}px)`,
                    )}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default PreventDevice;
