export type Result<T, E> =
  T extends void
    ? { ok: true }
    | { ok: false; error: E }
    : { ok: true; value: T }
    | { ok: false; error: E };
