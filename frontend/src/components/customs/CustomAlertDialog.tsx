import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Dialog,
    Divider,
    Paper,
    Typography,
    useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme: any) => ({
    root: {
        margin: theme.spacing(1),
    },
    container: {
        display: "flex",
        flexDirection: "column",
        minWidth: 300,
        padding: theme.spacing(2),
        backgroundImage:
            theme.palette.mode === "light"
                ? `linear-gradient(to bottom right, ${theme.palette.common.white}, ${theme.palette.grey[300]} )`
                : `linear-gradient(to bottom right, ${theme.palette.grey[800]}, ${theme.palette.grey[900]} )`,
    },
    contentWrapper: {
        padding: theme.spacing(1),
    },
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: theme.spacing(2),
    },
    actionButton: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: theme.spacing(3),
    },
    button: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    textContentWrapper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(1),
        display: "box",
        overflow: "hidden",
        lineClamp: 1,
        wordBreak: "break-all",
        boxOrient: "vertical",
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: theme.spacing(2),
    },
    textContent: {
        color:
            theme.palette.mode === "light"
                ? theme.palette.grey[600]
                : theme.palette.grey[500],
    },
}));

AlertDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    textContent: PropTypes.string,
    headerComponent: PropTypes.node,
    actionComponent: PropTypes.node,
    className: PropTypes.object,
    icon: PropTypes.node,
    typeDelete: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    form: PropTypes.node,
};

export default function AlertDialog({
    visible,
    headerComponent,
    actionComponent,
    icon,
    headerTitle = "",
    title = "",
    typeDelete = false,
    textContent,
    onConfirm,
    onCancel,
    showDefaulIcon = false,
    children,
    className,
    form,
    loading = false,
    ...props
}: any) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Dialog
            open={visible}
            className={clsx(classes.root, className)}
            {...props}
        >
            <Paper square className={classes.container}>
                {/* Header */}
                <Box>
                    {headerComponent || (
                        <>
                            {headerTitle && (
                                <>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        className={classes.title}
                                    >
                                        {headerTitle}
                                    </Typography>
                                    <Divider
                                        variant="fullWidth"
                                        style={{ marginTop: theme.spacing(2) }}
                                    />
                                </>
                            )}
                        </>
                    )}
                </Box>
                {/* End header */}

                <Box className={title && classes.contentWrapper}>
                    {/* Content */}
                    {children || (
                        <>
                            <Box className={classes.content}>
                                {showDefaulIcon && !icon && typeDelete && (
                                    <DeleteIcon
                                        color="error"
                                        sx={{ fontSize: theme.spacing(10) }}
                                    />
                                )}
                                {icon}
                                <Box className={classes.textContentWrapper}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            textAlign: "center",
                                            marginBottom: theme.spacing(1),
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    <Typography className={classes.textContent}>
                                        {textContent}
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                    {/* End content */}

                    {/* Form */}
                    {form && form}
                    {/* End Form */}

                    {/* Action */}

                    {actionComponent || (
                        <Box className={classes.actionButton}>
                            <Button
                                className={classes.button}
                                sx={{ mr: 1 }}
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <LoadingButton
                                variant="contained"
                                loading={loading}
                                onClick={onConfirm}
                                style={{
                                    backgroundColor: typeDelete
                                        ? theme.palette.error.main
                                        : theme.palette.primary.main,
                                }}
                                className={classes.button}
                            >
                                {typeDelete ? "Delete" : "Confirm"}
                            </LoadingButton>
                        </Box>
                    )}

                    {/* End action */}
                </Box>
            </Paper>
        </Dialog>
    );
}
