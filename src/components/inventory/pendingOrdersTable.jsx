"use client";

import React, { useState, useEffect } from "react";
import { Table, Box, Typography, IconButton, Input } from "@mui/joy";
import { ArrowUpDown, Search } from "lucide-react";
import ordersData from "@/data/orders";
import { useMediaQuery } from "@mui/material";

const headerStyle = {
  height: "5vh",
  fontWeight: "700",
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: "#f0f4f8",
  position: "sticky",
  top: 0,
  zIndex: 1,
  cursor: "pointer",
  whiteSpace: "normal",
  overflow: "hidden",
};

const cellStyle = {
  fontWeight: "500",
  height: "5vh",
  textAlign: "left",
};

const ResponsiveTypography = ({ children }) => (
  <Typography
    sx={{
      textAlign: "left",
      fontSize: {
        xs: "8px",
        md: "10px",
        lg: "12px",
      },
    }}
  >
    {children}
  </Typography>
);

const ResponsiveCellTypography = ({ children }) => (
  <Typography
    sx={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontSize: {
        xs: "8px",
        lg: "10px",
        xl: "12px",
      },
    }}
  >
    {children}
  </Typography>
);

const SortableHeader = ({ label, onClick }) => (
  <th style={headerStyle} onClick={onClick}>
    <IconButton
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        gap: 1,
        height: "100%",
        padding: 0,
        width: "100%",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      {label && <ResponsiveTypography>{label}</ResponsiveTypography>}
      {label && <ArrowUpDown color="#1c69fb" size={10} strokeWidth={3} />}
    </IconButton>
  </th>
);

const PendingOrdersTable = ({ selectedOrder, setSelectedOrder }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    if (!selectedOrder && ordersData.length > 0 && !isSmallScreen) {
      setSelectedOrder(ordersData[0]);
    }
  }, []);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const filteredOrders = ordersData.filter((order) =>
    order.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        width: isSmallScreen ? "100%" : "25%",
      }}
    >
      <Box>
        <Input
          startDecorator={<Search size={16} />}
          size="sm"
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
          border: { xs: "transparent", sm: "1px solid #dedede" },
          overflow: "auto",
          height: "100%",   
        }}
      >
        <Table>
          <thead>
            <tr>
              <SortableHeader label="SKU" onClick={() => handleSort("sku")} />
              <SortableHeader
                label="Item Name"
                onClick={() => handleSort("itemName")}
              />
              <SortableHeader
                label="Order Status"
                onClick={() => handleSort("orderStatus")}
              />
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr
                key={order.id}
                style={{
                  textAlign: "center",
                  backgroundColor:
                    selectedOrder?.id === order.id ? "#f0f4f8" : "#fbfcfe",
                  transition: "background-color 0.3s",
                }}
                onClick={() => setSelectedOrder(order)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f4f8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    selectedOrder?.id === order.id ? "#f0f4f8" : "#fbfcfe";
                }}
              >
                <td style={cellStyle}>
                  <ResponsiveCellTypography>
                    {order.sku}
                  </ResponsiveCellTypography>
                </td>
                <td style={cellStyle}>
                  <ResponsiveCellTypography>
                    {order.itemName}
                  </ResponsiveCellTypography>
                </td>
                <td style={cellStyle}>
                  <Box sx={{ alignItems: "center", justifyContent: "left" }}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        fontSize: {
                          xs: "8px",
                          lg: "10px",
                          xl: "12px",
                        },
                        color: "black",
                      }}
                    >
                      {order.orderStatus}
                    </Typography>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PendingOrdersTable;
