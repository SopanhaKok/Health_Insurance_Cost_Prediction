import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";

import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Add } from "@mui/icons-material";
import { useManagementContext } from "./_context";
import CustomModal from "components/CustomModal";
import { Helmet } from "react-helmet";
import Create from "./_modals/Create";
import Edit from "./_modals/Edit";
import { useAlertContext } from "contexts/AlertContext";
import Detail from "./_modals/Detail";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Header() {
  const {
    isCreating,
    setIsCreating,
    currentEdit,
    setCurrentEdit,
    contextName,
    currentSelect,
    setCurrentSelect,
  } = useManagementContext();

  const { promptCloseForm } = useAlertContext();

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Dashboard
    </Link>,
    <Typography key="3" color="text.primary">
      {contextName}
    </Typography>,
  ];

  const toggleIsCreating = () => {
    setIsCreating(!isCreating);
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent={"space-between"}
      alignItems="flex-end"
    >
      <Helmet>
        <title>{contextName}</title>
      </Helmet>
      <Stack>
        <Typography variant="h4" gutterBottom>
          {contextName}
        </Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Button
        variant="contained"
        onClick={toggleIsCreating}
        startIcon={<Add />}
      >
        Create
      </Button>

      {/* Detail Modal */}
      <CustomModal
        title="Detail"
        open={currentSelect}
        handleClose={() => setCurrentSelect(null)}
      >
        <Detail />
      </CustomModal>

      {/* Create Modal */}
      <CustomModal
        title="Create"
        open={isCreating}
        handleClose={() =>
          promptCloseForm({
            onSubmit: async () => toggleIsCreating(),
          })
        }
      >
        <Create />
      </CustomModal>

      {/* Edit Modal */}
      <CustomModal
        title="Edit"
        open={currentEdit}
        handleClose={() =>
          promptCloseForm({
            onSubmit: async () => await setCurrentEdit(null),
          })
        }
      >
        <Edit />
      </CustomModal>
    </Stack>
  );
}
