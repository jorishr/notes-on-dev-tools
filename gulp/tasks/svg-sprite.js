var config = {
    mode: {
      css: {
        render: {
          css: {
            template: './gulp/templates/sprite.css'
          }
        }
      }
    }
  }

function createSprite(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(plumber())
        .pipe(svgSprite(configSprite))
        .on('error', function(error){
          console.log('error');
        })
        .pipe(gulp.dest('./app/temp/sprite/'))   // outputs sprite file + sprite.css
}

function copySpriteCSS(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules/'))
}
exports.copySpriteCSS = copySpriteCSS;
exports.createSprite = createSprite;