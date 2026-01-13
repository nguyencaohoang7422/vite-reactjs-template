import { useEffect, useState } from "react";
import { hexToRGB } from "../utils/colorHelper";

export function useThemeColors() {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    // Fetch colors từ API
    fetch("https://api.example.com/theme-colors")
      .then((res) => res.json())
      .then((data) => {
        // data = { primary: '#6231af', secondary: '#ff5733', ... }
        setColors(data);

        // Set CSS variables vào :root
        const primaryRGB = hexToRGB(data.primary);
        const secondaryRGB = hexToRGB(data.secondary);

        document.documentElement.style.setProperty(
          "--color-primary-rgb",
          primaryRGB,
        );
        document.documentElement.style.setProperty(
          "--color-secondary-rgb",
          secondaryRGB,
        );
      });
  }, []);

  return colors;
}
