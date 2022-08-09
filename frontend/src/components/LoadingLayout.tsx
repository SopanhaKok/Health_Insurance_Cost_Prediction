import { Box } from "@mui/material";
import { ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";

const LoadingLayout = ({
    children,
    loading,
}: {
    children: ReactNode;
    loading: boolean;
}) => {
    return (
        <>
            {loading ? (
                <Box
                    sx={{
                        height: "100vh",
                        width: "100vw",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10000,
                        backgroundColor: "background.paper",
                    }}
                >
                    <LoadingScreen />
                </Box>
            ) : (
                children
            )}
        </>
    );
};

export default LoadingLayout;
