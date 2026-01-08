"use client";

import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import type { MapViewProps, MapMarker } from "@/types/ui";

const markerColors: Record<string, string> = {
  hotel: "#4A90D9",
  attraction: "#E74C3C",
  restaurant: "#F39C12",
  food: "#F39C12",
  activity: "#27AE60",
  transport: "#9B59B6",
  nature: "#2ECC71",
  rest: "#95A5A6",
  default: "#3498DB",
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64779e" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6f9ba5" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

export const MapView: React.FC<MapViewProps> = ({
  center,
  zoom = 13,
  markers = [],
  title,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const getMarkerColor = (type?: string): string => {
    if (!type) return markerColors.default;
    return markerColors[type.toLowerCase()] || markerColors.default;
  };

  return (
    <div className="map-container rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl">
      {title && (
        <div className="px-4 py-3 border-b border-white/10 bg-white/5">
          <h3 className="font-semibold text-white text-lg">{title}</h3>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={`${marker.title}-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={
              marker.day
                ? {
                    text: String(marker.day),
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }
                : undefined
            }
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: getMarkerColor(marker.type),
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 12,
            }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}>
            <div className="p-2 min-w-[150px]">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {selectedMarker.title}
              </h4>
              {selectedMarker.type && (
                <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 capitalize mb-1">
                  {selectedMarker.type}
                </span>
              )}
              {selectedMarker.description && (
                <p className="text-xs text-gray-600 mt-1">
                  {selectedMarker.description}
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
