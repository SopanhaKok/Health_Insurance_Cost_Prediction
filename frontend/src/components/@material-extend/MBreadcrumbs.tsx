import { last } from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Box, Link as MLink, Breadcrumbs } from "@mui/material";

// ----------------------------------------------------------------------

const Separator = (
  <Box
    component="span"
    sx={{
      width: 4,
      height: 4,
      borderRadius: "50%",
      bgcolor: "text.disabled",
    }}
  />
);

LinkItem.propTypes = {
  link: PropTypes.object,
};

function LinkItem(link: any) {
  const { href, name, icon } = link;
  return (
    <MLink
      // @ts-ignore
      to={href as any}
      key={name}
      variant="body2"
      component={Link}
      sx={{
        lineHeight: 2,
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        "& > div": { display: "inherit" },
      }}
    >
      {icon && (
        <Box
          sx={{
            mr: 1,
            "& svg": { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </MLink>
  );
}

MBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
  activeLast: PropTypes.bool,
};

export default function MBreadcrumbs({
  links,
  activeLast = false,
  ...other
}: any) {
  // @ts-ignore
  const currentLink = last(links as any).name;

  const listDefault = links.map((link: any) => (
    <LinkItem key={link.name} link={link} />
  ));
  const listActiveLast = links.map((link: any) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "text.disabled",
            textOverflow: "ellipsis",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator={Separator} {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}
