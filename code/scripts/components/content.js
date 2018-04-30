function content(chapters) {
  let olInnerHtml = '';
  for (let chapter of chapters) {
    olInnerHtml += `
    <li>
        <p>
            <a href="#/${chapter.id}">${chapter.title}
                <span class="hover-display">${chapter.preface}</span>
            </a>
        </p>
    </li>`;
  }
  return olInnerHtml;
}

export { content };
