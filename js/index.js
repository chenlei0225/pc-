window.addEventListener('DOMContentLoaded',function () {
    var headerLisNodes = document.querySelectorAll('.nav li');
    var headerDownNodes = document.querySelectorAll('.nav li .down');
    var arrowNode = document.querySelector('.arrow');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
    var contentListNode = document.querySelector('.content-list');
    var nowIndex = 0;
    var wheelTimer = null;

    headerBand();
    function headerBand() {
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

    contentBand();
    function contentBand() {
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
            }, 200)

            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }
    }

});
