import {
  Box,
  Container,
  Grid2 as Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import SearchInput, {
  Props as SearchInputProps,
} from "../SearchInput/SearchInput";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
}

interface Props {
  children: React.ReactNode;
  infiniteScrollProps: InfiniteScrollProps;
  inputProps: SearchInputProps;
  isLoading: boolean;
  loadingError?: Error | null;
  notFoundError?: {
    message: string;
  };
}

const SearchForm = ({
  children,
  infiniteScrollProps,
  inputProps,
  isLoading,
  loadingError,
  notFoundError,
}: Props) => (
  <Container sx={{ my: 3 }}>
    <form>
      <Grid container spacing={2}>
        <Grid size={6}>
          <SearchInput {...inputProps} />
        </Grid>
        <Grid container size={12}>
          {isLoading && (
            <Grid size={12}>
              <LinearProgress />
            </Grid>
          )}
          <InfiniteScroll
            {...infiniteScrollProps}
            style={{
              width: "100%",
            }}
            pageStart={0}
            loader={
              <Box key="loader" my={2}>
                <LinearProgress />
              </Box>
            }
          >
            <Grid container spacing={2} size={12}>
              {children}
            </Grid>
          </InfiniteScroll>
          {notFoundError && (
            <Grid size={12}>
              <Typography>{notFoundError.message}</Typography>
            </Grid>
          )}
          {loadingError && <Typography>{loadingError.message}</Typography>}
        </Grid>
      </Grid>
    </form>
  </Container>
);

export default SearchForm;
