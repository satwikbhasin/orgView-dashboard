"use client";

import React, { useState } from "react";
import {
  Table,
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/joy";
import {
  ChartSpline,
  ShoppingBasket,
  Ellipsis,
  Dot,
  ArrowUpDown,
} from "lucide-react";
import inventoryData from "@/assets/inventory";
import { useMediaQuery } from "@mui/material";
import ItemsCardView from "./itemsCardView";

const headerStyle = {
  height: "6vh",
  fontWeight: "800",
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: "#f0f4f8",
  position: "sticky",
  zIndex: 1,
  cursor: "pointer",
  whiteSpace: "normal",
  overflow: "hidden",
};

const cellStyle = {
  fontWeight: "500",
  height: "6vh",
  textAlign: "center",
};

const ResponsiveTypography = ({ children }) => (
  <Typography
    sx={{
      fontSize: {
        xs: "12px",
        sm: "12px",
        md: "16px",
      },
    }}
  >
    {children}
  </Typography>
);

const SortableHeader = ({ label, onClick }) => (
  <th style={headerStyle} onClick={onClick}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <ResponsiveTypography>{label}</ResponsiveTypography>
      {label && <ArrowUpDown color="grey" size={14} />}
    </Box>
  </th>
);

export default function StockTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const itemsPerPage = 15; // Ensure this is set correctly

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedInventory = [...inventoryData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage; // Calculate the index of the last item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Calculate the index of the first item on the current page
  const currentItems = sortedInventory.slice(indexOfFirstItem, indexOfLastItem); // Slice the items to get the current page's items
  const totalPages = Math.ceil(sortedInventory.length / itemsPerPage); // Calculate the total number of pages

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }
    return [...new Set(pages)];
  };

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

  const getStatus = (status) => {
    switch (status) {
      case "green":
        return ["Green", "#019992"];
      case "yellow":
        return ["Yellow", "#FFB001"];
      case "red":
        return ["Red", "#E13D00"];
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 5,
        height: isSmallScreen ? "fit-content" : "70vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            border: isSmallScreen ? "transparent" : "1.5px solid #e0e0e0",
            borderRadius: 10,
            overflow: "scroll",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!isSmallScreen ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <SortableHeader
                      label="SKU"
                      onClick={() => handleSort("sku")}
                    />
                    <SortableHeader
                      label="Item Name"
                      onClick={() => handleSort("itemName")}
                    />
                    <SortableHeader
                      label="Category"
                      onClick={() => handleSort("category")}
                    />
                    <SortableHeader
                      label="Price"
                      onClick={() => handleSort("price")}
                    />
                    <SortableHeader
                      label="Current Stock"
                      onClick={() => handleSort("currentStock")}
                    />
                    <SortableHeader
                      label="Minimum Threshold"
                      onClick={() => handleSort("minThreshold")}
                    />
                    <SortableHeader
                      label="Status"
                      onClick={() => handleSort("status")}
                    />
                    <SortableHeader />
                  </tr>
                </thead>
              </Table>

              <Box sx={{ overflow: "auto", flex: 1 }}>
                <Table>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr
                        key={item.sku}
                        style={{
                          textAlign: "center",
                          backgroundColor: "#fbfcfe",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f0f4f8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#fbfcfe";
                        }}
                      >
                        <td style={cellStyle}>{item.sku}</td>
                        <td style={cellStyle}>{item.itemName}</td>
                        <td style={cellStyle}>{item.category}</td>
                        <td style={cellStyle}>{item.price}</td>
                        <td
                          style={{
                            ...cellStyle,
                            color:
                              item.currentStock < item.minThreshold
                                ? "#E13D00"
                                : "inherit",
                            fontWeight:
                              item.currentStock < item.minThreshold
                                ? "800"
                                : "400",
                          }}
                        >
                          {item.currentStock}
                        </td>
                        <td style={cellStyle}>{item.minThreshold}</td>
                        <td style={cellStyle}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Dot strokeWidth={3} size={40} color={getStatus(item.status)[1]} />
                            {getStatus(item.status)[0]}
                          </Box>
                        </td>
                        <td style={cellStyle}>
                          <IconButton
                            onClick={(event) => handleMenuOpen(event, item)}
                          >
                            <Ellipsis />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleMenuClose}
                          >
                            <MenuList>
                              <MenuItem
                                onClick={() =>
                                  handleMenuItemClick("View Usage")
                                }
                              >
                                <ChartSpline />
                                Usage
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleMenuItemClick("Order")}
                              >
                                <ShoppingBasket />
                                Order
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </>
          ) : (
            <ItemsCardView />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 5,
          }}
        >
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{
              backgroundColor: "#222b38",
              "&:hover": {
                backgroundColor: "#333e4c",
              },
            }}
          >
            Previous
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
            {generatePageNumbers().map((page, index) => (
              <Button
                key={index}
                sx={{
                  mx: 1,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1px solid",
                  backgroundColor:
                    page === currentPage ? "#222b38" : "transparent",
                  color: page === currentPage ? "#ffffff" : "black",
                  cursor: page !== "..." ? "pointer" : "default",
                  fontWeight: page === currentPage ? "800" : "600",
                  "&:hover": {
                    color: page === currentPage ? "#ffffff" : "black",
                    backgroundColor:
                      page === currentPage ? "#222b38" : "#f0f4f8",
                  },
                }}
                onClick={() => page !== "..." && setCurrentPage(page)}
                disabled={page === "..."}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              backgroundColor: "#222b38",
              "&:hover": {
                backgroundColor: "#333e4c",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
