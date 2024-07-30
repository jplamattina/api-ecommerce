import { fileURLtoPath } from 'node:os'
import { dirname } from 'node:path'

const __filename = fileURLtoPath(import.meta.url)
export const __dirname = dirname(__filename)