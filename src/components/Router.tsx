import React from 'react'
import { RouterProvider, createBrowserRouter, type RouteObject } from 'react-router-dom'

export const Router = ({ routes }: { routes: RouteObject[] }) => (
  <RouterProvider
    future={{ v7_startTransition: true }}
    router={createBrowserRouter(routes, {
      future: {
        v7_fetcherPersist: true,
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    })}
  />
)
