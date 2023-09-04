/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  devServerPort: 8002,
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  ignoredRouteFiles: ['.*'],
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  serverDependenciesToBundle: ['use-local-storage-state'],
}
