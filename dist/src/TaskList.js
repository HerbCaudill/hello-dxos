//
// Copyright 2023 DXOS.org
//
import React, { useState } from 'react';
import { nonNullable } from '@dxos/util';
export const TaskList = (props) => {
    const { tasks, onInviteClick, onTaskCreate, onTaskRemove, onTaskTitleChange, onTaskCheck } = props;
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [showDeleteTask, setShowDeleteTask] = useState(null);
    const newTask = () => {
        if (!newTaskTitle) {
            return;
        }
        onTaskCreate === null || onTaskCreate === void 0 ? void 0 : onTaskCreate(newTaskTitle);
        setNewTaskTitle('');
    };
    return (React.createElement("div", { className: 'p-2' },
        React.createElement("button", { className: 'float-right bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow active:bg-gray-200', onClick: onInviteClick }, "Share"),
        React.createElement("div", { className: 'max-w-sm mx-auto' },
            React.createElement("h1", { className: 'mt-3 text-3xl font-bold leading-tight text-gray-900 mb-2' }, "Task List"),
            tasks && (React.createElement("ul", { className: 'mb-2' }, tasks.filter(nonNullable).map((task, index) => (React.createElement("li", { key: index, className: 'flex items-center justify-between text-gray-700 max-w-md rounded p-1 h-8', onMouseOver: () => {
                    setShowDeleteTask(index);
                }, onMouseLeave: () => {
                    setShowDeleteTask(null);
                } },
                React.createElement("input", { className: 'mr-2 rounded shadow hover:pointer-cursor', type: 'checkbox', checked: task.completed, onChange: (e) => onTaskCheck === null || onTaskCheck === void 0 ? void 0 : onTaskCheck(task, e.target.checked) }),
                React.createElement("div", { className: 'hover:pointer-cursor flex-grow', onClick: () => setEditingTask(index) }, editingTask === index ? (React.createElement("span", { className: 'flex justify-between' },
                    React.createElement("input", { className: 'border-none p-0 flex-grow bg-transparent w-full', type: 'text', value: task.title, onChange: (e) => {
                            onTaskTitleChange === null || onTaskTitleChange === void 0 ? void 0 : onTaskTitleChange(task, e.target.value);
                        }, onKeyUp: (e) => {
                            if (e.key === 'Enter') {
                                setEditingTask(null);
                            }
                        }, autoFocus: true }))) : (task.title)),
                showDeleteTask === index && (React.createElement("button", { className: 'bg-white rounded ml-2 p-0 px-2 hover:bg-gray-100 hover:cursor-pointer shadow border border-gray-400 active:bg-gray-200', onClick: () => onTaskRemove === null || onTaskRemove === void 0 ? void 0 : onTaskRemove(task) }, "Delete"))))))),
            React.createElement("div", { className: 'flex items-center justify-between' },
                React.createElement("input", { className: 'mr-2 rounded shadow flex-grow py-2 px-4', type: 'text', value: newTaskTitle, onChange: (e) => {
                        setNewTaskTitle(e.target.value);
                    }, onKeyUp: (e) => {
                        if (e.key === 'Enter') {
                            newTask();
                        }
                    } }),
                React.createElement("button", { className: 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow active:bg-gray-200', onClick: newTask }, "Add Task")))));
};
//# sourceMappingURL=TaskList.js.map