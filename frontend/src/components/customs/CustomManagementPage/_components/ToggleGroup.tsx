import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Button, ButtonGroup } from "@mui/material";
import * as React from "react";
import { useManagementContext } from "../_context";

export default function GridToggle() {
    const { view, setView } = useManagementContext();

    return (
        <ButtonGroup size="large">
            <Button
                size="large"
                variant={view === "table" ? "contained" : "outlined"}
                onClick={() => setView("table")}
            >
                Table
                <ViewListIcon />
            </Button>
            <Button
                size="large"
                variant={view === "grid" ? "contained" : "outlined"}
                onClick={() => setView("grid")}
            >
                Grid
                <ViewModuleIcon />
            </Button>
        </ButtonGroup>
    );
}
