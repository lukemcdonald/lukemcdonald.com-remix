/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['.*'],
  serverBuildPath: 'build/index.js',
  serverDependenciesToBundle: ['marked', 'use-local-storage-state'],
  serverModuleFormat: 'esm',
}
