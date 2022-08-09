import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import CustomLink from "components/customs/CustomLink";

const NotFound = () => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent="center"
      sx={{ width: "100vw", height: "100vh" }}
      spacing={2}
    >
      <Box
        component="img"
        src="/static/not_found.svg"
        sx={{ width: "20vw", height: "20vw" }}
      />
      <Typography
        sx={{ fontSize: "1.5vw", fontWeight: "550", color: "GrayText" }}
      >
        Page Not Found
      </Typography>
      <CustomLink to="/">
        <Button>Go Home</Button>
      </CustomLink>
    </Stack>
  );
};

export default NotFound;
