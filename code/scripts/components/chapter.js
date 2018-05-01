import { Page } from './page.js';
import { ChapterContent } from './chapterContent.js';

function assembleSection(sections) {
  let sectionInnerHtml = '';
  for (let section of sections) {
    let pInnerHtml = '';
    for (let paragraph of section.content) {
      pInnerHtml += `<p>${paragraph}</p>`;
    }
    let titleEles = section.title.split(/\s+/g);
    let parsedTitle = '';
    for (let [index, titleEle] of titleEles.entries()) {
      if (index === 0) {
        parsedTitle += titleEle;
        continue;
      }
      parsedTitle += `<sub>${titleEle}</sub>`;
    }
    sectionInnerHtml += `
    <section id="js-poem-${section.id}">
        <header>
            <h3>${parsedTitle}</h3>
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
  let contentHeight = 0;
  let sectionTitles = [];
  for (let mainBodyChildNode of mainBodyDom.childNodes) {
    if (!(mainBodyChildNode instanceof HTMLElement)) {
      continue;
    }
    if (contentHeight + mainBodyChildNode.offsetHeight <=
      mainBodyDom.offsetHeight * 0.9) {
      contentHeight += mainBodyChildNode.offsetHeight;
      innerHtml += mainBodyChildNode.outerHTML;
    } else {
      pages.push(new Page(chapterKey, innerHtml));
      innerHtml = mainBodyChildNode.outerHTML;
      contentHeight = mainBodyChildNode.offsetHeight;
    }
    sectionTitles.push({
      pageNum: pages.length + 1,
      innerHtml: mainBodyChildNode.getElementsByTagName('h3')[0].innerHTML
    });
  }

  // for (let header of mainBodyDom.getElementsByTagName('h3')) {
  //   .push(header.innerHTML);
  // }
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
