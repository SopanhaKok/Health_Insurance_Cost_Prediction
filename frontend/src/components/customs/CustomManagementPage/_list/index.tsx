import LoadingContent from "components/LoadingContent";
import { SearchRounded } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Divider,
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import React from "react";
import GridToggle from "../_components/ToggleGroup";
import { useManagementContext } from "../_context";
import Grid from "./grid";
import Table from "./table";

export default function index() {
  const {
    view,
    searchName,
    setSearchName,
    orderBy,
    setOrderBy,
    orderType,
    setOrderType,
    currentPage,
    setCurrentPage,
    totalPage,
    data,
    orderByOptions,
  } = useManagementContext();

  return (
    <Paper elevation={6} sx={{ mt: 2 }}>
      <Stack
        direction={"row"}
        flexWrap="wrap"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <FormControl size="small" variant="outlined">
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            id="search-text-field"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchRounded />
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2}>
          {/* @ts-ignore */}
          <Hidden mdDown>
            <Stack direction="row">
              <GridToggle />
            </Stack>
          </Hidden>
          {/* @ts-ignore */}
          <Hidden smDown>
            <Stack direction="row" alignItems="center" spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="order-by-label">Order By</InputLabel>
                {orderByOptions.map((option: any, i) => (
                  <Select
                    key={new Date().getMilliseconds() + i}
                    size="small"
                    labelId="order-by-label"
                    id="order-by"
                    value={orderBy}
                    label="Order By"
                    onChange={(e) => setOrderBy(e.target.value)}
                  >
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  </Select>
                ))}
              </FormControl>
              <Tooltip
                title={`Sort ${
                  orderType === "asc" ? "Ascending" : "Descending"
                }`}
              >
                <IconButton
                  onClick={() =>
                    setOrderType(orderType === "asc" ? "desc" : "asc")
                  }
                >
                  {orderType === "asc" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          </Hidden>
        </Stack>
      </Stack>
      <Divider />

      <LoadingContent data={data}>
        <Stack sx={{ p: 2 }}>{view === "table" ? <Table /> : <Grid />}</Stack>
      </LoadingContent>

      <Stack
        alignItems="flex-end"
        justifyContent={"center"}
        sx={{ pr: 2, pb: 2 }}
      >
        <Pagination
          count={totalPage}
          color="primary"
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
        />
      </Stack>
    </Paper>
  );
}
