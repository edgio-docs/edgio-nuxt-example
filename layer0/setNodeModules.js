const fs = require('fs')
const { nodeFileTrace } = require('@vercel/nft')

const setNodeModules = async () => {
  // The whole app inside index.js
  const files = ['./node_modules/@nuxt/core/dist/core.js']
  // Compute file trace
  const { fileList } = await nodeFileTrace(files)
  // Store set of packages
  let packages = {}
  fileList.forEach((i) => {
    if (i.includes('node_modules/')) {
      let temp = i.replace('node_modules/', '')
      temp = temp.substring(0, temp.indexOf('/'))
      packages[`node_modules/${temp}`] = true
    } else {
      packages[i] = true
    }
  })
  // Sort the set of packages
  fs.writeFileSync(
    './layer0/getNodeModules.js',
    `module.exports=${JSON.stringify(
      Object.keys(packages)
        .sort()
        .reduce((obj, key) => {
          obj[key] = packages[key]
          return obj
        }, {})
    )}`
  )
}

setNodeModules()
