"use client";

import { 
  QrCode, 
  Link as LinkIcon, 
  Wifi, 
  KeyRound, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Image as ImageIcon, 
  Sliders, 
  Download, 
  Share2, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Info, 
  X, 
  Check
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import QRCodeDisplay from "./components/QRCodeDisplay";
import JsonLd from "./components/JsonLd";

export default function App() {
  const [qrType, setQrType] = useState("url");
  const [rangeSize, setRangeSize] = useState(300);
  const [foregroundColor, setForegroundColor] = useState("#2A2922");
  const [backgroundColor, setBackgroundColor] = useState("#FFF8E7");
  const [qrContent, setQrContent] = useState("https://exon.dev");
  const [patternStyle, setPatternStyle] = useState<'square' | 'dots' | 'rounded' | 'classy'>('square');
  const [cornerStyle, setCornerStyle] = useState<'square' | 'extra-rounded' | 'dot' | 'classy-rounded'>('square');
  const [errorCorrection, setErrorCorrection] = useState("Q");
  const [logoImage, setLogoImage] = useState<string | undefined>(undefined);
  const [qrInstance, setQrInstance] = useState<any>(null);
  const [downloadSize, setDownloadSize] = useState(1024);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [showFgColorPicker, setShowFgColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [logoPaddingPreset, setLogoPaddingPreset] = useState<'none' | 'minimal' | 'standard'>('none');
  const [logoSize, setLogoSize] = useState(0.25);
  const [qrBackgroundPadding, setQrBackgroundPadding] = useState(10);
  const [qrBackgroundBorderRadius, setQrBackgroundBorderRadius] = useState(10);

  // JSON-LD structured data for SEO
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free QR Code Generator",
    "url": "https://qr.exon.dev",
    "description": "Create custom QR codes for URL, vCard, WiFi, text, email, and more. Add your logo, choose colors, frames, and download in high quality.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Custom QR codes with logo",
      "Multiple QR code types (URL, WiFi, vCard, etc.)",
      "Color customization",
      "High-quality downloads",
      "No registration required"
    ],
    "screenshot": "https://qr.exon.dev/og-image.png",
    "creator": {
      "@type": "Person",
      "name": "Ryan Vogel"
    }
  };

  // Refs for color picker containers
  const fgColorPickerRef = useRef<HTMLDivElement>(null);
  const bgColorPickerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close color pickers
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fgColorPickerRef.current && !fgColorPickerRef.current.contains(event.target as Node)) {
        setShowFgColorPicker(false);
      }
      if (bgColorPickerRef.current && !bgColorPickerRef.current.contains(event.target as Node)) {
        setShowBgColorPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Preset download sizes
  const downloadSizePresets = [
    { label: "Small (512px)", value: 512 },
    { label: "Medium (1024px)", value: 1024 },
    { label: "Large (2048px)", value: 2048 },
    { label: "Extra Large (3000px)", value: 3000 },
  ];

  // Common QR code color presets
  const qrColorPresets = {
    foreground: [
      { name: 'Off-Black', value: '#2A2922', complementary: '#FFF8E7' },
      { name: 'Dark Blue', value: '#0f172a', complementary: '#f8fafc' },
      { name: 'Navy', value: '#172554', complementary: '#f0f9ff' },
      { name: 'Dark Green', value: '#14532d', complementary: '#f0fdf4' },
      { name: 'Dark Red', value: '#7f1d1d', complementary: '#fef2f2' },
      { name: 'Purple', value: '#581c87', complementary: '#fdf4ff' },
      { name: 'Dark Gray', value: '#1f2937', complementary: '#f9fafb' }
    ],
    background: [
      { name: 'Warm White', value: '#FFF8E7', complementary: '#2A2922' },
      { name: 'Light Gray', value: '#f8fafc', complementary: '#0f172a' },
      { name: 'Light Blue', value: '#f0f9ff', complementary: '#172554' },
      { name: 'Light Green', value: '#f0fdf4', complementary: '#14532d' },
      { name: 'Light Yellow', value: '#fefce8', complementary: '#713f12' },
      { name: 'Light Pink', value: '#fdf2f8', complementary: '#831843' },
      { name: 'Transparent', value: 'transparent', complementary: '#000000' }
    ]
  };

  // Function to find a preset's complementary color
  const findComplementaryColor = (presetValue: string, isBackground: boolean) => {
    const presetList = isBackground ? qrColorPresets.background : qrColorPresets.foreground;
    const preset = presetList.find(p => p.value === presetValue);
    return preset?.complementary || (isBackground ? '#000000' : '#ffffff');
  };

  // Generate QR code content based on type
  const generateQRContent = () => {
    switch (qrType) {
      case "url":
        return qrContent;
      case "wifi":
        // Format: WIFI:S:<SSID>;T:<WPA|WEP|>;P:<password>;;
        const ssid = (document.getElementById("ssid") as HTMLInputElement)?.value || "";
        const password = (document.getElementById("password") as HTMLInputElement)?.value || "";
        const securityType = (document.querySelector("select") as HTMLSelectElement)?.value || "WPA/WPA2";
        const security = securityType === "None" ? "" : securityType;
        return `WIFI:S:${ssid};T:${security};P:${password};;`;
      case "text":
        return qrContent;
      case "email":
        return `mailto:${qrContent}`;
      case "phone":
        return `tel:${qrContent}`;
      case "location":
        return `geo:${qrContent}`;
      default:
        return qrContent;
    }
  };

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrContent(e.target.value);
  };

  // Handle text input change (for textarea and other inputs)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQrContent(e.target.value);
  };

  // Handle file upload for logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle download
  const handleDownload = (format: 'png' | 'svg' | 'jpeg') => {
    if (qrInstance) {
      // Update QR code size for download
      qrInstance.update({
        width: downloadSize,
        height: downloadSize
      });
      
      // Download with the new size
      qrInstance.download({
        extension: format,
        name: 'qr-exon-dev'
      });
      
      // Reset QR code size back to display size
      setTimeout(() => {
        qrInstance.update({
          width: rangeSize,
          height: rangeSize
        });
      }, 100);
      
      // Close the dropdown after download
      setIsDownloadMenuOpen(false);
    }
  };

  // Select preset download size
  const selectDownloadSize = (size: number) => {
    setDownloadSize(size);
    setIsDownloadMenuOpen(false);
  };

  // Toggle download menu
  const toggleDownloadMenu = () => {
    setIsDownloadMenuOpen(!isDownloadMenuOpen);
  };

  // Map error correction text to values
  const mapErrorCorrection = (value: string): 'L' | 'M' | 'Q' | 'H' => {
    switch (value) {
      case "Low (7%)": return 'L';
      case "Medium (15%)": return 'M';
      case "Quartile (25%)": return 'Q';
      case "High (30%)": return 'H';
      default: return 'Q';
    }
  };

  // Handle error correction change
  const handleErrorCorrectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorCorrection(mapErrorCorrection(e.target.value));
  };

  // Handle download size change
  const handleDownloadSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDownloadSize(parseInt(e.target.value));
  };

  // Generate shareable project URL with all settings
  const generateProjectURL = () => {
    // Check if window is defined (client-side only)
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    
    // Add all QR code settings as parameters
    params.append('type', qrType);
    params.append('content', qrContent);
    params.append('fgColor', foregroundColor);
    params.append('bgColor', backgroundColor);
    params.append('size', rangeSize.toString());
    params.append('patternStyle', patternStyle);
    params.append('cornerStyle', cornerStyle);
    params.append('errorCorrection', errorCorrection);
    params.append('bgPadding', qrBackgroundPadding.toString());
    params.append('bgBorderRadius', qrBackgroundBorderRadius.toString());
    
    if (logoImage) {
      params.append('hasLogo', 'true');
      params.append('logoPadding', logoPaddingPreset);
      params.append('logoSize', logoSize.toString());
    }
    
    return `${baseURL}/project?${params.toString()}`;
  };
  
  // Generate direct QR code URL
  const generateDirectQRURL = () => {
    // Check if window is defined (client-side only)
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    
    // Add all QR code settings as parameters
    params.append('type', qrType);
    params.append('content', qrContent);
    params.append('fgColor', foregroundColor);
    params.append('bgColor', backgroundColor);
    params.append('size', rangeSize.toString());
    params.append('patternStyle', patternStyle);
    params.append('cornerStyle', cornerStyle);
    params.append('errorCorrection', errorCorrection);
    params.append('bgPadding', qrBackgroundPadding.toString());
    params.append('bgBorderRadius', qrBackgroundBorderRadius.toString());
    
    if (logoImage) {
      params.append('hasLogo', 'true');
      params.append('logoPadding', logoPaddingPreset);
      params.append('logoSize', logoSize.toString());
    }
    
    return `${baseURL}/qr?${params.toString()}`;
  };

  // Copy URL to clipboard
  const copyToClipboard = (url: string) => {
    // Check if navigator is defined (client-side only)
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url)
        .then(() => {
          // Could add a toast notification here
          console.log('URL copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy URL: ', err);
        });
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Image src="/exon.png" alt="qr.exon.dev" width={32} height={32} />
              <h1 className="text-xl font-bold tracking-tight"><span className="text-[#834D96]">qr</span>.exon.dev</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                built by <Link href="https://exon.dev" target="_blank" className="text-[#834D96]">exon</Link>
              </span>
            </div>
          </div>
        </header>

        {/* Main Content - Add top padding to account for fixed header */}
        <main className="flex flex-1 flex-col lg:flex-row pt-16">
          {/* Left Panel - Options */}
          <div className="w-full lg:w-1/2 border-r border-slate-200 overflow-y-auto h-[calc(100vh-64px)] lg:fixed lg:left-0 lg:top-16 lg:bottom-0">
            <div className="p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Create Your QR Code</h2>
              
              {/* Content Section */}
              <div className="space-y-8 pb-12">
                {/* QR Content Section */}
                <section className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">QR Code Content</h3>
                  
                  {/* QR Type Selector */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">QR Code Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <button 
                        onClick={() => {
                          setQrType("url");
                          setQrContent("https://exon.dev");
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          qrType === "url" 
                            ? "bg-slate-100 border-slate-300" 
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span className="text-sm">URL</span>
                      </button>
                      <button 
                        onClick={() => {
                          setQrType("wifi");
                          setQrContent("WIFI:S:EXON;T:WPA;P:exon123;;");
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          qrType === "wifi" 
                            ? "bg-slate-100 border-slate-300" 
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <Wifi className="h-4 w-4" />
                        <span className="text-sm">Wi-Fi</span>
                      </button>
                      <button 
                        onClick={() => {
                          setQrType("text");
                          setQrContent("Hello, world!");
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          qrType === "text" 
                            ? "bg-slate-100 border-slate-300" 
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <KeyRound className="h-4 w-4" />
                        <span className="text-sm">Text</span>
                      </button>
                      <button 
                        onClick={() => {
                          setQrType("email");
                          setQrContent("hello@exon.dev");
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          qrType === "email" 
                            ? "bg-slate-100 border-slate-300" 
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">Email</span>
                      </button>
                      <button 
                        onClick={() => {
                          setQrType("phone");
                          setQrContent("+1 (123) 456-7890");
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          qrType === "phone" 
                            ? "bg-slate-100 border-slate-300" 
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">Phone</span>
                      </button>
                      <button 
                        onClick={() => {
                          setQrType("location");
                          setQrContent("37.7749,-122.4194");
                        }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          qrType === "location" 
                            ? "bg-slate-100 border-slate-300" 
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Location</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* URL Input (shown when URL type is selected) */}
                  {qrType === "url" && (
                    <div className="space-y-2">
                      <label htmlFor="url" className="block text-sm font-medium text-slate-700">URL</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LinkIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="url"
                          name="url"
                          id="url"
                          className="block w-full pl-10 pr-12 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          placeholder="https://example.com"
                          value={qrContent}
                          onChange={handleUrlChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Wi-Fi Input (shown when Wi-Fi type is selected) */}
                  {qrType === "wifi" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="ssid" className="block text-sm font-medium text-slate-700">Network Name (SSID)</label>
                        <input
                          type="text"
                          name="ssid"
                          id="ssid"
                          className="block w-full px-3 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          placeholder="Your Wi-Fi Network"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="password"
                            id="password"
                            className="block w-full px-3 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                            placeholder="Wi-Fi Password"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Security Type</label>
                        <select className="block w-full px-3 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500" defaultValue="WPA/WPA2">
                          <option>WPA/WPA2</option>
                          <option>WEP</option>
                          <option>None</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {/* Text Input (shown when Text type is selected) */}
                  {qrType === "text" && (
                    <div className="space-y-2">
                      <label htmlFor="text" className="block text-sm font-medium text-slate-700">Text Content</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyRound className="h-4 w-4 text-slate-400" />
                        </div>
                        <textarea
                          name="text"
                          id="text"
                          rows={4}
                          className="block w-full pl-10 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          placeholder="Enter your text here"
                          value={qrContent}
                          onChange={handleTextChange}
                        />
                      </div>
                      <p className="text-xs text-slate-500">Enter any text you want to encode in the QR code.</p>
                    </div>
                  )}
                  
                  {/* Email Input (shown when Email type is selected) */}
                  {qrType === "email" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-slate-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full pl-10 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                            placeholder="example@email.com"
                            value={qrContent}
                            onChange={handleTextChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Phone Input (shown when Phone type is selected) */}
                  {qrType === "phone" && (
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className="block w-full pl-10 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          placeholder="+1 (123) 456-7890"
                          value={qrContent}
                          onChange={handleTextChange}
                        />
                      </div>
                      <p className="text-xs text-slate-500">Include country code for international numbers (e.g., +1 for US).</p>
                    </div>
                  )}
                  
                  {/* Location Input (shown when Location type is selected) */}
                  {qrType === "location" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="location" className="block text-sm font-medium text-slate-700">Coordinates (latitude,longitude)</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-4 w-4 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            className="block w-full pl-10 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                            placeholder="37.7749,-122.4194"
                            value={qrContent}
                            onChange={handleTextChange}
                          />
                        </div>
                        <p className="text-xs text-slate-500">Format: latitude,longitude (e.g., 37.7749,-122.4194 for San Francisco)</p>
                      </div>
                    </div>
                  )}
                </section>
                
                {/* Design Section */}
                <section className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">QR Code Design</h3>
                  
                  {/* Colors */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-700">Colors</h4>
                    
                    <div className="space-y-2">
                      <label className="block text-xs text-slate-500">Foreground Color</label>
                      <div className="flex items-center gap-2">
                        <div className="relative" ref={fgColorPickerRef}>
                          <button 
                            type="button"
                            className="h-8 w-8 rounded-md border border-slate-300 cursor-pointer p-0 overflow-hidden flex items-center justify-center"
                            onClick={() => setShowFgColorPicker(!showFgColorPicker)}
                            style={{ backgroundColor: foregroundColor }}
                          >
                            {showFgColorPicker && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <X className="h-4 w-4 text-white drop-shadow-md" />
                              </span>
                            )}
                          </button>
                          
                          {showFgColorPicker && (
                            <div className="absolute left-0 top-10 z-10 shadow-xl border border-slate-200 rounded-md bg-white p-3 w-96 animate-in fade-in duration-200">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-xs text-slate-500">QR Code Presets</div>
                                  <button
                                    className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                                    onClick={() => setShowFgColorPicker(false)}
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {qrColorPresets.foreground.map(preset => (
                                    <button
                                      key={preset.value}
                                      className={`h-7 text-xs px-2 py-1 rounded border ${foregroundColor === preset.value ? 'border-slate-500 bg-slate-100' : 'border-slate-300'} cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden flex items-center`}
                                      onClick={() => {
                                        setForegroundColor(preset.value);
                                        setBackgroundColor(preset.complementary);
                                      }}
                                    >
                                      <div className="h-4 w-4 rounded-sm mr-1.5" style={{ backgroundColor: preset.value }}></div>
                                      <span className="truncate">{preset.name}</span>
                                    </button>
                                  ))}
                                </div>
                                
                                <div className="flex flex-col space-y-2">
                                  <div className="text-xs text-slate-500">All Colors</div>
                                  <div className="grid grid-cols-10 gap-1.5">
                                    {['#000000', '#5c5c5c', '#8a8a8a', '#cfcfcf', '#ffffff', 
                                      '#ff0000', '#ff8700', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8a2be2', '#ff00ff',
                                      '#800000', '#8b4513', '#808000', '#008000', '#008080', '#000080', '#4b0082', '#800080',
                                      '#1a1a1a', '#4d4d4d', '#808080', '#bfbfbf', '#f2f2f2',
                                      '#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d', '#4dffff', '#4d4dff', '#a64dff', '#ff4dff'].map(color => (
                                      <button
                                        key={color}
                                        className={`h-6 w-6 rounded-sm border ${foregroundColor === color ? 'border-slate-500 ring-2 ring-slate-400' : 'border-slate-300'} cursor-pointer hover:scale-110 transition-transform`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                          setForegroundColor(color);
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-3">
                                  <input
                                    type="color"
                                    className="h-8 w-8 cursor-pointer p-0 border border-slate-300 rounded"
                                    value={foregroundColor}
                                    onChange={(e) => setForegroundColor(e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="flex-1 px-2 py-1.5 text-sm border border-slate-300 rounded-md"
                                    value={foregroundColor}
                                    onChange={(e) => setForegroundColor(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          type="text"
                          className="block w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          value={foregroundColor}
                          onChange={(e) => setForegroundColor(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-xs text-slate-500">Background Color</label>
                      <div className="flex items-center gap-2">
                        <div className="relative" ref={bgColorPickerRef}>
                          <button 
                            type="button"
                            className="h-8 w-8 rounded-md border border-slate-300 cursor-pointer p-0 overflow-hidden flex items-center justify-center"
                            onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                            style={{ backgroundColor: backgroundColor }}
                          >
                            {showBgColorPicker && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <X className="h-4 w-4 text-slate-800 drop-shadow-md" />
                              </span>
                            )}
                          </button>
                          
                          {showBgColorPicker && (
                            <div className="absolute left-0 top-10 z-10 shadow-xl border border-slate-200 rounded-md bg-white p-3 w-96 animate-in fade-in duration-200">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-xs text-slate-500">QR Code Presets</div>
                                  <button
                                    className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                                    onClick={() => setShowBgColorPicker(false)}
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {qrColorPresets.background.map(preset => (
                                    <button
                                      key={preset.value}
                                      className={`h-7 text-xs px-2 py-1 rounded border ${backgroundColor === preset.value ? 'border-slate-500 bg-slate-100' : 'border-slate-300'} cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden flex items-center`}
                                      onClick={() => {
                                        setBackgroundColor(preset.value);
                                        setForegroundColor(preset.complementary);
                                      }}
                                    >
                                      <div className="h-4 w-4 rounded-sm mr-1.5" style={{ backgroundColor: preset.value }}></div>
                                      <span className="truncate">{preset.name}</span>
                                    </button>
                                  ))}
                                </div>
                                
                                <div className="flex flex-col space-y-2">
                                  <div className="text-xs text-slate-500">All Colors</div>
                                  <div className="grid grid-cols-10 gap-1.5">
                                    {['#000000', '#5c5c5c', '#8a8a8a', '#cfcfcf', '#ffffff', 
                                      '#ff0000', '#ff8700', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8a2be2', '#ff00ff',
                                      '#800000', '#8b4513', '#808000', '#008000', '#008080', '#000080', '#4b0082', '#800080',
                                      '#1a1a1a', '#4d4d4d', '#808080', '#bfbfbf', '#f2f2f2',
                                      '#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d', '#4dffff', '#4d4dff', '#a64dff', '#ff4dff'].map(color => (
                                      <button
                                        key={color}
                                        className={`h-6 w-6 rounded-sm border ${backgroundColor === color ? 'border-slate-500 ring-2 ring-slate-400' : 'border-slate-300'} cursor-pointer hover:scale-110 transition-transform`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                          setBackgroundColor(color);
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-3">
                                  <input
                                    type="color"
                                    className="h-8 w-8 cursor-pointer p-0 border border-slate-300 rounded"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="flex-1 px-2 py-1.5 text-sm border border-slate-300 rounded-md"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          type="text"
                          className="block w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* QR Background Settings */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-700">QR Background Settings</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-slate-700">Background Padding</label>
                        <span className="text-xs text-slate-500">{qrBackgroundPadding}px</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={qrBackgroundPadding}
                          onChange={(e) => setQrBackgroundPadding(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-slate-500">
                        Add padding around the QR code for better visibility.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-slate-700">Border Radius</label>
                        <span className="text-xs text-slate-500">{qrBackgroundBorderRadius}px</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={qrBackgroundBorderRadius}
                          onChange={(e) => setQrBackgroundBorderRadius(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-slate-500">
                        Round the corners of the QR code background.
                      </p>
                    </div>
                  </div>
                  
                  {/* Style */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-700">Style</h4>
                    
                    <div className="space-y-2">
                      <label className="block text-xs text-slate-500">Pattern Style</label>
                      <div className="grid grid-cols-4 gap-2">
                        <div 
                          className={`h-12 w-full rounded-md border ${patternStyle === 'square' ? 'border-slate-500 bg-slate-50' : 'border-slate-300'} flex items-center justify-center cursor-pointer`}
                          onClick={() => setPatternStyle('square')}
                        >
                          <div className="h-6 w-6 bg-slate-900 rounded-sm"></div>
                        </div>
                        <div 
                          className={`h-12 w-full rounded-md border ${patternStyle === 'dots' ? 'border-slate-500 bg-slate-50' : 'border-slate-300'} flex items-center justify-center cursor-pointer`}
                          onClick={() => setPatternStyle('dots')}
                        >
                          <div className="h-6 w-6 bg-slate-900 rounded-full"></div>
                        </div>
                        <div 
                          className={`h-12 w-full rounded-md border ${patternStyle === 'rounded' ? 'border-slate-500 bg-slate-50' : 'border-slate-300'} flex items-center justify-center cursor-pointer`}
                          onClick={() => setPatternStyle('rounded')}
                        >
                          <div className="h-6 w-6 bg-slate-900 rounded-md"></div>
                        </div>
                        <div 
                          className={`h-12 w-full rounded-md border ${patternStyle === 'classy' ? 'border-slate-500 bg-slate-50' : 'border-slate-300'} flex items-center justify-center cursor-pointer`}
                          onClick={() => setPatternStyle('classy')}
                        >
                          <div className="h-5 w-5 border-2 border-slate-900 rounded-tl-md rounded-br-md bg-slate-900"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-xs text-slate-500">Corner Style</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div 
                          className={`h-12 w-full rounded-md border ${cornerStyle === 'square' ? 'border-slate-500 bg-slate-50' : 'border-slate-300'} flex items-center justify-center cursor-pointer`}
                          onClick={() => setCornerStyle('square')}
                        >
                          <div className="h-6 w-6 border-4 border-slate-900 bg-transparent"></div>
                        </div>
                        <div 
                          className={`h-12 w-full rounded-md border ${cornerStyle === 'extra-rounded' ? 'border-slate-500 bg-slate-50' : 'border-slate-300'} flex items-center justify-center cursor-pointer`}
                          onClick={() => setCornerStyle('extra-rounded')}
                        >
                          <div className="h-6 w-6 border-4 border-slate-900 rounded-md bg-transparent"></div>
                        </div>
                        <div 
                          className={`h-12 w-full rounded-md border ${cornerStyle === 'dot' ? 'border-slate-500 bg-slate-50' : 'border-slate-300'} flex items-center justify-center cursor-pointer`}
                          onClick={() => setCornerStyle('dot')}
                        >
                          <div className="h-6 w-6 border-4 border-slate-900 bg-transparent rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Logo/Image */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-700">Logo/Image</h4>
                    
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        {logoImage ? (
                          <div className="mb-2">
                            <img src={logoImage} alt="Logo" className="h-16 w-16 object-contain" />
                            <button 
                              onClick={() => setLogoImage(undefined)}
                              className="mt-2 text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
                        )}
                        <p className="text-sm text-slate-500 mb-2">Drag and drop an image, or</p>
                        <label className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">
                          Browse Files
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleLogoUpload}
                          />
                        </label>
                        <p className="text-xs text-slate-400 mt-2">PNG, JPG, SVG (max 2MB)</p>
                      </div>
                    </div>
                    
                    {logoImage && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700">Logo Padding</label>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              className={`flex items-center justify-center gap-2 p-2 rounded-lg border ${
                                logoPaddingPreset === 'none' 
                                  ? 'bg-slate-100 border-slate-500 font-medium' 
                                  : 'border-slate-300 hover:bg-slate-50'
                              }`}
                              onClick={() => setLogoPaddingPreset('none')}
                            >
                              <div className="h-6 w-6 flex items-center justify-center">
                                <div className="h-4 w-4 bg-slate-800 rounded-sm"></div>
                              </div>
                              <span className="text-xs">No Padding</span>
                            </button>
                            <button
                              className={`flex items-center justify-center gap-2 p-2 rounded-lg border ${
                                logoPaddingPreset === 'minimal' 
                                  ? 'bg-slate-100 border-slate-500 font-medium' 
                                  : 'border-slate-300 hover:bg-slate-50'
                              }`}
                              onClick={() => setLogoPaddingPreset('minimal')}
                            >
                              <div className="h-6 w-6 flex items-center justify-center bg-white rounded-sm">
                                <div className="h-3.5 w-3.5 bg-slate-800 rounded-sm"></div>
                              </div>
                              <span className="text-xs">Minimal</span>
                            </button>
                            <button
                              className={`flex items-center justify-center gap-2 p-2 rounded-lg border ${
                                logoPaddingPreset === 'standard' 
                                  ? 'bg-slate-100 border-slate-500 font-medium' 
                                  : 'border-slate-300 hover:bg-slate-50'
                              }`}
                              onClick={() => setLogoPaddingPreset('standard')}
                            >
                              <div className="h-6 w-6 flex items-center justify-center bg-white rounded-sm">
                                <div className="h-3 w-3 bg-slate-800 rounded-sm"></div>
                              </div>
                              <span className="text-xs">Standard</span>
                            </button>
                          </div>
                          <p className="text-xs text-slate-500">Select padding around your logo for better visibility and scanning.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-slate-700">Logo Size</label>
                            <span className="text-xs text-slate-500">{Math.round(logoSize * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="5"
                              max="30"
                              value={logoSize * 100}
                              onChange={(e) => setLogoSize(parseInt(e.target.value) / 100)}
                              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          <p className="text-xs text-slate-500">
                            Adjust the size of your logo. Larger logos may affect scannability.
                            {logoSize > 0.25 && (
                              <span className="text-amber-600 ml-1">
                                Large logos may reduce QR code readability.
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                
                {/* Advanced Section */}
                <section className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">Advanced Settings</h3>
                  
                  {/* Error Correction */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700">Error Correction</label>
                      <button className="inline-flex items-center text-xs text-slate-500 hover:text-slate-700">
                        <Info className="h-3.5 w-3.5 mr-1" />
                        <span>What's this?</span>
                      </button>
                    </div>
                    
                    <select 
                      className="block w-full px-3 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500" 
                      defaultValue="Quartile (25%)"
                      onChange={handleErrorCorrectionChange}
                    >
                      <option>Low (7%)</option>
                      <option>Medium (15%)</option>
                      <option>Quartile (25%)</option>
                      <option>High (30%)</option>
                    </select>
                    <p className="text-xs text-slate-500">Higher correction allows for more damage to the code while remaining scannable.</p>
                  </div>
                  
                  {/* Display Size */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Display Size</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="100"
                        max="500"
                        value={rangeSize}
                        onChange={(e) => setRangeSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm font-medium w-12 text-right">{rangeSize}px</span>
                    </div>
                  </div>
                  
                  {/* Download Size */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700">Download Size</label>
                      <div className="flex items-center gap-2">
                        {downloadSizePresets.map((preset) => (
                          <button
                            key={preset.value}
                            className={`text-xs px-2 py-1 rounded ${
                              downloadSize === preset.value 
                                ? 'bg-slate-800 text-white' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            onClick={() => setDownloadSize(preset.value)}
                          >
                            {preset.value}px
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="500"
                        max="3000"
                        step="100"
                        value={downloadSize}
                        onChange={handleDownloadSizeChange}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm font-medium w-16 text-right">{downloadSize}px</span>
                    </div>
                    <p className="text-xs text-slate-500">Higher resolution for downloaded QR codes. Select a preset or use the slider for custom sizes.</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Preview - Adjust left positioning */}
          <div className="w-full lg:w-1/2 lg:fixed lg:right-0 lg:top-16 lg:bottom-0 lg:h-[calc(100vh-64px)] lg:overflow-hidden lg:ml-[50%]"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              backgroundColor: '#ffffff'
            }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6 bg-white border-b border-slate-200 p-4 ">
                <h2 className="text-xl font-medium">Preview</h2>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                    onClick={() => setQrContent(generateQRContent())}
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* QR Code Preview */}
                <div className="relative w-full mb-10 flex items-center justify-center">
                  <QRCodeDisplay
                    contents={generateQRContent()}
                    moduleColor={foregroundColor}
                    positionRingColor={foregroundColor}
                    positionCenterColor={foregroundColor}
                    size={rangeSize}
                    patternStyle={patternStyle}
                    cornerStyle={cornerStyle}
                    image={logoImage}
                    backgroundColor={backgroundColor}
                    errorCorrectionLevel={errorCorrection as 'L' | 'M' | 'Q' | 'H'}
                    onQRInstance={setQrInstance}
                    imagePaddingPreset={logoPaddingPreset}
                    imageSize={logoSize}
                    qrBackgroundPadding={qrBackgroundPadding}
                    qrBackgroundBorderRadius={qrBackgroundBorderRadius}
                  />
                </div>
                
                <div className="mt-5 w-full max-w-md bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                  <div className="flex gap-2 ">
                    <button 
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                      onClick={() => handleDownload('png')}
                    >
                      <Download className="h-5 w-5" />
                      <span>Download QR Code</span>
                    </button>
                    
                    <div className="relative">
                      <button 
                        className="h-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
                        onClick={toggleDownloadMenu}
                      >
                        <span>{downloadSize}px</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isDownloadMenuOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                          <ul className="py-1">
                            {downloadSizePresets.map((preset) => (
                              <li key={preset.value}>
                                <button
                                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                                    downloadSize === preset.value ? 'bg-slate-50 font-medium' : ''
                                  }`}
                                  onClick={() => selectDownloadSize(preset.value)}
                                >
                                  {preset.label}
                                </button>
                              </li>
                            ))}
                            <li className="border-t border-slate-200 mt-1 pt-1">
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                                onClick={() => setIsDownloadMenuOpen(false)}
                              >
                                Custom ({downloadSize}px)
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 ">
                    <button 
                      className="flex flex-col items-center justify-center p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                      onClick={() => handleDownload('png')}
                    >
                      <span className="text-xs text-slate-500 mb-1">PNG</span>
                      <span className="text-sm font-medium">Download</span>
                    </button>
                    <button 
                      className="flex flex-col items-center justify-center p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                      onClick={() => handleDownload('svg')}
                    >
                      <span className="text-xs text-slate-500 mb-1">SVG</span>
                      <span className="text-sm font-medium">Download</span>
                    </button>
                    <button 
                      className="flex flex-col items-center justify-center p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                      onClick={() => handleDownload('jpeg')}
                    >
                      <span className="text-xs text-slate-500 mb-1">JPEG</span>
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                  
                  {/* Shareable Links Section */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Share Your QR Code</h4>
                    
                    {/* Project Link */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-slate-500">Project Link</label>
                        <button 
                          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1"
                          onClick={() => copyToClipboard(generateProjectURL())}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Copy
                        </button>
                      </div>
                      <div className="flex">
                        <input 
                          type="text" 
                          readOnly 
                          value={generateProjectURL()} 
                          className="block w-full text-xs px-3 py-2 border border-slate-300 rounded-l-md bg-slate-50 text-slate-800 truncate"
                        />
                        <button 
                          className="px-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md hover:bg-slate-200 transition-colors"
                          onClick={() => window.open(generateProjectURL(), '_blank')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Share this link to let others edit this QR code with all your settings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
