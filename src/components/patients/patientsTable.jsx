"use client";

import React, { useState } from "react";
import { Table, Box, Button, Typography, IconButton } from "@mui/joy";
import patientsData, { getPayerTypes } from "@/assets/patients";
import { Send, ClipboardPlus } from "lucide-react";
import SearchFilter from "@/components/patients/searchFilter";

export default function PatientsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayer, setSelectedPayer] = useState("any");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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
    cursor: "pointer",
  };

  const cellStyle = {
    padding: "18px",
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...patientsData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredPatients = sortedPatients.filter((patient) => {
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
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

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

  return (
    <Box>
      <SearchFilter
        onSearch={handleSearch}
        payerTypes={payerTypes}
        onPayerChange={handlePayerChange}
      />
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
              <th style={headerStyle} onClick={() => handleSort("dos")}>
                DOS
              </th>
              <th style={headerStyle} onClick={() => handleSort("ptName")}>
                Patient Name
              </th>
              <th style={headerStyle} onClick={() => handleSort("createDate")}>
                Create Date
              </th>
              <th style={headerStyle} onClick={() => handleSort("payer")}>
                Payer
              </th>
              <th style={headerStyle} onClick={() => handleSort("provider")}>
                Provider
              </th>
              <th style={headerStyle} onClick={() => handleSort("claimId")}>
                Claim ID
              </th>
              <th style={headerStyle} onClick={() => handleSort("procedures")}>
                Procedures
              </th>
              <th style={headerStyle} onClick={() => handleSort("status")}>
                Status
              </th>
              <th style={headerStyle} onClick={() => handleSort("charges")}>
                Charges
              </th>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          sx={{
            backgroundColor: "#222b38",
            "&:hover": {
              backgroundColor: "#404c5c",
            },
          }}
        >
          Previous
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
          {generatePageNumbers().map((page, index) => (
            <IconButton
              key={index}
              sx={{
                mx: 1,
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid",
                backgroundColor:
                  page === currentPage ? "#222b38" : "transparent",
                color: page === currentPage ? "#ffffff" : "black",
                cursor: page !== "..." ? "pointer" : "default",
                fontWeight: page === currentPage ? "800" : "600",
                "&:hover": {
                  color: page === currentPage ? "#ffffff" : "black",
                  backgroundColor: page === currentPage ? "#222b38" : "#f0f4f8",
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
          sx={{
            backgroundColor: "#222b38",
            "&:hover": {
              backgroundColor: "#404c5c",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
