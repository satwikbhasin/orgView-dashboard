"use client";

import React, { useState } from "react";
import { Table, Box, Button, IconButton, Typography } from "@mui/joy";
import patientsData from "@/assets/patients";
import {
  Send,
  ClipboardPlus,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useMediaQuery } from "@mui/material";
import PatientsCardView from "@/components/patients/patientsCardView";

const headerStyle = {
  height: "6vh",
  fontWeight: "700",
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: "#f0f4f8",
  position: "sticky",
  cursor: "pointer",
  whiteSpace: "normal",
  overflow: "hidden",
};

const cellStyle = {
  fontWeight: "500",
  height: "6vh",
  textAlign: "left",
};

const ResponsiveCellTypography = ({ children }) => (
  <Typography
    sx={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontSize: {
        xs: "8px",
        lg: "10px",
        xl: "12px",
      },
    }}
  >
    {children}
  </Typography>
);

const ResponsiveTypography = ({ children }) => (
  <Typography
    sx={{
      textAlign: "left",
      fontSize: {
        xs: "8px",
        md: "10px",
        lg: "12px",
      },
    }}
  >
    {children}
  </Typography>
);

const SortableHeader = ({ label, onClick }) => (
  <th style={headerStyle} onClick={onClick}>
    <IconButton
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        gap: 1,
        padding: 0,
        width: "100%",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      {label && <ResponsiveTypography>{label}</ResponsiveTypography>}
      {label && <ArrowUpDown color="#1c69fb" size={10} strokeWidth={3} />}
    </IconButton>
  </th>
);
export default function PatientsTable({ patientName, selectedPayer }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...patientsData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredPatients = sortedPatients.filter((patient) => {
    const lowerCaseQuery = (patientName || "").toLowerCase();
    const matchesSearchQuery =
      patient.ptName.toLowerCase().includes(lowerCaseQuery) ||
      patient.payer.toLowerCase().includes(lowerCaseQuery) ||
      patient.procedures.toLowerCase().includes(lowerCaseQuery) ||
      patient.claimId.toLowerCase().includes(lowerCaseQuery);
    const matchesPayer =
      selectedPayer === "any" || patient.payer === selectedPayer;
    return matchesSearchQuery && matchesPayer;
  });

  const patientsPerPage = 15;
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 5,
        height: "100%",
        width: "100%",
        padding: 1,
        paddingLeft: 0,
        paddingRight: { xs: 0, sm: 2 },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            border: { xs: "transparent", sm: "1.5px solid #dedede" },
            borderRadius: 10,
            overflow: "hidden",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!isSmallScreen ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <SortableHeader
                      label="DOS"
                      onClick={() => handleSort("dos")}
                    />
                    <SortableHeader
                      label="Patient Name"
                      onClick={() => handleSort("ptName")}
                    />
                    <SortableHeader
                      label="Create Date"
                      onClick={() => handleSort("createDate")}
                    />
                    <SortableHeader
                      label="Payer"
                      onClick={() => handleSort("payer")}
                    />
                    <SortableHeader
                      label="Provider"
                      onClick={() => handleSort("provider")}
                    />
                    <SortableHeader
                      label="Claim ID"
                      onClick={() => handleSort("claimId")}
                    />
                    <SortableHeader
                      label="Procedures"
                      onClick={() => handleSort("procedures")}
                    />
                    <SortableHeader
                      label="Status"
                      onClick={() => handleSort("status")}
                    />
                    <SortableHeader
                      label="Charges"
                      onClick={() => handleSort("charges")}
                    />
                  </tr>
                </thead>
              </Table>

              <Box sx={{ overflow: "auto", flex: 1 }}>
                <Table>
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
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.dos}
                          </ResponsiveCellTypography>
                        </td>
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.ptName}
                          </ResponsiveCellTypography>
                        </td>
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.createDate}
                          </ResponsiveCellTypography>
                        </td>
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.payer}
                          </ResponsiveCellTypography>
                        </td>
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.provider}
                          </ResponsiveCellTypography>
                        </td>
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.claimId}
                          </ResponsiveCellTypography>
                        </td>
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.procedures}
                          </ResponsiveCellTypography>
                        </td>
                        <td
                          style={{
                            ...cellStyle,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
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
                              padding: "5px",
                              alignItems: "center",
                              height: "fit-content",
                              display: "flex",
                              gap: "6px",
                            }}
                          >
                            {patient.status === "Sent" ? (
                              <Send size={16} />
                            ) : (
                              <ClipboardPlus size={16} />
                            )}
                            <ResponsiveCellTypography>
                              {patient.status}
                            </ResponsiveCellTypography>
                          </Box>
                        </td>
                        <td style={cellStyle}>
                          <ResponsiveCellTypography>
                            {patient.charges}
                          </ResponsiveCellTypography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </>
          ) : (
            <PatientsCardView patients={currentPatients} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 5,
          }}
        >
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            size="small"
            sx={{
              fontSize: {
                xs: 10,
                md: 12,
              },
              padding: 0.8,
              color: "#1c69fb",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:disabled": {
                backgroundColor: "transparent",
                color: "#707070",
              },
            }}
            startDecorator={<ChevronLeft size={16} />}
          >
            Previous
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {generatePageNumbers().map((page, index) => (
              <IconButton
                key={index}
                size="small"
                sx={{
                  borderRadius: "50%",
                  height: 25,
                  width: 25,
                  backgroundColor: "transparent",
                  color: page === currentPage ? "#1c69fb" : "black",
                  cursor: page !== "..." ? "pointer" : "default",
                  fontWeight: page === currentPage ? "800" : "600",
                  "&:hover": {
                    color: page === currentPage ? "#1c69fb" : "#1c69fb",
                    backgroundColor:
                      page === currentPage ? "transparent" : "transparent",
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
            size="small"
            sx={{
              fontSize: {
                xs: 10,
                md: 12,
              },
              padding: 0.8,
              color: "#1c69fb",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:disabled": {
                backgroundColor: "transparent",
                color: "#707070",
              },
            }}
            endDecorator={<ChevronRight size={16} />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
