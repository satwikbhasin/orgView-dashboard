"use client";

import React from "react";
import { Box, Button, ButtonGroup, IconButton, Typography } from "@mui/joy";
import {
  House,
  User,
  DollarSign,
  ShoppingCart,
  Box as BoxIcon,
  Mail,
  Calendar,
  ChartNoAxesCombined,
} from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(225deg, hsla(213, 17%, 35%, 1) 0%, hsla(216, 25%, 16%, 1) 81%, hsla(217, 36%, 12%, 1) 100%)",
        paddingLeft: 0,
        paddingRight: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          onClick={() => window.location.reload()}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Image
            src="/syntra_logo.png"
            alt="Syntra Logo"
            width={50}
            height={50}
          />
          <Typography variant="h1" sx={{ color: "#f2f0ef" }}>
            Syntra
          </Typography>
        </IconButton>
      </Box>
      <ButtonGroup
        size="sm"
        variant="plain"
        orientation="horizontal"
        spacing={3}
      >
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <House size={16} />
          Home
        </IconButton>
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <User size={16} />
          Patients
        </IconButton>
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <DollarSign size={16} />
          Financials
        </IconButton>
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <ShoppingCart size={16} />
          Orders
        </IconButton>
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <BoxIcon size={16} />
          Inventory
        </IconButton>
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <Mail size={16} />
          Mail
        </IconButton>
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <Calendar size={16} />
          Appointments
        </IconButton>
        <IconButton sx={{ color: "#cccbca", gap: 0.5, padding: 1 }}>
          <ChartNoAxesCombined size={16} />
          Analytics
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

export default Navbar;
