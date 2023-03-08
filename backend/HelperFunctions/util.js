// Function to validate URL - To ensure that any URL passed follows HTTP protocol 

//Function to validate URL using regex 
function validateUrl(value){

    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i');

      return urlPattern.test(value);

}

//Function to validate valid HTTP URL using URL Constructor
function isValidUrl(string){
    try{
        const newUrl = new URL(string);
        return newUrl.protocol === 'http' || newUrl.protocol === 'https';
    }catch(err){
        return false;
    }
}

module.exports = {validateUrl, isValidUrl};