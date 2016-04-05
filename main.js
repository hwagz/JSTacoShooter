$(document).ready(function(){
  var shooter = ".shooter";
  var shooterW = $(shooter).width();
  var shooterH = $(shooter).height();
  var windowW = $(window).width();
  var windowH = $(window).height();
  var moveDist = 50;
  var speed = 70;
  var direction = "right";
  var tacoCount = 0;
  var colors = ["black","white","red","pink","brown","darkblue","chartreuse","darkorange","fuchsia"];

  //actually moves taco
  moveTacoBlock = function(tagDivID){
    var dir = "+";
    direction=="left"? dir="-": dir="+";
    for (i=0;i<windowW-moveDist*i;i++){
      $(tagDivID).animate({left:dir+"="+moveDist+"px"},speed);
    }
  }

  //appends and moves taco
  makeAndShootTaco = function(){
    var currentBlocky = $(shooter).offset().top;
  	var currentBlockx = $(shooter).offset().left;
    var divID = "tacoBlock"+tacoCount;
    var tagDivID = "#"+divID;
    var appendedDiv = "<div class='tacoBlock' id='"+divID+"'></div>";
    $("body").append(appendedDiv);
    var xpos = (currentBlockx)+"px";
    var ypos = (currentBlocky+40)+"px";
    $(tagDivID).css({
      position: 'absolute',
      left: xpos,
      top: ypos
    });
    setTimeout(function(){
      $(tagDivID).remove();
    },2500);
    moveTacoBlock(tagDivID);
    tacoCount++;
  }

  // randomly changes the color and shoots taco on click
  $(shooter).click(function() {
    var color = colors[Math.floor(Math.random()*colors.length)];
    $(shooter).css('background-color',color);
    makeAndShootTaco();
  });

  //variable to determine movement and taco direction
  var previousx = 0;
  // tracks the primary shooter block to mouse movement
  $(document).on('mousemove', function(e){
    var x = e.pageX-(shooterW/2);
    var y = e.pageY-(shooterH/2);
    if (previousx<x){
      direction="right";
    }
    else if (previousx>x) {
      direction = "left";
    }
    $(shooter).css({left: x});
    $(shooter).css({top: y});
    previousx = x;
  });

})
