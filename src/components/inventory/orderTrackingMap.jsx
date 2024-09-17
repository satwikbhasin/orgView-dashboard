"use client";

import React, { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { Truck } from "lucide-react";
import { renderToString } from "react-dom/server";
import {
  Box,
  Typography,
  Chip,
  Modal,
  ModalDialog,
  ModalClose,
} from "@mui/joy";
import { useMediaQuery } from "@mui/material";

const OrderTrackingMap = ({ selectedOrder, open, onClose }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const getInventoryStatus = (status) => {
    switch (status) {
      case "green":
        return { label: "Green", color: "#C0F1EF", backgroundColor: "#03625E" };
      case "yellow":
        return {
          label: "Yellow",
          color: "#F1E7C9",
          backgroundColor: "#BB900A",
        };
      case "red":
        return { label: "Red", color: "#F7DDD4", backgroundColor: "#AD3206" };
      default:
        return {
          label: "Unknown",
          color: "#000000",
          backgroundColor: "#F0F0F0",
        };
    }
  };
  const inventoryStatus = getInventoryStatus(selectedOrder?.status);

  useEffect(() => {
    if (mapRef.current) {
      const map = tt.map({
        key: "cqdAo4VtS9HcyZTBIK4oOmy3dCGlm01Y",
        container: mapRef.current,
        center: [-122.4194, 37.7749],
        zoom: 16,
        style:
          "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAV0diMkFRMUE2T3R1T3NydjthZDAzYTAxYS0wNjU0LTQ5NTYtODExOS1hY2VmYzA2OGRhOGY=.json?key=cqdAo4VtS9HcyZTBIK4oOmy3dCGlm01Y",
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
      markerElement.style.backgroundColor = "#1c69fb";
      markerElement.style.borderRadius = "50%";
      markerElement.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";

      const truckIconHTML = renderToString(<Truck color="white" size={20} />);
      markerElement.innerHTML = truckIconHTML;

      const marker = new tt.Marker({ element: markerElement })
        .setLngLat([-122.4194, 37.7749])
        .addTo(map);

      return () => map.remove();
    }
  }, [selectedOrder]);

  const mapContent = (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
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
            top: 16,
            left: 16,
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 10,
            border: "1px solid #1c69fb",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 1,
            width: "30%",
            height: "51%",
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
                color: "black",
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
              color: "#1c69fb",
              marginBottom: 2,
            }}
            fontSize={{ xs: 12, md: 14, lg: 16, xl: 18 }}
            fontWeight={600}
          >
            {selectedOrder.orderStatus}
          </Typography>
          <Typography
            sx={{
              color: "grey",
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
              color: "black",
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
              color: "grey",
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
              color: "black",
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
          <Typography
            sx={{
              color: "grey",
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
              color: "black",
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
              color: "grey",
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
      )}
    </Box>
  );

  return isSmallScreen ? (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: "90%",
          maxWidth: "none",
          height: "90%",
          display: "flex",
          position: "relative",
        }}
      >
        <ModalClose />
        <Box sx={{ flex: 1, position: "relative" }}>
          {mapContent}

          {mapLoaded ? "true" : "false"}
        </Box>
      </ModalDialog>
    </Modal>
  ) : (
    mapContent
  );
};

export default OrderTrackingMap;
