import React, { createContext, useContext, useState } from "react";
import { Stack, useTheme } from "@mui/material";
import { Delete, QuestionMarkRounded } from "@mui/icons-material";
import AlertDialog from "components/customs/CustomAlertDialog";

export const AlertContext = createContext(null);
export const useAlertContext = () => useContext<any>(AlertContext);

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAlerting, setIsAlerting] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialAlert = {
    icon: null,
    typeDelete: false,
    title: "",
    message: "",
    onCancel: null,
    onConfirm: null,
    form: undefined,
  };
  const [alert, setAlert] = useState(initialAlert);
  const theme = useTheme();

  const promptCloseForm = ({ onSubmit }: { onSubmit: () => Promise<void> }) => {
    setIsAlerting(true);
    const alertObject: any = {
      icon: (
        <QuestionMarkRounded sx={{ fontSize: 10, color: "primary.main" }} />
      ),
      title: "Do you want to leave this form?",
      message: "Your changes will be lose if you don’t save them.",
      onCancel: () => {
        setIsAlerting(false);
        setTimeout(() => setAlert(initialAlert), 200);
      },
      onConfirm: async () => {
        setLoading(true);
        await onSubmit().then(() => {
          setIsAlerting(false);
          setTimeout(() => setAlert(initialAlert), 200);
        });
        setLoading(false);
      },
    };

    setAlert(alertObject);
  };

  const promptDelete = ({ onSubmit }: { onSubmit: () => Promise<void> }) => {
    setIsAlerting(true);
    const alertObject: any = {
      icon: <Delete color="error" sx={{ fontSize: 10 }} />,
      title: "Are you sure?",
      message: "You won't be able to recovery it after you delete it.",
      onCancel: () => {
        setIsAlerting(false);
        setTimeout(() => setAlert(initialAlert), 200);
      },
      onConfirm: async () => {
        setLoading(true);
        await onSubmit().then(() => {
          setIsAlerting(false);
          setTimeout(() => setAlert(initialAlert), 200);
        });
        setLoading(false);
      },
    };
    setAlert(alertObject);
  };

  const initAlertContext: any = {
    isAlerting,
    setIsAlerting,
    initialAlert,
    alert,
    setAlert,
    promptCloseForm,
    promptDelete,
  };

  return (
    <AlertContext.Provider value={initAlertContext}>
      {children}
      <AlertDialog
        // @ts-ignore
        loading={loading}
        headerComponent={
          alert.icon && (
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {alert.icon}
            </Stack>
          )
        }
        typeDelete={alert.typeDelete}
        visible={isAlerting}
        title={alert.title}
        textContent={alert.message}
        onCancel={alert.onCancel}
        onConfirm={alert.onConfirm}
        form={alert.form}
        actionComponent={alert.form ? <></> : undefined}
      />
    </AlertContext.Provider>
  );
}
