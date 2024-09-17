"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/joy";
import InventoryItemsTab from "@/components/inventory/inventoryItemsTab";
import PendingOrdersTab from "@/components/inventory/pendingOrdersTab";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Titlebar from "@/components/common/titlebar";

const Inventory = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tab = searchParams.get('tab');
    const [selectedTab, setSelectedTab] = useState(tab || "inventoryItems");
    const [underlineStyle, setUnderlineStyle] = useState({});
    const tabsRef = useRef([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (tab) {
            setSelectedTab(tab);
        }
    }, [tab]);

    useEffect(() => {
        const activeTab = tabsRef.current.find(ref => ref && ref.getAttribute('data-value') === selectedTab);
        if (activeTab) {
            setUnderlineStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
            });
        }
    }, [selectedTab]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(contentRef.current.scrollTop > 0);
        };

        const contentElement = contentRef.current;
        contentElement.addEventListener('scroll', handleScroll);

        return () => {
            contentElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleTabChange = (tab) => {
        router.push(`?tab=${tab}`);
        setSelectedTab(tab);
    };

    const tabs = [
        { value: "inventoryItems", label: "Items" },
        { value: "pendingOrders", label: "Pending Orders" }
    ];

    return (
        <Box ref={contentRef} sx={{ height: "100vh", width: "100vw", display: 'flex', flexDirection: 'column', overflow: "scroll", backgroundColor: "#fafafa" }}>
            <Box sx={{
                background: isScrolled
                    && "rgba( 250, 250, 250, 0.1 )",
                backdropFilter: isScrolled ? "blur(4.5px)" : "none",
                borderBottom: isScrolled ? "1px solid #dedede2" : "none",
                position: "sticky",
                top: 0,
                zIndex: 1,
                transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
            }}>
                <Titlebar title="Inventory" />
                <Box
                    sx={{
                        height: "5vh",
                        display: "flex", alignItems: "center", justifyContent: "flex-start", padding: 2, paddingTop: 0, paddingBottom: 3, paddingLeft: 3, gap: 2, position: 'relative'
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Link key={tab.value} href={`?tab=${tab.value}`} passHref>
                            <Typography
                                ref={el => tabsRef.current[index] = el}
                                data-value={tab.value}
                                sx={{
                                    color: selectedTab === tab.value ? "#1c69fb" : "grey",
                                    fontWeight: 400,
                                    fontSize: {
                                        xs: 12,
                                        md: 14,
                                    },
                                    textDecoration: "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleTabChange(tab.value)}
                            >
                                {tab.label}
                            </Typography>
                        </Link>
                    ))}
                    <Box
                        sx={{
                            marginTop: 5,
                            position: 'absolute',
                            height: '2px',
                            backgroundColor: '#1c69fb',
                            transition: 'left 0.3s ease, width 0.3s ease',
                            ...underlineStyle,
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ transition: "opacity 0.5s ease", height: "100vh" }}>
                {selectedTab === "inventoryItems" && <InventoryItemsTab />}
                {selectedTab === "pendingOrders" && <PendingOrdersTab />}
            </Box>
        </Box >
    );
};

export default Inventory;