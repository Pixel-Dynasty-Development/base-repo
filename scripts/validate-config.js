import fs from 'fs/promises'
import path from 'path'
import Ajv from 'ajv'

const root = path.resolve('.', 'config')
const schemasDir = path.join(root, 'schemas')

async function main() {
  const ajv = new Ajv({ allErrors: true, strict: false })
  let failures = 0

  try {
    const files = await fs.readdir(schemasDir)
    for (const file of files) {
      if (!file.endsWith('.schema.json')) continue
      const schemaPath = path.join(schemasDir, file)
      const schemaText = await fs.readFile(schemaPath, 'utf8')
      const schema = JSON.parse(schemaText)
      const name = file.replace(/\.schema\.json$/, '')
      const dataPath = path.join(root, `${name}.json`)

      let dataExists = true
      try {
        await fs.access(dataPath)
      } catch (e) {
        dataExists = false
      }

      if (!dataExists) {
        console.warn(`No data file for schema: ${file} (expected ${name}.json). Skipping.`)
        continue
      }

      const dataText = await fs.readFile(dataPath, 'utf8')
      let data
      try {
        data = JSON.parse(dataText)
      } catch (e) {
        console.error(`Invalid JSON in ${dataPath}: ${e.message}`)
        failures++
        continue
      }

      const validate = ajv.compile(schema)
      const valid = validate(data)
      if (!valid) {
        console.error(`Validation failed for ${name}.json:`)
        for (const err of validate.errors || []) {
          console.error(`  - ${err.instancePath} ${err.message}`)
        }
        failures++
      } else {
        console.log(`OK: ${name}.json matches ${file}`)
      }
    }
  } catch (e) {
    console.error('Error during validation:', e)
    process.exit(2)
  }

  if (failures > 0) {
    console.error(`Config validation completed with ${failures} error(s).`)
    process.exit(1)
  }

  console.log('All validated config files passed schema checks.')
}

main()
