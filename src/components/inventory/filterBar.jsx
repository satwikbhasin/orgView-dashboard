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
import { Search, Filter, ToggleLeft, ToggleRight } from "lucide-react";
import { getItemCategories, getStockStatusTypes } from "@/data/inventory";
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
          fontWeight: 500,
          fontSize: {
            xs: 9,
            md: 11,
            lg: 12,
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
      gap: 1.5,
    }}
  >
    {children}
  </Box>
);

export default function FilterBar({
  onItemNameChange,
  onStatusChange,
  onCategoryChange,
  onSKUChange,
}) {
  const [filterStates, setFilterStates] = useState({
    itemName: true,
    status: true,
    category: true,
    sku: true,
  });
  const [filterValues, setFilterValues] = useState({
    itemName: "",
    status: "any",
    category: "any",
    sku: "",
  });
  const [allFiltersDisabled, setAllFiltersDisabled] = useState(false);
  const itemCategories = getItemCategories();
  const stockStatuses = getStockStatusTypes();

  const toggleFilterEnabled = (filter) => {
    setFilterStates((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));

    if (filter === "itemName") {
      onItemNameChange(!filterStates.itemName ? filterValues.itemName : "");
    } else if (filter === "status") {
      onStatusChange(!filterStates.status ? filterValues.status : "any");
    } else if (filter === "category") {
      onCategoryChange(!filterStates.category ? filterValues.category : "any");
    } else if (filter === "sku") {
      onSKUChange(!filterStates.sku ? filterValues.sku : "");
    }
  };

  const toggleAllFilters = () => {
    setAllFiltersDisabled((prev) => {
      const newState = !prev;

      setFilterStates({
        itemName: !newState,
        status: !newState,
        category: !newState,
        sku: !newState,
      });

      if (newState) {
        onItemNameChange("");
        onCategoryChange("any");
        onStatusChange("any");
        onSKUChange("");
      } else {
        onItemNameChange(filterValues.itemName);
        onCategoryChange(filterValues.category);
        onStatusChange(filterValues.status);
        onSKUChange(filterValues.sku);
      }

      return newState;
    });
  };

  const handleItemNameChange = (value) => {
    setFilterValues((prev) => ({ ...prev, itemName: value }));
    if (filterStates.itemName) {
      onItemNameChange(value);
    }
  };

  const handleStockStatusChange = (value) => {
    setFilterValues((prev) => ({ ...prev, status: value }));
    if (filterStates.status) {
      onStatusChange(value);
    }
  };

  const handleCategoryChange = (value) => {
    setFilterValues((prev) => ({ ...prev, category: value }));
    if (filterStates.category) {
      onCategoryChange(value);
    }
  };

  const handleSKUChange = (value) => {
    setFilterValues((prev) => ({ ...prev, sku: value }));
    if (filterStates.sku) {
      onSKUChange(value);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );

  const iconSize = isSmallScreen ? 10 : isMediumScreen ? 12 : 13;

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        boxShadow: 3,
        padding: 1,
        paddingRight: 0,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        width: "100%",
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
              xs: 10,
              sm: 12,
              md: 14,
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
          <Filter strokeWidth={3} size={iconSize} />
          Filters
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflow: "scroll",
          flexDirection: "column",
          marginBottom: 1.5,
          paddingLeft: 1,
          paddingRight: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: {
                xs: 9,
                md: 11,
                lg: 12,
              },
              color: "black",
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
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
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: 9,
                    md: 11,
                    lg: 12,
                  },
                }}
                size="sm"
                disabled={!filterStates.itemName}
              />
            </FilterItem>
            <FilterItem
              label="Stock Status"
              isEnabled={filterStates.status}
              onToggle={() => toggleFilterEnabled("status")}
            >
              <Select
                defaultValue="any"
                onChange={(e, newValue) => handleStockStatusChange(newValue)}
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: 9,
                    md: 11,
                    lg: 12,
                  },
                }}
                size="sm"
                disabled={!filterStates.status}
              >
                <Option value="any">Any</Option>
                {stockStatuses.map((status) => (
                  <Option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Option>
                ))}
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
                onChange={(e, newValue) => handleCategoryChange(newValue)}
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: 9,
                    md: 11,
                    lg: 12,
                  },
                }}
                size="sm"
                disabled={!filterStates.category}
              >
                <Option value="any">Any</Option>
                {itemCategories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
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
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: 9,
                    md: 11,
                    lg: 12,
                  },
                }}
                size="sm"
                disabled={!filterStates.sku}
              />
            </FilterItem>
          </FilterGroup>
        </Box>
      </Box>
    </Box>
  );
}
