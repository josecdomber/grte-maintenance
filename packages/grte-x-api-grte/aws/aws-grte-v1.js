//export const getCustomer = (id = 0) => {
export async function getCustomer(id = 0) {

  let url;
  if (id) {
    url = `https://4snrh6gg80.execute-api.eu-central-1.amazonaws.com/dev/grte-maintain/single?idclient=${id}`;
  } else {
    url = 'https://4snrh6gg80.execute-api.eu-central-1.amazonaws.com/dev/grte-maintain/all';
  }
  const responseData = await sendHttpRequest('GET', url);
    console.log(responseData);
    return responseData;  
}

export async function getMenuOptions() {

  const url = 'https://4snrh6gg80.execute-api.eu-central-1.amazonaws.com/dev/grte-menuoptions';

  const responseData = await sendHttpRequest('GET', url);
    console.log(responseData);
    return responseData;  
}

/**
 * Generic function to wrap in a promise the http request 
 * @param {String} method 
 * @param {String} url 
 * @returns 
 */
function sendHttpRequest(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';
    xhr.onload = function () {
      resolve(xhr.response);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  });
  
  return promise;

}