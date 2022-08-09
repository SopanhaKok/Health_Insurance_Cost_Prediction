import { Container } from "@mui/material";
import React from "react";
import Header from "./header";
import ManagementContextProvider from "./_context";
import List from "./_list";

export default function index() {
    return (
        <ManagementContextProvider>
            <Container maxWidth="xl" sx={{ p: 2 }}>
                <Header />
                <List />
            </Container>
        </ManagementContextProvider>
    );
}
