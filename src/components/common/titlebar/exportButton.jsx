"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/joy";
import { ArrowDownToLine } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const ExportButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);
  const theme = useTheme();

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
          backgroundColor: theme.palette.transparent,
          color: theme.palette.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor:
              theme.palette.titlebar.exportButton.hover.background,
            color: theme.palette.accent,
          },
          fontWeight: 700,
          fontSize: {
            xs: 10,
            sm: 12,
            md: 14,
          },
        }}
      >
        <ArrowDownToLine
          strokeWidth={2.5}
          color={theme.palette.accent}
          size={"2.5vh"}
        />
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
          backgroundColor: theme.palette.titlebar.exportButton.menu.background,
          color: theme.palette.text,
        }}
      >
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            "&:hover": {
              color: theme.palette.accent,
              fontWeight: 600,
            },
          }}
        >
          PDF
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            "&:hover": {
              color: theme.palette.accent,
              fontWeight: 600,
            },
          }}
        >
          Excel
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            "&:hover": {
              color: theme.palette.accent,
              fontWeight: 600,
            },
          }}
        >
          CSV
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ExportButton;
