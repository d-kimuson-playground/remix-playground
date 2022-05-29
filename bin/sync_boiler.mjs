import { execSync } from 'child_process'
import { existsSync, rmSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE_URL = "https://raw.githubusercontent.com/d-kimuson-playground/ts-boiler/main"
const pathMap = {
  'bin/update_cspell_words.mjs': 'bin/update_cspell_words.mjs',
  '.eslintrc.cjs': '.eslintrc.base.cjs',
  '.prettierrc.js': '.prettierrc.js',
  '.husky/pre-commit': '.husky/pre-commit',
  '.husky/prepare-commit-msg': '.husky/prepare-commit-msg',
}

/**
 * @param {string} fromPath
 * @return {string}
 */
const toRawFile = (fromPath) => {
  const url = `${BASE_URL}/${fromPath}`
  const content = execSync(`curl -s ${url}`).toString()
  return content
}

(async () => {
  for (const fromPath of Object.keys(pathMap)) {
    /** @type {string} */
    const toPath = resolve('.', pathMap[fromPath])
    const rawFileContent = toRawFile(fromPath)

    if (!rawFileContent) {
      console.error(`Failed to get raw file content. skip ${fromPath}`)
      break
    }

    if (existsSync(toPath)) {
      rmSync(toPath)
    }

    writeFileSync(toPath, rawFileContent)
    execSync(`chmod a+x ${toPath}`)
  }
})();
