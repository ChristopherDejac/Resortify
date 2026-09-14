import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationDropdown.css";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notif" ref={ref}>
      <button
        className="notif-btn"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      {open && (
        <>
          <div className="notif-overlay" onClick={() => setOpen(false)} />
          <div className="notif-panel">
            <div className="notif-header">
              <span className="notif-title">Notifications</span>
              <span className="notif-unread">0 Unread</span>
              <button type="button" className="notif-mark-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Mark all as read
              </button>
            </div>

            <div className="notif-body">
              <div className="notif-empty">
                <div className="notif-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <span className="notif-empty-title">No notifications yet</span>
                <span className="notif-empty-sub">Updates will appear here</span>
              </div>
            </div>

            <button
              type="button"
              className="notif-view-all"
              onClick={() => {
                setOpen(false);
                navigate("/notifications");
              }}
            >
              View All Notifications
            </button>
          </div>
        </>
      )}
    </div>
  );
}