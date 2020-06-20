# Environment Variables in NodeJs
Environment variables should be used to keep senstive data secure in JavaScript applications. The `.env` shouldn't be treated confidentially and not shared on public GitHub repositories when using git.

The use of environment variables is facilitated by the dotenv package: `npm install dotenv --save-dev`.
```
//example .env file:
MY_SECRET=mysupersecretpassword
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3

//inside the app.js import the package and reference the variables
db.connect({
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASS
})
```