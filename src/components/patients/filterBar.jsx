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
      <Tooltip title={isEnabled ? "Disable filter" : "Enable filter"}>
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
      gap: 3,
      width: "100%",
    }}
  >
    {children}
  </Box>
);

export default function FilterBar({
  onPatientNameChange,
  onPayerChange,
  toggleFilterVisibility,
}) {
  const [filterStates, setFilterStates] = useState({
    patientName: true,
    payer: true,
    billType: true,
    cptCode: true,
    aging: true,
    claimNumber: true,
  });
  const [filterValues, setFilterValues] = useState({
    patientName: "",
    payer: "any",
  });
  const [allFiltersEnabled, setAllFiltersEnabled] = useState(true);
  const payerTypes = getPayerTypes();

  const toggleFilterEnabled = (filter) => {
    setFilterStates((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));

    if (filter === "patientName") {
      onPatientNameChange(
        !filterStates.patientName ? filterValues.patientName : ""
      );
    } else if (filter === "payer") {
      onPayerChange(!filterStates.payer ? filterValues.payer : "any");
    }
  };

  const toggleAllFilters = () => {
    const newState = !allFiltersEnabled;
    setAllFiltersEnabled(newState);
    setFilterStates({
      patientName: newState,
      payer: newState,
      billType: newState,
      cptCode: newState,
      aging: newState,
      claimNumber: newState,
    });

    if (newState) {
      onPatientNameChange(filterValues.patientName);
      onPayerChange(filterValues.payer);
    } else {
      onPatientNameChange("");
      onPayerChange("any");
    }
  };

  const handlePatientNameChange = (value) => {
    setFilterValues((prev) => ({ ...prev, patientName: value }));
    if (filterStates.patientName) {
      onPatientNameChange(value);
    }
  };

  const handlePayerChange = (value) => {
    setFilterValues((prev) => ({ ...prev, payer: value }));
    if (filterStates.payer) {
      onPayerChange(value);
    }
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
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={toggleFilterVisibility}
            sx={{
              gap: 1,
              fontSize: {
                xs: 16,
                sm: 18,
              },
              fontWeight: 600,
              padding: 0,
              color: "#258bE6",
              "&:hover": {
                color: "#262F3C",
                backgroundColor: "transparent",
              },
            }}
          >
            <Filter />
            Filter
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            overflow: "scroll",
            flexDirection: "column",
          }}
        >
          <Box sx={{ color: "black", display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: 600 }}>Toggle All</Typography>
            <Tooltip
              title={
                allFiltersEnabled ? "Disable all filters" : "Enable all filters"
              }
            >
              <IconButton
                onClick={toggleAllFilters}
                sx={{
                  color: allFiltersEnabled ? "green" : "black",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: allFiltersEnabled ? "green" : "black",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {allFiltersEnabled ? (
                  <ToggleRight size={24} />
                ) : (
                  <ToggleLeft size={24} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <FilterGroup>
            <FilterItem
              label="Patient Name"
              isEnabled={filterStates.patientName}
              onToggle={() => toggleFilterEnabled("patientName")}
            >
              <Input
                placeholder="Last, First"
                value={filterValues.patientName}
                onChange={(e) => handlePatientNameChange(e.target.value)}
                startDecorator={<Search size={20} />}
                sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                disabled={!filterStates.patientName}
              />
            </FilterItem>
            <FilterItem
              label="Bill Type"
              isEnabled={filterStates.billType}
              onToggle={() => toggleFilterEnabled("billType")}
            >
              <Select
                defaultValue="any"
                sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                disabled={!filterStates.billType}
              >
                <Option value="any">Any</Option>
              </Select>
            </FilterItem>
            <FilterItem
              label="Payer"
              isEnabled={filterStates.payer}
              onToggle={() => toggleFilterEnabled("payer")}
            >
              <Select
                value={filterValues.payer}
                onChange={(e, newValue) => handlePayerChange(newValue)}
                sx={{ width: "100%", fontSize: 18, height: "3vh" }}
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
                sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                disabled={!filterStates.cptCode}
              />
            </FilterItem>
            <FilterItem
              label="Aging"
              isEnabled={filterStates.aging}
              onToggle={() => toggleFilterEnabled("aging")}
            >
              <Select
                defaultValue="+0 days"
                sx={{ width: "100%", fontSize: 18, height: "3vh" }}
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
                sx={{ width: "100%", fontSize: 18, height: "3vh" }}
                disabled={!filterStates.claimNumber}
              />
            </FilterItem>
          </FilterGroup>
        </Box>
      </Box>
    </Box>
  );
}
