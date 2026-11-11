import { useCallback, useId } from 'react'
import type { SubmitEvent } from 'react'
import { TableCell, TableRow } from './Table'
import { Button } from './Button'
import { SaveIcon } from './icons/SaveIcon'
import type { Property } from '../data/schema'
import { PropertySchema } from '../data/schema'
import { cx } from '../utils/cx'

type PropertyFormProps = {
  onSubmit: (property: Property) => void
  onCancel: () => void
}

export function PropertyForm({ onSubmit, onCancel }: PropertyFormProps) {
  const formId = useId()
  const handleSubmit = useCallback((event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()
      // Read and trim the submitted fields before creating a property.
      const fields = new FormData(event.currentTarget)
      const property: Property = {
        // Usually this assignment of an ID would happen in the data layer.
        id: crypto.randomUUID(),
        propertyName: String(fields.get('propertyName')).trim(),
        streetAddress: String(fields.get('streetAddress')).trim(),
        city: String(fields.get('city')).trim(),
        stateProvince: String(fields.get('stateProvince')).trim(),
        zip: String(fields.get('zip')).trim(),
      }
      // Reject whitespace-only values even when native required validation passes.
      if (Object.values(property).some((value) => !value)) return
      onSubmit(property)
  }, [onSubmit])

  return (
    <TableRow>
      <TableCell>
        {/* Associate inputs across cells with the form in the actions cell. */}
        <form id={formId} onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button variant="add" active aria-pressed="true" size="sm" className="size-8 p-0" onClick={onCancel}>
            <span className="sr-only">Cancel adding property</span>
          </Button>
          <Button variant="primary" size="sm" type="submit" className="size-8 p-0">
            <SaveIcon />
            <span className="sr-only">Save property</span>
          </Button>
        </form>
      </TableCell>
      {PropertySchema.map(([name, label], index) => (
        <TableCell key={name}>
        <label className="block text-sm">
          <span className="sr-only">{label}</span>
          <input form={formId} placeholder={label} name={name} required pattern={".*\\S.*"} autoFocus={index === 0}
            className={cx(
              'rounded-md border border-input bg-surface px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              name === 'city' && 'w-40',
              (name === 'stateProvince' || name === 'zip') && 'w-32',
            )} />
        </label>
        </TableCell>
      ))}
    </TableRow>
  )
}
