var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://sublink.ng/api/data/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));