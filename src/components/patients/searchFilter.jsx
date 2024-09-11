// File: src/components/patients/searchFilter.jsx

"use client";

import React from "react";
import { Box, Input, Typography, Select, Option } from "@mui/joy";
import { getPayerTypes } from "@/assets/patients";
import { Search } from "lucide-react";

export default function SearchFilter({ onSearch, onPayerChange }) {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const handlePayerChange = (event, newValue) => {
    onPayerChange(newValue);
  };

  const payerTypes = getPayerTypes();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ fontWeight: 600, marginBottom: 1 }}>
          Patient Name
        </Typography>
        <Input
          placeholder="Last, First"
          onChange={handleSearch}
          startDecorator={<Search size={20} />}
          sx={{ mb: 2, width: "100%", fontSize: 18, height: "5vh" }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ fontWeight: 600, marginBottom: 1 }}>
          Bill Type
        </Typography>
        <Select
          defaultValue="any"
          sx={{ mb: 2, width: "100%", fontSize: 18, height: "5vh" }}
        >
          <Option value="any">Any</Option>
        </Select>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ fontWeight: 600, marginBottom: 1 }}>Payer</Typography>
        <Select
          defaultValue="any"
          onChange={handlePayerChange}
          sx={{ mb: 2, width: "100%", fontSize: 18, height: "5vh" }}
        >
          <Option value="any">Any</Option>
          {payerTypes.map((payer) => (
            <Option key={payer} value={payer}>
              {payer}
            </Option>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ fontWeight: 600, marginBottom: 1 }}>
          CPT Code
        </Typography>
        <Input
          placeholder="Enter CPT Code"
          onChange={handleSearch}
          startDecorator={<Search size={20} />}
          sx={{ mb: 2, width: "100%", fontSize: 18, height: "5vh" }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ fontWeight: 600, marginBottom: 1 }}>
          Claim Number
        </Typography>
        <Input
          placeholder="Enter Claim Number"
          onChange={handleSearch}
          startDecorator={<Search size={20} />}
          sx={{ mb: 2, width: "100%", fontSize: 18, height: "5vh" }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ fontWeight: 600, marginBottom: 1 }}>Aging</Typography>
        <Select
          defaultValue="+0 days"
          sx={{ mb: 2, width: "100%", fontSize: 18, height: "5vh" }}
        >
          <Option value="+0 days">+0 Days</Option>
        </Select>
      </Box>
    </Box>
  );
}
