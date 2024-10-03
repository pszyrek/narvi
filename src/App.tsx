import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import SearchUserContainer from "./Views/SearchUsersView/SearchUsersViewContainer";

const queryClient = new QueryClient();
const theme = createTheme();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchUserContainer />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
