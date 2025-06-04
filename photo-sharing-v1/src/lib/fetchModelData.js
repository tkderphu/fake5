/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
import axios from 'axios'
function fetchModel(url) {
  return axios.get(url)
}

export default fetchModel;
