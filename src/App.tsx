import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchFormContainer from "./components/SearchForm/SearchFormContainer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();
const theme = createTheme();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <h1>GitHub User Search</h1>
          <SearchFormContainer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
