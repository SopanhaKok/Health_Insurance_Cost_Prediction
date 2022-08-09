import { Stack, Box } from "@mui/material";
import React from "react";
// @ts-ignore
import TypeAnimation from "react-type-animation";

const ComingSoonPage = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent={"center"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Box
        component="img"
        width={"200px"}
        height={"200px"}
        src={"/static/coming_soon.svg"}
      />
      <TypeAnimation
        cursor={true}
        sequence={["Coming Soon", 10000, ""]}
        wrapper="h2"
        repeat={10000}
      />
    </Stack>
  );
};

export default ComingSoonPage;
