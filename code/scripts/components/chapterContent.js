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
    for (let [index, title] of sectionTitles.entries()) {
      // let titleDetail = title.split(/\s+/g);
      // let titleHtml = titleDetail[0];
      // for (let titleEle of titleDetail) {
      //   if (titleEle === titleHtml) {
      //     continue;
      //   }
      //   titleHtml += `<sub>${titleEle}</sub>`;
      // }
      sectionTitlesInnerHtml += `
        <li>
            <a href="${window.location.hash}/${index + 1}">${title}</a>
        </li>`;
    }
    this.innerHtml += `
    <ol>
        ${sectionTitlesInnerHtml}
    </ol>`;
  }
}

export { ChapterContent };
