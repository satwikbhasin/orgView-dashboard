"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/joy";
import { ShoppingBasket, Dot, TrendingUp } from "lucide-react";
import inventoryData from "@/data/inventory";
import UsageModal from "./usageModel";
import { useMediaQuery } from "@mui/material";

const getStatus = (status) => {
  switch (status) {
    case "green":
      return { label: "Green", color: "#C0F1EF", backgroundColor: "#03625E" };
    case "yellow":
      return { label: "Yellow", color: "#F1E7C9", backgroundColor: "#BB900A" };
    case "red":
      return { label: "Red", color: "#F7DDD4", backgroundColor: "#AD3206" };
    default:
      return { label: "Unknown", color: "#000000", backgroundColor: "#F0F0F0" };
  }
};

export default function ItemsCardView() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [usageModalOpen, setUsageModalOpen] = useState(false);
  const menuRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:960px)");

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
                sx={{ fontSize: { xs: 10, sm: 11, md: 13 }, fontWeight: 700 }}
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
                      : "black",
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
          >
            <MenuItem onClick={() => handleMenuItemClick("View Usage")}>
              <TrendingUp color="#1c69fb" size={13} />
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
              <ShoppingBasket color="#1c69fb" size={13} />
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
          chartOptions={{
            chart: {
              type: "line",
              zoomType: "xy",
              backgroundColor: "#fafafa",
              height: "100%",
            },
            title: {
              text: null,
            },
            xAxis: {
              categories: selectedItem.usage.months,
              labels: {
                style: {
                  fontSize: isSmallScreen ? "8px" : "10px",
                },
              },
            },
            yAxis: {
              title: {
                text: null,
              },
              labels: {
                style: {
                  fontSize: isSmallScreen ? "8px" : "10px",
                },
              },
              tickInterval: 2000,
            },
            series: [
              {
                name: "Units per Month",
                data: selectedItem.usage.data,
                color: "#1c69fb",
              },
            ],
            plotOptions: {
              line: {
                marker: {
                  enabled: true,
                  fillColor: "#1c69fb",
                },
              },
            },
          }}
        />
      )}
    </Box>
  );
}
