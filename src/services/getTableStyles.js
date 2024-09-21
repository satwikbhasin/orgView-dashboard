import { styled } from "@mui/material/styles";
import { Typography, IconButton } from "@mui/joy";
import { ArrowUpDown } from "lucide-react";

export const ResponsiveHeaderTypography = ({ children }) => (
    <Typography
        sx={{
            textAlign: "left",
            fontSize: {
                xs: "9px",
                md: "11px",
                lg: "13px",
            },
            fontWeight: 800,
        }}
    >
        {children}
    </Typography>
);

export const SortableHeader = ({ label, onClick, theme }) => (
    <th style={{
        height: "6vh",
        fontWeight: "700",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: theme.palette.table.header.background,
        position: "sticky",
        cursor: "pointer",
        whiteSpace: "wrap",
        overflow: "hidden",
    }} onClick={onClick}>
        <IconButton
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: 1,
                padding: 0,
                width: "100%",
                "&:hover": {
                    backgroundColor: theme.palette.transparent,
                },
            }}
        >
            {label && <ResponsiveHeaderTypography>{label}</ResponsiveHeaderTypography>}
            {label && (
                <ArrowUpDown color={theme.palette.accent} size={10} strokeWidth={3} />
            )}
        </IconButton>
    </th>
);

export const cellStyle = {
    fontWeight: "500",
    height: "6vh",
    textAlign: "left",
    whiteSpace: "wrap",
};

export const ResponsiveCellTypography = ({ children }) => (
    <Typography
        sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            fontWeight: 500,
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

export const StyledTableRow = styled("tr")(({ theme, selected }) => ({
    backgroundColor: selected
        ? theme.palette.table.cell.hover.background
        : theme.palette.table.cell.background,
    transition: "background-color 0.3s",
    "&:hover": {
        backgroundColor: theme.palette.table.cell.hover.background,
    },
}));