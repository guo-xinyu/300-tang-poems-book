function xhr(operation, url, data) {
  const operReg = /(GET|POST)/;
  if (!operReg.test(operation)) {
    const err = `不支持${operation}請求，目前所支持的請求包括${operReg}`;
    throw err;
  }
  return new Promise(resolve => {
    let xmlhttp = new XMLHttpRequest();

    const fileType = url.match(/\.[a-z]+(?=(\s*$))/i)[0];
    switch (fileType) {
      case '.json':
        xmlhttp.responseType = 'json';
        break;
      case '.html':
        xmlhttp.responseType = 'document';
        break;
      default:
        break;
    }

    xmlhttp.onreadystatechange = (() => {
      if (xmlhttp.readyState !== XMLHttpRequest.DONE || xmlhttp.status !== 200) {
        return;
      }
      resolve(xmlhttp.response);
    });

    xmlhttp.open(operation, url, true);
    xmlhttp.send(data);
  });
}

export { xhr };
