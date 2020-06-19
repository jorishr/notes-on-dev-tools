//  update path of stylesheet and js files 
async function replacePaths(){
    let options = {
        files: './dist/index.html',
        from: [/href="temp/g, /src="temp/g],    //regExp
        to: ['href="assets', 'src="assets']
    }
    try {
        const results = await replaceInFile(options)
        console.log('Replacement results:', results);
    }
    catch (error) {
       console.error('Error occurred:', error);
    }
};