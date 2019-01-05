window.addEventListener('DOMContentLoaded',function () {
    var headerLisNodes = document.querySelectorAll('.nav li');
    var headerDownNodes = document.querySelectorAll('.nav li .down');
    var arrowNode = document.querySelector('.arrow');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
    var contentListNode = document.querySelector('.content-list');
    var circleLiNodes = document.querySelectorAll('.circle-point li');
    var homeListNode = document.querySelector('.home-list');
    var homeListLis = document.querySelectorAll('.home-list li');
    var nowIndex = 0;


    headerHandle();
    function headerHandle() {
        arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left+headerLisNodes[0].offsetWidth/2-arrowNode.offsetWidth/2+'px';
        headerDownNodes[0].style.width='100%';
        for (var i = 0; i < headerLisNodes.length; i++) {
            headerLisNodes[i].index=i;
            headerLisNodes[i].onclick=function () {
            nowIndex=this.index;
            move(nowIndex);
            }
        }
    }

    function move(nowIndex) {

        arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left+headerLisNodes[nowIndex].offsetWidth/2-arrowNode.offsetWidth/2+'px';
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width='0';
        }
        headerDownNodes[nowIndex].style.width='100%';
        contentListNode.style.top = -contentHeight*nowIndex+'px';

    }

    contentHandle();
    function contentHandle() {
        var wheelTimer = null;
        //兼容ie/chrome
        document.onmousewheel = wheel;
        //兼容firefox
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', wheel);
        }

        function wheel(event) {
            event = event || window.event;
            //清除延时器
            //清除上一个延时器
            clearTimeout(wheelTimer);
            //设置延时器
            wheelTimer = setTimeout(function () {
                var flag = '';
                if (event.wheelDelta) {
                    //ie/chrome
                    if (event.wheelDelta > 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                } else if (event.detail) {
                    //firefox
                    if (event.detail < 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                }
                switch (flag) {
                    case 'up' :
                        /*
                         向上移动ul
                         小箭头位置
                         upNode宽度
                         */
                        if (nowIndex > 0) {
                            nowIndex--;
                            move(nowIndex);
                        }
                        break;
                    case 'down' :
                        if (nowIndex < headerLisNodes.length - 1) {
                            nowIndex++;
                            move(nowIndex);
                        }
                        break;
                }
                console.log(nowIndex)
            },200);

            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }

        //用户缩放浏览器
        window.onresize = function () {
            //更新小箭头的位置
            arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2
                - arrowNode.offsetWidth / 2 + 'px';
            //更新ul的位置
            contentListNode.style.top = -nowIndex * contentNode.offsetHeight + 'px';
        }

    }


    //第一屏
    homeHandle();
    function homeHandle() {
        var timer = null;
        var lastIndex = 0;
        var nowIndex = 0;
        var lastTime = 0;
        for (var i = 0; i < circleLiNodes.length; i++) {
            circleLiNodes[i].index = i;
            circleLiNodes[i].onclick=function () {
                clearInterval(timer);
                nowIndex=this.index;
                if(nowIndex==lastIndex) return;
                var nowTime=Date.now();
                if(nowTime-lastTime<1000) return;
                for (var j = 0; j < homeListLis.length; j++) {
                    homeListLis[j].className='commont-title';
                }
                if(nowIndex<lastIndex){
                    homeListLis[lastIndex].className='commont-title right-hide';
                    homeListLis[nowIndex].className='commont-title left-show';
                }else if(nowIndex>lastIndex){
                    homeListLis[lastIndex].className='commont-title left-hide';
                    homeListLis[nowIndex].className='commont-title right-show';
                }
                circleLiNodes[lastIndex].className = '';
                this.className = 'active';
                lastIndex=nowIndex;
                lastTime=nowTime;
            }

        }

        auto();
        function auto() {
            timer = setInterval(function () {
                nowIndex++;
                if(nowIndex>=4){
                    nowIndex = 0;
                }
                homeListLis[lastIndex].className='commont-title left-hide';
                homeListLis[nowIndex].className='commont-title right-show';
                circleLiNodes[lastIndex].className = '';
                circleLiNodes[nowIndex].className = 'active';
                lastIndex=nowIndex;
            },1500);
        }

        homeListNode.onmouseenter=function () {
            clearInterval(timer)
        }
        homeListNode.onmouseleave=function () {
            auto();
        }



    }
});
