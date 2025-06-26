// 'use client';
// import React, { ReactNode, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import NextTopLoader from 'nextjs-toploader';
// import Navbar from '@/components/layout/main/navbar';
// import Footer from '@/components/layout/main/footer';
// import { Toaster } from '@/components/ui/sonner';
// import { AppThemeProvider } from '@/providers/theme-provider';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from '@/store/store';

// function Initializers({ children }: { children: ReactNode }) {
//   const isAuthPage = (usePathname() || '')?.startsWith('/auth/');
//   const isUserPage = (usePathname() || '')?.startsWith('/user/');
//   const hideFooter = isAuthPage || isUserPage ? true : false;

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 60 * 1000, // 1 minute
//         refetchOnWindowFocus: false,
//         // networkMode:'online'
//       },
//     },
//   });

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <QueryClientProvider client={queryClient}>
//           <AppThemeProvider>
//             <NextTopLoader color="#000000" height={3} />
//             <Navbar fixed={isUserPage ? false : true} />
//             {children}
//             {hideFooter ? null : <Footer />}
//             <Toaster richColors />
//           </AppThemeProvider>
//           <ReactQueryDevtools initialIsOpen={false} />
//         </QueryClientProvider>
//       </PersistGate>
//     </Provider>
//   );
// }

// export default Initializers;

'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import Navbar from '@/components/layout/main/navbar';
import Footer from '@/components/layout/main/footer';
import { Toaster } from '@/components/ui/sonner';
import { AppThemeProvider } from '@/providers/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function Initializers({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const isAuthPage = pathname.startsWith('/auth/');
  const isUserPage = pathname.startsWith('/user/');
  const isProtectedRoute = !isAuthPage && !pathname.startsWith('/public/'); // Add your public routes
  const hideFooter = isAuthPage || isUserPage;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    const token = Cookies.get('token');

    console.log(token, 'toks');

    // If on protected route and no token, redirect to login
    if (isProtectedRoute && !token) {
      router.replace('/auth/login');
      return;
    }

    // If token exists, check if it's expired
    // if (token) {
    //   try {
    //     const decoded = jwtDecode<{ exp: number }>(token);
    //     const isExpired = decoded.exp < Date.now() / 1000;

    //     if (isExpired) {
    //       Cookies.remove('token');
    //       Cookies.remove('refresh_token');
    //       if (isProtectedRoute) {
    //         router.replace('/auth/login');
    //       }
    //     }
    //   } catch (error) {
    //     Cookies.remove('token');
    //     Cookies.remove('refresh_token');
    //     if (isProtectedRoute) {
    //       router.replace('/auth/login');
    //     }
    //   }
    // }

    // // If on auth page but already logged in, redirect to home
    // if (isAuthPage && token) {
    //   router.replace('/');
    // }

    setIsLoading(false);
  }, [pathname, router, isProtectedRoute, isAuthPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppThemeProvider>
            <NextTopLoader color="#000000" height={3} />
            <Navbar fixed={isUserPage ? false : true} />
            {children}
            {hideFooter ? null : <Footer />}
            <Toaster richColors />
          </AppThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default Initializers;
