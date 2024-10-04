/**
 * Sanitizes a string by removing unwanted characters.
 *
 * The following conversions are made:
 * - Remove "&quot;"
 * - Remove any non-alphanumeric characters except for spaces, Vietnamese characters,
 *   and dashes
 * - Remove any numbers
 * - Trim any multiple spaces
 * @param {string} str - The string to sanitize
 * @returns {string} - The sanitized string
 */
const cleanString = (str: string): string => {
  return str
    .replace(/&quot;/g, '')
    .replace(/[^a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF\u1100-\u11FF\uAC00-\uD7AF]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g, '')
    .replace(/\s{2,}/g, ' ')
}

/**
 * Converts a given string into a suitable pathname for a URL.
 *
 * The following conversions are made:
 * - Convert to lowercase
 * - Replace "%20" with "-"
 * - Replace spaces with dashes
 * - Remove any non-alphanumeric characters (except "-")
 * - Replace multiple dashes with a single dash
 * - Remove trailing dashes
 * @param input The string to convert
 * @returns  A string suitable for use as a URL pathname
 */
function convertToPathname(input: string): string {
  const decodedInput = decodeURIComponent(input)
  return decodedInput
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export { cleanString, convertToPathname }
