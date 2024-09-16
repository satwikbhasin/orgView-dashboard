"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Dot,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import inventoryData from "@/data/inventory";
import { useMediaQuery } from "@mui/material";
import ItemsCardView from "./itemsCardView";
import ItemGlance from "./itemGlance";

const headerStyle = {
  height: "5vh",
  fontWeight: "700",
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: "#f0f4f8",
  position: "sticky",
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

export default function InventoryItemsTable({ searchFilter }) {
  const { itemName, status, category, sku } = searchFilter;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const menuRef = useRef(null);

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

  const filteredInventory = sortedInventory.filter((item) => {
    const lowerCaseItemName = (itemName || "").toLowerCase();
    const matchesItemName = item.itemName
      .toLowerCase()
      .includes(lowerCaseItemName);
    const matchesStatus = status === "any" || item.status === status;
    const lowerCaseSku = (sku || "").toLowerCase();
    const matchesSku = item.sku.toLowerCase().includes(lowerCaseSku);
    const matchesCategory = category === "any" || item.category === category;
    return matchesItemName || matchesStatus || matchesSku || matchesCategory;
  });

  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

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

  const closeItemGlanceView = () => {
    setSelectedItem(null);
  };

  const getStatus = (status) => {
    switch (status) {
      case "green":
        return { label: "Green", color: "#03625E", backgroundColor: "#E0F3F1" };
      case "yellow":
        return {
          label: "Yellow",
          color: "#BB900A",
          backgroundColor: "#FFF4E5",
        };
      case "red":
        return { label: "Red", color: "#AD3206", backgroundColor: "#FDECEA" };
      default:
        return {
          label: "Unknown",
          color: "#000000",
          backgroundColor: "#F0F0F0",
        };
    }
  };

  return (
    <Box sx={{ display: "flex", marginRight: selectedItem ? 1 : 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          height: "100%",
          width: selectedItem ? "70%" : "100%",
          transition: "width 0.2s ease-in-out",
          padding: 1,
          paddingLeft: 0,
          paddingTop: 0,
          paddingRight: { xs: 0, sm: 2 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Box
            sx={{
              border: { xs: "transparent", sm: "1px solid #dedede" },
              overflow: "hidden",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
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
                        label="Min. Threshold"
                        onClick={() => handleSort("minThreshold")}
                      />
                      <SortableHeader
                        label="Status"
                        onClick={() => handleSort("status")}
                      />
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
                            backgroundColor:
                              selectedItem && selectedItem.sku === item.sku
                                ? "#f0f4f8"
                                : "#fbfcfe",
                            transition: "background-color 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            if (
                              !selectedItem ||
                              selectedItem.sku !== item.sku
                            ) {
                              e.currentTarget.style.backgroundColor = "#f0f4f8";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (
                              !selectedItem ||
                              selectedItem.sku !== item.sku
                            ) {
                              e.currentTarget.style.backgroundColor = "#fbfcfe";
                            }
                          }}
                          onClick={() => setSelectedItem(item)}
                        >
                          <td style={cellStyle}>
                            <ResponsiveCellTypography>
                              {item.sku}
                            </ResponsiveCellTypography>
                          </td>
                          <td style={cellStyle}>
                            <ResponsiveCellTypography>
                              {item.itemName}
                            </ResponsiveCellTypography>
                          </td>
                          <td style={cellStyle}>
                            <ResponsiveCellTypography>
                              {item.category}
                            </ResponsiveCellTypography>
                          </td>
                          <td style={cellStyle}>
                            <ResponsiveCellTypography>
                              {item.price}
                            </ResponsiveCellTypography>
                          </td>
                          <td
                            style={{
                              ...cellStyle,
                              color:
                                item.status == "red"
                                  ? getStatus(item.status).color
                                  : "inherit",
                              fontWeight: item.status == "red" ? "800" : "400",
                            }}
                          >
                            <ResponsiveCellTypography>
                              {item.currentStock}
                            </ResponsiveCellTypography>
                          </td>
                          <td style={cellStyle}>
                            <ResponsiveCellTypography>
                              {item.minThreshold}
                            </ResponsiveCellTypography>
                          </td>
                          <td style={cellStyle}>
                            <Box
                              sx={{
                                alignItems: "center",
                                justifyContent: "left",
                              }}
                            >
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
                                  color: getStatus(item.status).color,
                                }}
                              >
                                <Dot
                                  strokeWidth={3}
                                  size={26}
                                  color={getStatus(item.status).color}
                                />
                                {getStatus(item.status).label}
                              </Typography>
                            </Box>
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
              size="small"
              sx={{
                fontSize: {
                  xs: 10,
                  md: 12,
                },
                padding: 0.8,
                color: "#1c69fb",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:disabled": {
                  backgroundColor: "transparent",
                  color: "#707070",
                },
              }}
              startDecorator={<ChevronLeft size={16} />}
            >
              Previous
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {generatePageNumbers().map((page, index) => (
                <IconButton
                  key={index}
                  size="small"
                  sx={{
                    backgroundColor: "transparent",
                    color: page === currentPage ? "#1c69fb" : "black",
                    cursor: page !== "..." ? "pointer" : "default",
                    fontWeight: page === currentPage ? "800" : "600",
                    "&:hover": {
                      color: page === currentPage ? "#1c69fb" : "#1c69fb",
                      backgroundColor:
                        page === currentPage ? "transparent" : "transparent",
                    },
                  }}
                  onClick={() => page !== "..." && setCurrentPage(page)}
                  disabled={page === "..."}
                >
                  {page}
                </IconButton>
              ))}
            </Box>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size="small"
              sx={{
                fontSize: {
                  xs: 10,
                  md: 12,
                },
                padding: 0.8,
                color: "#1c69fb",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:disabled": {
                  backgroundColor: "transparent",
                  color: "#707070",
                },
              }}
              endDecorator={<ChevronRight size={16} />}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
      {selectedItem && (
        <ItemGlance item={selectedItem} onClose={closeItemGlanceView} />
      )}
    </Box>
  );
}
