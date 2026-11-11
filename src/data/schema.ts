export interface Property {
  id: string
  propertyName: string
  streetAddress: string
  city: string
  stateProvince: string
  zip: string
}

// Field names must match editable properties in the location schema.
export const PropertySchema = [
  ['propertyName', 'Property name'],
  ['streetAddress', 'Street address'],
  ['city', 'City'],
  ['stateProvince', 'State / Province'],
  ['zip', 'ZIP / Postal code'],
] as const satisfies readonly (readonly [Exclude<keyof Property, 'id'>, string])[]
