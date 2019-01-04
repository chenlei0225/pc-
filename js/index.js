window.addEventListener('DOMContentLoaded',function () {
   var headerLisNodes = document.querySelectorAll('.nav li');
   var headerDownNodes = document.querySelectorAll('.nav li .down');
   var arrowNode = document.querySelector('.arrow');

   arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left+headerLisNodes[0].offsetWidth/2-arrowNode.offsetWidth/2+'px';
    headerDownNodes[0].style.width='100%';

    for (var i = 0; i < headerLisNodes.length; i++) {
        headerLisNodes[i].index=i;
        headerLisNodes[i].onclick=function () {
            arrowNode.style.left = this.getBoundingClientRect().left+this.offsetWidth/2-arrowNode.offsetWidth/2+'px';
            for (var j = 0; j < headerDownNodes.length; j++) {
                headerDownNodes[j].style.width='0';
            }
            headerDownNodes[this.index].style.width='100%';
        }
    }



});
