import { createTheme } from "@mui/material/styles";
import { blue, pink, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: { danger: string };
  }
  interface ThemeOptions {
    status?: { danger?: string };
  }
}

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  status: {
    danger: red[500],
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans‑serif',
    h1: { fontSize: "2.2rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
  },
});

export default theme;
