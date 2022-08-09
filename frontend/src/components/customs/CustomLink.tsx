import { Link } from "react-router-dom";
import React from "react";
import { Box } from "@mui/material";

const CustomLink = (props) => {
  return (
    <Link {...props} style={{ color: "unset", textDecoration: "none" }}>
      {props.children}
    </Link>
  );
};

export default CustomLink;
