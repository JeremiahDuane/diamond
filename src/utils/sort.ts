export type SortDirection = 'asc' | 'desc'

export type Sort = { columnId: string; direction: SortDirection }

export const DEFAULT_SORT_DIRECTION: SortDirection = 'asc'

export function compareValues(a: unknown, b: unknown, direction: SortDirection) {
  // Keep missing values at the end in either direction.
  if (a == null) return b == null ? 0 : 1
  if (b == null) return -1

  // Compare numbers arithmetically and text naturally, so "2" comes before "10".
  const comparison =
    typeof a === 'number' && typeof b === 'number'
      ? a - b
      : String(a).localeCompare(String(b), undefined, { numeric: true })

  // Reverse the comparison for descending order without moving missing values.
  return direction === DEFAULT_SORT_DIRECTION ? comparison : -comparison
}

export function getNextSort(current: Sort | null, columnId: string): Sort | null {
  // A new column starts ascending; repeated clicks descend, then clear sorting.
  if (current?.columnId !== columnId) return { columnId, direction: DEFAULT_SORT_DIRECTION }
  if (current.direction === DEFAULT_SORT_DIRECTION) return { columnId, direction: 'desc' }
  return null
}
