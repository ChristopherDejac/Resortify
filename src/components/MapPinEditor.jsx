import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapPinEditor.css";

const DEFAULT_POS = [14.75, 121.12];

const pinIcon = L.divIcon({
  className: "mpin-icon",
  html: `<svg width="34" height="44" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#218BFF" stroke="#ffffff" stroke-width="1.5"/><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>`,
  iconSize: [34, 44],
  iconAnchor: [17, 42],
  popupAnchor: [0, -40],
});

function MapClickCatcher({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng);
    },
  });
  return null;
}

export default function MapPinEditor() {
  const [pos, setPos] = useState(DEFAULT_POS);
  const [draft, setDraft] = useState(null);
  const markerRef = useRef(null);

  function pick(latlng) {
    setDraft([latlng.lat, latlng.lng]);
  }

  useEffect(() => {
    if (draft && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [draft]);

  function confirmPin() {
    if (draft) setPos(draft);
    setDraft(null);
    markerRef.current?.closePopup();
  }

  function cancelPin() {
    setDraft(null);
    markerRef.current?.closePopup();
  }

  const shown = draft || pos;

  return (
    <MapContainer
      center={pos}
      zoom={13}
      scrollWheelZoom={false}
      className="mpin-map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapClickCatcher onPick={pick} />
      <Marker
        ref={markerRef}
        position={shown}
        draggable
        icon={pinIcon}
        eventHandlers={{ dragend: (e) => pick(e.target.getLatLng()) }}
      >
        <Popup>
          <div className="mpin-pop">
            <span className="mpin-pop-title">{draft ? "Edit Pin" : "Pin Location"}</span>
            <span className="mpin-pop-coords">
              {Number(shown[0]).toFixed(5)}, {Number(shown[1]).toFixed(5)}
            </span>
            {draft ? (
              <span className="mpin-pop-actions">
                <button type="button" className="mpin-btn primary" onClick={confirmPin}>Save Pin</button>
                <button type="button" className="mpin-btn" onClick={cancelPin}>Cancel</button>
              </span>
            ) : (
              <span className="mpin-pop-hint">Click the map or drag the pin to move it.</span>
            )}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}