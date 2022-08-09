import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomizedMenus from "./menu";
import { useManagementContext } from "../_context";
import _ from "lodash";

export default function index() {
  const { data, displayOptions } = useManagementContext();
  return (
    <TableContainer component={Paper} elevation={6}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {displayOptions.map((option: any, index: number) => (
              <TableCell
                key={option.label}
                align={index > 0 ? "right" : "left"}
              >
                {option.label}
              </TableCell>
            ))}
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.name}>
              {displayOptions.map((option: any, index: number) => (
                <TableCell align={index > 0 ? "right" : "left"}>
                  {_.get(row, option.value, "---")}
                </TableCell>
              ))}

              <TableCell align="right">
                <CustomizedMenus data={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
