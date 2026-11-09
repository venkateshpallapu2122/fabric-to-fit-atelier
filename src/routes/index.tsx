import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo, useRef } from "react";
import {
  ShieldCheck,
  Leaf,
  Layers,
  Sparkles,
  Printer,
  Package,
  FileText,
  Download,
  Building2,
  CheckCircle2,
  Sliders,
  ChevronRight,
  TrendingDown,
  Info,
  ExternalLink,
  Plus,
  Minus,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Check,
  X,
  Droplets,
  Wind,
  Award,
  Clock,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  SlidersHorizontal,
  Box
} from "lucide-react";

type ProductColor = { name: string; hex: string; bgClass: string };
type Product = {
  id: string;
  name: string;
  category: string;
  gsm: number;
  fabric: string;
  basePrice: number;
  minMoq: number;
  leadTime: string;
  tag: string;
  badgeColor: string;
  certifications: string[];
  savings: { waterLiters: number; co2Kg: number; plasticGrams: number };
  specs: { shrinkage: string; tensileStrength: string; yarnCount: string; ribbing: string; hoodStyle: string };
  colors: [ProductColor, ...ProductColor[]];
  silhouetteType: string;
};
type SizeCounts = { XS: number; S: number; M: number; L: number; XL: number; "2XL": number; "3XL": number };
type PipelineQuote = {
  id: string;
  company: string;
  product: string;
  quantity: number;
  totalAmount: number;
  date: string;
  status: string;
  city: string;
  branding: string;
  contact: string;
  details?: {
    garmentColor: string;
    sizes: SizeCounts;
    pricing: {
      rawBaseUnit: number; discountedBaseUnit: number; brandingCostPerPc: number;
      accessoriesCostPerPc: number; unitPriceBeforeTax: number; subtotal: number;
      gstAmount: number; freight: number; grandTotal: number;
      effectivePerPiece: number; totalSavingsVsBase: number;
    };
    notes: string;
  };
};

const firstColor = (product: Product): ProductColor => {
  const color = product.colors[0];
  if (!color) throw new Error(`Product ${product.id} has no available color.`);
  return color;
};

// --- PRODUCT CATALOG DATA (8 SPECIFIED ATHLEISURE MODELS) ---
const PRODUCTS: [Product, ...Product[]] = [
  {
    id: "hoodie-450",
    name: "Eco-Air Heavyweight Hoodie",
    category: "Hoodies & Sweatshirts",
    gsm: 450,
    fabric: "100% GOTS Certified Organic Cotton (Interlock Terry)",
    basePrice: 1299,
    minMoq: 50,
    leadTime: "12 - 16 Business Days",
    tag: "Factory Flagship",
    badgeColor: "bg-emerald-900 text-emerald-100",
    certifications: ["GOTS Certified", "OEKO-TEX 100", "Zero AZO Dyes"],
    savings: { waterLiters: 1840, co2Kg: 3.2, plasticGrams: 90 },
    specs: {
      shrinkage: "< 2.5% (Pre-shrunk hot-air tumblers)",
      tensileStrength: "480 N/5cm",
      yarnCount: "24s Compact Spun Ring Ring",
      ribbing: "2x2 Lycra-reinforced Organic Rib",
      hoodStyle: "Double layered crossover 3-panel ergonomic hood"
    },
    colors: [
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" },
      { name: "Raw Undyed Sand", hex: "#E8E1D3", bgClass: "bg-[#E8E1D3]" },
      { name: "Muted Slate", hex: "#4A5568", bgClass: "bg-[#4A5568]" },
      { name: "Terracotta Clay", hex: "#A8533D", bgClass: "bg-[#A8533D]" }
    ],
    silhouetteType: "hoodie"
  },
  {
    id: "tee-180",
    name: "Bamboo-Lite Performance Tee",
    category: "Performance Tops",
    gsm: 180,
    fabric: "70% Organic Bamboo Viscose, 30% Combed Organic Cotton",
    basePrice: 549,
    minMoq: 50,
    leadTime: "10 - 14 Business Days",
    tag: "Ultra Breathable",
    badgeColor: "bg-teal-900 text-teal-100",
    certifications: ["OEKO-TEX 100", "Naturally Antibacterial", "UPF 50+"],
    savings: { waterLiters: 920, co2Kg: 1.8, plasticGrams: 60 },
    specs: {
      shrinkage: "< 2.0%",
      tensileStrength: "320 N/5cm",
      yarnCount: "40s Micro-Air Bamboo",
      ribbing: "Seamless flatlock neck collar",
      hoodStyle: "Self-fabric shoulder-to-shoulder taped seams"
    },
    colors: [
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" },
      { name: "Raw Undyed Sand", hex: "#E8E1D3", bgClass: "bg-[#E8E1D3]" },
      { name: "Muted Slate", hex: "#4A5568", bgClass: "bg-[#4A5568]" }
    ],
    silhouetteType: "tee"
  },
  {
    id: "joggers-320",
    name: "Hemp Everyday Joggers",
    category: "Pants & Bottoms",
    gsm: 320,
    fabric: "55% True Hemp, 45% Organic French Terry Cotton",
    basePrice: 1149,
    minMoq: 50,
    leadTime: "14 - 18 Business Days",
    tag: "High Abrasion Resistance",
    badgeColor: "bg-amber-900 text-amber-100",
    certifications: ["GOTS Organic Blend", "Zero Microplastic", "Naturally Antimicrobial"],
    savings: { waterLiters: 2400, co2Kg: 4.1, plasticGrams: 110 },
    specs: {
      shrinkage: "< 3.0%",
      tensileStrength: "610 N/5cm (Industrial Hemp Core)",
      yarnCount: "20s Twisted Core Hemp",
      ribbing: "High-density cuffed ankles with Japanese YKK zips",
      hoodStyle: "Deep slant pockets + hidden zippered stash compartment"
    },
    colors: [
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" },
      { name: "Raw Undyed Sand", hex: "#E8E1D3", bgClass: "bg-[#E8E1D3]" },
      { name: "Muted Slate", hex: "#4A5568", bgClass: "bg-[#4A5568]" }
    ],
    silhouetteType: "joggers"
  },
  {
    id: "crewneck-350",
    name: "Core Essential Crewneck Sweatshirt",
    category: "Hoodies & Sweatshirts",
    gsm: 350,
    fabric: "100% Organic Loopback French Terry (Bio-Polished)",
    basePrice: 949,
    minMoq: 50,
    leadTime: "10 - 14 Business Days",
    tag: "Best for Corporate Gifting",
    badgeColor: "bg-stone-800 text-stone-100",
    certifications: ["GOTS Certified", "OEKO-TEX 100", "Carbon Neutral Dyeing"],
    savings: { waterLiters: 1450, co2Kg: 2.7, plasticGrams: 80 },
    specs: {
      shrinkage: "< 2.2%",
      tensileStrength: "410 N/5cm",
      yarnCount: "30s/2 Loopback Knit",
      ribbing: "Heavyweight triangular V-notch collar rib",
      hoodStyle: "Drop shoulder comfort cut with reinforced bar-tacks"
    },
    colors: [
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" },
      { name: "Raw Undyed Sand", hex: "#E8E1D3", bgClass: "bg-[#E8E1D3]" },
      { name: "Terracotta Clay", hex: "#A8533D", bgClass: "bg-[#A8533D]" }
    ],
    silhouetteType: "crewneck"
  },
  {
    id: "oversized-tee-240",
    name: "Bamboo-Aero Oversized Drop-Shoulder Tee",
    category: "Performance Tops",
    gsm: 240,
    fabric: "65% Certified Organic Bamboo, 35% Ring-Spun Cotton",
    basePrice: 629,
    minMoq: 50,
    leadTime: "10 - 12 Business Days",
    tag: "Streetwear Fit",
    badgeColor: "bg-emerald-800 text-emerald-100",
    certifications: ["Bio-Washed Silky Touch", "OEKO-TEX Class 1", "UPF 40+"],
    savings: { waterLiters: 1100, co2Kg: 2.1, plasticGrams: 70 },
    specs: {
      shrinkage: "< 2.0%",
      tensileStrength: "360 N/5cm",
      yarnCount: "32s Luxury Compact",
      ribbing: "1.25 inch High-stance tight neck collar",
      hoodStyle: "Boxy relaxed aesthetic with extended side-slits"
    },
    colors: [
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" },
      { name: "Raw Undyed Sand", hex: "#E8E1D3", bgClass: "bg-[#E8E1D3]" },
      { name: "Muted Slate", hex: "#4A5568", bgClass: "bg-[#4A5568]" }
    ],
    silhouetteType: "tee"
  },
  {
    id: "tech-shorts-280",
    name: "Organic Cotton Tech Shorts",
    category: "Pants & Bottoms",
    gsm: 280,
    fabric: "94% Organic Cotton Weave, 6% Roica Recycled Elastane",
    basePrice: 849,
    minMoq: 50,
    leadTime: "12 - 15 Business Days",
    tag: "Water-Repellent Eco-Finish",
    badgeColor: "bg-cyan-900 text-cyan-100",
    certifications: ["Fluorine-free DWR Coating", "GOTS Certified", "OEKO-TEX 100"],
    savings: { waterLiters: 1250, co2Kg: 2.3, plasticGrams: 90 },
    specs: {
      shrinkage: "< 2.5%",
      tensileStrength: "490 N/5cm",
      yarnCount: "High-density micro-ripstop twill",
      ribbing: "Elasticated comfort waistband with tonal drawstrings",
      hoodStyle: "Dual front slash pockets + back magnetic snap pocket"
    },
    colors: [
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" },
      { name: "Muted Slate", hex: "#4A5568", bgClass: "bg-[#4A5568]" }
    ],
    silhouetteType: "shorts"
  },
  {
    id: "qzip-pullover-300",
    name: "Sustainable Quarter-Zip Active Pullover",
    category: "Active Outerwear",
    gsm: 300,
    fabric: "50% Recycled Post-Consumer Poly, 50% GOTS Organic Cotton",
    basePrice: 1199,
    minMoq: 50,
    leadTime: "14 - 18 Business Days",
    tag: "Circular Economy Hybrid",
    badgeColor: "bg-blue-900 text-blue-100",
    certifications: ["GRS (Global Recycled Standard)", "OEKO-TEX 100", "Thermal Lock"],
    savings: { waterLiters: 1950, co2Kg: 3.8, plasticGrams: 280 },
    specs: {
      shrinkage: "< 1.8%",
      tensileStrength: "530 N/5cm",
      yarnCount: "Double-knit thermal brushed back",
      ribbing: "Stand-up mock collar with Natulon recycled YKK zip",
      hoodStyle: "Contoured athletic panelling with reflective eco-piping"
    },
    colors: [
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" },
      { name: "Muted Slate", hex: "#4A5568", bgClass: "bg-[#4A5568]" }
    ],
    silhouetteType: "pullover"
  },
  {
    id: "raw-tank-220",
    name: "Minimalist Heavyweight Raw Tank",
    category: "Performance Tops",
    gsm: 220,
    fabric: "55% Sustainable True Hemp, 45% Organic Raw Cotton",
    basePrice: 479,
    minMoq: 50,
    leadTime: "10 - 12 Business Days",
    tag: "Zero-Chemical Bleach",
    badgeColor: "bg-amber-950 text-amber-200",
    certifications: ["Hypoallergenic", "Unbleached Natural Fibers", "100% Biodegradable"],
    savings: { waterLiters: 880, co2Kg: 1.4, plasticGrams: 50 },
    specs: {
      shrinkage: "< 3.0%",
      tensileStrength: "390 N/5cm",
      yarnCount: "26s Open-End Raw Slub",
      ribbing: "Raw binded armholes and neckband",
      hoodStyle: "Athletic racer-inspired dropped armhole architecture"
    },
    colors: [
      { name: "Raw Undyed Sand", hex: "#E8E1D3", bgClass: "bg-[#E8E1D3]" },
      { name: "Forest Green", hex: "#163827", bgClass: "bg-[#163827]" },
      { name: "Jet Black", hex: "#121212", bgClass: "bg-[#121212]" }
    ],
    silhouetteType: "tank"
  }
];

