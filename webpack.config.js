var Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .copyFiles({
        from: './src/static/',
        to: './static/'
    })
    .setOutputPath('static/')
    .setPublicPath('/')
    .setManifestKeyPrefix('/')

.addEntry('main', './src/main.js')

.splitEntryChunks()
    .enableSingleRuntimeChunk()
    // .cleanupOutputBeforeBuild(Encore.isProduction())
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning()

.configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
})

.enableSassLoader();

module.exports = Encore.getWebpackConfig();