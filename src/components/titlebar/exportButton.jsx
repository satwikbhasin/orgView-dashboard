"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/joy";
import { ArrowDownToLine } from "lucide-react";

const ExportButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <Box>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={{
          gap: 0.5,
          height: "100%",
          width: "100%",
          padding: 1,
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#EDEDED",
            color: "#1c69fb",
          },
          fontWeight: 700,
          color: "#1c69fb",
          fontSize: {
            xs: 10,
            sm: 12,
            md: 14,
          },
        }}
      >
        <ArrowDownToLine strokeWidth={2.5} color="#1c69fb" size={"2.5vh"} />
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          Export
        </Box>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        variant="menu"
        size="sm"
        ref={menuRef}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#ffffff",
            color: "black",
            borderRadius: "5px",
          },
        }}
      >
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            "&:hover": {
              color: "#1c69fb",
              fontWeight: 600,
              backgroundColor: "#f1f5ff",
            },
          }}
        >
          PDF
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            "&:hover": {
              color: "#1c69fb",
              fontWeight: 600,
              backgroundColor: "#f1f5ff",
              "& .icon": {
                color: "#1c69fb",
              },
            },
          }}
        >
          Excel
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            "&:hover": {
              color: "#1c69fb",
              fontWeight: 600,
              backgroundColor: "#f1f5ff",
              "& .icon": {
                color: "#1c69fb",
              },
            },
          }}
        >
\          CSV
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ExportButton;