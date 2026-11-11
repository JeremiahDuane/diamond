import { useState } from 'react'
import { DataTable } from '../components/DataTable'
import type { DataTableColumn } from '../components/DataTable'
import data from '../data/data.json'
import { PropertyForm } from '../components/PropertyForm'
import type { Property } from '../components/PropertyForm'
import { PageHeader } from '../components/page/header'

type Location = Property

const columns: DataTableColumn<Location>[] = [
  {
    id: 'propertyName',
    header: 'Property name',
    accessor: (location) => location.propertyName,
    sortable: true,
    cell: (location) => <span className="property-name">{location.propertyName}</span>,
  },
  { id: 'streetAddress', header: 'Street address', accessor: (location) => location.streetAddress, sortable: true },
  { id: 'city', header: 'City', accessor: (location) => location.city, sortable: true },
  { id: 'stateProvince', header: 'State / Province', accessor: (location) => location.stateProvince, sortable: true },
  { id: 'zip', header: 'ZIP / Postal code', accessor: (location) => location.zip, sortable: true },
]

export function PropertiesView() {
  const [properties, setProperties] = useState<Location[]>(() => [...data.locations])
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState('')
  const query = search.trim().toLocaleLowerCase()
  const locations = properties.filter((location) =>
    columns.some((column) => String(column.accessor(location)).toLocaleLowerCase().includes(query)),
  )

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <a className="brand" href="/" aria-label="Diamond home">
            <svg className="brand-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M9 5h14l6 9-13 14L3 14 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M3 14h26M9 5l7 23 7-23" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Diamond
          </a>
          <span className="header-label">Property directory</span>
        </div>
      </header>


      <main className="home-page">
        <PageHeader length={properties.length} ></PageHeader>

        
        <section className="directory" aria-label="Property directory">
          <div className="table-toolbar">
            <div>
              <h2>All properties</h2>
              <p role="status">Showing {locations.length} of {properties.length} locations</p>
            </div>
            <label className="search-field">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.75" />
                <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Search property locations</span>
              <input
                type="search"
                placeholder="Search properties or addresses…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          {adding && (
            <PropertyForm
              onSubmit={(property) => {
                setProperties((current) => [...current, property])
                setSearch('')
                setAdding(false)
              }}
              onCancel={() => setAdding(false)}
            />
          )}
          <DataTable
            className="locations-table"
            caption="Property locations and addresses"
            data={locations}
            columns={columns}
            addLabel="Add property"
            onAdd={() => setAdding(true)}
            onRemove={(location) => setProperties((current) => current.filter((property) => property.id !== location.id))}
            getRowLabel={(location) => location.propertyName}
            getRowKey={(location) => location.id}
            emptyMessage="No properties match your search. Try a different name or address."
          />
          <p className="table-hint">Select a column heading to sort the directory.</p>
        </section>
      </main>
    </>
  )
}