// BRAND PRESET LOGOS FOR INSTANT DEMO TESTING
const DEMO_LOGOS: Array<{ name: string; initials: string; color: string }> = [
  { name: "Apex Athletics", initials: "APEX", color: "#10B981" },
  { name: "GreenCorp Tech", initials: "G•CORP", color: "#3B82F6" },
  { name: "Zenith Studios", initials: "ZENITH", color: "#F59E0B" }
];

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState("catalog"); // 'catalog' | 'customizer' | 'lab' | 'pipeline'
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [activeSpecProduct, setActiveSpecProduct] = useState<Product>(PRODUCTS[0]);
  const [showSpecModal, setShowSpecModal] = useState(false);

  // Customizer State
  const [garmentColor, setGarmentColor] = useState<ProductColor>(firstColor(PRODUCTS[0]));
  const [brandingTechnique, setBrandingTechnique] = useState("puff"); // 'blank' | 'screen' | 'puff' | 'embroidery'
  const [logoPlacement, setLogoPlacement] = useState("left-chest"); // 'left-chest' | 'center-chest' | 'full-back' | 'sleeve'
  const [customLogoText, setCustomLogoText] = useState("WORTHSTYLE CLIENT");
  const [customLogoFile, setCustomLogoFile] = useState(null);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null);

  // Add-ons
  const [addonNeckLabel, setAddonNeckLabel] = useState(true); // +18/pc
  const [addonPolybag, setAddonPolybag] = useState(true); // +22/pc
  const [addonHangtag, setAddonHangtag] = useState(false); // +12/pc

  // Volume & Size distribution
  const [quantity, setQuantity] = useState(250);
  const [sizes, setSizes] = useState<SizeCounts>({
    XS: 20,
    S: 45,
    M: 75,
    L: 65,
    XL: 30,
    "2XL": 10,
    "3XL": 5
  });

  // RFQ Submission Form State
  const [rfqForm, setRfqForm] = useState({
    companyName: "Zenith Sports Technologies Pvt Ltd",
    contactPerson: "Venkatesh Rao",
    email: "merchandising@zenithsports.in",
    phone: "+91 98490 12345",
    gstin: "36AAACZ1234F1Z8",
    city: "Hyderabad, Telangana",
    targetDate: "2026-12-15",
    specialNotes: "Require custom Pantone matching for Forest Green shade. Include certified OEKO-TEX hangtags."
  });
  const [submittedRfq, setSubmittedRfq] = useState<PipelineQuote | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Merchant Pipeline / Quotes DB
  const [pipelineQuotes, setPipelineQuotes] = useState<PipelineQuote[]>([
    {
      id: "WS-RFQ-2026-8812",
      company: "Novartis Bio Campus Gym",
      product: "Eco-Air Heavyweight Hoodie (450 GSM)",
      quantity: 350,
      totalAmount: 386400,
      date: "Nov 08, 2026",
      status: "Lab Dip Sample Approved",
      city: "Hyderabad",
      branding: "3D Puff Print (Left Chest)",
      contact: "merchandise@novartis.com"
    },
    {
      id: "WS-RFQ-2026-8809",
      company: "Aether Endurance Club",
      product: "Bamboo-Lite Performance Tee (180 GSM)",
      quantity: 500,
      totalAmount: 231500,
      date: "Nov 07, 2026",
      status: "Tech Pack in Production",
      city: "Bengaluru",
      branding: "Eco Screen Print (Center)",
      contact: "purchase@aetherfit.co"
    },
    {
      id: "WS-RFQ-2026-8794",
      company: "T-Hub Foundation Ventures",
      product: "Core Essential Crewneck Sweatshirt (350 GSM)",
      quantity: 200,
      totalAmount: 189800,
      date: "Nov 05, 2026",
      status: "Dispatched",
      city: "Hyderabad",
      branding: "Precision Embroidery",
      contact: "community@thub.org"
    }
  ]);
  const [pipelineFilter, setPipelineFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

  // Sync color options when selected product changes
  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setGarmentColor(prod.colors[0]);
  };

  // Keep Size Sum synchronized with total quantity
  const totalSizesSum = useMemo(() => {
    return Object.values(sizes).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  }, [sizes]);

  const handleApplySizeCurve = (type: "standard" | "athletic" | "streetwear") => {
    // Distribute total `quantity` using popular industry ratios
    let ratio;
    if (type === "standard") {
      // 1 : 2 : 3 : 3 : 2 : 1 : 0.5
      ratio = { XS: 0.08, S: 0.16, M: 0.28, L: 0.28, XL: 0.14, "2XL": 0.04, "3XL": 0.02 };
    } else if (type === "athletic") {
      // More M & L
      ratio = { XS: 0.04, S: 0.18, M: 0.35, L: 0.30, XL: 0.10, "2XL": 0.02, "3XL": 0.01 };
    } else {
      // Streetwear Oversized: higher L, XL, 2XL
      ratio = { XS: 0.02, S: 0.10, M: 0.25, L: 0.35, XL: 0.20, "2XL": 0.06, "3XL": 0.02 };
    }

    const newSizes: SizeCounts = { ...sizes };
    let allocated = 0;
    const keys = Object.keys(sizes) as Array<keyof SizeCounts>;
    keys.forEach((key, idx) => {
      if (idx === keys.length - 1) {
        newSizes[key] = Math.max(0, quantity - allocated);
      } else {
        const val = Math.round(quantity * ratio[key]);
        newSizes[key] = val;
        allocated += val;
      }
    });
    setSizes(newSizes);
  };

  const handleSizeChange = (sizeKey: keyof SizeCounts, value: string) => {
    const numeric = Math.max(0, parseInt(value, 10) || 0);
    const updated = { ...sizes, [sizeKey]: numeric };
    setSizes(updated);
  };

  // Tier Discount calculation
  const tierInfo = useMemo(() => {
    if (quantity >= 1000) {
      return { discountPercent: 35, tierName: "Factory Bulk Tier (1000+ pcs)" };
    }
    if (quantity >= 500) {
      return { discountPercent: 25, tierName: "Scale Tier (500 - 999 pcs)" };
    }
    if (quantity >= 200) {
      return { discountPercent: 15, tierName: "Growth Tier (200 - 499 pcs)" };
    }
    return { discountPercent: 0, tierName: "Base Pilot Tier (50 - 199 pcs)" };
  }, [quantity]);

  // Branding Add-on cost per piece
  const brandingCostPerPc = useMemo(() => {
    switch (brandingTechnique) {
      case "screen":
        return 55;
      case "puff":
        return 90;
      case "embroidery":
        return 125;
      case "blank":
      default:
        return 0;
    }
  }, [brandingTechnique]);

  // Packaging & accessories add-ons per piece
  const accessoriesCostPerPc = useMemo(() => {
    let cost = 0;
    if (addonNeckLabel) cost += 18;
    if (addonPolybag) cost += 22;
    if (addonHangtag) cost += 12;
    return cost;
  }, [addonNeckLabel, addonPolybag, addonHangtag]);

  // Comprehensive Financial Totals
  const pricingSummary = useMemo(() => {
    const rawBaseUnit = selectedProduct.basePrice;
    const discountFactor = (100 - tierInfo.discountPercent) / 100;
    const discountedBaseUnit = Math.round(rawBaseUnit * discountFactor);
    const unitPriceBeforeTax = discountedBaseUnit + brandingCostPerPc + accessoriesCostPerPc;

    const subtotal = unitPriceBeforeTax * quantity;
    const gstAmount = Math.round(subtotal * 0.05); // 5% Apparel GST in India
    // Free freight on orders over ₹1,50,000 within Telangana / AP, else flat subsidized
    const freight = subtotal > 150000 ? 0 : 2500;
    const grandTotal = subtotal + gstAmount + freight;
    const effectivePerPiece = Math.round(grandTotal / (quantity || 1));

    const totalSavingsVsBase = Math.round(
      rawBaseUnit * quantity * (tierInfo.discountPercent / 100)
    );

    return {
      rawBaseUnit,
      discountedBaseUnit,
      brandingCostPerPc,
      accessoriesCostPerPc,
      unitPriceBeforeTax,
      subtotal,
      gstAmount,
      freight,
      grandTotal,
      effectivePerPiece,
      totalSavingsVsBase
    };
  }, [selectedProduct, tierInfo, brandingCostPerPc, accessoriesCostPerPc, quantity]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomLogoFile(file);
      const url = URL.createObjectURL(file);
      setUploadedLogoUrl(url);
    }
  };

  // Submit RFQ Flow
  const handleRfqSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = `WS-RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuoteRecord = {
      id: newId,
      company: rfqForm.companyName,
      product: `${selectedProduct.name} (${selectedProduct.gsm} GSM)`,
      quantity: quantity,
      totalAmount: pricingSummary.grandTotal,
      date: "Nov 09, 2026",
      status: "Pending Review",
      city: rfqForm.city,
      branding: `${brandingTechnique.toUpperCase()} (${logoPlacement})`,
      contact: rfqForm.email,
      details: {
        garmentColor: garmentColor.name,
        sizes: { ...sizes },
        pricing: { ...pricingSummary },
        notes: rfqForm.specialNotes
      }
    };

    setPipelineQuotes([newQuoteRecord, ...pipelineQuotes]);
    setSubmittedRfq(newQuoteRecord);
    setShowSuccessModal(true);
  };

  // Print/Download Slip simulation
  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans selection:bg-emerald-200">
      {/* --- TOP SUSTAINABILITY & B2B NOTICE BAR --- */}
      <div className="bg-[#133926] text-emerald-100 text-xs px-4 py-2 flex flex-wrap items-center justify-between border-b border-emerald-950">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-emerald-300">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Worthstyle B2B Hub
          </span>
          <span className="hidden md:inline text-emerald-200/60">•</span>
          <span className="hidden md:inline">
            Direct Mills: Hyderabad & Kamareddy, Telangana
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GOTS Licence: CU-847291
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-300" /> OEKO-TEX Standard 100
          </span>
          <span className="bg-emerald-800/80 px-2 py-0.5 rounded font-mono text-emerald-200">
            GST Verified (5% Slab)
          </span>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab("catalog")}>
            <div className="w-11 h-11 rounded-xl bg-[#133926] text-[#FBF9F5] flex items-center justify-center shadow-md shadow-emerald-950/20 font-serif font-black text-xl">
              W
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif tracking-tight text-2xl font-bold text-[#133926]">
                  worthstyle
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  B2B Portal
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Sustainable Athleisure & Corporate Merchandising
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-xl border border-stone-200/70">
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "catalog"
                  ? "bg-[#133926] text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Apparel Catalog (8)
            </button>
            <button
              onClick={() => setActiveTab("customizer")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "customizer"
                  ? "bg-[#133926] text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Live 2D Customizer
            </button>
            <button
              onClick={() => setActiveTab("lab")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "lab"
                  ? "bg-[#133926] text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              Fabric Spec Lab
            </button>
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "pipeline"
                  ? "bg-[#133926] text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Merchant Pipeline ({pipelineQuotes.length})
            </button>
          </nav>

          {/* Quick Active Quote CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("customizer")}
              className="bg-[#133926] hover:bg-[#1A4B33] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-all"
            >
              <Package className="w-4 h-4 text-emerald-300" />
              <span>Configure Bulk RFQ</span>
              <span className="bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded text-[10px]">
                {quantity} pcs
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto border-t border-stone-200 px-4 py-2 gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "catalog" ? "bg-[#133926] text-white" : "bg-stone-100"
            }`}
          >
            Apparel Catalog
          </button>
          <button
            onClick={() => setActiveTab("customizer")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "customizer" ? "bg-[#133926] text-white" : "bg-stone-100"
            }`}
          >
            2D Customizer
          </button>
          <button
            onClick={() => setActiveTab("lab")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "lab" ? "bg-[#133926] text-white" : "bg-stone-100"
            }`}
          >
            Fabric Lab
          </button>
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === "pipeline" ? "bg-[#133926] text-white" : "bg-stone-100"
            }`}
          >
            Pipeline ({pipelineQuotes.length})
          </button>
        </div>
      </header>

      {/* --- BODY VIEW CONDITIONAL ROUTING --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ======================= TAB 1: B2B CATALOG ======================= */}
        {activeTab === "catalog" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#133926] via-[#1A4B33] to-[#0E261A] text-white p-8 md:p-12 shadow-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Textile Manufacturer Pricing
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                  Sustainable Athleisure Built for India's Modern Teams.
                </h1>
                <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
                  Low MOQs (50 pcs), certified GOTS organic cotton, bamboo, and true hemp blends.
                  Custom screen print, 3D puff, and precision embroidery calibrated for fast B2B dispatch.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("customizer")}
                    className="bg-[#FBF9F5] hover:bg-white text-[#133926] text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    Open Live Estimator <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("lab")}
                    className="bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/40 text-emerald-100 text-xs font-semibold px-4 py-3 rounded-xl transition-all"
                  >
                    Inspect Lab Certifications
                  </button>
                </div>
              </div>

              {/* Quick stats ribbon */}
              <div className="mt-8 pt-6 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-emerald-300 font-bold text-lg">50 Pcs</div>
                  <div className="text-emerald-200/70">Lowest Pilot MOQ</div>
                </div>
                <div>
                  <div className="text-emerald-300 font-bold text-lg">Up to 35%</div>
                  <div className="text-emerald-200/70">Tiered Bulk Savings</div>
                </div>
                <div>
                  <div className="text-emerald-300 font-bold text-lg">10-15 Days</div>
                  <div className="text-emerald-200/70">Turnaround Time</div>
                </div>
                <div>
                  <div className="text-emerald-300 font-bold text-lg">OEKO-TEX 100</div>
                  <div className="text-emerald-200/70">Eco Dye Certified</div>
                </div>
              </div>
            </div>

            {/* Catalog Section Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Worthstyle B2B Product Lineup (8 Models)
                </h2>
                <p className="text-xs text-stone-500">
                  Select any silhouette to inspect technical spec sheets or customize with your brand artwork.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-100 p-1.5 rounded-lg border border-stone-200">
                <span className="font-semibold text-stone-900 px-2">Volume Discounts:</span>
                <span className="bg-white px-2 py-0.5 rounded shadow-xs text-emerald-800 font-medium">200+ (-15%)</span>
                <span className="bg-white px-2 py-0.5 rounded shadow-xs text-emerald-800 font-medium">500+ (-25%)</span>
                <span className="bg-white px-2 py-0.5 rounded shadow-xs text-emerald-800 font-medium">1000+ (-35%)</span>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {/* Card Visual Header */}
                  <div className="relative h-56 bg-stone-100 flex items-center justify-center p-6 overflow-hidden">
                    {/* Simulated Garment Vector Mockup */}
                    <GarmentSilhouette
                      type={prod.silhouetteType}
                      colorHex={prod.colors[0].hex}
                      className="w-36 h-36 transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                    />

                    {/* Top tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${prod.badgeColor}`}>
                        {prod.tag}
                      </span>
                      <span className="bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {prod.gsm} GSM
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-3 text-[10px] text-stone-500 font-medium bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-stone-200">
                      MOQ: {prod.minMoq} pcs
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                        {prod.category}
                      </div>
                      <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-emerald-900 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {prod.fabric}
                      </p>

                      {/* Swatches preview */}
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="text-[11px] text-stone-400 mr-1">Shades:</span>
                        {prod.colors.map((c, i) => (
                          <span
                            key={i}
                            title={c.name}
                            className={`w-3.5 h-3.5 rounded-full border border-stone-300 ${c.bgClass}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTAs */}
                    <div className="pt-3 border-t border-stone-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-xs text-stone-400">From </span>
                          <span className="text-lg font-serif font-black text-stone-900">
                            ₹{Math.round(prod.basePrice * 0.65)}
                          </span>
                          <span className="text-[10px] text-stone-400"> / unit (1k+ tier)</span>
                        </div>
                        <span className="text-xs line-through text-stone-400">
                          ₹{prod.basePrice}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setActiveSpecProduct(prod);
                            setShowSpecModal(true);
                          }}
                          className="w-full text-center py-2 px-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5" /> Spec Sheet
                        </button>
                        <button
                          onClick={() => {
                            handleSelectProduct(prod);
                            setActiveTab("customizer");
                          }}
                          className="w-full text-center py-2 px-2 text-xs font-bold text-white bg-[#133926] hover:bg-[#1C4E35] rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          Customize <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 2: LIVE 2D CUSTOMIZER ======================= */}
        {activeTab === "customizer" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Step navigation bar */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#133926] text-white flex items-center justify-center font-bold text-xs">
                  2D
                </span>
                <div>
                  <h2 className="text-sm font-bold text-stone-900">
                    Active Silhouette: {selectedProduct.name}
                  </h2>
                  <p className="text-xs text-stone-500">
                    Base GSM: {selectedProduct.gsm} | {selectedProduct.fabric}
                  </p>
                </div>
              </div>

              {/* Quick Model Switcher */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-stone-500">Change Apparel:</label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = PRODUCTS.find((p) => p.id === e.target.value);
                    if (found) handleSelectProduct(found);
                  }}
                  className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 font-medium text-stone-800 focus:outline-emerald-800"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.gsm} GSM)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customizer Main Layout: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Mockup Canvas & Placement Toggles */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-stone-200/60 rounded-2xl p-6 border border-stone-300/80 shadow-inner flex flex-col items-center justify-center relative min-h-[460px]">
                  {/* Watermark / Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[10px] font-bold px-2 py-1 rounded shadow-xs text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Mockup Preview
                  </div>

                  <div className="absolute top-4 right-4 text-xs font-mono bg-white/90 px-2 py-1 rounded text-stone-700 border border-stone-200">
                    {garmentColor.name}
                  </div>

                  {/* Visual Garment Mockup with Logo Overlay Engine */}
                  <div className="relative w-72 h-84 flex items-center justify-center transition-all duration-300">
                    <GarmentSilhouette
                      type={selectedProduct.silhouetteType}
                      colorHex={garmentColor.hex}
                      className="w-full h-full drop-shadow-2xl transition-colors duration-300"
                    />

                    {/* Logo Placement Container */}
                    {brandingTechnique !== "blank" && (
                      <div
                        className={`absolute flex items-center justify-center transition-all duration-300 ${
                          logoPlacement === "left-chest"
                            ? "top-[32%] left-[34%] w-12 h-12"
                            : logoPlacement === "center-chest"
                            ? "top-[36%] left-[40%] w-24 h-16"
                            : logoPlacement === "full-back"
                            ? "top-[28%] left-[32%] w-32 h-28 opacity-90"
                            : "top-[38%] left-[24%] w-10 h-10" // sleeve
                        }`}
                      >
                        {uploadedLogoUrl ? (
                          <img
                            src={uploadedLogoUrl}
                            alt="Client Logo"
                            className={`max-w-full max-h-full object-contain filter drop-shadow ${
                              brandingTechnique === "puff" ? "contrast-125" : ""
                            }`}
                          />
                        ) : (
                          <div
                            className={`p-1.5 rounded text-center border font-bold uppercase transition-all tracking-wider ${
                              garmentColor.name === "Raw Undyed Sand"
                                ? "bg-stone-900/90 text-white border-stone-800"
                                : "bg-white/90 text-stone-950 border-white/80"
                            } ${
                              brandingTechnique === "puff"
                                ? "shadow-[0_4px_10px_rgba(0,0,0,0.5)] scale-105"
                                : brandingTechnique === "embroidery"
                                ? "border-dashed"
                                : ""
                            }`}
                            style={{
                              fontSize:
                                logoPlacement === "center-chest"
                                  ? "10px"
                                  : logoPlacement === "full-back"
                                  ? "13px"
                                  : "7px"
                            }}
                          >
                            {customLogoText}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Garment Color Swatches */}
                  <div className="mt-4 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80 flex items-center gap-3">
                    <span className="text-xs font-semibold text-stone-600">Colorway:</span>
                    <div className="flex items-center gap-2">
                      {selectedProduct.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setGarmentColor(c)}
                          className={`w-7 h-7 rounded-full transition-transform ${
                            c.bgClass
                          } ${
                            garmentColor.name === c.name
                              ? "ring-2 ring-emerald-800 ring-offset-2 scale-110 shadow-md"
                              : "hover:scale-105 opacity-80"
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Placement Selector Bar */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                  <div className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Branding Placement Area</span>
                    <span className="text-[10px] text-emerald-800 font-semibold lowercase">
                      active: {logoPlacement}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "left-chest", label: "Left Chest" },
                      { id: "center-chest", label: "Center (Chest)" },
                      { id: "full-back", label: "Full Back" },
                      { id: "sleeve", label: "Left Sleeve" }
                    ].map((p) => (
                      <button
                        key={p.id}
                        disabled={brandingTechnique === "blank"}
                        onClick={() => setLogoPlacement(p.id)}
                        className={`text-[11px] py-2 px-1 rounded-lg font-semibold transition-all text-center ${
                          logoPlacement === p.id && brandingTechnique !== "blank"
                            ? "bg-[#133926] text-white shadow-xs"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200 disabled:opacity-40"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Brand Logo Presets & Upload */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Client Artwork / Logo
                    </span>
                    {uploadedLogoUrl && (
                      <button
                        onClick={() => {
                          setUploadedLogoUrl(null);
                          setCustomLogoFile(null);
                        }}
                        className="text-[10px] text-red-600 font-medium hover:underline"
                      >
                        Clear Upload
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="border-2 border-dashed border-stone-300 hover:border-emerald-700 rounded-lg p-3 text-center cursor-pointer transition-colors flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/jpeg"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Download className="w-4 h-4 text-emerald-800 mb-1" />
                      <span className="text-[11px] font-semibold text-stone-800">
                        Upload PNG/SVG
                      </span>
                      <span className="text-[9px] text-stone-400">Transparent 300 DPI</span>
                    </label>

                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-stone-500">Or Type Text Logo:</label>
                      <input
                        type="text"
                        value={customLogoText}
                        onChange={(e) => {
                          setCustomLogoText(e.target.value.toUpperCase());
                          setUploadedLogoUrl(null);
                        }}
                        className="w-full text-xs font-bold border border-stone-300 rounded-lg p-2 focus:outline-emerald-800"
                        placeholder="BRAND NAME"
                      />
                    </div>
                  </div>

                  {/* Demo presets */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-stone-400">Demo Presets:</span>
                    {DEMO_LOGOS.map((demo, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCustomLogoText(demo.name.toUpperCase());
                          setUploadedLogoUrl(null);
                        }}
                        className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded border border-stone-200 font-medium"
                      >
                        {demo.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: B2B Volume Configurator, Techniques & RFQ Form */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Branding Technique Selector */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">
                        1. Select Printing & Embellishment Technique
                      </h3>
                      <p className="text-xs text-stone-500">
                        OEKO-TEX approved non-toxic water-based pigment inks & Madeira threads.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      {
                        id: "puff",
                        name: "3D High-Density Puff Print",
                        cost: "+₹90 / pc",
                        desc: "Raised tactile texture, ideal for street/athleisure brands."
                      },
                      {
                        id: "screen",
                        name: "Eco Screen Print (Water-based)",
                        cost: "+₹55 / pc",
                        desc: "Soft-hand feel, breathable, zero cracking over 50 washes."
                      },
                      {
                        id: "embroidery",
                        name: "Japanese Precision Embroidery",
                        cost: "+₹125 / pc",
                        desc: "High stitch-count, premium corporate & executive apparel."
                      },
                      {
                        id: "blank",
                        name: "Blank Garment (No Artwork)",
                        cost: "₹0 / pc",
                        desc: "Plain luxury blanks for your own internal decorating."
                      }
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setBrandingTechnique(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          brandingTechnique === item.id
                            ? "border-emerald-800 bg-emerald-50/50 ring-1 ring-emerald-800"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900">{item.name}</span>
                          <span className="text-xs font-bold text-emerald-800">{item.cost}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 leading-snug">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Accessories & Sustainable Packaging */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                  <h3 className="text-sm font-bold text-stone-900">
                    2. Packaging & Brand Detailing Add-ons
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      addonNeckLabel ? "bg-emerald-50/40 border-emerald-800" : "bg-white border-stone-200"
                    }`}>
                      <input
                        type="checkbox"
                        checked={addonNeckLabel}
                        onChange={(e) => setAddonNeckLabel(e.target.checked)}
                        className="mt-0.5 accent-[#133926]"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Custom Woven Tag</div>
                        <div className="text-[10px] text-emerald-800 font-semibold">+₹18 / pc</div>
                        <div className="text-[10px] text-stone-500">Recycled damask thread</div>
                      </div>
                    </label>

                    <label className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      addonPolybag ? "bg-emerald-50/40 border-emerald-800" : "bg-white border-stone-200"
                    }`}>
                      <input
                        type="checkbox"
                        checked={addonPolybag}
                        onChange={(e) => setAddonPolybag(e.target.checked)}
                        className="mt-0.5 accent-[#133926]"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Cornstarch Polybag</div>
                        <div className="text-[10px] text-emerald-800 font-semibold">+₹22 / pc</div>
                        <div className="text-[10px] text-stone-500">100% Home Compostable</div>
                      </div>
                    </label>

                    <label className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      addonHangtag ? "bg-emerald-50/40 border-emerald-800" : "bg-white border-stone-200"
                    }`}>
                      <input
                        type="checkbox"
                        checked={addonHangtag}
                        onChange={(e) => setAddonHangtag(e.target.checked)}
                        className="mt-0.5 accent-[#133926]"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Seed Paper Hangtag</div>
                        <div className="text-[10px] text-emerald-800 font-semibold">+₹12 / pc</div>
                        <div className="text-[10px] text-stone-500">With QR traceability</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 3. Dynamic Tiered B2B Quantity & Size Distribution Matrix */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">
                        3. Order Quantity & Volume Pricing Tier
                      </h3>
                      <p className="text-xs text-stone-500">
                        Total units automatically activate volume manufacturing discounts.
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold">
                      {tierInfo.tierName}
                    </div>
                  </div>

                  {/* Quantity Slider & Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="50"
                        max="2500"
                        step="25"
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setQuantity(val);
                        }}
                        className="w-full accent-[#133926] cursor-pointer"
                      />
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="50"
                          max="10000"
                          value={quantity}
                          onChange={(e) => {
                            const val = Math.max(50, parseInt(e.target.value, 10) || 50);
                            setQuantity(val);
                          }}
                          className="w-24 text-right font-mono font-bold text-sm border border-stone-300 rounded-lg p-1.5 focus:outline-emerald-800"
                        />
                        <span className="text-xs font-medium text-stone-500">pcs</span>
                      </div>
                    </div>

                    {/* Quick Tier Selection Chips */}
                    <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                      {[
                        { label: "50 pcs", val: 50, desc: "Pilot MOQ" },
                        { label: "200 pcs", val: 200, desc: "-15% off" },
                        { label: "500 pcs", val: 500, desc: "-25% off" },
                        { label: "1000+ pcs", val: 1000, desc: "-35% off" }
                      ].map((chip) => (
                        <button
                          key={chip.val}
                          onClick={() => setQuantity(chip.val)}
                          className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                            quantity === chip.val
                              ? "bg-stone-900 text-white border-stone-900"
                              : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          <div>{chip.label}</div>
                          <div className="text-[10px] font-normal opacity-80">{chip.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Breakdown Matrix with Auto-Distributors */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Size Distribution (Total: {totalSizesSum} / {quantity} pcs)
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="text-stone-400">Auto-Curves:</span>
                        <button
                          type="button"
                          onClick={() => handleApplySizeCurve("standard")}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
                        >
                          Standard Bell
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplySizeCurve("athletic")}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
                        >
                          Athletic Fit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplySizeCurve("streetwear")}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
                        >
                          Oversized
                        </button>
                      </div>
                    </div>

                    {/* Size Inputs Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {Object.keys(sizes).map((sizeKey) => {
                      const sz = sizeKey as keyof SizeCounts;
                      return (
                        <div key={sz} className="text-center">
                          <label className="text-[10px] font-bold text-stone-500 block mb-1">
                            {sz}
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={sizes[sz]}
                            onChange={(e) => handleSizeChange(sz, e.target.value)}
                            className="w-full text-center font-mono text-xs font-semibold bg-stone-50 border border-stone-300 rounded p-1.5 focus:outline-emerald-800"
                          />
                        </div>
                      );
                    })}
                    </div>

                    {totalSizesSum !== quantity && (
                      <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Size sum ({totalSizesSum}) does not match total quantity ({quantity}).
                          We'll balance this in the tech pack.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Live Financial Quotation Summary */}
                <div className="bg-[#133926] text-white p-6 rounded-2xl shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
                    <div>
                      <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-widest">
                        Instant Proforma Quote
                      </div>
                      <div className="text-lg font-serif font-bold">
                        {quantity} × {selectedProduct.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-black text-white">
                        ₹{pricingSummary.grandTotal.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-emerald-300">
                        Effective: ₹{pricingSummary.effectivePerPiece} / piece (Incl. GST)
                      </div>
                    </div>
                  </div>

                  {/* Itemized breakdown table */}
                  <div className="text-xs space-y-1.5 text-emerald-100/90 pt-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-emerald-200/70">
                        Base Manufacturing ({quantity} pcs @ ₹{pricingSummary.discountedBaseUnit})
                      </span>
                      <span>₹{(pricingSummary.discountedBaseUnit * quantity).toLocaleString("en-IN")}</span>
                    </div>

                    {tierInfo.discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-300 font-semibold">
                        <span>Volume Tier Savings ({tierInfo.discountPercent}%)</span>
                        <span>- ₹{pricingSummary.totalSavingsVsBase.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    {pricingSummary.brandingCostPerPc > 0 && (
                      <div className="flex justify-between">
                        <span className="text-emerald-200/70">
                          Branding Technique ({brandingTechnique.toUpperCase()})
                        </span>
                        <span>
                          ₹{(pricingSummary.brandingCostPerPc * quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    {pricingSummary.accessoriesCostPerPc > 0 && (
                      <div className="flex justify-between">
                        <span className="text-emerald-200/70">
                          Packaging & Neck Label Detailing
                        </span>
                        <span>
                          ₹{(pricingSummary.accessoriesCostPerPc * quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between border-t border-emerald-800/80 pt-2 font-medium">
                      <span>Subtotal (Excl. Taxes)</span>
                      <span>₹{pricingSummary.subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-emerald-200/70">Apparel GST (5% Slab)</span>
                      <span>₹{pricingSummary.gstAmount.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-emerald-200/70">Logistics (Telangana Dispatch)</span>
                      <span>
                        {pricingSummary.freight === 0 ? "FREE (Bulk Waived)" : `₹${pricingSummary.freight}`}
                      </span>
                    </div>
                  </div>

                  {/* Environmental Handprint */}
                  <div className="pt-3 border-t border-emerald-800 flex items-center justify-between text-[11px] text-emerald-200">
                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                      <span>
                        {(selectedProduct.savings.waterLiters * quantity).toLocaleString()}L Water Preserved
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-emerald-300" />
                      <span>
                        {((selectedProduct.savings.co2Kg * quantity) / 1000).toFixed(2)}t CO₂ Offset
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Request For Quote (RFQ) Submission Form */}
                <form
                  onSubmit={handleRfqSubmit}
                  className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                    <Building2 className="w-4 h-4 text-emerald-800" />
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                      Company & Quotation Contact Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={rfqForm.companyName}
                        onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-2.5 focus:outline-emerald-800"
                        placeholder="e.g. Google India / Cult.fit"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Contact Person Name *</label>
                      <input
                        type="text"
                        required
                        value={rfqForm.contactPerson}
                        onChange={(e) => setRfqForm({ ...rfqForm, contactPerson: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-2.5 focus:outline-emerald-800"
                        placeholder="e.g. Venkatesh Rao"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Official Business Email *</label>
                      <input
                        type="email"
                        required
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-2.5 focus:outline-emerald-800"
                        placeholder="merchandise@company.com"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={rfqForm.phone}
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-2.5 focus:outline-emerald-800"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">GSTIN (For 5% Input Credit)</label>
                      <input
                        type="text"
                        value={rfqForm.gstin}
                        onChange={(e) => setRfqForm({ ...rfqForm, gstin: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-2.5 focus:outline-emerald-800 font-mono uppercase"
                        placeholder="36AAAAA0000A1Z5"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Destination City *</label>
                      <input
                        type="text"
                        required
                        value={rfqForm.city}
                        onChange={(e) => setRfqForm({ ...rfqForm, city: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-2.5 focus:outline-emerald-800"
                        placeholder="Hyderabad, Bengaluru, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 text-xs block mb-1">
                      Pantone / Artwork / Special Tech Pack Notes
                    </label>
                    <textarea
                      rows={2}
                      value={rfqForm.specialNotes}
                      onChange={(e) => setRfqForm({ ...rfqForm, specialNotes: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg p-2 text-xs focus:outline-emerald-800"
                      placeholder="Specify custom GSM, embroidery thread colors, individual barcoding, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#133926] hover:bg-[#1A4B33] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-emerald-300" />
                    <span>Generate Proforma Quotation & Send RFQ</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: SUSTAINABILITY & FABRIC SPEC LAB ======================= */}
        {activeTab === "lab" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lab Header */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Technical Textile Integrity
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900">
                Worthstyle Material & Compliance Lab
              </h2>
              <p className="text-sm text-stone-600 max-w-3xl">
                Every meter of fabric spun for Worthstyle is engineered with certified zero-toxic chemistry,
                pesticide-free raw fibers (Hemp, Bamboo Viscose, Organic Cotton), and closed-loop bio-polishing.
              </p>
            </div>

            {/* Core Certifications 3-Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">GOTS Certified Organic</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Strict environmental criteria throughout the entire supply chain. Prohibits heavy metals,
                  formaldehyde, and aromatic solvents from spinning to finishing.
                </p>
                <div className="pt-2 text-[11px] font-mono text-emerald-800 font-semibold">
                  Licence # CU-847291 / ISO 14001 Compliant
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">OEKO-TEX Standard 100</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Certified Product Class 1: Tested safe for direct skin contact, infant-safe thresholds,
                  zero AZO carcinogenic dyes, and certified color-fastness over 60 industrial washes.
                </p>
                <div className="pt-2 text-[11px] font-mono text-teal-800 font-semibold">
                  Test Report ID: HYD-TEX-2026-904
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Box className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Zero-Plastic Policy</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  100% compostable PLA/cornstarch garment bags that degrade naturally within 180 days in soil.
                  FSC-certified paper cartons sealed with water-activated kraft paper tape.
                </p>
                <div className="pt-2 text-[11px] font-mono text-amber-800 font-semibold">
                  EN 13432 Compostability Standard
                </div>
              </div>
            </div>

            {/* Detailed Spec Comparison Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Comprehensive Fabric Specification Matrix
                  </h3>
                  <p className="text-xs text-stone-500">
                    Technical benchmarks across all 8 athleisure models manufactured in Telangana.
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors self-start md:self-auto"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full Spec Pack (PDF)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Apparel Model</th>
                      <th className="p-4">Fabric Blend</th>
                      <th className="p-4">Weight</th>
                      <th className="p-4">Shrinkage Rate</th>
                      <th className="p-4">Tensile Strength</th>
                      <th className="p-4">Water Saved</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {PRODUCTS.map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="p-4 font-bold text-stone-900 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
                          {prod.name}
                        </td>
                        <td className="p-4 text-stone-600 max-w-xs">{prod.fabric}</td>
                        <td className="p-4 font-mono font-bold text-stone-800">{prod.gsm} GSM</td>
                        <td className="p-4 font-mono text-emerald-800">{prod.specs.shrinkage}</td>
                        <td className="p-4 font-mono text-stone-600">{prod.specs.tensileStrength}</td>
                        <td className="p-4 text-cyan-800 font-semibold">{prod.savings.waterLiters} L / pc</td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              handleSelectProduct(prod);
                              setActiveTab("customizer");
                            }}
                            className="bg-emerald-900 hover:bg-emerald-800 text-white font-semibold px-3 py-1.5 rounded-md text-[11px]"
                          >
                            Customize
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: MERCHANT PIPELINE / ADMIN ======================= */}
        {activeTab === "pipeline" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Pipeline Header */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-serif font-bold text-stone-900">
                    Merchant Order Pipeline & RFQs
                  </h2>
                  <span className="bg-emerald-100 text-emerald-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    Admin Console
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Manage submitted enterprise quotations, approval states, and factory dispatch queues.
                </p>
              </div>

              {/* Status summary counters */}
              <div className="flex items-center gap-3 text-xs">
                <div className="bg-stone-100 p-2.5 rounded-xl border border-stone-200">
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Total Quotes</div>
                  <div className="text-base font-serif font-black text-stone-900">{pipelineQuotes.length}</div>
                </div>
                <div className="bg-stone-100 p-2.5 rounded-xl border border-stone-200">
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Pipeline Value</div>
                  <div className="text-base font-serif font-black text-emerald-900">
                    ₹
                    {pipelineQuotes
                      .reduce((sum, q) => sum + q.totalAmount, 0)
                      .toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search by company, RFQ #, or city..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-emerald-800"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {["all", "Pending Review", "Lab Dip Sample Approved", "Tech Pack in Production", "Dispatched"].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setPipelineFilter(st)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                        pipelineFilter === st
                          ? "bg-[#133926] text-white shadow-xs"
                          : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {st === "all" ? "All Orders" : st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Pipeline Quotes Cards List */}
            <div className="grid grid-cols-1 gap-4">
              {pipelineQuotes
                .filter((q) => {
                  if (pipelineFilter !== "all" && q.status !== pipelineFilter) return false;
                  if (
                    searchFilter &&
                    !q.company.toLowerCase().includes(searchFilter.toLowerCase()) &&
                    !q.id.toLowerCase().includes(searchFilter.toLowerCase()) &&
                    !q.city.toLowerCase().includes(searchFilter.toLowerCase())
                  )
                    return false;
                  return true;
                })
                .map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-700/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {quote.id}
                        </span>
                        <span className="text-xs text-stone-400">• {quote.date}</span>
                        <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" /> {quote.city}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        {quote.company}
                      </h4>
                      <div className="text-xs text-stone-600 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                        <span>
                          <strong>Apparel:</strong> {quote.product}
                        </span>
                        <span>
                          <strong>Volume:</strong> {quote.quantity} pcs
                        </span>
                        <span>
                          <strong>Branding:</strong> {quote.branding}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                      <div className="text-right">
                        <div className="text-lg font-serif font-black text-stone-900">
                          ₹{quote.totalAmount.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          ₹{Math.round(quote.totalAmount / quote.quantity)} / piece net
                        </div>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <select
                          value={quote.status}
                          onChange={(e) => {
                            const updated = pipelineQuotes.map((item) =>
                              item.id === quote.id ? { ...item, status: e.target.value } : item
                            );
                            setPipelineQuotes(updated);
                          }}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-emerald-800 cursor-pointer ${
                            quote.status === "Pending Review"
                              ? "bg-amber-50 text-amber-900 border-amber-300"
                              : quote.status === "Lab Dip Sample Approved"
                              ? "bg-blue-50 text-blue-900 border-blue-300"
                              : quote.status === "Tech Pack in Production"
                              ? "bg-purple-50 text-purple-900 border-purple-300"
                              : "bg-emerald-50 text-emerald-900 border-emerald-300"
                          }`}
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Lab Dip Sample Approved">Lab Dip Sample Approved</option>
                          <option value="Tech Pack in Production">Tech Pack in Production</option>
                          <option value="Dispatched">Dispatched</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* ======================= TECHNICAL SPEC MODAL ======================= */}
      {showSpecModal && activeSpecProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-stone-200 animate-scaleUp">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                  Mill Technical Specification
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {activeSpecProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setShowSpecModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl space-y-1">
                <div className="font-semibold text-stone-800">Fabric Composition:</div>
                <div className="text-stone-600">{activeSpecProduct.fabric}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-stone-200 p-2.5 rounded-lg">
                  <span className="text-stone-400 block text-[10px]">Areal Density (GSM)</span>
                  <span className="font-bold text-stone-900 text-sm">{activeSpecProduct.gsm} GSM</span>
                </div>
                <div className="border border-stone-200 p-2.5 rounded-lg">
                  <span className="text-stone-400 block text-[10px]">Tensile Resistance</span>
                  <span className="font-bold text-stone-900 text-sm">{activeSpecProduct.specs.tensileStrength}</span>
                </div>
                <div className="border border-stone-200 p-2.5 rounded-lg">
                  <span className="text-stone-400 block text-[10px]">Shrinkage Limit</span>
                  <span className="font-bold text-emerald-800 text-sm">{activeSpecProduct.specs.shrinkage}</span>
                </div>
                <div className="border border-stone-200 p-2.5 rounded-lg">
                  <span className="text-stone-400 block text-[10px]">Spinning / Yarn Count</span>
                  <span className="font-bold text-stone-900 text-sm">{activeSpecProduct.specs.yarnCount}</span>
                </div>
              </div>

              <div className="border border-stone-200 p-3 rounded-lg space-y-1">
                <span className="text-stone-400 text-[10px] block">Certifications & Eco Standards:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeSpecProduct.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSpecModal(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSelectProduct(activeSpecProduct);
                  setShowSpecModal(false);
                  setActiveTab("customizer");
                }}
                className="bg-[#133926] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#1C4E35]"
              >
                Configure This Model
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= QUOTATION SUCCESS MODAL & PROFORMA PRINT SLIP ======================= */}
      {showSuccessModal && submittedRfq && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-stone-200 animate-scaleUp max-h-[90vh] overflow-y-auto">
            {/* Success Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Official B2B RFQ Generated
              </h3>
              <p className="text-xs text-stone-500">
                Reference ID: <strong className="font-mono text-emerald-800">{submittedRfq.id}</strong> • Transmitted to Worthstyle Merchandising Desk (Telangana)
              </p>
            </div>

            {/* Proforma Slip Card */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <div className="font-bold text-stone-900 text-sm">WORTHSTYLE MERCHANDISING</div>
                  <div className="text-[10px] text-stone-500">Hyderabad & Kamareddy Hubs, TS</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-800 font-bold">{submittedRfq.id}</div>
                  <div className="text-[10px] text-stone-400">{submittedRfq.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-stone-400 text-[10px] uppercase">Client Entity</div>
                  <div className="font-bold text-stone-900">{submittedRfq.company}</div>
                  <div className="text-stone-600">{submittedRfq.contact}</div>
                  <div className="text-stone-500 text-[10px]">City: {submittedRfq.city}</div>
                </div>
                <div className="text-right">
                  <div className="text-stone-400 text-[10px] uppercase">Configured Product</div>
                  <div className="font-bold text-stone-900">{submittedRfq.product}</div>
                  <div className="text-stone-600">Color: {submittedRfq.details.garmentColor}</div>
                  <div className="text-stone-600">{submittedRfq.branding}</div>
                </div>
              </div>

              {/* Size recap */}
              <div className="bg-white p-3 rounded-lg border border-stone-200 flex justify-between text-[11px]">
                {Object.entries(submittedRfq.details.sizes).map(([sz, count]) => (
                  <div key={sz} className="text-center">
                    <span className="text-stone-400 block text-[9px]">{sz}</span>
                    <span className="font-bold text-stone-800">{count}</span>
                  </div>
                ))}
              </div>

              {/* Total sum */}
              <div className="border-t border-stone-200 pt-3 flex items-center justify-between font-sans">
                <div>
                  <span className="text-xs text-stone-500">Net Payable Total (Incl. 5% GST):</span>
                  <div className="text-xl font-serif font-black text-emerald-900">
                    ₹{submittedRfq.totalAmount.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-right text-[11px] text-stone-500">
                  <span>Dispatch SLA:</span>
                  <div className="font-semibold text-stone-800">12 - 16 Business Days</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrintSlip}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" /> Print Quotation Slip
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setActiveTab("pipeline");
                  }}
                  className="bg-[#133926] hover:bg-[#1A4B33] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  View in Merchant Pipeline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="mt-20 bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-serif font-bold text-base">
                W
              </div>
              <span className="text-base font-serif font-bold text-white tracking-tight">
                worthstyle.in
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Pioneering circular, organic, and certified sustainable B2B athleisure.
              Crafted in Telangana for forward-thinking enterprises, sports clubs, and creator brands.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Direct Mill Facilities
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Textile Valley, Gachibowli, Hyderabad, Telangana</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Kamareddy Organic Weaving & Dyeing Cluster</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Certifications & Testing
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>Global Organic Textile Standard (GOTS)</li>
              <li>OEKO-TEX® Standard 100 Class 1</li>
              <li>EN 13432 Compostable Packaging</li>
              <li>Zero Toxic Effluent Discharge (ZDHC)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Enterprise Procurement
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>b2b@worthstyle.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 98490 12345 (Direct Desk)</span>
              </div>
              <div className="pt-2">
                <span className="inline-block bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">
                  Turnaround: 10 - 16 Days
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800/80 py-4 text-center text-[11px] text-stone-500">
          © 2026 Worthstyle Sustainable Apparel Pvt Ltd. All rights reserved. Built with pride in Telangana.
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENT: 2D GARMENT VECTOR SILHOUETTE ENGINE ---
function GarmentSilhouette({ type, colorHex, className = "" }: { type: string; colorHex: string; className?: string }) {
  // SVG vector silhouettes based on clothing models
  if (type === "hoodie") {
    return (
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Main Body */}
        <path
          d="M60 70 L90 45 L150 45 L180 70 L210 110 L185 130 L170 100 L170 210 L70 210 L70 100 L55 130 L30 110 Z"
          fill={colorHex}
          stroke="#000"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        {/* Double layered Hood outline */}
        <path
          d="M90 45 C90 20, 150 20, 150 45 C145 65, 95 65, 90 45 Z"
          fill={colorHex}
          stroke="#000"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        {/* Kangaroo Pocket */}
        <path
          d="M85 145 L155 145 L150 185 L90 185 Z"
          fill="none"
          stroke="#000"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        {/* Drawstrings */}
        <path
          d="M110 55 L110 85 M130 55 L130 85"
          stroke="#fff"
          strokeOpacity="0.6"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Hem and cuff ribbing accents */}
        <line x1="70" y1="205" x2="170" y2="205" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "joggers") {
    return (
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Jogger Pants outline */}
        <path
          d="M75 40 L165 40 L170 80 L155 210 L130 210 L120 100 L110 210 L85 210 L70 80 Z"
          fill={colorHex}
          stroke="#000"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        {/* Elastic waistband */}
        <rect x="75" y="40" width="90" height="12" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
        {/* Drawstring ties */}
        <path d="M115 52 L110 70 M125 52 L130 70" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
        {/* Slanted side pockets */}
        <line x1="80" y1="65" x2="95" y2="90" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
        <line x1="160" y1="65" x2="145" y2="90" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "crewneck" || type === "pullover") {
    return (
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M60 65 L95 40 L145 40 L180 65 L215 110 L190 125 L170 95 L170 205 L70 205 L70 95 L50 125 L25 110 Z"
          fill={colorHex}
          stroke="#000"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        {/* Collar */}
        <path
          d="M95 40 C105 52, 135 52, 145 40"
          stroke="#000"
          strokeOpacity="0.3"
          strokeWidth="3"
        />
        {type === "pullover" && (
          <line x1="120" y1="45" x2="120" y2="80" stroke="#fff" strokeOpacity="0.6" strokeWidth="2.5" />
        )}
      </svg>
    );
  }

  if (type === "shorts") {
    return (
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M70 60 L170 60 L180 145 L135 145 L120 100 L105 145 L60 145 Z"
          fill={colorHex}
          stroke="#000"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        <rect x="70" y="60" width="100" height="12" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
        <line x1="78" y1="85" x2="95" y2="110" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "tank") {
    return (
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M80 50 L95 50 C100 70, 140 70, 145 50 L160 50 L165 90 C155 105, 155 105, 160 205 L80 205 C85 105, 85 105, 75 90 Z"
          fill={colorHex}
          stroke="#000"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
      </svg>
    );
  }

  // Default: Standard T-shirt
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M65 65 L95 45 L145 45 L175 65 L210 95 L190 115 L170 95 L170 205 L70 205 L70 95 L50 115 L30 95 Z"
        fill={colorHex}
        stroke="#000"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      {/* Crew neck */}
      <path
        d="M95 45 C102 58, 138 58, 145 45"
        stroke="#000"
        strokeOpacity="0.3"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Worthstyle B2B Apparel Portal | Sustainable Teamwear" },
      { name: "description", content: "Explore certified sustainable apparel, configure branded bulk orders, calculate tiered quotes, and review fabric specifications with Worthstyle." },
      { property: "og:title", content: "Worthstyle B2B Apparel Portal | Sustainable Teamwear" },
      { property: "og:description", content: "Explore certified sustainable apparel, configure branded bulk orders, calculate tiered quotes, and review fabric specifications with Worthstyle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
