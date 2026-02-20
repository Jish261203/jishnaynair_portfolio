"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import {
  QueryClientProvider,
  QueryClient,
  DefaultOptions,
} from "@tanstack/react-query";
import { useState } from "react";

const defaultOptions: DefaultOptions = {
  queries: {
    gcTime: 10 * 60 * 1000, // inactive time for query's garbage collection
    staleTime: 10 * 60 * 1000, // time until query uses data from cache
    refetchOnWindowFocus: false, // Whenever window comes in focus it won't refetch the data
    refetchOnReconnect: true, // refetches on reconnection
    retry: 2,
  },
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
