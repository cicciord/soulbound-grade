import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";

const NavBar = () => {
  const { address } = useAccount();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Soulbound Grade
            </Typography>
            {address && <ConnectButton showBalance={false} />}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
