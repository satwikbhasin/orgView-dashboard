"use client";

import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/joy";
import {
  Send,
  Dot,
  ChartSpline,
  ShoppingBasket,
  CircleEllipsis,
} from "lucide-react";
import inventoryData from "@/assets/inventory";

const getStatus = (status) => {
  switch (status) {
    case "green":
      return ["Green", "#019992"];
    case "yellow":
      return ["Yellow", "#FFB001"];
    case "red":
      return ["Red", "#E13D00"];
    default:
      return ["Unknown", "grey"];
  }
};

const ItemsCardView = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
    setSelectedItem(null);
  };

  const handleMenuItemClick = (action) => {
    console.log(`Action: ${action} for item: ${selectedItem.sku}`);
    handleMenuClose();
  };

  return (
    <Box sx={{ overflow: "scroll", flex: 1 }}>
      {inventoryData.map((item) => (
        <Box
          key={item.sku}
          sx={{
            padding: 2,
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#fbfcfe",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#f0f4f8",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                fontWeight: "600",
              }}
            >
              {item.itemName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton onClick={(event) => handleMenuOpen(event, item)}>
                <CircleEllipsis size={13} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuList>
                  <MenuItem onClick={() => handleMenuItemClick("View Usage")}>
                    <ChartSpline size={13} />
                    View Usage
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("Order")}>
                    <ShoppingBasket size={13} />
                    Order
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>

            <Box
              sx={{
                fontWeight: "500",
                color: getStatus(item.status)[1],
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: {
                  xs: 14,
                  md: 16,
                },
              }}
            >
              <Dot size={60} />
              {getStatus(item.status)[0]}
            </Box>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              SKU:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {item.sku}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Category:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {item.category}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Price:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              ${item.price}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Current Stock:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
                color:
                  item.currentStock < item.minThreshold ? "#E13D00" : "black",
                fontWeight:
                  item.currentStock < item.minThreshold ? "800" : "400",
              }}
            >
              {item.currentStock}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Minimum Threshold:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {item.minThreshold}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ItemsCardView;
