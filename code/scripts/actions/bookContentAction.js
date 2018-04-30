import { getResource } from '../components/requestResource.js';

// function getBaseUrl() {
//   return document.baseURI.match(/[^#]+(?=\/#.*$)/)[0];
// }

class BookContentAction {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async getContentByParentId(parentId) {
    const contents = await getResource(`${this.baseUrl}/virtual-data-base/BOOK_CONTENT.json`);
    return contents.filter(ele => ele.parentId === parentId);
  }
}

export { BookContentAction };
