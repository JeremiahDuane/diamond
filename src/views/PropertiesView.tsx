import { useCallback, useState } from 'react'
import type { ChangeEvent } from 'react'
import { DataTable } from '../components/DataTable'
import { columns, getLocations } from '../data/mockApi'
import type { Property } from '../data/schema'
import { PropertyForm } from '../components/PropertyForm'
import { Page, PageHeader, PageSection } from '../components/Page'
import { SearchField } from '../components/SearchField'
import { SiteHeader } from '../components/SiteHeader'

export function PropertiesView() {
  const [properties, setProperties] = useState<Property[]>(getLocations)
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState('')

  // Search visible fields without requiring matching capitalization or outer spaces.
  const query = search.trim().toLocaleLowerCase()
  
  // Handle search and filtering (this should occur in the service layer, if we had a BE).
  const matchesSearch = useCallback((location: Property) =>
    columns.some((column) => String(location[column.id]).toLocaleLowerCase().includes(query)),
  [query])
  const filteredProperties = properties.filter(matchesSearch)
  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])
  const handleSubmit = useCallback((property: Property) => {
    setProperties((current) => [...current, property])
    // Clear the filter so the newly added property is visible.
    setSearch('')
    setAdding(false)
  }, [])

  const handleCancel = useCallback(() => setAdding(false), [])
  const handleAdd = useCallback(() => setAdding(true), [])
  const handleRemove = useCallback((location: Property) => {
    setProperties((current) => current.filter((property) => property.id !== location.id))
  }, [])
  const getRowLabel = useCallback((location: Property) => location.propertyName, [])
  const getRowKey = useCallback((location: Property) => location.id, [])

  return (
    <>
      <SiteHeader label="Property directory" />
      <Page>
        <PageHeader
          title="Property locations"
          eyebrow="YOUR PORTFOLIO, IN ONE PLACE"
          description="Browse and find addresses across your property portfolio."
        >
          <span className="shrink-0 rounded-full border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground">
            {properties.length} locations
          </span>
        </PageHeader>

        <PageSection
          title="All properties"
          aria-label="Property directory"
          description={<p role="status">Showing {filteredProperties.length} of {properties.length} locations</p>}
          actions={
            <SearchField
              label="Search property locations"
              placeholder="Search properties or addresses…"
              value={search}
              onChange={handleSearchChange}
            />
          }
          footer="Select a column heading to sort the directory."
        >
          <DataTable
            tableClassName="min-w-4xl"
            topRow={adding && <PropertyForm onSubmit={handleSubmit} onCancel={handleCancel} />}
            data={filteredProperties}
            columns={columns}
            addLabel="Add property"
            onAdd={handleAdd}
            onRemove={handleRemove}
            getRowLabel={getRowLabel}
            getRowKey={getRowKey}
            emptyMessage="No properties match your search. Try a different name or address."
          />
        </PageSection>
      </Page>
    </>
  )
}

