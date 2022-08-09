import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
// import { useManagementContext } from "../_context";

export default function Detail() {
  // const { currentSelect } = useManagementContext();

  const RenderDataRow = ({
    label,
    value,
  }: {
    label: string;
    value?: string;
  }) => {
    return (
      <Grid
        container
        direction={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Grid item xs={5}>
          <Typography variant="body1">{label}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1">:</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="subtitle1">{value || `---`}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: { xs: 0, md: 2 },
              boxShadow: { xs: 0, md: 10 },
            }}
          >
            <Stack spacing={2}>
              {Array.from(Array(10)).map((_, i) => (
                <RenderDataRow
                  key={new Date().getMilliseconds()}
                  label={"Label " + (i + 1)}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: { xs: 0, md: 2 },
              boxShadow: { xs: 0, md: 10 },
            }}
          >
            <Stack spacing={2}>
              {Array.from(Array(10)).map((_, i) => (
                <RenderDataRow
                  key={new Date().getMilliseconds()}
                  label={"Label " + (i + 11)}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
