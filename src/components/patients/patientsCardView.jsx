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
            borderRadius: 10,
            padding: 2,
            marginBottom: 2,
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
            <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
              {patient.ptName}
            </Typography>
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
                padding: "5px",
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
          </Box>
          <Divider sx={{ marginBottom: 2 }} />
          <Box sx={{ marginBottom: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              DOS:
            </Typography>
            <Typography sx={{ display: "inline" }}>{patient.dos}</Typography>
          </Box>
          <Box sx={{ marginBottom: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Payer:
            </Typography>
            <Typography sx={{ display: "inline" }}>{patient.payer}</Typography>
          </Box>
          <Box sx={{ marginBottom: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Provider:
            </Typography>
            <Typography sx={{ display: "inline" }}>
              {patient.provider}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 1 }}>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Claim ID:
            </Typography>
            <Typography sx={{ display: "inline" }}>
              {patient.claimId}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Charges:
            </Typography>
            <Typography sx={{ display: "inline" }}>
              {patient.charges}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PatientsCardView;
