"use client";

import React, { useState, useEffect } from "react";
import { Table, Box, Button, IconButton } from "@mui/joy";
import patientsData from "@/data/patients";
import { Send, ClipboardPlus, ChevronRight, ChevronLeft } from "lucide-react";
import { useMediaQuery } from "@mui/material";
import PatientsCardView from "@/components/patients/patientsCardView";
import { useTheme } from "@mui/material/styles";
import {
  cellStyle,
  ResponsiveCellTypography,
  SortableHeader,
  StyledTableRow,
} from "@/services/getTableStyles";

export default function PatientsTable({ searchFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { patientName, selectedPayer } = searchFilter;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const theme = useTheme();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box
          sx={{
            border: {
              xs: theme.palette.transparent,
              sm: `1px solid ${theme.palette.border}`,
            },
            overflow: "hidden",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
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
                      theme={theme}
                    />
                    <SortableHeader
                      label="Patient Name"
                      onClick={() => handleSort("ptName")}
                      theme={theme}
                    />
                    <SortableHeader
                      label="Create Date"
                      onClick={() => handleSort("createDate")}
                      theme={theme}
                    />
                    <SortableHeader
                      label="Payer"
                      onClick={() => handleSort("payer")}
                      theme={theme}
                    />
                    <SortableHeader
                      label="Provider"
                      onClick={() => handleSort("provider")}
                      theme={theme}
                    />
                    <SortableHeader
                      label="Claim ID"
                      onClick={() => handleSort("claimId")}
                      theme={theme}
                    />
                    <SortableHeader
                      label="Procedures"
                      onClick={() => handleSort("procedures")}
                      theme={theme}
                    />
                    <SortableHeader
                      label="Status"
                      onClick={() => handleSort("status")}
                      theme={theme}
                    />
                    <SortableHeader
                      label="Charges"
                      onClick={() => handleSort("charges")}
                      theme={theme}
                    />
                  </tr>
                </thead>
              </Table>
              <Box sx={{ overflow: "auto", flex: 1 }}>
                <Table>
                  <tbody>
                    {currentPatients.map((patient) => (
                      <StyledTableRow key={patient.id}>
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
                              fontWeight: 600,
                              color:
                                patient.status === "Sent"
                                  ? theme.palette.patients.status.sent.text
                                  : patient.status === "Created"
                                  ? theme.palette.patients.status.created.text
                                  : "inherit",
                              backgroundColor:
                                patient.status === "Sent"
                                  ? theme.palette.patients.status.sent
                                      .background
                                  : patient.status === "Created"
                                  ? theme.palette.patients.status.created
                                      .background
                                  : "inherit",
                              borderRadius: 10,
                              width: "fit-content",
                              padding: 0.5,
                              alignItems: "center",
                              height: "fit-content",
                              display: "flex",
                              gap: 0.5,
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
                      </StyledTableRow>
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
              color: theme.palette.accent,
              backgroundColor: theme.palette.transparent,
              "&:hover": {
                backgroundColor: theme.palette.transparent,
              },
              "&:disabled": {
                backgroundColor: theme.palette.transparent,
                color: theme.palette.disabled,
              },
            }}
            startDecorator={<ChevronLeft size={16} />}
          >
            Previous
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {generatePageNumbers().map((page, index) => (
              <IconButton
                key={index}
                size="small"
                sx={{
                  backgroundColor: theme.palette.transparent,
                  color:
                    page === currentPage
                      ? theme.palette.accent
                      : theme.palette.text,
                  cursor: page !== "..." ? "pointer" : "default",
                  fontWeight: page === currentPage ? "800" : "600",
                  "&:hover": {
                    color:
                      page === currentPage
                        ? theme.palette.accent
                        : theme.palette.text,
                    backgroundColor: theme.palette.transparent,
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
              color: theme.palette.accent,
              backgroundColor: theme.palette.transparent,
              "&:hover": {
                backgroundColor: theme.palette.transparent,
              },
              "&:disabled": {
                backgroundColor: theme.palette.transparent,
                color: theme.palette.disabled,
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
