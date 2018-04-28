import { domUtil } from '../utils/domUtil.js';

function clearAnimationClass(dom) {
  domUtil.removeClass(dom, 'animated zoom-in-down zoom-out-up flip-out-y flip-in-y');
}

const animation = {
  chapterOut(dom) {
    clearAnimationClass(dom);
    domUtil.addClass(dom, 'animated zoom-out-up');
  },
  chapterIn(dom, chapterNum) {
    let classNameStr = dom.getAttribute('class');
    let toRemoveClassName = '';
    for (let colorClassName of classNameStr.match(/border-color-[\d]+/gi)) {
      toRemoveClassName += ` ${colorClassName}`;
    }
    clearAnimationClass(dom);
    domUtil.removeClass(dom, toRemoveClassName);
    domUtil.addClass(dom, `animated zoom-in-down border-color-${chapterNum}`);
  },
  pageOut(dom) {
    clearAnimationClass(dom);
    domUtil.addClass(dom, 'animated flip-out-y');
  },
  pageIn(dom) {
    clearAnimationClass(dom);
    domUtil.addClass(dom, 'animated flip-in-y');
  }
};

export { animation };
