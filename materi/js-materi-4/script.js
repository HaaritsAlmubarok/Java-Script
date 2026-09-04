console.log('-------------')
console.log('JS DOM INTRO')
console.log('-------------')
console.log(document);
console.log(document.title);
// console.log(document.body);
// console.log(document.body.innerHTML);
// console.log(document.body.innerText);
const pageTitle = document.getElementById('title');
const pageTitleText = pageTitle.innerText;
console.log(pageTitle);
console.log(pageTitleText);
const kicauCat = document.querySelector('.kicau');
console.log(kicauCat);
const kicauCatImgUrl = kicauCat.src;
console.log(kicauCatImgUrl);
kicauCat.style.border = '4px solid red';
const allParagraph = document.querySelectorAll('p');
console.log(allParagraph);
allParagraph[0].style.color = 'blue';
allParagraph[1].style.color = 'green';
const clickMeBtn = document.getElementById('clickMe');
clickMeBtn.addEventListener('click', function() {
    alert("Hello World!");
    kicauCat.style.border = '4px solid blue';
    kicauCat.style.marginLeft = '100px';
})
