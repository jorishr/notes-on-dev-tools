# PATH module in NodeJs
You can get the absolute path calculation of a relative path using `path.resolve()`. This resolve method does not check if the path exists. It just calculates a path based on the information you provide.
```javascript
path.resolve('images', 'image.png') 
// will resolve to app/public/images/image.png if run from root folder in app.js 
```
You can join two or more parts of a path by using `path.join()`:
```javascript	
app.use(favicon(path.join(__dirname,'public', 'images', 'favicon.ico')));
// __dirname is the absolute path to the directory containing the source file that is being executed. This example will result in: app/public/images

app.set('views', path.join(__dirname, 'views'));
//	-> app/views
```
The method `path.parse()` will result into an object with the path properties:
```javascript
{
	root: '/',	
	dir: '/users',		
	base: 'test.txt',
	ext: '.txt',
	name: 'test'
}
```