// theme.js
import { createTheme } from '@mui/material/styles';


// // Original Ocean theme
// const oceanTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#0A4D68', // Deep Ocean Blue
//       dark: '#082C3E', // Darker Deep Ocean Blue
//     },
//     secondary: {
//       main: '#05BFDB', // Bright Sky Blue
//       light: '#80FFE7', // Light Aqua Green
//     },
//     // Additional common colors
//   }
// });

// // Night Sky theme

// const nightSkyTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#070F2B', // Deep Navy
//       dark: '#1B1A55', // Dark Violet Blue
//     },
//     secondary: {
//       main: '#535C91', // Soft Blue
//       light: '#9290C3', // Light Lavender
//     },
//     background: {
//       default: '#9290C3', // Matching the primary main color for cohesive design
//       paper: '#1B1A55', // Slightly lighter for components like Card, Paper, etc.
//     }
//     // Additional common colors
//   }
// });


// const Summertheme = createTheme({
//   palette: {
//     primary: {
//       main: '#B3C8CF', // Deep Navy
//       dark: '#BED7DC', // Dark Violet Blue
//     },
//     secondary: {
//       main: '#F1EEDC', // Soft Blue
//       light: '#E5DDC5', // Light Lavender
//     },
//     background: {
//       default: '#F1EEDC', // Matching the primary main color for cohesive design
//       paper: '#1B1A55', // Slightly lighter for components like Card, Paper, etc.
//     }
//     // Additional common colors
//   }
// });


// // New Green Tones theme
// const greenTonesTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#D7E4C0', // Light Moss Green
//       dark: '#BBC3A4', // Muted Olive
//     },
//     secondary: {
//       main: '#C6DCBA', // Soft Green
//       light: '#B3A398', // Warm Grey
//     },
//     // Additional common colors
//   }
// });

// // New Neutral Tones theme
// const neutralTonesTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#B4B4B8', // Light Gray
//       dark: '#C7C8CC', // Cool Gray
//     },
//     secondary: {
//       main: '#E3E1D9', // Off White
//       light: '#F2EFE5', // Pale Ivory
//     },
//     // Additional common colors
//   }
// });

// export { oceanTheme, nightSkyTheme, greenTonesTheme, neutralTonesTheme, Summertheme };



// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      primary: {
        100: "#d0d1d5",
        200: "#a1a4ab",
        300: "#727681",
        400: "#1F2A40",
        500: "#141b2d",
        600: "#101624",
        700: "#0c101b",
        800: "#080b12",
        900: "#040509",
      },
      greenAccent: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922",
      },
      redAccent: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f",
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
    }
    : {
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0", // manually changed
        500: "#141b2d",
        600: "#1F2A40",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
      greenAccent: {
        100: "#0f2922",
        200: "#1e5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee",
      },
      redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
      },
      blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe",
      },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

