module.exports = {
  "**/*.{tsx,ts,jsx,js,json,css,scss,yml,yaml,md}": [
    "prettier --write",
    "cspell lint --gitignore --cache",
  ],
  "**/*.ts": ["eslint --cache --fix"],
}
