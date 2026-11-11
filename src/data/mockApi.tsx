import type { DataTableColumn } from '../components/DataTable'
import data from './data.json'
import type { Property } from './schema'



export function getLocations(): Property[] {
  // Give each view its own records so edits cannot mutate the fixture.
  return data.locations.map((location) => ({ ...location }))
}

export const columns: DataTableColumn<Property>[] = [
  {
    id: 'propertyName',
    header: 'Property name',
    sortable: true,
    cell: (location) => <span className="font-semibold">{location.propertyName}</span>,
  },
  { id: 'streetAddress', header: 'Street address', sortable: true },
  { id: 'city', header: 'City', sortable: true },
  { id: 'stateProvince', header: 'State / Province', sortable: true },
  { id: 'zip', header: 'ZIP / Postal code', sortable: true },
]
