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
    createModalInitialValues,
    createModalLoading,
    setCreateModalLoading,
    createModalSubmitHandler,
  } = useManagementContext();

  const initOptions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCreateModalLoading(false);
  };

  const initialValues = getInitValue(createModalInitialValues);
  const validationSchema = getValidationSchema(createModalInitialValues);

  useEffect(() => {
    initOptions();
  }, []);

  return (
    <Container maxWidth="lg">
      {createModalLoading ? (
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
          onSubmit={createModalSubmitHandler}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <Stack spacing={2}>
                <RenderInputs initValues={createModalInitialValues} />
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
