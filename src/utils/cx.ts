type ClassValue = string | false | null | undefined

export function cx(...classes: ClassValue[]): string {
  // Skip absent or disabled classes before joining the remaining utilities.
  return classes.filter(Boolean).join(' ')
}
