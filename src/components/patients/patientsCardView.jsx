"use client";

import React from "react";
import { Box, Typography } from "@mui/joy";
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
              flexDirection: "row",
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
              {patient.status}
            </Box>
          </Box>
          <Typography variant="body2">DOS: {patient.dos}</Typography>
          <Typography variant="body2">
            Create Date: {patient.createDate}
          </Typography>
          <Typography variant="body2">Payer: {patient.payer}</Typography>
          <Typography variant="body2">Provider: {patient.provider}</Typography>
          <Typography variant="body2">Claim ID: {patient.claimId}</Typography>
          <Typography variant="body2">
            Procedures: {patient.procedures}
          </Typography>
          <Typography variant="body2">Charges: {patient.charges}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientsCardView;
