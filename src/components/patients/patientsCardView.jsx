"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/joy";
import { Send, ClipboardPlus } from "lucide-react";

const PatientsCardView = ({ patients }) => {
  return (
    <Box sx={{ overflow: "scroll", flex: 1 }}>
      {patients.map((patient) => (
        <Box
          key={patient.id}
          sx={{
            padding: 2,
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#fbfcfe",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#f0f4f8",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                fontWeight: "600",
              }}
            >
              {patient.ptName}
            </Typography>
            <Box
              sx={{
                fontWeight: "550",
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
                padding: "5px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: {
                  xs: 14,
                  md: 16,
                },
              }}
            >
              {patient.status === "Sent" ? (
                <Send size={13} />
              ) : (
                <ClipboardPlus size={13} />
              )}
              {patient.status}
            </Box>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              DOS:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {patient.dos}
            </Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 1,
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Payer:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {patient.payer}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Provider:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {patient.provider}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Claim ID:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {patient.claimId}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1, display: "flex", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              Charges:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
            >
              {patient.charges}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PatientsCardView;
