import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export default function CustomMenu({
  label,
  content,
}: {
  label: React.ReactNode | string;
  content: { onClick: () => void; label: React.ReactNode | string }[];
}) {
  return (
    // @ts-ignore
    <PopupState variant="popover" popupId={`popup-menu-${label}`}>
      {(popupState: any) => (
        <>
          <Box {...bindTrigger(popupState)}>{label}</Box>
          <Menu {...bindMenu(popupState)}>
            {content.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  item.onClick();
                  popupState.close();
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
