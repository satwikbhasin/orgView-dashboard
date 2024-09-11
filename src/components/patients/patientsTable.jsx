// File: src/components/patientsTable.jsx

"use client";

import React, { useState } from "react";
import { Table, Box, Button, Typography } from "@mui/joy";
import patientsData, { getPayerTypes } from "@/assets/patients";
import { Send, ClipboardPlus } from "lucide-react";
import SearchFilter from "@/components/patients/searchFilter";

export default function PatientsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayer, setSelectedPayer] = useState("any");

  const handlePayerChange = (payer) => {
    setSelectedPayer(payer);
    setCurrentPage(1);
  };
  const patientsPerPage = 10;
  const payerTypes = getPayerTypes();

  const headerStyle = {
    width: "11%",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#f0f4f8",
    padding: "3vh",
    position: "sticky",
    top: 0,
    zIndex: 1,
  };

  const cellStyle = {
    padding: "18px",
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredPatients = patientsData.filter((patient) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearchQuery =
      patient.ptName.toLowerCase().includes(lowerCaseQuery) ||
      patient.payer.toLowerCase().includes(lowerCaseQuery) ||
      patient.procedures.toLowerCase().includes(lowerCaseQuery) ||
      patient.claimId.toLowerCase().includes(lowerCaseQuery);

    const matchesPayer =
      selectedPayer === "any" || patient.payer === selectedPayer;

    return matchesSearchQuery && matchesPayer;
  });

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box>
      <SearchFilter onSearch={handleSearch} payerTypes={payerTypes} onPayerChange={handlePayerChange} />
      <Box
        sx={{
          border: "2px solid #d3dce5",
          borderRadius: 10,
          overflow: "auto",
          height: "60vh",
        }}
      >
        <Table>
          <thead>
            <tr>
              <th style={headerStyle}>DOS</th>
              <th style={headerStyle}>PT NAME</th>
              <th style={headerStyle}>CREATE DATE</th>
              <th style={headerStyle}>PAYER</th>
              <th style={headerStyle}>PROVIDER</th>
              <th style={headerStyle}>CLAIM ID</th>
              <th style={headerStyle}>PROCEDURES</th>
              <th style={headerStyle}>STATUS</th>
              <th style={headerStyle}>CHARGES</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((patient) => (
              <tr
                key={patient.id}
                style={{
                  textAlign: "center",
                  backgroundColor: "#fbfcfe",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f4f8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fbfcfe";
                }}
              >
                <td style={cellStyle}>{patient.dos}</td>
                <td style={cellStyle}>{patient.ptName}</td>
                <td style={cellStyle}>{patient.createDate}</td>
                <td style={cellStyle}>{patient.payer}</td>
                <td style={cellStyle}>{patient.provider}</td>
                <td style={cellStyle}>{patient.claimId}</td>
                <td style={cellStyle}>{patient.procedures}</td>
                <td style={cellStyle}>
                  <Box
                    sx={{
                      fontWeight: "500",
                      color:
                        patient.status === "Sent"
                          ? "#104b0f"
                          : patient.status === "Created"
                          ? "#FF8300"
                          : "inherit",
                      backgroundColor:
                        patient.status === "Sent"
                          ? "#e2fbe3"
                          : patient.status === "Created"
                          ? "#f8f5e7"
                          : "inherit",
                      borderRadius: 10,
                      width: "fit-content",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {patient.status === "Sent" ? (
                      <Send size={16} />
                    ) : (
                      <ClipboardPlus size={16} />
                    )}
                    {patient.status}
                  </Box>
                </td>
                <td style={cellStyle}>{patient.charges}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography sx={{ mx: 2 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </Box>
  );
}