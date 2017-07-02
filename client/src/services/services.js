import fetch from 'isomorphic-fetch';

const getIndustries = () => {
  return fetch('/industries')
    .then((response) => {
      if(response.status >= 400) {
        Promise.reject();
      }
      return response.json();
    })
    .then((data) => Promise.resolve(data))
}

const getLocations = () => {
  
}

export {
  getIndustries
}
