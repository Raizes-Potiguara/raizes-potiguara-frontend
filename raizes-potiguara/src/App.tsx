import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
 import { PublicRoutes } from './routes/Router.tsx'
import { Box } from '@chakra-ui/react';
import { CORES } from './util/constants.ts';

function App() {

  const router = createBrowserRouter([
    ...PublicRoutes,
    {
      path: "*",
      element: (
        <Navigate
          to={"/"}
          replace
        />
      ),
    },
  ]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Box>
          <RouterProvider router={router} />
        </Box>
      </QueryClientProvider>
    </>
  )
}

export default App
