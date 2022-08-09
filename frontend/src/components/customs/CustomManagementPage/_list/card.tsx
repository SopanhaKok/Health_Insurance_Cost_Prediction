import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import * as React from "react";
import { useManagementContext } from "../_context";
import CustomizedMenus from "./menu";

export default function index({ data }: { data: any }) {
    const { displayOptions } = useManagementContext();

    return (
        <Card elevation={6}>
            <CardHeader
                action={<CustomizedMenus data={data} />}
                title={data[displayOptions[0].value]}
                subheader={data.created_at || new Date().toDateString()}
            />

            <CardContent>
                {displayOptions.map((option: any, index: number) => {
                    if (index > 0) {
                        return (
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {option.label}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textPrimary"
                                    component="p"
                                >
                                    {_.get(data, option.value, "---")}
                                </Typography>
                            </Stack>
                        );
                    }
                })}
            </CardContent>
        </Card>
    );
}
