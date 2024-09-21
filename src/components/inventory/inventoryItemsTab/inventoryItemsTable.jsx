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
} from "@mui/joy";
import {
  ShoppingBasket,
  Dot,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
} from "lucide-react";
import { useMediaQuery } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import inventoryData from "@/data/inventory";
import ItemsCardView from "@/components/inventory/inventoryItemsTab/itemsCardView";
import ItemGlance from "@/components/inventory/inventoryItemsTab/itemGlance";
import UsageModal from "@/components/inventory/inventoryItemsTab/usageModel";
import { getLineChartOptions } from "./chartOptions";

const headerStyle = (theme) => ({
  height: "6vh",
  fontWeight: 800,
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
  whiteSpace: "wrap",
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
        padding: 0,
        width: "100%",
        "&:hover": {
          backgroundColor: theme.palette.transparent,
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

const StyledTableRow = styled("tr")(({ theme, selected }) => ({
  backgroundColor: selected
    ? theme.palette.table.cell.hover.background
    : theme.palette.table.cell.background,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.table.cell.hover.background,
  },
}));

export default function InventoryItemsTable({ searchFilter }) {
  const { itemName, status, category, sku } = searchFilter;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedItem, setSelectedItem] = useState(null);
  const [usageModalOpen, setUsageModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const menuRef = useRef(null);
  const theme = useTheme();

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
    return matchesItemName && matchesStatus && matchesSku && matchesCategory;
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    console.log(selectedItem);
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
    <Box
      sx={{ display: "flex", marginRight: selectedItem ? 1 : 0, width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          height: "100%",
          width: selectedItem && !isSmallScreen ? "70%" : "100%",
          transition: "width 0.2s ease-in-out",
          paddingBottom: 1,
          paddingLeft: 0,
          paddingTop: 0,
          paddingRight: { xs: 0, sm: 2 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Box
            sx={{
              border: {
                xs: theme.palette.transparent,
                sm: `1px solid ${theme.palette.border}`,
              },
              overflow: "scroll",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
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
                        theme={theme}
                      />
                      <SortableHeader
                        label="Item Name"
                        onClick={() => handleSort("itemName")}
                        theme={theme}
                      />
                      <SortableHeader
                        label="Category"
                        onClick={() => handleSort("category")}
                        theme={theme}
                      />
                      <SortableHeader
                        label="Price"
                        onClick={() => handleSort("price")}
                        theme={theme}
                      />
                      <SortableHeader
                        label="Current Stock"
                        onClick={() => handleSort("currentStock")}
                        theme={theme}
                      />
                      <SortableHeader
                        label="Min. Threshold"
                        onClick={() => handleSort("minThreshold")}
                        theme={theme}
                      />
                      <SortableHeader
                        label="Status"
                        onClick={() => handleSort("status")}
                        theme={theme}
                      />
                    </tr>
                  </thead>
                </Table>

                <Box sx={{ overflow: "auto", flex: 1 }}>
                  <Table>
                    <tbody>
                      {currentItems.map((item) => (
                        <StyledTableRow
                          key={item.sku}
                          selected={
                            selectedItem && selectedItem.sku === item.sku
                          }
                          onClick={(event) =>
                            isSmallScreen
                              ? handleMenuOpen(event, item)
                              : setSelectedItem(item)
                          }
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
                                  ? getStatus(item.status).backgroundColor
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
                                  fontWeight: 600,
                                  color: getStatus(item.status).backgroundColor,
                                }}
                              >
                                <Dot
                                  strokeWidth={3}
                                  size={26}
                                  color={getStatus(item.status).backgroundColor}
                                />
                                {getStatus(item.status).label}
                              </Typography>
                            </Box>
                          </td>
                        </StyledTableRow>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              </>
            ) : (
              <ItemsCardView items={currentItems} />
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
                color: theme.palette.accent,
                backgroundColor: theme.palette.transparent,
                "&:hover": {
                  backgroundColor: theme.palette.transparent,
                },
                "&:disabled": {
                  backgroundColor: theme.palette.transparent,
                  color: theme.palette.disabled,
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
                    backgroundColor: theme.palette.transparent,
                    color:
                      page === currentPage
                        ? theme.palette.accent
                        : theme.palette.text,
                    cursor: page !== "..." ? "pointer" : "default",
                    fontWeight: page === currentPage ? "800" : "600",
                    "&:hover": {
                      color:
                        page === currentPage
                          ? theme.palette.accent
                          : theme.palette.text,
                      backgroundColor: theme.palette.transparent,
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
                color: theme.palette.accent,
                backgroundColor: theme.palette.transparent,
                "&:hover": {
                  backgroundColor: theme.palette.transparent,
                },
                "&:disabled": {
                  backgroundColor: theme.palette.transparent,
                  color: theme.palette.disabled,
                },
              }}
              endDecorator={<ChevronRight size={16} />}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
      {selectedItem && !isSmallScreen && (
        <ItemGlance item={selectedItem} onClose={closeItemGlanceView} />
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        ref={menuRef}
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
      {usageModalOpen && selectedItem && (
        <UsageModal
          layout="center"
          onClose={() => setUsageModalOpen(false)}
          item={selectedItem}
          chartOptions={getLineChartOptions(selectedItem, false)}
        />
      )}
    </Box>
  );
}
