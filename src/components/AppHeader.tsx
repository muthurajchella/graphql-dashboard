import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  const location = useLocation();

  console.log(location);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GraphQL Blog Dashboard
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {location &&
            location.pathname &&
            location.pathname !== "/create" ? (
              <Link to="/create">
                <Button
                  size="small"
                  variant="contained"
                  className="bg-white text-primary"
                >
                  Create POST
                </Button>
              </Link>
            ) : null}

            {location && location.pathname && location.pathname !== "/" ? (
              <Link to="/">
                <Button
                  size="small"
                  variant="contained"
                  className="bg-secondary text-white"
                >
                  Back
                </Button>
              </Link>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
