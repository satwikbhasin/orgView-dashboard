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
import { Search, Filter, ToggleLeft, ToggleRight } from "lucide-react";
import { useMediaQuery } from "@mui/material";

const FilterItem = ({ label, children, isEnabled, onToggle }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
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
          fontSize: {
            xs: 10,
            sm: 12,
            md: 13,
          },
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
            color: isEnabled ? "#1c69fb" : "black",
            "&:hover": {
              color: isEnabled ? "#1c69fb" : "black",
              backgroundColor: "transparent",
            },
          }}
        >
          {isEnabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
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
      gap: 1.2,
    }}
  >
    {children}
  </Box>
);

export default function FilterBar() {
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
    <Box
      sx={{
        backgroundColor: "#fafafa",
        boxShadow: 3,
        zIndex: 0,
        padding: 1,
        paddingRight: 0,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          textAlign: "left",
        }}
      >
        <IconButton
          sx={{
            fontSize: {
              xs: 12,
              sm: 14,
              md: 16,
              lg: 16,
            },
            fontWeight: 700,
            gap: 0.5,
            color: "#1c69fb",
            "&:hover": {
              color: "#1c69fb",
              backgroundColor: "transparent",
            },
            cursor: "default",
          }}
        >
          <Filter strokeWidth={3} size={"2vh"} />
          Filters
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: 10,
              sm: 12,
              md: 13,
              lg: 13,
            },
          }}
        >
          Disable All Filters
        </Typography>
        <IconButton
          onClick={toggleAllFilters}
          sx={{
            color: allFiltersDisabled ? "#1c69fb" : "black",
            transition: "color 0.3s ease",
            "&:hover": {
              color: allFiltersDisabled ? "#1c69fb" : "black",
              backgroundColor: "transparent",
            },
          }}
        >
          {allFiltersDisabled ? (
            <ToggleRight size={20} />
          ) : (
            <ToggleLeft size={20} />
          )}
        </IconButton>
      </Box>
      <Box gap={1.2}>
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
              startDecorator={<Search size={13} />}
              sx={{ width: "100%", fontSize: 13 }}
              size="sm"
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
              sx={{ width: "100%", fontSize: 13 }}
              size="sm"
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
              sx={{ width: "100%", fontSize: 13 }}
              size="sm"
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
              startDecorator={<Search size={13} />}
              sx={{ width: "100%", fontSize: 13 }}
              size="sm"
              disabled={!filterStates.sku}
            />
          </FilterItem>
        </FilterGroup>
      </Box>
    </Box>
  );
}
