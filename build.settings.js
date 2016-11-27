var build = {
    entry: 'app/ts/**/*.ts',
    output: 'dist/',
    buildDir: 'build/scripts',
    externalLibs: [
        'app/3rdscripts/jquery/jquery-1.8.3.js',
        'app/3rdscripts/jquery/jquery-ui-1.11.4/jquery-ui.js',
        'app/3rdscripts/threeJS/three.js'
    ],
    sourceMapsPath: 'maps'
};

module.exports = build;
