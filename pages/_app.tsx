import type { AppProps } from 'next/app'
import React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient())

  return (
  <QueryClientProvider client={queryClient.current}>
    <Hydrate state={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </Hydrate>
  </QueryClientProvider>
  )
}

export default MyApp
