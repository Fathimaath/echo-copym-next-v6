"use client";
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in React + Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LeafletMap = ({ 
  center = [24.4326, 54.6152], 
  zoom = 13, 
  markerPosition = [24.4326, 54.6152],
  popupText = "Copym Headquarters - Masdar City, Abu Dhabi",
  className = ""
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      attributionControl: false,
    }).setView(center, zoom);

    mapInstanceRef.current = map;

    // Move zoom control to bottom-right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // Add custom styled tile layer (muted, modern look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Add attribution control separately
    L.control.attribution({
      position: 'bottomleft',
      prefix: false
    }).addTo(map).addAttribution('© OpenStreetMap contributors');

    // Custom simple marker
    const simpleIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #15a36e 0%, #0f8a5b 100%);
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(21, 163, 110, 0.4);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    });

    // Styled popup content - clean, no image
    const popupContent = `
      <div class="leaflet-popup-inner" style="
        min-width: 280px;
        max-width: 320px;
        padding: 0;
        font-family: 'Palanquin', sans-serif;
        opacity: 0;
        transform: translateY(10px);
        animation: popupSlideIn 0.4s ease-out 0.2s forwards;
      ">
        <!-- Content -->
        <div style="padding: 20px; background: white;">
          <p style="
            margin: 0 0 12px 0;
            font-size: 13px;
            color: #6b7280;
            line-height: 1.6;
          ">${popupText}</p>
          <div style="
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: #9ca3af;
            margin-bottom: 16px;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Abu Dhabi, UAE</span>
          </div>

          <!-- Action Buttons -->
          <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <!-- Get Directions Button -->
            <a href="https://www.google.com/maps/dir/?api=1&destination=24.4326,54.6152"
               target="_blank"
               rel="noopener noreferrer"
               style="
              flex: 1;
              min-width: 120px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              background: linear-gradient(135deg, #15a36e 0%, #0f8a5b 100%);
              color: white;
              padding: 10px 16px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 12px;
              font-weight: 600;
              transition: all 0.2s ease;
              box-shadow: 0 2px 8px rgba(21, 163, 110, 0.3);
            "
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(21, 163, 110, 0.4)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(21, 163, 110, 0.3)';"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Directions
            </a>

            <!-- View on Maps Button -->
            <a href="https://www.google.com/maps/place/Masdar+City+-+Abu+Dhabi+-+United+Arab+Emirates/@24.4326,54.6152,14z"
               target="_blank"
               rel="noopener noreferrer"
               style="
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              color: #15a36e;
              padding: 10px 12px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 12px;
              font-weight: 600;
              border: 2px solid #15a36e;
              transition: all 0.2s ease;
            "
            onmouseover="this.style.background='#15a36e'; this.style.color='white';"
            onmouseout="this.style.background='white'; this.style.color='#15a36e';"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>
        @keyframes popupSlideIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 640px) {
          .leaflet-popup-inner {
            min-width: 150px !important;
            max-width: 180px !important;
          }
          .leaflet-popup-inner > div {
            padding: 6px !important;
          }
          .leaflet-popup-inner p {
            font-size: 8px !important;
            margin-bottom: 4px !important;
          }
          .leaflet-popup-inner > div > div {
            font-size: 7px !important;
            margin-bottom: 6px !important;
          }
          .leaflet-popup-inner a {
            padding: 5px 7px !important;
            font-size: 8px !important;
          }
          .leaflet-popup-inner svg {
            width: 8px !important;
            height: 8px !important;
          }
        }
      </style>
    `;

    // Add marker with popup
    const marker = L.marker(markerPosition, { icon: simpleIcon })
      .addTo(map)
      .bindPopup(popupContent, {
        maxWidth: window.innerWidth <= 640 ? 180 : 320,
        closeButton: false,
        className: 'custom-popup',
        offset: window.innerWidth <= 640 ? [30, 10] : [0, -5],
        autoClose: false,
        closeOnClick: false
      })
      .openPopup();

    // Adjust popup position on mobile to avoid floating card
    const adjustPopupPosition = (e) => {
      const popup = e?.popup || marker.getPopup();
      if (popup) {
        const isMobile = window.innerWidth <= 640;
        popup.options.offset = isMobile ? [30, 10] : [0, -5];
        popup.options.maxWidth = isMobile ? 180 : 320;
        popup.update();
      }
    };

    map.on('popupopen', adjustPopupPosition);
    window.addEventListener('resize', adjustPopupPosition);

    // Add custom styles
    const style = document.createElement('style');
    style.innerHTML = `
      .leaflet-popup-content-wrapper {
        border-radius: 16px !important;
        padding: 0 !important;
        overflow: hidden !important;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15) !important;
        border: none !important;
      }
      .leaflet-popup-content {
        margin: 0 !important;
        width: 300px !important;
      }
      .leaflet-popup-tip {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        border: none !important;
      }
      .leaflet-popup-close-button {
        color: #9ca3af !important;
        font-size: 22px !important;
        font-weight: bold !important;
        top: 10px !important;
        right: 10px !important;
        z-index: 10 !important;
        width: 28px !important;
        height: 28px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(255,255,255,0.9) !important;
        border-radius: 50% !important;
        transition: all 0.2s ease !important;
      }
      .leaflet-popup-close-button:hover {
        background: white !important;
        transform: scale(1.1) !important;
      }
      .leaflet-control-zoom a {
        background: white !important;
        color: #15a36e !important;
        border: none !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.2s ease !important;
      }
      .leaflet-control-zoom a:hover {
        background: #15a36e !important;
        color: white !important;
        transform: scale(1.05);
      }
      @keyframes mapFadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .leaflet-container {
        animation: mapFadeIn 0.8s ease-out;
      }
      @media (max-width: 640px) {
        .leaflet-popup-content {
          width: 170px !important;
          max-width: 200px !important;
        }
        .leaflet-popup-close-button {
          font-size: 16px !important;
          width: 18px !important;
          height: 18px !important;
          top: 4px !important;
          right: 4px !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-popup-tip {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06) !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Trigger loaded state
    setTimeout(() => setMapLoaded(true), 100);

    // Cleanup on unmount
    return () => {
      map.off('popupopen', adjustPopupPosition);
      window.removeEventListener('resize', adjustPopupPosition);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, [center, zoom, markerPosition, popupText]);

  return (
    <div className="relative w-full h-full">
      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-[1000]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-[#15a36e] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 font-medium" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
              Loading map...
            </p>
          </div>
        </div>
      )}

      {/* Gradient overlay at edges for seamless integration */}
      <div className="absolute inset-0 pointer-events-none z-[400]" style={{
        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.05)'
      }}></div>

      {/* Map container */}
      <div
        ref={mapRef}
        className={`w-full h-full z-0 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] ${className}`}
      />
    </div>
  );
};

export default LeafletMap;
