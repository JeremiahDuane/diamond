import { Button } from './Button'

export type Property = {
  id: string
  propertyName: string
  streetAddress: string
  city: string
  stateProvince: string
  zip: string
}

type PropertyFormProps = {
  onSubmit: (property: Property) => void
  onCancel: () => void
}

export function PropertyForm({ onSubmit, onCancel }: PropertyFormProps) {
  return (
    <form className="flex flex-wrap items-end gap-4 p-4" onSubmit={(event) => {
      event.preventDefault()
      const fields = new FormData(event.currentTarget)
      const property = {
        id: crypto.randomUUID(),
        propertyName: String(fields.get('propertyName')).trim(),
        streetAddress: String(fields.get('streetAddress')).trim(),
        city: String(fields.get('city')).trim(),
        stateProvince: String(fields.get('stateProvince')).trim(),
        zip: String(fields.get('zip')).trim(),
      }
      if (Object.values(property).some((value) => !value)) return
      onSubmit(property)
    }}>
      {([
        ['propertyName', 'Property name'], ['streetAddress', 'Street address'],
        ['city', 'City'], ['stateProvince', 'State / Province'], ['zip', 'ZIP / Postal code'],
      ] as const).map(([name, label], index) => (
        <label key={name} className="flex flex-col gap-1 text-sm">
          {label}
          <input name={name} required pattern={".*\\S.*"} autoFocus={index === 0}
            className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600" />
        </label>
      ))}
      <Button variant="add" type="submit">Save property</Button>
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
    </form>
  )
}
