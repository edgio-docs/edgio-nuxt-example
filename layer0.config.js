const { isProductionBuild } = require('@layer0/core/environment')

// This file was automatically added by layer0 init.
// You should commit this file to source control.
// Learn more about this file at https://docs.layer0.co/guides/layer0_config
const config = {
  routes: './layer0/routes.js',
  connector: '@layer0/nuxt',
  backends: {
    // Define a domain or IP address to proxy as a backend
    // More on: https://docs.layer0.co/guides/layer0_config#backends
    api: {
      domainOrIp: 'layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link',
      hostHeader: 'layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link',
      // Disable backend SSL certificate security check, read more on:
      // https://docs.layer0.co/guides/layer0_config#:~:text=browser%20is%20used.-,disableCheckCert,-Boolean
      disableCheckCert: true,
    },
    // More on: https://docs.layer0.co/guides/image_optimization
    image: {
      domainOrIp: 'opt.moovweb.net',
      hostHeader: 'opt.moovweb.net',
      disableCheckCert: true,
    },
  },
}

if (isProductionBuild()) {
  const includeFiles = require('./layer0/getNodeModules')
  // All dependencies inside @nuxt/core
  config['includeFiles'] = includeFiles
}

module.exports = config
