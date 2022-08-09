import {
  FInput,
  FMultiSelectAutocomplete,
  FSelectAutocomplete,
} from "components/editor/Input";
import { Grid } from "@mui/material";
import React from "react";
import * as Yup from "yup";

export const getInitValue = (initValues: any) => {
  const values: any = {};
  Object.keys(initValues).forEach((key) => {
    values[key] = initValues[key].value;
  });
  return values;
};

export const getValidationSchema = (initValues: any) => {
  const values: any = {};
  Object.keys(initValues).forEach((key) => {
    const inputType = typeof initValues[key].value;
    const optional = initValues[key].optional;

    if (!optional) {
      if (inputType === "string") {
        values[key] = Yup.string().required(`${key} is required`);
      } else if (inputType === "number") {
        values[key] = Yup.number().required(`${key} is required`);
      } else if (inputType === "boolean") {
        values[key] = Yup.boolean().required(`${key} is required`);
      } else if (inputType === "undefined") {
        values[key] = Yup.object().required(`${key} is required`);
      } else if (inputType === "object") {
        values[key] = Yup.array().min(1, `${key} is required`).required();
      }
    }
    return;
  });
  return Yup.object().shape(values);
};

export default function RenderInputs({ initValues }: { initValues: any }) {
  return (
    <Grid container spacing={2}>
      {Object.keys(initValues).map((key) => {
        const inputType = typeof initValues[key].value;

        const label = initValues[key].label;

        const options = initValues[key]?.options || [];

        // If input is text
        if (inputType === "string") {
          return (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <FInput name={key} label={label} />
            </Grid>
          );
        }
        // If input is multiple select
        if (
          inputType === "object" &&
          initValues[key].value &&
          initValues[key].value.length >= 0 &&
          initValues[key].isMultipleSelect
        ) {
          return (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <FMultiSelectAutocomplete
                name={key}
                label={label}
                options={options}
              />
            </Grid>
          );
        }
        // If input is single select
        if (inputType === "undefined") {
          return (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <FSelectAutocomplete name={key} label={label} options={options} />
            </Grid>
          );
        }

        return null;
      })}
    </Grid>
  );
}
