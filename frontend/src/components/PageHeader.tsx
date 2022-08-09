import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";

const PageHeader = ({
  title,
  actions,
}: {
  title: string;
  actions?: ReactNode;
}) => {
  return (
    <>
      <Helmet>
        <title>
          {title} | {"Template"}
        </title>
      </Helmet>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ mb: 2, flexDirection: "row", flexWrap: "wrap" }}
      >
        <Typography variant="h4">{title}</Typography>
        {actions && (
          <Stack
            direction={"row"}
            spacing={2}
            flexWrap="wrap"
            sx={{
              "& .MuiButton-root": {
                m: {
                  xs: "8px 8px 0px 0px",
                  sm: "8px 8px 0px 0px",
                  md: "0px 0px 0px 8px",
                },
              },
            }}
          >
            {actions}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default PageHeader;
