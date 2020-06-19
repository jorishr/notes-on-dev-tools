# Generating sprites
Table of contents
- [Generating sprites](#generating-sprites)
  - [Reference](#reference)
  - [SVG Sprite package](#svg-sprite-package)
  - [Using the sprites in HTML](#using-the-sprites-in-html)
  - [Gulp task setup](#gulp-task-setup)

## Reference
- [Inline svg icon sprites](https://www.tomhazledine.com/inline-svg-icon-sprites/)

## SVG Sprite package
The package we need is SVG SPRITE, see docs for full options list. Install: `npm install gulp-svg-sprite --save-dev`.	

Create a svg-sprite tasks in the `gulpfile.js` that generate an svg file: `sprite-xxx.svg`.

In the SVG SPRITE OPTIONS you set MODE to SYMBOL. This will make sure that you can reference the icons by using the # symbol in the HTML without additional css.

## Using the sprites in HTML
In the example below we reference the #star icon.
```HTML
<h2 class="section-title">
        <svg class="section-title__icon">
            <use href="<path>/sprite.symbol.svg#star">
            </use>
        </svg>
        Our Features
</h2>
```
## Gulp task setup
```javascript
const gulpSprite = require('gulp-svg-sprite');

let spriteConfig = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceIDs: false,
        namespaceClassnames: false
    },
    mode: {
        symbol: true,
    }
}

// sprite tasks
function beginClean(){
    return del('./app/src/images/sprite/');
}
function createSprite(){
    return gulp.src('./app/src/images/icons/**/*.svg')
        .pipe(gulpSprite(spriteConfig))
        .pipe(gulp.dest('./app/src/images/sprite/'));
}
```