import React from 'react';
import { type TaskType } from './types';
export type TaskListProps = {
    tasks?: TaskType[];
    onInviteClick?: () => any;
    onTaskCreate?: (text: string) => any;
    onTaskRemove?: (task: TaskType) => any;
    onTaskTitleChange?: (task: TaskType, newTitle: string) => any;
    onTaskCheck?: (task: TaskType, checked: boolean) => any;
};
export declare const TaskList: (props: TaskListProps) => React.JSX.Element;
//# sourceMappingURL=TaskList.d.ts.map