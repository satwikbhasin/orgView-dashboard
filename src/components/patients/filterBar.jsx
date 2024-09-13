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
import { getPayerTypes } from "@/assets/patients";
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

export default function FilterBar({ onPatientNameChange, onPayerChange }) {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
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
  const [allFiltersDisabled, setAllFiltersDisabled] = useState(false);
  const payerTypes = getPayerTypes();
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

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
    setAllFiltersDisabled((prev) => {
      const newState = !prev;

      setFilterStates({
        patientName: !newState,
        payer: !newState,
        billType: !newState,
        cptCode: !newState,
        aging: !newState,
        claimNumber: !newState,
      });

      if (newState) {
        onPatientNameChange("");
        onPayerChange("any");
      } else {
        // Restore filter values when enabling all filters
        onPatientNameChange(filterValues.patientName);
        onPayerChange(filterValues.payer);
      }

      console.log("All filters disabled: ", newState);
      console.log("Filter states: ", filterStates);

      return newState;
    });
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
                </FilterGroup>
                <FilterGroup>
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
        </Collapse>
      </Box>
    </Box>
  );
}
