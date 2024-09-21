"use client";

import React, { useState, useEffect } from "react";
import { Table, Box, Typography, IconButton, Input } from "@mui/joy";
import { ArrowUpDown, Search } from "lucide-react";
import ordersData from "@/data/orders";
import { useMediaQuery } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

const headerStyle = (theme) => ({
  height: "6vh",
  fontWeight: "700",
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: theme.palette.table.header.background,
  position: "sticky",
  cursor: "pointer",
  whiteSpace: "wrap",
  overflow: "hidden",
});

const cellStyle = {
  fontWeight: "500",
  height: "5vh",
  textAlign: "left",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const ResponsiveTypography = ({ children }) => (
  <Typography
    sx={{
      textAlign: "left",
      fontSize: {
        xs: "9px",
        md: "11px",
        lg: "13px",
      },
      fontWeight: 800,
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
      fontWeight: 500,
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

const SortableHeader = ({ label, onClick, theme }) => (
  <th style={headerStyle(theme)} onClick={onClick}>
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
      {label && (
        <ArrowUpDown color={theme.palette.accent} size={10} strokeWidth={3} />
      )}
    </IconButton>
  </th>
);

const StyledTableRow = styled("tr")(({ theme }) => ({
  backgroundColor: theme.palette.table.cell.background,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.table.cell.hover.background,
  },
}));

const PendingOrdersTable = ({ selectedOrder, setSelectedOrder }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const theme = useTheme();

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input
          startDecorator={<Search size={16} />}
          size="sm"
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            marginBottom: 1,
            fontSize: {
              xs: 8,
              lg: 10,
              xl: 12,
            },
            height: "5%",
          }}
        />
        <Box
          sx={{
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
            border: {
              xs: theme.palette.transparent,
              sm: `1px solid ${theme.palette.border}`,
            },
            overflow: "auto",
          }}
        >
          <Table>
            <thead>
              <tr>
                <SortableHeader
                  label="SKU"
                  onClick={() => handleSort("sku")}
                  theme={theme}
                />
                <SortableHeader
                  label="Item Name"
                  onClick={() => handleSort("itemName")}
                  theme={theme}
                />
                <SortableHeader
                  label="Order Status"
                  onClick={() => handleSort("orderStatus")}
                  theme={theme}
                />
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order) => (
                <StyledTableRow
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
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
                    <ResponsiveCellTypography>
                      {order.orderStatus}
                    </ResponsiveCellTypography>
                  </td>
                </StyledTableRow>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default PendingOrdersTable;
