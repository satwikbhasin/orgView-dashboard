"use client";

import React, { useState } from "react";
import {
  Box,
  Input,
  Typography,
  Select,
  Option,
  IconButton,
  Tooltip,
} from "@mui/joy";
import { Collapse } from "@mui/material";
import {
  Search,
  Filter,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useMediaQuery } from "@mui/material";

const FilterItem = ({ label, children, isEnabled, onToggle }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: 1.5,
      "&:hover .toggle-button": {
        visibility: "visible",
        opacity: 1,
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "start",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          cursor: "pointer",
          color: isEnabled ? "black" : "grey",
        }}
        onClick={onToggle}
      >
        {label}
      </Typography>
      <Tooltip title={isEnabled ? "Disable filter" : "Enable filter"}>
        <IconButton
          onClick={onToggle}
          className="toggle-button"
          sx={{
            visibility: "hidden",
            color: isEnabled ? "green" : "black",
            "&:hover": {
              color: isEnabled ? "green" : "black",
              backgroundColor: "transparent",
            },
          }}
        >
          {isEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
        </IconButton>
      </Tooltip>
    </Box>
    <Box sx={{ flex: 1 }}>{children}</Box>
  </Box>
);

const FilterGroup = ({ children }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      width: "100%",
    }}
  >
    {children}
  </Box>
);

export default function FilterBar() {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [filterStates, setFilterStates] = useState({
    itemName: true,
    stockStatus: true,
    intelligentOrdering: true,
    inventoryItems: true,
    category: true,
    sku: true,
  });
  const [filterValues, setFilterValues] = useState({});
  const [allFiltersDisabled, setAllFiltersDisabled] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleFilterEnabled = (filter) => {
    setFilterStates((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const toggleAllFilters = () => {
    setAllFiltersDisabled((prev) => {
      const newState = !prev;

      setFilterStates({
        itemName: !newState,
        stockStatus: !newState,
        intelligentOrdering: !newState,
        inventoryItems: !newState,
        category: !newState,
        sku: !newState,
      });

      return newState;
    });
  };

  const handleItemNameChange = (value) => {
    setFilterValues((prev) => ({ ...prev, itemName: value }));
  };

  const handleStockStatusChange = (value) => {
    setFilterValues((prev) => ({ ...prev, stockStatus: value }));
  };

  const handleCategoryChange = (value) => {
    setFilterValues((prev) => ({ ...prev, category: value }));
  };

  const handleSKUChange = (value) => {
    setFilterValues((prev) => ({ ...prev, sku: value }));
  };

  return (
    <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 3,
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={toggleFilterVisibility}
            sx={{
              gap: 1,
              fontSize: {
                xs: 14,
                sm: 16,
                md: 18,
                lg: 20,
              },
              fontWeight: 600,
              color: "#258bE6",
              "&:hover": {
                color: "#258bE6",
                backgroundColor: "transparent",
              },
            }}
          >
            <Filter />
            Filters
            {isFilterVisible ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </IconButton>
          {isFilterVisible && (
            <Box
              sx={{
                color: "black",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                Disable All Filters
              </Typography>
              <IconButton
                onClick={toggleAllFilters}
                sx={{
                  color: allFiltersDisabled ? "green" : "black",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: allFiltersDisabled ? "green" : "black",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {allFiltersDisabled ? (
                  <ToggleRight size={24} />
                ) : (
                  <ToggleLeft size={24} />
                )}
              </IconButton>
            </Box>
          )}
        </Box>
        <Collapse in={isFilterVisible} timeout={400} unmountOnExit>
          <Box
            sx={{
              display: "flex",
              overflow: "scroll",
              flexDirection: "column",
              marginBottom: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isSmallScreen ? "column" : "row",
                  width: "100%",
                }}
              >
                <FilterGroup>
                  <FilterItem
                    label="Item Name"
                    isEnabled={filterStates.itemName}
                    onToggle={() => toggleFilterEnabled("itemName")}
                  >
                    <Input
                      placeholder="Enter item name"
                      value={filterValues.itemName}
                      onChange={(e) => handleItemNameChange(e.target.value)}
                      startDecorator={<Search size={20} />}
                      sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                      disabled={!filterStates.itemName}
                    />
                  </FilterItem>
                  <FilterItem
                    label="Stock Status"
                    isEnabled={filterStates.stockStatus}
                    onToggle={() => toggleFilterEnabled("stockStatus")}
                  >
                    <Select
                      defaultValue="any"
                      onChange={(e) => handleStockStatusChange(e.target.value)}
                      sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                      disabled={!filterStates.stockStatus}
                    >
                      <Option value="any">Any</Option>
                    </Select>
                  </FilterItem>
                </FilterGroup>
                <FilterGroup>
                  <FilterItem
                    label="Category"
                    isEnabled={filterStates.category}
                    onToggle={() => toggleFilterEnabled("category")}
                  >
                    <Select
                      defaultValue="any"
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                      disabled={!filterStates.category}
                    >
                      <Option value="any">Any</Option>
                    </Select>
                  </FilterItem>
                  <FilterItem
                    label="SKU"
                    isEnabled={filterStates.sku}
                    onToggle={() => toggleFilterEnabled("sku")}
                  >
                    <Input
                      placeholder="Enter SKU"
                      onChange={(e) => handleSKUChange(e.target.value)}
                      startDecorator={<Search size={20} />}
                      sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                      disabled={!filterStates.sku}
                    />
                  </FilterItem>
                </FilterGroup>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}