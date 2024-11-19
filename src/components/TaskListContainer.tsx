import React from 'react'
import { useParams } from 'react-router-dom'

import { create } from '@dxos/echo-schema'
import { useShell } from '@dxos/react-client'
import { Filter, useQuery, useSpace } from '@dxos/react-client/echo'

import { TaskList } from './TaskList'
import { TaskType } from '../types'

export const TaskListContainer = () => {
  const { spaceId } = useParams<{ spaceId: string }>()

  const space = useSpace(spaceId)
  const tasks = useQuery<TaskType>(space, Filter.schema(TaskType))
  const shell = useShell()

  if (space === undefined) return null
  return (
    <TaskList
      tasks={tasks}
      onInviteClick={async () => {
        void shell.shareSpace({ spaceId: space.id })
      }}
      onTaskCreate={title => {
        const task = create(TaskType, { title, completed: false })
        space.db.add(task)
      }}
      onTaskRemove={task => {
        space.db.remove(task)
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
