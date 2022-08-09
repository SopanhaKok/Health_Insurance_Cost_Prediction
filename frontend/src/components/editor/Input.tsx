import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FastField } from "formik";
import { capitalize } from "lodash";
import React from "react";
import MapPicker from "react-google-map-picker";

const styles = {
  FInputContainer: {
    width: "100%",
    padding: "16px",
    marginBottom: "16px",
  },
};

export const FInputContainer = ({
  title,
  children,
  inputSpacing,
  ...other
}: any) => {
  return (
    <Stack
      elevation={2}
      component={Paper}
      style={styles.FInputContainer}
      {...other}
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Stack direction="column" spacing={inputSpacing || 2}>
        {children}
      </Stack>
    </Stack>
  );
};

export const FInput = ({ name, label, password = false }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <TextField
          fullWidth
          type={!password ? "text" : "password"}
          size="small"
          label={capitalize(label || name)}
          error={!!meta.error}
          helperText={meta.error}
          {...field}
        />
      )}
    </FastField>
  );
};

export const FSelectAutocomplete = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Autocomplete
          fullWidth
          size="small"
          id={`${name}-${label}`}
          options={options}
          value={field.value}
          onChange={(e: any, value: any) => form.setFieldValue(name, value)}
          getOptionLabel={(option: any) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={capitalize(label || name)}
              placeholder={capitalize(label || name)}
              error={!!meta.error}
              helperText={meta.error}
            />
          )}
        />
      )}
    </FastField>
  );
};

export const FMultiSelectAutocomplete = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Autocomplete
          multiple
          fullWidth
          size="small"
          id={`${name}-${label}`}
          options={options}
          disableCloseOnSelect
          value={field.value}
          onChange={(e: any, value: any) => form.setFieldValue(name, value)}
          getOptionLabel={(option: any) => option.label}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                style={{
                  marginRight: 8,
                }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={capitalize(label || name)}
              placeholder={capitalize(label || name)}
              error={!!meta.error}
              helperText={meta.error}
            />
          )}
        />
      )}
    </FastField>
  );
};

export const FSelect = ({ name, label, options }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <FormControl fullWidth size="small" error={!!meta.error}>
          <InputLabel id={`${name}-${label}`}>
            {options
              ? options.length > 0
                ? `Select ${capitalize(label || name)}`
                : "No Options Available"
              : "Loading..."}
          </InputLabel>
          <Select
            disabled={!options || options.length === 0}
            labelId={`${name}-${label}`}
            id={`${name}-${label}-select`}
            label={
              options
                ? options.length > 0
                  ? `Select ${capitalize(label || name)}`
                  : "No Options Available"
                : "Loading..."
            }
            value={field.value}
            {...field}
          >
            {options &&
              options.length > 0 &&
              options.map((option: any) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
          </Select>

          {!!meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
      )}
    </FastField>
  );
};

export const FCheckBox = ({ name, label, value }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <Stack>
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                defaultChecked={field.value.includes(parseInt(value))}
              />
            }
            {...field}
            value={value}
          />
          {!!meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        </Stack>
      )}
    </FastField>
  );
};

export const FMap = ({ name }: any) => {
  const defaultLocation = {
    lat: 11.5932959,
    lng: 104.9087607,
  };
  const [zoom, setZoom] = React.useState(13);

  function handleChangeZoom(newZoom: any) {
    setZoom(newZoom);
  }

  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta, form }: any) => (
        <Stack>
          <MapPicker
            defaultLocation={defaultLocation}
            zoom={zoom}
            style={{ height: "550px", borderRadius: "5px" }}
            onChangeLocation={(lat: any, lng: any) =>
              form.setFieldValue(name, { lat, lng })
            }
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
            {...field}
          />
          {!!meta.error && (
            <Typography
              sx={{
                color: "red",
                fontSize: "12px",
                m: "14px 8px 0px",
              }}
            >
              {meta.error}
            </Typography>
          )}
        </Stack>
      )}
    </FastField>
  );
};

function valuetext(value: any) {
  return `${value}%`;
}

export const FSlide = ({ name, label, max, type }: any) => {
  return (
    // @ts-ignore
    <FastField name={name}>
      {({ field, meta }: any) => (
        <Stack direction="column" sx={{ width: "100%" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{capitalize(label || name)}</Typography>
            <Typography>
              {field.value}
              {type && type}
            </Typography>
          </Stack>
          <Slider
            size="small"
            getAriaValueText={valuetext}
            step={5}
            max={max}
            {...field}
            valueLabelDisplay="auto"
          />

          {!!meta.error && (
            <Typography
              sx={{
                color: "red",
                fontSize: "12px",
                m: "14px 8px 0px",
              }}
            >
              {meta.error}
            </Typography>
          )}
        </Stack>
      )}
    </FastField>
  );
};
