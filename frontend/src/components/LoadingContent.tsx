import { Box, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import { varFadeInUp } from "./animate";
import LoadingScreen from "./LoadingScreen";

const LoadingContent = ({
    children,
    data,
    checkEmpty = true,
}: {
    children: ReactNode;
    data: any;
    checkEmpty?: boolean;
}) => {
    return (
        <AnimatePresence>
            {data ? (
                checkEmpty ? (
                    data.length > 0 ? (
                        children
                    ) : (
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                height: "400px",
                                width: "100%",
                                p: 2,
                            }}
                            component={motion.div}
                            {...varFadeInUp}
                        >
                            <Box
                                src="/static/empty_state.svg"
                                width="280px"
                                component="img"
                                sx={{ mb: 2 }}
                            />
                            <Typography variant="h6" color="GrayText">
                                Empty Content
                            </Typography>
                        </Stack>
                    )
                ) : (
                    children
                )
            ) : (
                <Box sx={{ height: "300px", minWidth: "300px" }}>
                    <LoadingScreen />
                </Box>
            )}
        </AnimatePresence>
    );
};

export default LoadingContent;
