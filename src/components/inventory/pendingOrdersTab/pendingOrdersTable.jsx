"use client";

import React, { useState, useEffect } from "react";
import { Table, Box, Input } from "@mui/joy";
import { Search } from "lucide-react";
import ordersData from "@/data/orders";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  cellStyle,
  ResponsiveCellTypography,
  SortableHeader,
  StyledTableRow,
} from "@/services/getTableStyles";

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
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
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
                  selected={selectedOrder && selectedOrder.id === order.id}
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
