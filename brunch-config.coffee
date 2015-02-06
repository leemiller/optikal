exports.config =
  # See https://github.com/brunch/brunch/blob/master/docs/config.md for documentation.
  paths:
    public: 'www'
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(vendor|bower_components)/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: []

    stylesheets:
      defaultExtension: 'sass'
      joinTo:
        'stylesheets/app.css': /^(app|vendor|bower_components)/
        'test/stylesheets/test.css': /^test/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'

  conventions:
    assets: /(assets|vendor\/assets|font)/

  # Activate the brunch plugins
  plugins: 
    sass:
      debug: 'comments'
    autoReload:
        enabled:
          css: on
          js: on
          assets: off
        port: [1337,1338,1339]