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
import { Send, Dot, ChartSpline, ShoppingBasket, CircleEllipsis } from "lucide-react";
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
            borderRadius: 10,
            padding: 2,
            marginBottom: 2,
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
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
                  <CircleEllipsis size={20} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuList>
                    <MenuItem onClick={() => handleMenuItemClick("View Usage")}>
                      <ChartSpline />
                      View Usage
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("Order")}>
                      <ShoppingBasket />
                      Order
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                fontWeight: "500",
                color: getStatus(item.status)[1],
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.status === "Sent" ? <Send size={16} /> : <Dot size={60} />}
              {getStatus(item.status)[0]}
            </Box>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              SKU:
            </Typography>
            <Typography sx={{ display: "inline" }}>{item.sku}</Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Category:
            </Typography>
            <Typography sx={{ display: "inline" }}>{item.category}</Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Price:
            </Typography>
            <Typography sx={{ display: "inline" }}>${item.price}</Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Current Stock:
            </Typography>
            <Typography
              sx={{
                display: "inline",
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
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Minimum Threshold:
            </Typography>
            <Typography sx={{ display: "inline" }}>
              {item.minThreshold}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ItemsCardView;
