import { Schema as S } from '@effect/schema';
export type TaskProps = {
    title: string;
    completed: boolean;
};
declare const TaskType_base: import("@dxos/echo-schema").AbstractTypedObject<{
    title: string;
    completed: boolean;
} & {
    id: string;
}, S.Struct.Encoded<{
    title: typeof S.String;
    completed: typeof S.Boolean;
}>>;
export declare class TaskType extends TaskType_base {
}
export {};
//# sourceMappingURL=types.d.ts.map