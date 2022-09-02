export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
        baseApiUrl: process.env.BASE_API_URL || 'https://api.quwi.com/v2/'
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'quwi-test-task',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [{ charset: 'utf-8' }, {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }, {
            hid: 'description',
            name: 'description',
            content: ''
        }, {
            name: 'format-detection',
            content: 'telephone=no'
        }],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~assets/scss/main'],

    auth: {
        redirect: {
            login: '/login',
            logout: '/login',
            home: '/'
        },
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    maxAge: 40320 * 60
                },
                user: {
                    property: false,
                    autoFetch: true
                },
                endpoints: { // relative to baseUrl
                    login: {
                        url: `${process.env.BASE_API_URL}auth/login`,
                        method: 'post'
                    },
                    logout: {
                        url: `${process.env.BASE_API_URL}auth/logout`,
                        method: 'post'
                    },
                    user: {
                        url: `${process.env.BASE_API_URL}auth/init`,
                        method: 'get'
                    }
                }
            }
        }
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~plugins/repositories', '~plugins/vuelidate', '~plugins/vue-js-modal'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [// https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/auth-next',
        '@nuxtjs/axios'
    ],

    axios: {
        baseUrl: process.env.BASE_API_URL
    },

    router: {
        base: '/quwi-test-task/'
    },

    build: {}
};
