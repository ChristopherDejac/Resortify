import { useState } from "react";
import "./ResetPasswordModal.css";

export default function ResetPasswordModal({ onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setDone(true);
  }

  function renderEye(toggled, onToggle) {
    return (
      <button
        type="button"
        className="rset-eye"
        aria-label={toggled ? "Hide password" : "Show password"}
        onClick={onToggle}
      >
        {toggled ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div className="rset-overlay" onClick={onClose}>
      <div className="rset-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="rset-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        {done ? (
          <div className="rset-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="#7fd4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
            <p>Your password has been updated successfully.</p>
            <button type="button" className="rset-done" onClick={onClose}>
              Back to Sign In
            </button>
          </div>
        ) : (
          <>
            <h2 className="rset-title">Reset Password</h2>
            <p className="rset-desc">
              Create a new, strong password for your account.
            </p>

            <form className="rset-form" onSubmit={handleSubmit}>
              <label>New Password</label>
              <div className="rset-password-wrap">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {renderEye(showNew, () => setShowNew(!showNew))}
              </div>

              <label>Confirm Password</label>
              <div className="rset-password-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {renderEye(showConfirm, () => setShowConfirm(!showConfirm))}
              </div>

              {error && <p className="rset-error">{error}</p>}
              <button type="submit" className="rset-submit">Update Password</button>
            </form>

            <button type="button" className="rset-back" onClick={onClose}>
              Back to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}