"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/joy";
import { ShoppingBasket, Dot, TrendingUp } from "lucide-react";
import UsageModal from "./usageModel";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ItemsCardView({ items }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [usageModalOpen, setUsageModalOpen] = useState(false);
  const menuRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const theme = useTheme();

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === "View Usage") {
      setUsageModalOpen(true);
    }
    handleMenuClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleMenuClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const getStatus = (status) => {
    switch (status) {
      case "green":
        return {
          label: "Green",
          color: theme.palette.inventory.status.green.text,
          backgroundColor: theme.palette.inventory.status.green.background,
        };
      case "yellow":
        return {
          label: "Yellow",
          color: theme.palette.inventory.status.yellow.text,
          backgroundColor: theme.palette.inventory.status.yellow.background,
        };
      case "red":
        return {
          label: "Red",
          color: theme.palette.inventory.status.red.text,
          backgroundColor: theme.palette.inventory.status.red.background,
        };
      default:
        return {
          label: "Unknown",
          color: theme.palette.text,
          backgroundColor: theme.palette.transparent,
        };
    }
  };

  return (
    <Box sx={{ overflow: "scroll", flex: 1 }}>
      {items.map((item) => (
        <Box
          key={item.sku}
          sx={{
            padding: 2,
            borderBottom: `1px solid ${theme.palette.border}`,
            color: theme.palette.text,
            backgroundColor: theme.palette.table.cell.background,
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.table.cell.hover.background,
            },
          }}
          onClick={(event) => handleMenuOpen(event, item)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: { xs: 11, sm: 12, md: 13 }, fontWeight: 700 }}
              >
                {item.itemName}
              </Typography>
            </Box>
            <Box
              sx={{
                fontWeight: 800,
                color: getStatus(item.status).backgroundColor,
                display: "flex",
                alignItems: "center",
                fontSize: { xs: 9, sm: 10, md: 11 },
              }}
            >
              <Dot size={30} strokeWidth={3} />
              {getStatus(item.status).label}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                SKU
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
                {item.sku}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Category
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
                {item.category}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Price
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
                {item.price}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Current Stock
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 9, sm: 10, md: 11 },
                  color:
                    item.status == "red"
                      ? getStatus(item.status).backgroundColor
                      : theme.palette.text,
                  fontWeight: item.status == "red" ? 800 : 400,
                }}
              >
                {item.currentStock}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Minimum Threshold
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
                {item.minThreshold}
              </Typography>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            ref={menuRef}
            sx={{
              borderRadius: 0,
              backgroundColor: theme.palette.base,
              border: "transparent",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick("View Usage")}>
              <TrendingUp color={theme.palette.accent} size={13} />
              <Typography
                sx={{
                  fontSize: {
                    xs: 8,
                    lg: 10,
                    xl: 12,
                  },
                }}
                fontWeight={700}
              >
                View Usage
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Order")}>
              <ShoppingBasket color={theme.palette.accent} size={13} />
              <Typography
                sx={{
                  fontSize: {
                    xs: 8,
                    lg: 10,
                    xl: 12,
                  },
                  fontWeight: 700,
                }}
              >
                Order
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      ))}
      {usageModalOpen && selectedItem && (
        <UsageModal
          layout="center"
          onClose={() => setUsageModalOpen(false)}
          item={selectedItem}
        />
      )}
    </Box>
  );
}
