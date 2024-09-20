"use client";

import React from "react";
import { Box, Typography } from "@mui/joy";
import { Send, ClipboardPlus } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const PatientsCardView = ({ patients }) => {
  const theme = useTheme();
  return (
    <Box sx={{ overflow: "scroll", flex: 1 }}>
      {patients.map((patient) => (
        <Box
          key={patient.id}
          sx={{
            padding: 2,
            borderBottom: `1px solid ${theme.palette.border}`,
            backgroundColor: theme.palette.base,
            color: theme.palette.text,
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.hover,
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
                sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 700 }}
              >
                {patient.ptName}
              </Typography>
            </Box>
            <Box
              sx={{
                fontWeight: 800,
                color:
                  patient.status === "Sent"
                    ? theme.palette.status.success.text
                    : patient.status === "Created"
                    ? theme.palette.status.warning.text
                    : "inherit",
                backgroundColor:
                  patient.status === "Sent"
                    ? theme.palette.status.success.background
                    : patient.status === "Created"
                    ? theme.palette.status.warning.background
                    : "inherit",
                borderRadius: 10,
                padding: "5px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: { xs: 9, sm: 10, md: 11 },
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
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                DOS
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
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
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Payer
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
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
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Provider
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
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
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Claim ID
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
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
                sx={{ fontWeight: 600, fontSize: { xs: 9, sm: 10, md: 11 } }}
              >
                Charges
              </Typography>
              <Typography sx={{ fontSize: { xs: 9, sm: 10, md: 11 } }}>
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
