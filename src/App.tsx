import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Home from "./Views/Home/SearchUserContainer";

const queryClient = new QueryClient();
const theme = createTheme();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
