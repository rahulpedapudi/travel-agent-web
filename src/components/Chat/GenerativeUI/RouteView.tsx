"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import type { RouteViewProps, RouteWaypoint } from "@/types/ui";

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

export const RouteView: React.FC<RouteViewProps> = ({
  origin,
  destination,
  waypoints = [],
  travel_mode = "TRANSIT",
  day_number,
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateRoute = useCallback(() => {
    if (!window.google?.maps) return;

    const directionsService = new google.maps.DirectionsService();

    const waypointsList: google.maps.DirectionsWaypoint[] = waypoints.map(
      (wp: RouteWaypoint) => ({
        location: new google.maps.LatLng(wp.lat, wp.lng),
        stopover: true,
      })
    );

    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypointsList,
        travelMode: google.maps.TravelMode[travel_mode],
        optimizeWaypoints: false,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          setError(null);
        } else {
          setError(`Could not calculate route: ${status}`);
        }
      }
    );
  }, [origin, destination, waypoints, travel_mode]);

  useEffect(() => {
    calculateRoute();
  }, [calculateRoute]);

  const center = {
    lat: (origin.lat + destination.lat) / 2,
    lng: (origin.lng + destination.lng) / 2,
  };

  return (
    <div className="route-container rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl">
      {day_number && (
        <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-white text-lg">
            Day {day_number} Route
          </h3>
          <span className="text-xs text-white/60 px-2 py-1 bg-white/10 rounded-full capitalize">
            {travel_mode.toLowerCase()}
          </span>
        </div>
      )}

      {error && (
        <div className="px-4 py-2 bg-red-500/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}>
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#4A90D9",
                strokeWeight: 4,
                strokeOpacity: 0.8,
              },
              suppressMarkers: true,
            }}
          />
        )}

        {/* Origin marker */}
        <Marker
          position={{ lat: origin.lat, lng: origin.lng }}
          label={{
            text: "A",
            color: "white",
            fontWeight: "bold",
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "#27AE60",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
            scale: 14,
          }}
        />

        {/* Waypoint markers */}
        {waypoints.map((wp, index) => (
          <Marker
            key={`wp-${wp.title}-${index}`}
            position={{ lat: wp.lat, lng: wp.lng }}
            label={{
              text: String(wp.order || index + 1),
              color: "white",
              fontWeight: "bold",
              fontSize: "11px",
            }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#3498DB",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 12,
            }}
            title={`${wp.title}${
              wp.arrival_time ? ` - ${wp.arrival_time}` : ""
            }`}
          />
        ))}

        {/* Destination marker */}
        <Marker
          position={{ lat: destination.lat, lng: destination.lng }}
          label={{
            text: "B",
            color: "white",
            fontWeight: "bold",
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "#E74C3C",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
            scale: 14,
          }}
        />
      </GoogleMap>
    </div>
  );
};
