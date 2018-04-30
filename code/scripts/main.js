import { animation } from './components/animation.js';
import { getResource } from './components/requestResource.js';
import { Chapter } from './components/chapter.js';
import { BookContentAction } from './actions/bookContentAction.js';
import { content } from './components/content.js';

async function getMainBody(uri, route) {
  const poetMapResponse = await getPoetMapUrl(uri);
  let [url, index] = generateGetPoemUrl(route[1], poetMapResponse);
  const mainBodyHtml = await getResource(url);
  // const index = poetMapResponse.findIndex(ele => ele.name === route[1]);
  return { mainBodyHtml, index };
}

// function getNumberOfList(hash) {
//   let poetsContentDoms = document.getElementById('js-300-tang-poem-poets').getElementsByTagName('li');
//   for (let [index, poetsContentDom] of Array.from(poetsContentDoms).entries()) {
//     let aDoms = poetsContentDom.getElementsByTagName('a');
//     for (let aDom of aDoms) {
//       if (aDom.getAttribute('href') === location.hash) {
//         return (index % 10) + 1;
//       }
//     }
//   }
// }

function getPoetMapUrl(uri) {
  let mapUrl = getBaseUrl(uri);
  return getResource(mapUrl + '/main-body/map/poetMap.json');
}

function getBaseUrl(uri) {
  return uri.match(/[^#]+\/(?=([^\/]*#?.*$))/)[0];
}

function generateGetPoemUrl(key, map) {
  // let poetKeys = window.location.hash.match(/[\w]+/);
  for (let [index, element] of map.entries()) {
    if (element.name !== key) {
      continue;
    }
    let baseUrl = getBaseUrl(document.baseURI);
    // let mapValue = map[poetKey];
    let url = `${baseUrl}/main-body/${element.route}/${element.route}.html`;
    return [url, index];
  }
}

function changeMainBodyView(event, route) {
  return getMainBody(document.baseURI, route).then(result => {
    const mainBodyHtml = result.mainBodyHtml;
    const index = result.index;
    let oldObjectNode = document.getElementById('js-main-body');
    if (oldObjectNode) {
      let bodyDoms = mainBodyHtml.documentElement.getElementsByTagName('body');
      for (let bodyDom of bodyDoms) {
        this.currentChapter = new Chapter(route[1], bodyDom.innerHTML, event.target);
        oldObjectNode.innerHTML = this.currentChapter.pages[this.currentChapter.currentPageNum - 1].innerHtml;
        document.getElementById('js-chapter-content').innerHTML = this.currentChapter.chapterContent.innerHtml;
        break;
      }
    }
    // let poetNumber = getNumberOfList(window.location.hash);
    animation.chapterIn(event.target, (index % 10) + 1);
  });
}

function changeChapterView(mainBodyDom, route) {
  let animationedHandeler = animationedEvent => {
    animationedEvent.target.removeEventListener('animationend', animationedHandeler);
    changeMainBodyView.call(this, animationedEvent, route).then(() => {
      if (route[2] !== '1') {
        changePageView.call(this, mainBodyDom, route);
      }
    });
  };
  mainBodyDom.addEventListener('animationend', animationedHandeler);
  animation.chapterOut(mainBodyDom);
}

function changePageView(mainBodyDom, route) {
  let handler = hevent => {
    hevent.target.innerHTML = this.currentChapter.changePage(route[2]).innerHtml;
    // hevent.target.innerHTML = this.currentChapter.pages[this.currentChapter.currentPageNum - 1].innerHtml;
    animation.pageIn(hevent.target);
    hevent.target.removeEventListener('animationend', handler);
  };
  mainBodyDom.addEventListener('animationend', handler);
  animation.pageOut(mainBodyDom);
}

class Router {
  constructor() {
    let refresh = event => {
      this.currentUrl = location.hash.slice(1) || '/';
      if (this.currentUrl === '/') {
        return;
      }
      let mainBodyDom = document.getElementById('js-main-body');
      const route = window.location.hash.split('/');
      if (route.length === 2) {
        window.location.hash += '/1';
        return;
      }
      const oldHash = event.oldURL.match(/#.*$/)[0];

      if (!oldHash.split('/')[2]) {
        changeChapterView.call(this, mainBodyDom, route);
      } else {
        changePageView.call(this, mainBodyDom, route);
      }
      // if (route.length === 2) {
      //   event.target.removeEventListener('hashchange', refresh);
      //   window.location.hash += '/1';

      //   let animationedHandeler = animationedEvent => {
      //     changeMainBodyView.call(this,
      //       animationedEvent, route);
      //     window.addEventListener('hashchange', refresh);
      //     animationedEvent.target.removeEventListener('animationend', animationedHandeler);
      //   };
      //   mainBodyDom.addEventListener('animationend', animationedHandeler);
      //   animation.chapterOut(mainBodyDom);
      // } else {
      //   let handler = hevent => {
      //     hevent.target.innerHTML = this.currentChapter.changePage(route[2]).innerHtml;
      //     // hevent.target.innerHTML = this.currentChapter.pages[this.currentChapter.currentPageNum - 1].innerHtml;
      //     animation.pageIn(hevent.target);
      //     hevent.target.removeEventListener('animationend', handler);
      //   };
      //   mainBodyDom.addEventListener('animationend', handler);
      //   animation.pageOut(mainBodyDom);

      //   // document.
      // }

    };

    window.addEventListener('hashchange', refresh);
    this.routes = {};
    this.currentUrl = '';
    this.currentChapter = {};
  }
  // refresh(event) {
  //   this.currentUrl = location.hash.slice(1) || '/';
  //   if (this.currentUrl === '/') {
  //     return;
  //   }
  //   let mainBodyDom = document.getElementById('js-main-body');
  //   const route = window.location.hash.split('/');
  //   if (route.length === 2) {
  //     let animationedHandeler = animationedEvent => {
  //       changeMainBodyView.call(this,
  //         animationedEvent, route);
  //       animationedEvent.target.removeEventListener('animationend', animationedHandeler);
  //     };
  //     mainBodyDom.addEventListener('animationend', animationedHandeler);
  //     animation.chapterOut(mainBodyDom);
  //   } else {
  //     let handler = hevent => {
  //       hevent.target.innerHTML = this.currentChapter.changePage(route[2]).innerHtml;
  //       // hevent.target.innerHTML = router.currentChapter.pages[router.currentChapter.currentPageNum - 1].innerHtml;
  //       animation.pageIn(hevent.target);
  //       hevent.target.removeEventListener('animationend', handler);
  //     };
  //     mainBodyDom.addEventListener('animationend', handler);
  //     animation.pageOut(mainBodyDom);

  //     // document.
  //   }

  // }
  // route(path, callback) {
  //   // var result_HandlerResult = callback || function() {};
  //   this.routes[path] = callback;
  // }
}

(function() {
  const bookContentAction = new BookContentAction(getBaseUrl(document.baseURI));
  bookContentAction.getContentByParentId('tangshi300').then(chapters => {
    document.getElementById('js-300-tang-poem-poets').innerHTML = content(chapters);
  });

  window.router = new Router();

  function addClickEventHandlers() {
    document.getElementById('js-main-body').addEventListener('click', event => {
      const route = window.location.hash.split('/').map((value, index) => index === 2 ? Number(value) + 1 : value);
      let newHash = '';
      for (let value of route) {
        newHash += `${value}/`;
      }
      window.location.hash = newHash.slice(0, newHash.length - 1);

      // let handler = hevent => {
      //   hevent.target.innerHTML = router.currentChapter.changePage(router.currentChapter.currentPageNum + 1).innerHtml;
      //   // hevent.target.innerHTML = router.currentChapter.pages[router.currentChapter.currentPageNum - 1].innerHtml;
      //   animation.pageIn(hevent.target);
      //   hevent.target.removeEventListener('animationend', handler);
      // };
      // event.currentTarget.addEventListener('animationend', handler);
      // animation.pageOut(event.currentTarget);

      // document.
    });
  }

  // router.route('/wangchangling', function() {
  //   let url = 'file:///D:/project/my-website/300-tang-poems-book/code/main-body/wang-changling/wang-changling-1.html';
  //   xhr(url);
  // });
  // router.route('/libai', function() {
  // let url = 'file:///D:/project/my-website/300-tang-poems-book/code/main-body/li-bai/li-bai-1.html';
  // xhr(url);
  // });
  // addAnimationEventHandlers();
  addClickEventHandlers();
  // router.route("/green", function () {
  //     var str = "<h1>这是绿色的页面</h1>";
  //     document.getElementById("myCtrl").innerHTML = str;
  // });
  // router.route("/black", function () {
  //     var str = "<h1>这是黑色的页面</h1>";
  //     document.getElementById("myCtrl").innerHTML = str;
  // });
  // router.refresh();
  const currentHash = window.location.hash;
  window.location.hash = '';
  window.location.hash = currentHash;
})();
