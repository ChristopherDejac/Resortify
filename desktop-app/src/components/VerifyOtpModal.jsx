import { useEffect, useRef, useState } from "react";
import "./VerifyOtpModal.css";

export default function VerifyOtpModal({ onClose, onVerified }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (seconds <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  function handleChange(i, value) {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = v;
    setCode(next);
    setError("");
    if (v && i < 3) inputsRef.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === "Backspace" && code[i] === "" && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const next = ["", "", "", ""];
    digits.split("").forEach((ch, idx) => {
      next[idx] = ch;
    });
    setCode(next);
    setError("");
    inputsRef.current[digits.length >= 4 ? 3 : digits.length]?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (code.join("").length !== 4) {
      setError("Please enter the 4-digit code.");
      return;
    }
    setError("");
    onVerified?.();
  }

  function handleResend() {
    setCode(["", "", "", ""]);
    setSeconds(30);
    setCanResend(false);
    inputsRef.current[0]?.focus();
  }

  return (
    <div className="votp-overlay" onClick={onClose}>
      <div className="votp-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="votp-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="votp-title">Verify Your Account</h2>
        <p className="votp-desc">
          Enter the 4-digit code sent to your email address.
        </p>

        <form className="votp-form" onSubmit={handleSubmit}>
          <div className="votp-boxes">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          {error && <p className="votp-error">{error}</p>}
          <button type="submit" className="votp-submit">
            Verify &amp; Proceed
          </button>
        </form>

        <div className="votp-resend">
          {canResend ? (
            <button type="button" className="votp-resend-link" onClick={handleResend}>
              Resend Code
            </button>
          ) : (
            <span className="votp-resend-timer">Resend Code in {seconds}s</span>
          )}
        </div>

        <button type="button" className="votp-back" onClick={onClose}>
          Back to Sign In
        </button>
      </div>
    </div>
  );
}