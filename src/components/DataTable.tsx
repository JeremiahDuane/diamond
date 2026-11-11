import { useState } from 'react'
import type { Key, ReactNode } from 'react'
import { Button } from './Button'

type CellValue = string | number | boolean | null | undefined

export type DataTableColumn<T> = {
  id: string
  header: string
  accessor: (row: T) => CellValue
  cell?: (row: T) => ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

export type DataTableProps<T> = {
  data: readonly T[]
  columns: readonly DataTableColumn<T>[]
  getRowKey: (row: T) => Key
  caption: string
  emptyMessage?: string
  className?: string
  onAdd?: () => void
  onRemove?: (row: T) => void
  getRowLabel?: (row: T) => string
  addLabel?: string
}

type Sort = { columnId: string; direction: 'asc' | 'desc' }

const alignment = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

function compareValues(a: CellValue, b: CellValue, direction: Sort['direction']) {
  // Keep missing values at the end in either direction.
  if (a == null) return b == null ? 0 : 1
  if (b == null) return -1

  const comparison =
    typeof a === 'number' && typeof b === 'number'
      ? a - b
      : String(a).localeCompare(String(b), undefined, { numeric: true })

  return direction === 'asc' ? comparison : -comparison
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  caption,
  emptyMessage = 'No results found.',
  className = '',
  onAdd,
  onRemove,
  getRowLabel,
  addLabel = 'Add row',
}: DataTableProps<T>) {
  const [sort, setSort] = useState<Sort | null>(null)
  const sortedColumn = columns.find(
    (column) => column.id === sort?.columnId && column.sortable,
  )
  const rows = sortedColumn && sort
    ? [...data].sort((a, b) =>
        compareValues(sortedColumn.accessor(a), sortedColumn.accessor(b), sort.direction),
      )
    : data

  function toggleSort(columnId: string) {
    setSort((current) => {
      if (current?.columnId !== columnId) return { columnId, direction: 'asc' }
      if (current.direction === 'asc') return { columnId, direction: 'desc' }
      return null
    })
  }

  const DEFAULT_VALUE = "-";
  
  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 ${className}`}>
      <table className="w-full border-collapse text-left text-sm text-gray-900 dark:text-gray-100">
        <caption className="px-4 py-3 text-left font-semibold">
          <div className="flex items-center gap-4">
            {onAdd && (
              <Button variant="add" size="sm" className="size-8 p-0" onClick={onAdd}>
                <span className="sr-only">{addLabel}</span>
              </Button>
            )}
            {caption}
          </div>
        </caption>
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {onRemove && <th scope="col" className="w-16 px-4 py-3"><span className="sr-only">Actions</span></th>}
            {columns.map((column) => {
              const active = sortedColumn?.id === column.id

              return (
                <th
                  key={column.id}
                  scope="col"
                  aria-sort={column.sortable
                    && active && sort
                      ? sort.direction === 'asc' ? 'ascending' : 'descending'
                      : 'none'
                    }
                  className={`border-b border-gray-300 px-4 py-3 font-semibold dark:border-gray-700 ${alignment[column.align ?? 'left']}`}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.id)}
                      className="inline-flex items-center gap-2 rounded border-0 bg-transparent p-0 font-semibold text-inherit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                    >
                      {column.header}
                      <span aria-hidden="true">{active && sort ? sort.direction === 'asc' ? '↑' : '↓' : '↕'}</span>
                    </button>
                  ) : column.header}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={Math.max(columns.length + (onRemove ? 1 : 0), 1)} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : rows.map((row) => (
            <tr key={getRowKey(row)} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50">
              {onRemove && (
                <td className="px-4 py-3">
                  <Button variant="remove" size="sm" className="size-8 p-0"
                    onClick={() => onRemove(row)}>
                    <span className="sr-only">Remove {getRowLabel?.(row) ?? 'row'}</span>
                  </Button>
                </td>
              )}
              {columns.map((column) => (
                <td key={column.id} className={`px-4 py-3 ${alignment[column.align ?? 'left']}`}>
                  {column.cell ? column.cell(row) : String(column.accessor(row) ?? DEFAULT_VALUE)}
                </td>
              ))}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
