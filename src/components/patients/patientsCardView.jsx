"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/joy";
import { Send, ClipboardPlus, CircleEllipsis } from "lucide-react";

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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, fontWeight: 600 }}
              >
                {patient.ptName}
              </Typography>
            </Box>
            <Box
              sx={{
                fontWeight: 800,
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
                fontSize: { xs: 14, md: 16 },
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                DOS
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
                {patient.dos}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Payer
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
                {patient.payer}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Provider
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
                {patient.provider}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Claim ID
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
                {patient.claimId}
              </Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "calc(50% - 8px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 14 } }}
              >
                Charges
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}>
                {patient.charges}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PatientsCardView;
