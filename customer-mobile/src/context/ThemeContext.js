import { createContext, useContext, useState } from "react";

const lightColors = {
  primary: "#0B5D5A",
  secondary: "#BFEEDB",
  accent: "#2AAE8E",
  background: "#F8FAF9",
  card: "#FFFFFF",
  text: "#18353C",
  subtitle: "#6E7B81",
  textMuted: "#9AA8B2",
  border: "#E8ECF0",
  white: "#FFFFFF",
  danger: "#E74C3C",
  star: "#F4B836",
  focus: "#3B82F6",
  deep: "#004C55",
  mint: "#55E8B0",
  shadow: "rgba(0, 0, 0, 0.06)",
  overlay: "rgba(0, 0, 0, 0.25)",
  googleBg: "#F5F5F5",
  facebook: "#1877F2",
  apple: "#000000",
};

const darkColors = {
  primary: "#0B5D5A",
  secondary: "#1A3A3A",
  accent: "#2AAE8E",
  background: "#121212",
  card: "#1E1E1E",
  text: "#E8ECF0",
  subtitle: "#9AA8B2",
  textMuted: "#6E7B81",
  border: "#2C2C2C",
  white: "#FFFFFF",
  danger: "#E74C3C",
  star: "#F4B836",
  focus: "#3B82F6",
  deep: "#55E8B0",
  mint: "#55E8B0",
  shadow: "rgba(0, 0, 0, 0.3)",
  overlay: "rgba(0, 0, 0, 0.5)",
  googleBg: "#2C2C2C",
  facebook: "#1877F2",
  apple: "#FFFFFF",
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
