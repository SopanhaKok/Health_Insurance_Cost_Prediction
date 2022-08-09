import LoadingScreen from "components/LoadingScreen";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useManagementContext } from "../_context";
import RenderInputs, {
  getInitValue,
  getValidationSchema,
} from "./RenderInputs";

export default function Create() {
  const {
    editModalLoading,
    setEditModalLoading,
    editModalInitialValues,
    editModalSubmitHandler,
  } = useManagementContext();

  const initOptions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEditModalLoading(false);
  };

  const initialValues = getInitValue(editModalInitialValues);
  const validationSchema = getValidationSchema(editModalInitialValues);

  useEffect(() => {
    initOptions();
  }, []);

  return (
    <Container maxWidth="lg">
      {editModalLoading ? (
        <Box sx={{ width: "100%", height: 300 }}>
          <LoadingScreen />
        </Box>
      ) : (
        // @ts-ignore
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={editModalSubmitHandler}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <Stack spacing={2}>
                <RenderInputs initValues={editModalInitialValues} />
                <Stack alignItems="flex-end">
                  <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                  >
                    Save
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
}
