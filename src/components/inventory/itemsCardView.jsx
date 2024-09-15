"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/joy";
import { ChartSpline, ShoppingBasket, CircleEllipsis, Dot } from "lucide-react";
import inventoryData from "@/data/inventory";

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

export default function ItemsCardView() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, fontWeight: 600 }}
              >
                {item.itemName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={(event) => handleMenuOpen(event, item)}>
                  <CircleEllipsis size={13} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleMenuItemClick("View Usage")}>
                    <ChartSpline size={13} />
                    View Usage
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("Order")}>
                    <ShoppingBasket size={13} />
                    Order
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Box
              sx={{
                fontWeight: 800,
                color: getStatus(item.status)[1],
                display: "flex",
                alignItems: "center",
                fontSize: { xs: 10, sm: 12, md: 14 },
              }}
            >
              <Dot size={30} strokeWidth={3} />
              {getStatus(item.status)[0]}
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
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                SKU
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
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
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Category
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
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
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Price
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
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
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Current Stock
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 10, sm: 12, md: 14 },
                  color:
                    item.currentStock < item.minThreshold ? "#E13D00" : "black",
                  fontWeight: item.currentStock < item.minThreshold ? 800 : 400,
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
              {" "}
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Minimum Threshold
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
                {item.minThreshold}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
