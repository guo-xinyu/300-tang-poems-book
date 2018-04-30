import { Page } from './page.js';
import { ChapterContent } from './chapterContent.js';

function assembleSection(sections) {
  let sectionInnerHtml = '';
  for (let section of sections) {
    let pInnerHtml = '';
    for (let paragraph of section.content) {
      pInnerHtml += `<p>${paragraph}</p>`;
    }
    sectionInnerHtml += `
    <section id="js-poem-${section.id}">
        <header>
            <h3>${section.title}</h3>
        </header>
        ${pInnerHtml}
    </section>`;
  }
  return sectionInnerHtml;
}

function splitPages(chapterKey, sections, mainBodyDom) {
  mainBodyDom.innerHTML = assembleSection(sections);
  // let mainBodyDom = document.getElementById('js-main-body');
  let innerHtml = '';
  let pages = [];
  for (let mainBodyChildNode of mainBodyDom.childNodes) {
    if (!(mainBodyChildNode instanceof HTMLElement)) {
      continue;
    }
    if (mainBodyChildNode.offsetTop + mainBodyChildNode.offsetHeight <=
      mainBodyDom.offsetHeight * 0.9 * (pages.length + 1)) {
      innerHtml += mainBodyChildNode.outerHTML;
    } else {
      pages.push(new Page(chapterKey, innerHtml));
      innerHtml = mainBodyChildNode.outerHTML;
    }
  }

  let sectionTitles = [];
  for (let header of mainBodyDom.getElementsByTagName('h3')) {
    sectionTitles.push(header.innerText);
  }
  pages.push(new Page(chapterKey, innerHtml));
  mainBodyDom.innerHTML = '';
  // pages.push(new Page(chapterKey, chapterInnerHtml));
  let chapterContent = new ChapterContent(sectionTitles);
  return { pages, chapterContent };
}

class Chapter {
  constructor(chapterKey, sections, mainBodyDom) {
    this.chapterKey = chapterKey;
    // this.totalPageNum = 1;
    let { pages, chapterContent } = splitPages(chapterKey, sections, mainBodyDom);
    this.pages = pages;
    this.chapterContent = chapterContent;
    this.titles =
      this.currentPageNum = 1;
  }

  changePage(num) {
    this.currentPageNum = num;
    return this.pages[num - 1];
  }
}

export { Chapter };
