"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Truck } from "lucide-react";
import { renderToString } from "react-dom/server";
import { Box, Typography, Chip } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const tt = dynamic(() => import("@tomtom-international/web-sdk-maps"), {
  ssr: false,
});

import "@tomtom-international/web-sdk-maps/dist/maps.css";

const OrderTrackingMap = ({ selectedOrder }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const theme = useTheme();

  const getInventoryStatus = (status) => {
    switch (status) {
      case "green":
        return {
          label: "Green",
          color: theme.palette.inventory.status.green.text,
          backgroundColor: theme.palette.inventory.status.green.background,
        };
      case "yellow":
        return {
          label: "Yellow",
          color: theme.palette.inventory.status.yellow.text,
          backgroundColor: theme.palette.inventory.status.yellow.background,
        };
      case "red":
        return {
          label: "Red",
          color: theme.palette.inventory.status.red.text,
          backgroundColor: theme.palette.inventory.status.red.background,
        };
      default:
        return {
          label: "Unknown",
          color: theme.palette.text,
          backgroundColor: theme.palette.transparent,
        };
    }
  };
  const inventoryStatus = getInventoryStatus(selectedOrder?.status);

  useEffect(() => {
    let map;
    const loadMap = async () => {
      const tt = await import("@tomtom-international/web-sdk-maps");
      if (mapRef.current) {
        map = tt.map({
          key: "cqdAo4VtS9HcyZTBIK4oOmy3dCGlm01Y",
          container: mapRef.current,
          center: [-122.4194, 37.7749],
          zoom: 16,
          style:
            theme.palette.mode === "dark"
              ? "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAV0diMkFRMUE2T3R1T3NydjtiZWFkNDIwMS00NWI3LTQ2ZWItOWY2MS02MjcyMmQzNTBhMGM=/drafts/0.json?key=cqdAo4VtS9HcyZTBIK4oOmy3dCGlm01Y"
              : "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAV0diMkFRMUE2T3R1T3NydjthZDAzYTAxYS0wNjU0LTQ5NTYtODExOS1hY2VmYzA2OGRhOGY=.json?key=cqdAo4VtS9HcyZTBIK4oOmy3dCGlm01Y",
        });

        map.on("load", () => {
          setMapLoaded(true);
        });

        const markerElement = document.createElement("div");
        markerElement.style.width = "30px";
        markerElement.style.height = "30px";
        markerElement.style.display = "flex";
        markerElement.style.alignItems = "center";
        markerElement.style.justifyContent = "center";
        markerElement.style.backgroundColor = theme.palette.accent;
        markerElement.style.borderRadius = "50%";
        markerElement.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
        markerElement.style.zIndex = "0";

        const truckIconHTML = renderToString(<Truck color="white" size={20} />);
        markerElement.innerHTML = truckIconHTML;

        const marker = new tt.Marker({ element: markerElement })
          .setLngLat([-122.4194, 37.7749])
          .addTo(map);
      }
    };

    if (typeof window !== "undefined") {
      loadMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [selectedOrder, theme.palette.mode]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
        border: `1px solid ${theme.palette.border}`,
        width: "75%",
        overflow: "hidden",
        visible: !isSmallScreen,
      }}
    >
      <div
        ref={mapRef}
        className={`smooth-render-element ${mapLoaded ? "visible" : ""}`}
        style={{ height: "100%", width: "100%" }}
      ></div>
      {selectedOrder && (
        <Box
          className={`smooth-render-element ${mapLoaded ? "visible" : ""}`}
          sx={{
            position: "absolute",
            top: isSmallScreen ? 16 : 16,
            left: isSmallScreen ? "50%" : 16,
            transform: isSmallScreen ? "translateX(-50%)" : "none",
            background: theme.palette.inventory.pendingOrdersTab.orderMapTrackingCard.background,
            padding: 2,
            borderRadius: 10,
            border: `1px solid ${theme.palette.border}`,
            boxShadow: theme.palette.inventory.pendingOrdersTab.orderMapTrackingCard.boxShadow,
            backdropFilter: "blur( 7px )",
            WebkitBackdropFilter: "blur( 7px )",
            zIndex: 1,
            width: isSmallScreen ? "93%" : "30%",
            height: "fit-content",
            overflow: "scroll",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.text,
                fontSize: {
                  xs: 12,
                  md: 14,
                  lg: 16,
                  xl: 18,
                },
              }}
              fontWeight={600}
            >
              {selectedOrder.itemName}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: theme.palette.accent,
              marginBottom: 2,
            }}
            fontSize={{ xs: 12, md: 14, lg: 16, xl: 18 }}
            fontWeight={600}
          >
            {selectedOrder.orderStatus}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "row", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.disabled,
                  fontWeight: 400,
                  fontSize: {
                    xs: 7,
                    md: 9,
                    lg: 11,
                    xl: 13,
                  },
                }}
              >
                SKU
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.text,
                  fontWeight: 600,
                  fontSize: {
                    xs: 8,
                    md: 10,
                    lg: 12,
                    xl: 14,
                  },
                  marginBottom: 1.5,
                }}
              >
                {selectedOrder.sku}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.disabled,
                  fontWeight: 400,
                  fontSize: {
                    xs: 7,
                    md: 9,
                    lg: 11,
                    xl: 13,
                  },
                }}
              >
                CURRENT STOCK
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.text,
                  fontWeight: 600,
                  fontSize: {
                    xs: 8,
                    md: 10,
                    lg: 12,
                    xl: 14,
                  },
                  marginBottom: 1.5,
                }}
              >
                {selectedOrder.currentStock}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.disabled,
                  fontWeight: 400,
                  fontSize: {
                    xs: 7,
                    md: 9,
                    lg: 11,
                    xl: 13,
                  },
                }}
              >
                MIN THRESHOLD
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.text,
                  fontWeight: 600,
                  fontSize: {
                    xs: 8,
                    md: 10,
                    lg: 12,
                    xl: 14,
                  },
                  marginBottom: 1.5,
                }}
              >
                {selectedOrder.minThreshold}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.disabled,
                  fontWeight: 400,
                  fontSize: {
                    xs: 7,
                    md: 9,
                    lg: 11,
                    xl: 13,
                  },
                  marginBottom: 0.5,
                }}
              >
                INVENTORY STATUS
              </Typography>
              <Chip
                size="small"
                sx={{
                  backgroundColor: inventoryStatus.backgroundColor,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  color: inventoryStatus.color,
                  justifyContent: "center",
                  height: "fit-content",
                  width: "fit-content",
                  paddingLeft: 1,
                  paddingRight: 1,
                  marginBottom: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 7,
                      md: 9,
                      lg: 11,
                      xl: 13,
                    },
                  }}
                  color={inventoryStatus.color}
                >
                  {inventoryStatus.label}
                </Typography>
              </Chip>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OrderTrackingMap;
