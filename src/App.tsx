import React, { useEffect } from 'react'
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import { create } from '@dxos/echo-schema'
import { ClientProvider, useShell } from '@dxos/react-client'
import { useSpace, useQuery, Filter } from '@dxos/react-client/echo'

import { TaskList } from './TaskList'
import { getConfig } from './config'
import { TaskType } from './types'

export const TaskListContainer = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>()

  const space = useSpace(spaceKey)
  const tasks = useQuery<TaskType>(space, Filter.schema(TaskType))
  const shell = useShell()

  return (
    <TaskList
      tasks={tasks}
      onInviteClick={async () => {
        if (!space) {
          return
        }
        void shell.shareSpace({ spaceKey: space?.key })
      }}
      onTaskCreate={newTaskTitle => {
        const task = create(TaskType, { title: newTaskTitle, completed: false })
        space?.db.add(task)
      }}
      onTaskRemove={task => {
        space?.db.remove(task)
      }}
      onTaskTitleChange={(task, newTitle) => {
        task.title = newTitle
      }}
      onTaskCheck={(task, checked) => {
        task.completed = checked
      }}
    />
  )
}

export const Home = () => {
  const space = useSpace()
  const shell = useShell()
  const [search, setSearchParams] = useSearchParams()
  const invitationCode = search.get('spaceInvitationCode')
  const deviceInvitationCode = search.get('deviceInvitationCode')
  const navigate = useNavigate()

  useEffect(() => {
    if (deviceInvitationCode) {
      setSearchParams(p => {
        p.delete('deviceInvitationCode')
        return p
      })
    } else if (invitationCode) {
      setSearchParams(p => {
        p.delete('spaceInvitationCode')
        return p
      })
      void (async () => {
        const { space } = await shell.joinSpace({ invitationCode })
        if (space) {
          navigate(`/space/${space.key}`)
        }
      })()
    }
  }, [invitationCode, deviceInvitationCode])

  return space ? <Navigate to={`/space/${space.id}`} /> : null
}

const router = createBrowserRouter([
  {
    path: '/space/:spaceKey',
    element: <TaskListContainer />,
  },
  {
    path: '/',
    element: <Home />,
  },
])

const createWorker = () =>
  new SharedWorker(new URL('./shared-worker', import.meta.url), {
    type: 'module',
    name: 'dxos-client-worker',
  })

export const App = () => {
  return (
    <ClientProvider
      config={getConfig}
      createWorker={createWorker}
      shell="./shell.html"
      types={[TaskType]}
      onInitialized={async client => {
        const searchParams = new URLSearchParams(location.search)
        if (!client.halo.identity.get() && !searchParams.has('deviceInvitationCode')) {
          await client.halo.createIdentity()
        }
      }}
    >
      <RouterProvider router={router} />
    </ClientProvider>
  )
}
