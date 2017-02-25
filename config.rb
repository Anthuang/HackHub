environment = :development
firesass = false
css_dir         = "css"
sass_dir        = "sass"
extensions_dir  = "sass-extensions"
images_dir      = "img"
javascripts_dir = "js"
output_style = (environment == :development) ? :expanded : :compressed
relative_assets = true
sass_options = (environment == :development && firesass == true) ? {:debug_info => true} : {}
