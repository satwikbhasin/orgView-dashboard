"use client";

import React, { useState } from "react";
import { Box, Input, Typography, Select, Option, IconButton } from "@mui/joy";
import { Collapse } from "@mui/material";
import { getPayerTypes } from "@/assets/patients";
import { Search, Filter, ToggleLeft, ToggleRight } from "lucide-react";

const FilterItem = ({ label, children, isEnabled, onToggle }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      <IconButton
        onClick={onToggle}
        sx={{
          color: isEnabled ? "green" : "black",
          transition: "color 0.3s ease",
          "&:hover": {
            color: isEnabled ? "green" : "black",
            backgroundColor: "transparent", 
          },
        }}
      >
        {isEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
      </IconButton>
    </Box>
    <Box sx={{ flex: 1 }}>{children}</Box>
  </Box>
);

const FilterGroup = ({ children }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: { xs: "column", sm: "row", md: "column" },
      gap: { sm: 2 },
      width: "100%",
    }}
  >
    {children}
  </Box>
);

export default function SearchFilter({ onSearch, onPayerChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStates, setFilterStates] = useState({
    search: true,
    payer: true,
    billType: true,
    cptCode: true,
    aging: true,
    claimNumber: true,
  });
  const [filterValues, setFilterValues] = useState({
    search: "",
    payer: "any",
  });
  const payerTypes = getPayerTypes();

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleFilterEnabled = (filter) => {
    setFilterStates((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));

    if (filter === "search") {
      onSearch(!filterStates.search ? filterValues.search : "");
    } else if (filter === "payer") {
      onPayerChange(!filterStates.payer ? filterValues.payer : "any");
    }
  };

  const handleSearchChange = (value) => {
    setFilterValues((prev) => ({ ...prev, search: value }));
    if (filterStates.search) {
      onSearch(value);
    }
  };

  const handlePayerChange = (value) => {
    setFilterValues((prev) => ({ ...prev, payer: value }));
    if (filterStates.payer) {
      onPayerChange(value);
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={toggleFilterMenu}
          sx={{
            gap: 1,
            fontWeight: 600,
            color: isFilterOpen ? "#258be6" : "#17202D",
            "&:hover": {
              color: isFilterOpen ? "#258be6" : "#17202D",
              backgroundColor: isFilterOpen ? "transparent" : "transparent",
            },
          }}
        >
          <Filter size={24} />
          Search & Filter
        </IconButton>
      </Box>
      <Collapse in={isFilterOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { sm: 2, md: 5 },
            width: "100%",
            mb: 2,
          }}
        >
          <FilterGroup>
            <FilterItem
              label="Patient Name"
              isEnabled={filterStates.search}
              onToggle={() => toggleFilterEnabled("search")}
            >
              <Input
                placeholder="Last, First"
                value={filterValues.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                startDecorator={<Search size={20} />}
                sx={{ width: "100%", fontSize: 18, height: "5vh" }}
                disabled={!filterStates.search}
              />
            </FilterItem>
            <FilterItem
              label="Bill Type"
              isEnabled={filterStates.billType}
              onToggle={() => toggleFilterEnabled("billType")}
            >
              <Select
                defaultValue="any"
                sx={{ width: "100%", fontSize: 18, height: "5vh" }}
                disabled={!filterStates.billType}
              >
                <Option value="any">Any</Option>
              </Select>
            </FilterItem>
          </FilterGroup>

          <FilterGroup>
            <FilterItem
              label="Payer"
              isEnabled={filterStates.payer}
              onToggle={() => toggleFilterEnabled("payer")}
            >
              <Select
                value={filterValues.payer}
                onChange={(e, newValue) => handlePayerChange(newValue)}
                sx={{ width: "100%", fontSize: 18, height: "5vh" }}
                disabled={!filterStates.payer}
              >
                <Option value="any">Any</Option>
                {payerTypes.map((payer) => (
                  <Option key={payer} value={payer}>
                    {payer}
                  </Option>
                ))}
              </Select>
            </FilterItem>
            <FilterItem
              label="CPT Code"
              isEnabled={filterStates.cptCode}
              onToggle={() => toggleFilterEnabled("cptCode")}
            >
              <Input
                placeholder="Enter CPT Code"
                startDecorator={<Search size={20} />}
                sx={{ width: "100%", fontSize: 18, height: "5vh" }}
                disabled={!filterStates.cptCode}
              />
            </FilterItem>
          </FilterGroup>

          <FilterGroup>
            <FilterItem
              label="Aging"
              isEnabled={filterStates.aging}
              onToggle={() => toggleFilterEnabled("aging")}
            >
              <Select
                defaultValue="+0 days"
                sx={{ width: "100%", fontSize: 18, height: "5vh" }}
                disabled={!filterStates.aging}
              >
                <Option value="+0 days">+0 Days</Option>
              </Select>
            </FilterItem>
            <FilterItem
              label="Claim Number"
              isEnabled={filterStates.claimNumber}
              onToggle={() => toggleFilterEnabled("claimNumber")}
            >
              <Input
                placeholder="Enter Claim Number"
                startDecorator={<Search size={20} />}
                sx={{ width: "100%", fontSize: 18, height: "5vh" }}
                disabled={!filterStates.claimNumber}
              />
            </FilterItem>
          </FilterGroup>
        </Box>
      </Collapse>
    </Box>
  );
}
