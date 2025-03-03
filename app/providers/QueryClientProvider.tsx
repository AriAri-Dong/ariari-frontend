"use client";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderWrapper,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProviderWrapper client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProviderWrapper>
  );
}
