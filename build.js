({
    baseUrl: "js/",
    mainConfigFile: 'js/main.js',
    out: "b/main.js",
    include: 'main',

    optimize: 'uglify2',

    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: false,
        max_line_length: 1000
    },

    inlineText: true,

    optimizeAllPluginResources: false,

    generateSourceMaps: true,
    preserveLicenseComments: false,
})