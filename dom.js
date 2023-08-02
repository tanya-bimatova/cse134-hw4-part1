/* dom.js */

function init() {
  let element = document.getElementById("walkBtn");
  element.addEventListener("click", function () {
    walk();
  });

  element = document.getElementById("modifyBtn");
  element.addEventListener("click", function () {
    modify();
  });

  element = document.getElementById("addBtn");
  element.addEventListener("click", function () {
    add();
  });

  element = document.getElementById("removeBtn");
  element.addEventListener("click", function () {
    remove();
  });

  element = document.getElementById("safeRemoveBtn");
  element.addEventListener("click", function () {
    safeRemove();
  });

  element = document.getElementById("selectorRemoveBtn");
  element.addEventListener("click", function () {
    selectorRemove();
  });

  element = document.getElementById("travBtn");
  element.addEventListener("click", function () {
    traverseDOMTree();
  });

  element = document.getElementById("advModifyBtn");
  element.addEventListener("click", function () {
    advModify();
  });

  element = document.getElementById("cloneBtn");
  element.addEventListener("click", function () {
    basicClone();
  });

  element = document.getElementById("advCloneBtn");
  element.addEventListener("click", function () {
    advClone();
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function advModify() {
  //Changes the text of the h1 to say "DOM Manipulation is Fun!"
  let el = document.querySelector("h1");
  el.firstChild.nodeValue = "DOM Manipulation is Fun!";

  /*Changes the color of the h1 to a random dark color from one of the 5 CSS variables defined 
  in the style tag above*/

  let colorNum = getRandomInt(6) + 1;
  console.log(colorNum);

  let randDarkColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue(`--darkcolor${colorNum}`);

  el.style.color = `${randDarkColor}`;

  el2 = document.querySelector("#p1");

  if (el2.dataset.soCool === "true") {
    el2.classList.remove("shmancy");
    el2.dataset.soCool = "false";
  } else {
    el2.dataset.soCool = "true";
    el2.classList.add("shmancy");
  }
}

function traverseDOMTree() {
  let el = document.querySelector("html");
  traverseNode(el, 0);

  //make the textarea larger
  let textArea = document.getElementById("TravOutputTextarea");
  textArea.rows = 60;
}

function traverseNode(el, lvlNum) {
  //print the node
  printNode(el, lvlNum);

  if (el.nodeName != "STYLE" && el.nodeName != "SCRIPT") {
    //recurse on the node's children
    if (el.childNodes) {
      let numOfChildren = el.childNodes.length;
      for (let i = 0; i < numOfChildren; i++) {
        traverseNode(el.childNodes[i], lvlNum + 1);
      }
    }
  }
}

function printNode(el, lvlNum) {
  if (el.nodeType === 1) {
    putStrInTA(makeStr(el.nodeName, lvlNum));
  }

  if (el.nodeType === 3) {
    let trimmedStr = el.nodeValue.trim();
    if (trimmedStr.length != 0) {
      let str = `#text ${el.nodeValue}`;
      putStrInTA(makeStr(str, lvlNum));
    }
    //
  }
}

function makeStr(str, lvlNum) {
  let resultStr = ``;
  for (let i = 0; i < lvlNum; i++) {
    resultStr += `  |`;
  }
  resultStr += `--${str}`;
  return resultStr;
}

function putStrInTA(str) {
  let textArea = document.getElementById("TravOutputTextarea");

  if (!textArea.firstChild) {
    let txt = document.createTextNode("");
    textArea.appendChild(txt);
  }
  textArea.firstChild.appendData(`${str}\n`);
}

function walk() {
  //make the textarea larger
  let textArea = document.getElementById("WalkOutputTextarea");
  textArea.rows = 25;

  let el;

  //P element
  el = document.getElementById("p1");
  showNode(el);

  //"This is a"
  el = el.firstChild;
  showNode(el);

  //EM element
  el = el.nextSibling;
  showNode(el);

  //"test"
  el = el.lastChild;
  showNode(el);

  //"test"->EM->P->BODY
  //can go up: ->HTML->document
  el = el.parentNode.parentNode.parentNode;
  showNode(el);

  el = el.querySelector("section > *");
  showNode(el);
}

function showNode(el) {
  let nodeType = el.nodeType;
  let nodeName = el.nodeName;
  let nodeValue = el.nodeValue;

  let textArea = document.getElementById("WalkOutputTextarea");

  if (!textArea.firstChild) {
    let txt = document.createTextNode("");
    textArea.appendChild(txt);
  }
  textArea.firstChild.appendData(
    `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`
  );
}

function modify() {
  let el = document.getElementById("p1");

  // You can do all the properties one by one if you know them in HTML
  el.title = "I was changed by JS";

  // you can update the style as a string
  // el.style = 'color: blue; font-size: 1em;';

  // you also may prefer to update on the CSS object.  This is the same as above
  // el.style.color = 'blue';
  // el.style.fontSize = '1em';
  // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

  // you can also update the class list
  el.classList.add("fancy");

  // you can also update the dataset which change data-* attributes
  el.dataset.cool = "true"; // data-cool="true"
  el.dataset.coolFactor = "9000"; //data-cool-factor="9000"
}

function add() {
  let p, em, txt1, txt2, txt3;

  // first we do things the long old-fashioned standard DOM way
  p = document.createElement("p"); // <p></p>
  em = document.createElement("em"); // <em></em>
  txt1 = document.createTextNode("This is a "); // "This is a"
  txt2 = document.createTextNode("test"); // "test"
  txt3 = document.createTextNode(" of the DOM"); // " of the DOM"

  p.appendChild(txt1); // <p>This is a</p>
  em.appendChild(txt2); // <em>test</em>
  p.appendChild(em); // <p>This is a<em>test</em></p>
  p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

  // go an insert this new copy below the old one
  //let oldP = document.getElementById("p1");
  //oldP.parentNode.insertBefore(p, oldP.nextSibling);

  // Alternative method using innerHTML and insertAdjacentHTML
  // let oldP = document.getElementById('p1');
  // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
  // clearly short hands are pretty easy!

  let selectMenu = document.getElementById("elSelect");
  let selectedInd = selectMenu.options.selectedIndex;

  let textArea = document.getElementById("addElTextarea");
  let currentDate = new Date();

  //By default set the text of any added element to say "New Element" or "New Comment" or "New Text Node"
  if (selectedInd === 1) {
    //text node
    let tagContent = "New Text Node " + currentDate.toLocaleString();
    if (textArea.value != "") {
      tagContent = textArea.value;
    }
    addText(tagContent);
  } else if (selectedInd === 2) {
    //comment
    let commentContent = "New Comment " + currentDate.toLocaleString();
    if (textArea.value != "") {
      commentContent = textArea.value;
    }
    addComment(commentContent);
  } else if (selectedInd === 3) {
    //element
    let tagname = "new-element";
    if (textArea.value != "") {
      tagname = textArea.value;
    }
    let tagContent = currentDate.toLocaleString();
    addElement(tagname, tagContent);
  }
}
function addText(tagContent) {
  let ancorTag = document.getElementById("controls");
  ancorTag.insertAdjacentHTML(
    "beforebegin",
    `<output class="wrapper"><p>${tagContent}</p></output>`
  );
}
function addComment(commentContent) {
  let ancorTag = document.getElementById("controls");
  ancorTag.insertAdjacentHTML("beforebegin", `<!--${commentContent}-->`);
}
function addElement(tagname, tagContent) {
  let ancorTag = document.getElementById("controls");
  ancorTag.insertAdjacentHTML(
    "beforebegin",
    `<output class="wrapper"><${tagname}>${tagContent}</${tagname}></output>`
  );
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
  let elToDelete = document.body.lastChild;
  if (elToDelete.id === "controls") {
    //skip the controls
    elToDelete = elToDelete.previousSibling;
  }
  if (elToDelete) {
    document.body.removeChild(elToDelete);
  }
}

function selectorRemove() {
  let textArea = document.getElementById("remTextarea");

  if (textArea.value != "") {
    let elToDelete = document.querySelector(textArea.value);
    while (elToDelete) {
      elToDelete.remove();
      elToDelete = document.querySelector(textArea.value);
    }
  }
}

function basicClone() {
  let elToClone = document.getElementById("p1");
  if (elToClone) {
    let newEl = elToClone.cloneNode(true);
    newEl.id = "";
    let sibling = document.getElementById("controls");
    sibling.parentNode.insertBefore(newEl, sibling);
  }
}

function advClone() {
  let template = document.getElementsByTagName("template")[0];
  if (template) {
    let clon = template.content.cloneNode(true);

    let colorNum = getRandomInt(6) + 1;
    let animalNum = getRandomInt(36) + 1;

    let randDarkColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue(`--darkcolor${colorNum}`);

    let randAnimal = getComputedStyle(
      document.documentElement
    ).getPropertyValue(`--animal${animalNum}`);
    randAnimal = randAnimal.replace(/['"]+/g, "");

    clon.children[0].innerHTML = `Animal of the day is ${randAnimal}!`;
    clon.children[0].style.color = `${randDarkColor}`;

    //insert a random image from unsplash
    clon.children[1].src = `https://source.unsplash.com/random/?${randAnimal}`;
    clon.children[1].height = "200";
    clon.children[1].align = "top";

    //paragraph will have a curr date/time
    let currentDate = new Date();
    clon.children[2].innerHTML =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis " +
      "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu " +
      "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
      "culpa qui officia deserunt mollit anim id est laborum." +
      "This is a paragraph made on " +
      currentDate.toLocaleString() +
      `. To see another pic of ${randAnimal}, just follow the link below:`;

    //ref to wiki for now
    clon.children[3].href = `https://source.unsplash.com/random/?${randAnimal}`;
    clon.children[3].innerHTML = `another cute ${randAnimal}`;

    document.body.appendChild(clon);

    //let sibling = document.getElementById("controls");
    //sibling.parentNode.insertBefore(clon, sibling);
  }
}

window.addEventListener("DOMContentLoaded", init);
