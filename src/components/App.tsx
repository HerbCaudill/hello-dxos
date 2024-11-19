import { ClientProvider } from '@dxos/react-client'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { TaskListContainer } from './TaskListContainer'
import { configProvider } from '../config'
import { TaskType } from '../types'
import { Home } from './Home'

export const App = () => {
  return (
    <ClientProvider
      config={configProvider}
      createWorker={() =>
        new SharedWorker(new URL('../shared-worker', import.meta.url), {
          type: 'module',
          name: 'dxos-client-worker',
        })
      }
      shell="./shell.html"
      types={[TaskType]}
      onInitialized={async client => {
        const searchParams = new URLSearchParams(location.search)
        if (!client.halo.identity.get() && !searchParams.has('deviceInvitationCode')) {
          await client.halo.createIdentity()
        }
      }}
    >
      <RouterProvider
        router={createBrowserRouter([
          { path: '/space/:spaceId', element: <TaskListContainer /> },
          { path: '/', element: <Home /> },
        ])}
      />
    </ClientProvider>
  )
}
