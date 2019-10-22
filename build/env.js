export default ({ mode }) => {
    const env = {
        VERSION: process.env.npm_package_version,
        PIWIK_SITE_ID: '1',
        DEBUG_ANALYTICS_EVENTS: '',
        NODE_ENV: mode,
        BACKUP_BACKEND: '',
        AUTOMATIC_BACKUP: '',
        AUTOMATIC_BACKUP_PAYMENT_SUCCESS: '',
        MOCK_BACKUP_BACKEND: '',
        STORE_BACKUP_TIME: 'true',
        BACKUP_BATCH_SIZE: '500',
        BACKUP_START_SCREEN: '',
        BACKUP_TEST_SIZE_ESTIMATION: '',
        AUTH_ENABLED: true,
    }

    if (mode === 'development' && process.env.DEV_AUTH_ENANABLED !== 'true') {
        console.warn(
            `Turning off firebase auth for extension development. See authentication/readme.md for more.`,
        )
        env.AUTH_ENABLED = false
    }

    // Analytics
    if (mode === 'development' && process.env.DEV_ANALYTICS !== 'true') {
        console.warn(
            `Turing off analytics for extension development, set DEV_ANALYTICS=true if you're hacking on analytics`,
        )
        env.PIWIK_HOST = 'http://localhost:1234'
        env.SENTRY_DSN = ''
        env.COUNTLY_HOST = 'http://localhost:1234'
        env.COUNTLY_APP_KEY = ''
    } else if (mode === 'production' || process.env.DEV_ANALYTICS === 'true') {
        if (process.env.DEV_ANALYTICS === 'true') {
            console.warn(
                `Forcing analytics to be enabled, but BE CAREFUL: this will send events to the production analytics backend`,
            )
        }
        env.PIWIK_HOST = 'https://analytics.worldbrain.io'
        env.SENTRY_DSN =
            'https://205014a0f65e4160a29db2935250b47c@sentry.io/305612'
        env.COUNTLY_HOST = 'https://analytics2.worldbrain.io'
        env.COUNTLY_APP_KEY = '47678cda223ca2570cb933959c9037613a751283'
    }

    return env
}
