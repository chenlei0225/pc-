window.addEventListener('DOMContentLoaded', function () {
  var headerLisNodes = document.querySelectorAll('.nav li');
  var headerDownNodes = document.querySelectorAll('.nav li .down');
  var arrowNode = document.querySelector('.arrow');
  var contentNode = document.querySelector('.content');
  var contentHeight = contentNode.offsetHeight;
  var contentListNode = document.querySelector('.content-list');
  var circleLiNodes = document.querySelectorAll('.circle-point li');
  var homeNode = document.querySelector('.home');
  var homeListNode = document.querySelector('.home-list');
  var homeListLis = document.querySelectorAll('.home-list li');
  var circleNode = document.querySelector('.circle-list');
  var contentCircleLiNodes = document.querySelectorAll('.circle-list li');
  var music = document.querySelector('.music');
  var audio = document.querySelector('.audio');
  var musicIcon = document.querySelector('.music img');
  var planeNodes = document.querySelectorAll('.plane');
  var pencilNodes = document.querySelectorAll('.pencil');
  var aboutPhotoNodes=document.querySelectorAll('.about-photo');
  var teamH2Node = document.querySelector('.team h2');
  var teamP = document.querySelector('.team p');

  var nowIndex = 0;
  var lastIndex = 0;

  headerHandle();
  function headerHandle() {
    arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
    headerDownNodes[0].style.width = '100%';
    for (var i = 0; i < headerLisNodes.length; i++) {
      headerLisNodes[i].index = i;
      headerLisNodes[i].onclick = function () {
        nowIndex = this.index;
        move(nowIndex);
      }
    }
  }

  //侧滑导航
  for (var i = 0; i < contentCircleLiNodes.length; i++) {
    contentCircleLiNodes[i].index=i;
    contentCircleLiNodes[i].onclick=function () {
      nowIndex=this.index;
      move(nowIndex);
      lastIndex=nowIndex;
    }
  }

  function move(nowIndex) {

    arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
    headerDownNodes[lastIndex].style.width = '0';
    headerDownNodes[nowIndex].style.width = '100%';
    contentCircleLiNodes[lastIndex].className = '';
    contentCircleLiNodes[nowIndex].className = 'active';
    contentListNode.style.top = -contentHeight * nowIndex + 'px';
    arr[nowIndex].anIn();
    arr[lastIndex].anOut();
    lastIndex=nowIndex;
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
      }, 200);

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
      circleLiNodes[i].onclick = function () {
        clearInterval(timer);
        nowIndex = this.index;
        if (nowIndex == lastIndex) return;
        var nowTime = Date.now();
        if (nowTime - lastTime < 1000) return;
        for (var j = 0; j < homeListLis.length; j++) {
          homeListLis[j].className = 'commont-title';
        }
        if (nowIndex < lastIndex) {
          homeListLis[lastIndex].className = 'commont-title right-hide';
          homeListLis[nowIndex].className = 'commont-title left-show';
        } else if (nowIndex > lastIndex) {
          homeListLis[lastIndex].className = 'commont-title left-hide';
          homeListLis[nowIndex].className = 'commont-title right-show';
        }
        for (var j = 0; j < circleLiNodes.length; j++) {
          circleLiNodes[j].className = '';
        }

        this.className = 'active';
        lastIndex = nowIndex;
        lastTime = nowTime;
      }

    }

    auto();
    function auto() {
      timer = setInterval(function () {
        nowIndex++;
        if (nowIndex >= 4) {
          nowIndex = 0;
        }
        homeListLis[lastIndex].className = 'commont-title left-hide';
        homeListLis[nowIndex].className = 'commont-title right-show';
        circleLiNodes[lastIndex].className = '';
        circleLiNodes[nowIndex].className = 'active';
        lastIndex = nowIndex;
      }, 1500);
    }

    homeListNode.onmouseenter = function () {
      clearInterval(timer)
    }
    homeListNode.onmouseleave = function () {
      auto();
    }

  }


  //第五屏
  teamHandle();
  function teamHandle() {
    var teamList = document.querySelector('.team-list');
    var teamLiNodes = document.querySelectorAll('.team-list li');
    var width = teamLiNodes[0].offsetWidth;
    var height = teamLiNodes[0].offsetHeight;
    var canvas = null;
    var createBubble = null;
    var paintingBubble = null;

    //创建小球构造函数
    function Ball(context) {
      this.c_r = Math.round(Math.random() * 8 + 2);
      this.x = Math.random() * width;
      this.y = height + this.c_r;
      this.red = parseInt(Math.random() * 255);
      this.green = parseInt(Math.random() * 255);
      this.blue = parseInt(Math.random() * 255);
      // this.globalAlpha = 1;
      //定义小球的方法
      this.paint = function () {
        // context.globalAlpha=this.globalAlpha;
        context.fillStyle = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
        context.beginPath();
        context.arc(this.x, this.y, this.c_r, 0, Math.PI * 2, true);
        context.fill();
      }
      //定义小球的动画方法
      this.deg = 0;
      this.rad = 0;
      this.s = 5;
      this.animate = function () {
        this.deg += 5;
        this.rad = this.deg * Math.PI / 180;
        this.x = this.x + Math.sin(this.rad) * this.s;
        this.y = this.y - this.rad * this.s * 0.3;
        if (this.y <= -this.c_r) {
          return;
        }
      }
    }


    function ballHandle(context) {
      //定义数组，将小球全部放入
      var balls = [];
      setInterval(function () {
        var ball = new Ball(context);
        balls.push(ball);
      }, 20);

      //设置动画，小球移动
      setInterval(function () {
        context.clearRect(0, 0, width, height);
        //遍历数组中的小球
        for (var i = 0; i < balls.length; i++) {
          balls[i].paint();
          balls[i].animate();
        }
      }, 1000 / 60);
    }


    for (var i = 0; i < teamLiNodes.length; i++) {
      teamLiNodes[i].index = i;
      teamLiNodes[i].onmouseenter = function () {

        for (var j = 0; j < teamLiNodes.length; j++) {
          teamLiNodes[j].style.opacity = 0.5;
        }
        if (!canvas) {
          canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          ballHandle(context);
          canvas.className = 'canvas';
          teamList.appendChild(canvas);
        }
        canvas.style.left = this.index * width + 'px';
        this.style.opacity = 1;

      }

    }

    teamList.onmouseleave = function () {
      for (var j = 0; j < teamLiNodes.length; j++) {
        teamLiNodes[j].style.opacity = 1;
      }
      canvas.remove();
      canvas = null;
      clearInterval(createBubble);
      clearInterval(paintingBubble);
    }

  }

  //音频
  music.onclick=function () {
    if(audio.paused){
      audio.play();
      musicIcon.src='img/musicon.gif';
    }else {
      audio.pause();
      musicIcon.src='img/musicoff.gif';
    }
  }

  //出入场动画

    var arr = [
      {
       anOut:function () {
         homeNode.style.transform='translateY(-200px)';
         homeNode.style.opacity=0.5;
       },
       anIn:function () {
         homeNode.style.transform='translateY(0px)';
         homeNode.style.opacity=1;
       }
      },
      {
        anOut:function () {
          planeNodes[0].style.transform='translate(-100px,-100px)';
          planeNodes[1].style.transform='translate(-100px,100px)';
          planeNodes[2].style.transform='translate(100px,-100px)';
        },
        anIn:function () {
          planeNodes[0].style.transform='translate(0,0)';
          planeNodes[1].style.transform='translate(0,0)';
          planeNodes[2].style.transform='translate(0,0)';
        }
      },
      {
        anOut:function () {
          pencilNodes[0].style.transform='translateY(-100px)';
          pencilNodes[1].style.transform='translateY(100px)';
          pencilNodes[2].style.transform='translateY(100px)';
        },
        anIn:function () {
          pencilNodes[0].style.transform='translateY(0px)';
          pencilNodes[1].style.transform='translateY(0px)';
          pencilNodes[2].style.transform='translateY(0px)';
        }
      },
      {
        anOut:function () {
          aboutPhotoNodes[0].style.transform='rotate(30deg)';
          aboutPhotoNodes[1].style.transform='rotate(-30deg)';
        },
        anIn:function () {
          aboutPhotoNodes[0].style.transform='rotate(0deg)';
          aboutPhotoNodes[1].style.transform='rotate(0deg)';
        }
      },
      {
        anOut:function () {
          teamH2Node.style.transform='translateX(-100px)';
          teamP.style.transform='translateX(100px)';
        },
        anIn:function () {
          teamH2Node.style.transform='translateX(0px)';
          teamP.style.transform='translateX(0px)';
        }
      }
    ];

    for (var i = 0; i < arr.length; i++) {
      arr[i].anOut();
    }
    arr[0].anIn();

});
