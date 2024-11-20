import { ClientProvider } from '@dxos/react-client'
import React, { type ReactElement } from 'react'
import { configProvider } from '../config'
import { TaskType } from '../types'

export const TasksClientProvider = ({ children }: { children: ReactElement }) => (
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
    {children}
  </ClientProvider>
)
