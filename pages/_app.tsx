import React from "react"
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>
  <Hydrate state={pageProps.dehydratedState}>
    <Component {...pageProps} />
  </Hydrate>
</QueryClientProvider>
}

export default MyApp
