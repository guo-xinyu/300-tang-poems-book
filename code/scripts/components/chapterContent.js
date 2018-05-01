class ChapterContent {
  constructor(sectionTitles) {
    this.sectionTitles = sectionTitles;
    // this.chapterTitle = chapterTitle;
    this.innerHtml = '';
    // `
    // <header>
    //     <h3>${chapterTitle}</h3>
    // </header>`;

    let sectionTitlesInnerHtml = '';
    for (let title of sectionTitles) {
      // let titleDetail = title.split(/\s+/g);
      // let titleHtml = titleDetail[0];
      // for (let titleEle of titleDetail) {
      //   if (titleEle === titleHtml) {
      //     continue;
      //   }
      //   titleHtml += `<sub>${titleEle}</sub>`;
      // }
      const href = window.location.hash.replace(/\/\d+(?=[\/]|$)/g, `/${title.pageNum}`);
      sectionTitlesInnerHtml += `
        <li>
            <a href="${href}">${title.innerHtml}</a>
        </li>`;
    }
    this.innerHtml += `
    <ol>
        ${sectionTitlesInnerHtml}
    </ol>`;
  }
}

export { ChapterContent };
