import { create } from '@dxos/echo-schema'
import { useShell } from '@dxos/react-client'
import { Filter, useQuery, useSpace } from '@dxos/react-client/echo'
import React from 'react'
import { useParams } from 'react-router-dom'
import { TaskType } from '../types'
import { TaskList } from './TaskList'

export const App = () => {
  const { spaceId } = useParams<{ spaceId: string }>()
  const space = useSpace(spaceId)
  const tasks = useQuery<TaskType>(space, Filter.schema(TaskType))
  const shell = useShell()

  if (space === undefined) return null
  const { db } = space

  return (
    <TaskList
      tasks={tasks}
      onInviteClick={async () => {
        void shell.shareSpace({ spaceId: space.id })
      }}
      onTaskCreate={title => {
        const task = create(TaskType, { title, completed: false })
        db.add(task)
      }}
      onTaskRemove={task => {
        db.remove(task)
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
