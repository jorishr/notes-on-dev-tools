# Import and export modules
Table of contents
- [Import and export modules](#import-and-export-modules)
	- [Modules](#modules)
		- [Browser loading](#browser-loading)
		- [PATH](#path)
		- [CommonJS](#commonjs)
	- [ES6 syntax for import / export](#es6-syntax-for-import--export)
		- [Export](#export)
		- [Import](#import)
	- [Dynamic imports](#dynamic-imports)

## Modules
Modules always 'use strict' by default.

Each module has its own scope. Thus it is expected that when a variable or function is required outside that scope it is exported. The `this` keyword, at top level, does not refer to the window object but has the value of UNDEFINED inside a module.

An exported module is only evaluated ONCE. Exports are generated, and then they are shared between importers, so if something changes in an exported module, all importing modules will see that.
```javascript
//admin.js
export let admin = {
  name: "John"
};
// 1.js
import { admin } from './admin.js';
admin.name = "Pete";

// 2.js
import { admin } from './admin.js';
console.log(admin.name); //-> Pete
```
Because both 1.js and 2.js imported the same object changes made in 1.js are visible in 2.js

### Browser loading
The loading of module type scripts in HTML is always deferred. The behavior is the same with as `defer` attribute: the script doesn't run untill the html is fully loaded. `<script type="module" src="">`.

When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put loading indicators, or otherwise ensure that the visitor won't be confused by that.

### PATH
Certain environments, like NodeJs or bundle tools allow BARE modules, without any path. They have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules.
```javascript
import { sayHi } from 'sayHi'; 
// Error, "bare" module
// the module must have a path, e.g. './sayHi.js'
```
In real-life, browser modules are rarely used in their raw form. Usually, we bundle them together with a special tool such as Webpack and deploy to the production server.

So the resulting bundled script does not contain any import/export statements. It doesn't require `type="module"`, and we can put it into a regular script tag.

### CommonJS
NodeJs uses the COMMON JS implementation model for modules, as originally modules were not supported by native JS. In a NodeJs environment a JS file that has a variable grasping a `require('')` statement will locate the referenced module and IMPORT it's EXPORTED module object: `module.exports`.

The module can export a single function, variable or object. 
```javascript
module.exports = function(){} 

// exports earlier defined fn
exports.<propertyName> = functionOne;	
exports.<name> = functionTwo; 
```
In the main.js file you `require('')` that code and put it into a variable (with the same name). The `require()` immediately executes that code.

## ES6 syntax for import / export 
### Export
Technically, we may have both default and named inline exports in a single module, but in practice people usually don't mix them. A module has either named exports or the default one.

Named exports are explicit. They exactly name what they import, so we have that information from them, that's a good thing.

Named exports enforce us to use exactly the right name to import. But team members may use different names to import the same thing, and that's not good.

Thus when using default export there's a rule that imported variables should correspond to file names:
```javascript
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
```
The `export default` can be only one thing, usually your main class constructor.
```javascript
export default class <name> { constructor(){} };

export function <name> (){}	
export function <name> (){}
```
The standard EXPORT OBJECT at the bottom can still be used with simply `export {}` instead of `module.exports = {}`.
```javascript
const arr1 = [1,2,3];
function f1(arr1){return arr1.map(val => val * 2)};
export { arr1, f1, <fn-name>, <var-name>, ...};
```
### Import
Importing the default object, usually a class is straightforward: `import Class from './path-to-class-module';`
Import multiple functions and variables using the curly braces `{...} from '<path>'`. Example: `import {fnName>, fnName} from './partial.js'`.

Use an ABSOLUTE or RELATIVE path: `/`, `./` or `../`.

If the exported object contains a lot of functions and variables import the entire object using the `*` notation:
```javascript
import * as say from './say.js';
//this give you the variable say with all import functions and variables
say.sayHi('X');
say.sayBye('Y');
```
Be careful with `*`. It seems convienent but unused function will be removed by bundlers (tree-shaking) and it is easier to write explicit names instead having to refer to the imported object (`sayHi` instead of `say.sayHi`).
 	
## Dynamic imports
Export and import statements that we covered in previous chapters are called static. The syntax is very simple and strict. But we cannot use those static imports in a conditional statement, for example.

To import a module conditionally or on-demand use `import()` anywhere in the code.
```javascript
import('modulePath')
  .then(obj => 'module object')
  .catch(err => 'loading error, e.g. if no such module');
//or
let module = await import('modulePath');

//example
export function hi() {
  alert(`Hello`);
}
export function bye() {
  alert(`Bye`);
}
async function load() {
	let {hi, bye} = await import('./say.js');
	hi();
	bye();
}
```