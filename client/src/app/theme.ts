import { Theme } from "@aws-amplify/ui-react";

export const myTheme: Theme = {
  name: "my-custom-theme",
  tokens: {
    // Apply Poppins font
    fonts: {
      default: {
        variable: { value: "Poppins, sans-serif" }, // Ensure Poppins is loaded
        static: { value: "Poppins, sans-serif" },
      },
    },
    colors: {
      brand: {
        primary: { value: "#your-brand-color" }, // Replace with your actual brand color
        secondary: { value: "#your-secondary-color" }, // Replace with your actual secondary color
      },
      // --- Updated Background ---
      background: {
        primary: { value: "#000000" }, // Sets the main background to black
      },
      // --- Updated Text Color ---
      font: {
        primary: { value: "{colors.white.value}" }, // Makes primary text white
        secondary: { value: "{colors.white.value}" }, // Makes secondary text white
        tertiary: { value: "{colors.white.value}" }, // Makes tertiary text white
      },
      // Define white color if not available
      white: { value: "#FFFFFF" },
      // Define the dark border color (based on your Tailwind class dark:border-neutral-800/60)
      neutral: {
        80: { value: "#334155" }, // Approximate hex for neutral-800
      },
      border: {
        primary: { value: "{colors.neutral.80.value}" }, // Use the neutral 80 color for primary border
      },
    },
    // --- Updated Font Weight ---
    fontWeights: {
      // Map standard weights to 500
      normal: { value: "500" },
      medium: { value: "500" },
      semibold: { value: "500" },
      bold: { value: "500" },
    },
    space: {
      small: { value: "8px" },
      medium: { value: "16px" },
    },
  },
  // Add dark mode overrides if needed separately if the default theme doesn't cover everything
  overrides: [
    // Example: Override background color specifically in dark mode if needed, though setting primary above usually handles it
    // {
    //   colorMode: 'dark',
    //   tokens: {
    //     colors: {
    //       background: {
    //         primary: { value: '#000000' }, // Ensure black in dark mode
    //       },
    //     },
    //   },
    // },
  ],
};
