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
import { useState } from "react";

export default function App() {
  const [qrType, setQrType] = useState("url");
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-900 p-2">
              <QrCode className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">qr.exon.dev</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://x.com/ryandavogel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              @ryandavogel
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row">
        {/* Left Panel - Options */}
        <div className="w-full lg:w-1/2 border-r border-slate-200 overflow-y-auto">
          <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Create Your QR Code</h2>
            
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
              <button 
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "content" 
                  ? "text-slate-900 border-b-2 border-slate-900" 
                  : "text-slate-600 hover:text-slate-900"}`}
              >
                Content
              </button>
              <button 
                onClick={() => setActiveTab("design")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "design" 
                  ? "text-slate-900 border-b-2 border-slate-900" 
                  : "text-slate-600 hover:text-slate-900"}`}
              >
                Design
              </button>
              <button 
                onClick={() => setActiveTab("advanced")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "advanced" 
                  ? "text-slate-900 border-b-2 border-slate-900" 
                  : "text-slate-600 hover:text-slate-900"}`}
              >
                Advanced
              </button>
            </div>
            
            {/* Content Tab */}
            {activeTab === "content" && (
              <div className="space-y-6">
                {/* QR Type Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">QR Code Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button 
                      onClick={() => setQrType("url")}
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
                      onClick={() => setQrType("wifi")}
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
                      onClick={() => setQrType("text")}
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
                      onClick={() => setQrType("email")}
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
                      onClick={() => setQrType("phone")}
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
                      onClick={() => setQrType("location")}
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
                          type="password"
                          name="password"
                          id="password"
                          className="block w-full px-3 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          placeholder="Wi-Fi Password"
                        />
                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <Eye className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Security Type</label>
                      <select className="block w-full px-3 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500">
                        <option>WPA/WPA2</option>
                        <option>WEP</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {/* Other input types would be implemented similarly */}
              </div>
            )}
            
            {/* Design Tab */}
            {activeTab === "design" && (
              <div className="space-y-6">
                {/* Colors */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700">Colors</h3>
                  
                  <div className="space-y-2">
                    <label className="block text-xs text-slate-500">Foreground Color</label>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-slate-900 border border-slate-300 cursor-pointer"></div>
                      <input
                        type="text"
                        className="block w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                        value="#0f172a"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs text-slate-500">Background Color</label>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-white border border-slate-300 cursor-pointer"></div>
                      <input
                        type="text"
                        className="block w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                        value="#ffffff"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                
                {/* Style */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700">Style</h3>
                  
                  <div className="space-y-2">
                    <label className="block text-xs text-slate-500">Pattern Style</label>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer bg-slate-50">
                        <div className="h-6 w-6 bg-slate-900 rounded-sm"></div>
                      </div>
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
                        <div className="h-6 w-6 bg-slate-900 rounded-full"></div>
                      </div>
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
                        <div className="h-6 w-6 bg-slate-900 rounded-md"></div>
                      </div>
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
                        <div className="h-5 w-5 border-2 border-slate-900 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs text-slate-500">Corner Style</label>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer bg-slate-50">
                        <div className="h-6 w-6 bg-slate-900"></div>
                      </div>
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
                        <div className="h-6 w-6 bg-slate-900 rounded-md"></div>
                      </div>
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
                        <div className="h-6 w-6 bg-slate-900 rounded-full"></div>
                      </div>
                      <div className="h-12 w-full rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
                        <div className="h-6 w-6 border-2 border-slate-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Logo/Image */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700">Logo/Image</h3>
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500 mb-2">Drag and drop an image, or</p>
                      <button className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                        Browse Files
                      </button>
                      <p className="text-xs text-slate-400 mt-2">PNG, JPG, SVG (max 2MB)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="add-logo-frame"
                      name="add-logo-frame"
                      type="checkbox"
                      className="h-4 w-4 text-slate-900 focus:ring-slate-500 border-slate-300 rounded"
                    />
                    <label htmlFor="add-logo-frame" className="ml-2 block text-sm text-slate-700">
                      Add frame around logo
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Advanced Tab */}
            {activeTab === "advanced" && (
              <div className="space-y-6">
                {/* Error Correction */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">Error Correction</label>
                    <button className="inline-flex items-center text-xs text-slate-500 hover:text-slate-700">
                      <Info className="h-3.5 w-3.5 mr-1" />
                      <span>What's this?</span>
                    </button>
                  </div>
                  
                  <select className="block w-full px-3 py-2 sm:text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500">
                    <option>Low (7%)</option>
                    <option>Medium (15%)</option>
                    <option selected>Quartile (25%)</option>
                    <option>High (30%)</option>
                  </select>
                  <p className="text-xs text-slate-500">Higher correction allows for more damage to the code while remaining scannable.</p>
                </div>
                
                {/* Size */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Size</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      value="300"
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium w-12 text-right">300px</span>
                  </div>
                </div>
                
                {/* Margin */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Margin</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value="16"
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium w-12 text-right">16px</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Panel - Preview */}
        <div className="w-full lg:w-1/2 bg-white">
          <div className="sticky top-0 p-6 h-screen flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Preview</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-6">
                {/* QR Code Preview */}
                <div className="h-64 w-64 bg-white flex items-center justify-center">
                  <QrCode className="h-full w-full text-slate-900" strokeWidth={1} />
                </div>
              </div>
              
              <div className="w-full max-w-md">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Download QR Code</span>
                </button>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center justify-center p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                    <span className="text-xs text-slate-500 mb-1">PNG</span>
                    <span className="text-sm font-medium">Download</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                    <span className="text-xs text-slate-500 mb-1">SVG</span>
                    <span className="text-sm font-medium">Download</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                    <span className="text-xs text-slate-500 mb-1">PDF</span>
                    <span className="text-sm font-medium">Download</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Made with qr.exon.dev</span>
                <Link href="/" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
