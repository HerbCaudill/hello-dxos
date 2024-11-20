import React from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from './components/Root'
import { Router } from './components/Router'
import { TasksClientProvider } from './components/ClientProvider'
import { App } from './components/App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <TasksClientProvider>
    <Router
      routes={[
        { path: '/space/:spaceId', element: <App /> },
        { path: '/', element: <Root /> },
      ]}
    />
  </TasksClientProvider>
)
