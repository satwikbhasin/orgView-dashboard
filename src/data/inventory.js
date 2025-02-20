const inventoryData = [
    {
        sku: "IOL001",
        itemName: "Monofocal IOL",
        category: "IOLS",
        price: "$299.99",
        currentStock: 5,
        minThreshold: 10,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "SURG001",
        itemName: "Surgical Scissors",
        category: "Surgical Instruments",
        price: "$99.99",
        currentStock: 15,
        minThreshold: 15,
        status: "yellow",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "MED001",
        itemName: "Antibiotic Eye Drops",
        category: "Medications",
        price: "$19.99",
        currentStock: 50,
        minThreshold: 30,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "DIAG001",
        itemName: "OCT Machine",
        category: "Diagnostic Equipment",
        price: "$7999.99",
        currentStock: 3,
        minThreshold: 5,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "IOL002",
        itemName: "Toric IOL",
        category: "IOLS",
        price: "$349.99",
        currentStock: 8,
        minThreshold: 10,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "SURG002",
        itemName: "Forceps",
        category: "Surgical Instruments",
        price: "$49.99",
        currentStock: 20,
        minThreshold: 5,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "MED002",
        itemName: "Steroid Eye Drops",
        category: "Medications",
        price: "$29.99",
        currentStock: 40,
        minThreshold: 20,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "DIAG002",
        itemName: "Slit Lamp",
        category: "Diagnostic Equipment",
        price: "$4999.99",
        currentStock: 2,
        minThreshold: 3,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "IOL003",
        itemName: "Multifocal IOL",
        category: "IOLS",
        price: "$399.99",
        currentStock: 6,
        minThreshold: 10,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "SURG003",
        itemName: "Scalpel",
        category: "Surgical Instruments",
        price: "$19.99",
        currentStock: 30,
        minThreshold: 10,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "MED003",
        itemName: "Anti-inflammatory Eye Drops",
        category: "Medications",
        price: "$24.99",
        currentStock: 60,
        minThreshold: 25,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "DIAG003",
        itemName: "Fundus Camera",
        category: "Diagnostic Equipment",
        price: "$9999.99",
        currentStock: 1,
        minThreshold: 2,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "IOL004",
        itemName: "Phakic IOL",
        category: "IOLS",
        price: "$299.99",
        currentStock: 7,
        minThreshold: 10,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "SURG004",
        itemName: "Needle Holder",
        category: "Surgical Instruments",
        price: "$59.99",
        currentStock: 25,
        minThreshold: 10,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "MED004",
        itemName: "Lubricating Eye Drops",
        category: "Medications",
        price: "$14.99",
        currentStock: 70,
        minThreshold: 30,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "DIAG004",
        itemName: "Visual Field Analyzer",
        category: "Diagnostic Equipment",
        price: "$6999.99",
        currentStock: 3,
        minThreshold: 3,
        status: "yellow",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "IOL005",
        itemName: "Accommodating IOL",
        category: "IOLS",
        price: "$449.99",
        currentStock: 4,
        minThreshold: 10,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "SURG005",
        itemName: "Retractor",
        category: "Surgical Instruments",
        price: "$39.99",
        currentStock: 18,
        minThreshold: 5,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "MED005",
        itemName: "Antiviral Eye Drops",
        category: "Medications",
        price: "$34.99",
        currentStock: 45,
        minThreshold: 20,
        status: "green",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
    {
        sku: "DIAG005",
        itemName: "Autorefractor",
        category: "Diagnostic Equipment",
        price: "$8999.99",
        currentStock: 2,
        minThreshold: 3,
        status: "red",
        actions: ["View Usage", "Order"],
        usage: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * (35000 - 5000 + 1)) + 5000),
        },
    },
];

export const getItemCategories = () => {
    const categories = inventoryData.map((item) => item.category);
    return [...new Set(categories)];
};

export const getStockStatusTypes = () => {
    const statusTypes = inventoryData.map((item) => item.status);
    return [...new Set(statusTypes)];
};

export default inventoryData;