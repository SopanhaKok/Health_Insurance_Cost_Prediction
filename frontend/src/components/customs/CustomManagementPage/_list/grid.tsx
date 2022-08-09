import { Grid } from "@mui/material";
import React from "react";
import { useManagementContext } from "../_context";
import Card from "./card";

export default function grid() {
  const { data } = useManagementContext();
  return (
    <Grid container spacing={2}>
      {data.map((item: any) => (
        <Grid item xs={12} md={6} lg={4} xl={3} key={item.id}>
          <Card data={item} />
        </Grid>
      ))}
    </Grid>
  );
}
