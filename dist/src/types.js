//
// Copyright 2024 DXOS.org
//
import { Schema as S } from '@effect/schema';
import { TypedObject } from '@dxos/echo-schema';
export class TaskType extends TypedObject({ typename: 'dxos.app.tasks.Task', version: '0.1.0' })({
    title: S.String,
    completed: S.Boolean,
}) {
}
//# sourceMappingURL=types.js.map