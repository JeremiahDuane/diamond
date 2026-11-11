import { cx } from '../utils/cx'
import { useCallback, useState } from 'react'
import type { Key, ReactNode } from 'react'
import { Button } from './Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table'
import { compareValues, DEFAULT_SORT_DIRECTION, getNextSort } from '../utils/sort'
import type { Sort } from '../utils/sort'

const SORT_ASCENDING_ICON = '↑'
const SORT_DESCENDING_ICON = '↓'
const SORT_UNSORTED_ICON = '↕'
const DEFAULT_CELL_VALUE = '-'
const DEFAULT_ALIGNMENT = 'left'
const DEFAULT_ROW_LABEL = 'row'

function sortRows<T>(
  data: readonly T[],
  field: keyof T,
  direction = DEFAULT_SORT_DIRECTION,
): T[] {
  // Sort a copy so the caller’s row order stays unchanged.
  return [...data].sort((a, b) => compareValues(a[field], b[field], direction))
}

type SortButtonProps = {
  columnId: string
  children: string
  sort: Sort | null
  onSort: (columnId: string) => void
}

function SortButton({ columnId, children, sort, onSort }: SortButtonProps) {
  const active = sort?.columnId === columnId
  const handleClick = useCallback(() => onSort(columnId), [onSort, columnId])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded border-0 bg-transparent p-0 font-semibold text-inherit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {children}
      <span aria-hidden="true">{active && sort ? sort.direction === 'asc' ? SORT_ASCENDING_ICON : SORT_DESCENDING_ICON : SORT_UNSORTED_ICON}</span>
    </button>
  )
}

export type DataTableColumn<T> = {
  id: keyof T & string
  header: string
  cell?: (row: T) => ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

export type DataTableProps<T> = {
  data: readonly T[]
  columns: readonly DataTableColumn<T>[]
  getRowKey: (row: T) => Key
  topRow?: ReactNode
  emptyMessage?: string
  className?: string
  tableClassName?: string
  onAdd?: () => void
  onRemove?: (row: T) => void
  getRowLabel?: (row: T) => string
  addLabel?: string
}

type DataRowProps<T> = Pick<DataTableProps<T>, 'columns' | 'onRemove' | 'getRowLabel'> & {
  hasActions: boolean
  row: T
}

function DataRow<T>({ row, columns, onRemove, getRowLabel, hasActions }: DataRowProps<T>) {
  const handleRemove = useCallback(() => onRemove?.(row), [onRemove, row])

  return (
    <TableRow className="hover:bg-muted/50">
      {hasActions && (
        <TableCell>
          {onRemove && (
          <Button variant="remove" size="sm" className="size-8 p-0" onClick={handleRemove}>
            <span className="sr-only">Remove {getRowLabel?.(row) ?? DEFAULT_ROW_LABEL}</span>
          </Button>
          )}
        </TableCell>
      )}
      {columns.map((column) => (
        <TableCell key={column.id} style={{ textAlign: column.align ?? DEFAULT_ALIGNMENT }}>
          {column.cell ? column.cell(row) : String(row[column.id] ?? DEFAULT_CELL_VALUE)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  topRow,
  emptyMessage = 'No results found.',
  className = '',
  tableClassName,
  onAdd,
  onRemove,
  getRowLabel,
  addLabel = 'Add row',
}: DataTableProps<T>) {
  const hasActions = Boolean(onAdd || onRemove)
  const [sort, setSort] = useState<Sort | null>(null)
  const isSortedColumn = useCallback(
    (column: DataTableColumn<T>) => column.id === sort?.columnId && column.sortable,
    [sort?.columnId],
  )
  // Ignore saved sorting if the column is removed or no longer sortable.
  const sortedColumn = columns.find(isSortedColumn)
  const rows = sortedColumn && sort
    ? sortRows(data, sortedColumn.id, sort.direction)
    : data

  const toggleSort = useCallback((columnId: string) => {
    setSort((current) => getNextSort(current, columnId))
  }, [])


  return (
    <div className={cx('overflow-x-auto', className)}>
      <Table className={tableClassName}>
        <TableHeader>
          <TableRow>
            {hasActions && <TableHead>Actions</TableHead>}
            {columns.map((column) => (
              <TableHead
                key={column.id}
                aria-sort={sortedColumn?.id === column.id && sort
                  ? sort.direction === 'asc' ? 'ascending' : 'descending'
                  : 'none'
                }
                style={{ textAlign: column.align ?? DEFAULT_ALIGNMENT }}
              >
                {column.sortable ? (
                  <SortButton columnId={column.id} sort={sort} onSort={toggleSort}>
                    {column.header}
                  </SortButton>
                ) : column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {topRow}
          {!topRow && onAdd && (
            <TableRow>
              <TableCell>
                <Button variant="add" aria-pressed="false" size="sm" className="size-8 p-0" onClick={onAdd}>
                  <span className="sr-only">{addLabel}</span>
                </Button>
              </TableCell>
              {columns.map((column) => <TableCell key={column.id} />)}
            </TableRow>
          )}
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={Math.max(columns.length + (hasActions ? 1 : 0), 1)} className="text-center text-muted-foreground">
                <p className="py-4 whitespace-normal">{emptyMessage}</p>
              </TableCell>
            </TableRow>
          ) : rows.map((row) => (
            <DataRow
              key={getRowKey(row)}
              row={row}
              hasActions={hasActions}
              columns={columns}
              onRemove={onRemove}
              getRowLabel={getRowLabel}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
