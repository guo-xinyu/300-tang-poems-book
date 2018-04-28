const exception = {
  notElementNode: '必須爲元素節點。',
  notString: '類名必須爲字符串。'
};
const domUtil = {
  addClass: function(dom, classNamesStr2Add) {
    if (!(dom instanceof HTMLElement)) {
      throw exception.notElementNode;
    }
    if (typeof classNamesStr2Add !== 'string') {
      throw exception.notString;
    }
    let classNamesStr = dom.getAttribute('class').toLocaleLowerCase();
    for (let className of classNamesStr2Add.toLocaleLowerCase().split(/\s+/)) {
      if (!classNamesStr.includes(className)) {
        classNamesStr += ` ${className}`;
      }
    }
    dom.setAttribute('class', classNamesStr.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' '));
    return dom;
  },
  removeClass: function(dom, classNamesStr2Remove) {
    if (!(dom instanceof HTMLElement)) {
      throw exception.notElementNode;
    }
    if (typeof classNamesStr2Remove !== 'string') {
      throw exception.notString;
    }
    let classNamesStr = dom.getAttribute('class');
    for (let className of classNamesStr2Remove.split(/\s+/)) {
      classNamesStr = classNamesStr.replace(new RegExp(className, 'gi'), '');
    }
    dom.setAttribute('class', classNamesStr.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ').toLocaleLowerCase());
    return dom;
  }
};

export { domUtil };
