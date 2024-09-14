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
import { useMediaQuery } from "@mui/material";
import { getPayerTypes } from "@/assets/patients";
import { Search, Filter, ToggleLeft, ToggleRight } from "lucide-react";

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

export default function FilterBar({ onPatientNameChange, onPayerChange }) {
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
        onPatientNameChange(filterValues.patientName);
        onPayerChange(filterValues.payer);
      }

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
              color: "black",
              fontSize: {
                xs: 9,
                md: 11,
                lg: 12,
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
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
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: 9,
                    md: 11,
                    lg: 12,
                  },
                }}
                size="sm"
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
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: 9,
                    md: 11,
                    lg: 12,
                  },
                }}
                size="sm"
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
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: 9,
                    md: 11,
                    lg: 12,
                  },
                }}
                size="sm"
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
                disabled={!filterStates.claimNumber}
              />
            </FilterItem>
          </FilterGroup>
        </Box>
      </Box>
    </Box>
  );
}
