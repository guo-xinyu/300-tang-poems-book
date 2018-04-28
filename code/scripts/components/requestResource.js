import { xhr } from '../utils/httpRequestUtil.js';

const getOperName = 'GET';

function getResource(url) {
  return xhr(getOperName, url);
}

export { getResource };
