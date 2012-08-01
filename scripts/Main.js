var time = 0;
var key = {};
var enemys=[];
var bombs=[];
var bullets=[];
var myCanvas = document.getElementById("main");
var g = myCanvas.getContext("2d");
var fpsTime, nowFps;
var enemyTime = 10;
var gameStart = false;
var position={};
var can=0;
var circle_style=0;
var angle=0;
var imgArray=new Array();
var imgNumber=0;
var logNumber=0;
var srcNumber = 0;
var start;
var highscore;
var about;
var allow_log=0;
var allow_score=0;
var allow_about=0;
var logtimer;
var circle_alpha=0.8;
var circle_y;
var circle_timer;
var score_alpha=1;
var playerNumber=1;
var danNumber;
var boss21,boss22;
function Global(){
}
function Gimg(){

}
function Gmedia(){
}
var fuck = false;
Global.clearAll = function(){
    fuck = true;
    time = 0;
    key = {};
    enemys=[];
    bombs=[];
    bullets=[];
    myCanvas = document.getElementById("main");
    g = myCanvas.getContext("2d");
    enemyTime = 10;
    gameStart = false;
    position={};
    can=0;
    circle_style=0;
    angle=0;
    imgArray=new Array();
    imgNumber=0;
    logNumber=0;
    srcNumber = 0;
    allow_log=0;
    allow_score=0;
    allow_about=0;
    circle_alpha=0.8;
    score_alpha=1;
    playerNumber=1;
    Global.round = 0;
    Global.now = 0;
    Global.boss = 0;
    Global.passBoss21 = false;
    Global.bulletSpeed = 20;
    Global.isStart = false;
    Global.isEnd = false;
    Global.bulletArray = [],Global.planeArray = [],Global.bulletArray=[],Global.ballsArray = [],Global.waveArray=[],Global.treasureArray=[];
    Global.state = -1;
    Global.page = 0;
    for(var i=0,len=Global.roundArray.length;i<len;i++){
        Global.roundArray[i].count = Global.roundArray[i].oCount;
    }
}
Global.page = 0;//0 加载页面 1开始界面 2 游戏界面 3 关于界面 4 结束界面
Global.state = -1;
Global.round = 0;
Global.isStart = false;
Global.backCanvas = document.getElementById("ground");
Global.backContext = Global.backCanvas.getContext("2d");
var boss2,boss,player;
Global.imgArray=[{name:"back",src:"img/start_back.jpg"},{name:"circle",src:"img/start_circle.png"},{name:"ground",src:"img/ground.jpg"},{name:"fire",src:"img/fire.png"},{name:"player",src:"img/player.png"},{name:"player1",src:"img/player1.png"},{name:"player2",src:"img/player2.png"},{name:"player3",src:"img/player3.png"},{name:"enemy1",src:"img/enemy1.png"},{name:"enemy2",src:"img/enemy2.png"},{name:"boss2",src:"img/boss2.png"},{name:"boss22",src:"img/boss22.png"},{name:"boss",src:"img/boss.png"},{name:"bullet",src:"img/bullet.png"},{name:"log_back1",src:"img/log_back1.png"},{name:"log_back2",src:"img/log_back2.png"},{name:"log_back3",src:"img/log_back3.png"},{name:"log_button",src:"img/log_button.png"},{name:"high_back",src:"img/high_back.jpg"},{name:"high_back1",src:"img/high_back1.png"},{name:"high_back2",src:"img/high_back2.png"},{name:"about_author",src:"img/about_author.png"},{name:"about_intro",src:"img/about_intro.png"},{name:"change_circle",src:"img/change_circle.png"},{name:"about_back",src:"img/about_back.jpg"},{name:"about_top",src:"img/about_top.png"},{name:"dan1",src:"img/dan1.png"},{name:"dan2",src:"img/dan2.png"},{name:"dan3",src:"img/dan3.png"},{name:"enemyBullet1",src:"img/enemyBullet1.png"},{name:"enemyBullet2",src:"img/enemyBullet2.png"},{name:"enemyBullet3",src:"img/enemyBullet3.png"},{name:"energy",src:"img/energy.png"},{name:"treasure",src:"img/treasure.png"},{name:"ball",src:"img/ball.png"},{name:"ball2",src:"img/ball2.png"},{name:"end_back",src:"img/end_back.png"},{name:"player_energy",src:"img/player_energy.png"},{name:"player_energy_back",src:"img/player_energy_back.png"},{name:"boss_energy",src:"img/boss_energy.png"},{name:"boss_energy_back",src:"img/boss_energy_back.png"},{name:"restart_before",src:"img/restart_before.png"},{name:"restart_after",src:"img/restart_after.png"},{name:"back_before",src:"img/back_before.png"},{name:"back_after",src:"img/back_after.png"},{name:"title",src:"img/title.png"},{name:"you_win",src:"img/you_win.png"}];

Global.mediaArray = [{name:"background",src:"media/background.mp3"}];
//Global.canvas = document.getElementById("main");
//Global.context = Global.canvas.getContext("2d");
Global.bulletArray = new Array(); //子弹数组
Global.planeArray = new Array();  //敌机数组
Global.bulletNameArray = new Array("enemyBullet1","enemyBullet2");
Global.bulletTypeArray = new Array("straight","slash","goal","smart","slashes");
Global.ballsArray = new Array();
Global.width = 480;
Global.height = 800;
Global.passBoss21 = false;
Global.boss = 0;
Global.bulletSpeed = 20;
Global.shootInterval = 26;
Global.planeSpeed = 10;
Global.playerShootInterval = 5;
Global.waveArray = new Array();
Global.treasureArray = new Array();
Global.isEnd = false;
Global.pathArray = new Array(
    {type:"straight"},
    {type:"goal"},
    {type:"smart"},
    {type:"slash",angle:"0.8"},
    {type:"foldLine",angle:"0.3",padding:"40"}
)
Global.position = {x:200,y:300};
// add new oCount to remember the count when restart
Global.roundArray = new Array(
    //{name:"balls",path:{type:"foldLine",angle:0.2,padding:20},count:2,bulletType:0,position:"random"}
    {name:"enemy1",path:{type:"straight"},count:3,bulletType:0,position:"random",oCount:3},
    {name:"enemy1",path:{type:"slash",angle:0.8},count:3,bulletType:0,position:{x:Global.width,y:20},oCount:5},
    {name:"enemy1",path:{type:"slash",angle:0.2},count:3,bulletType:2,position:{x:0,y:40},oCount:3},
    {name:"enemy2",path:{type:"straight"},count:3,bulletType:0,position:"random",oCount:3},
    {name:"enemy1",path:{type:"goal"},count:4,bulletType:0,position:"random",oCount:4},
    {name:"group",path:{type:"straight"},count:2,bulletType:0,position:"random",oCount:2},
    {name:"enemy1",path:{type:"foldLine",angle:0.2,padding:30},count:5,bulletType:2,position:{x:0,y:40},oCount:5},
    {name:"enemy2",path:{type:"foldLine",angle:0.8,padding:30},position:{x:0,y:40},count:3,bulletType:0,position:{x:Global.width,y:30},oCount:5},
    {name:"boss2"},
    {name:"enemy1",path:{type:"straight"},count:4,bulletType:0,position:"random",oCount:4},
    {name:"enemy1",path:{type:"goal"},count:4,bulletType:0,position:"random",oCount:4},
    {name:"enemy1",path:{type:"foldLine",angle:0.2,padding:30},count:5,bulletType:2,position:{x:0,y:40},oCount:5},
    {name:"group",path:{type:"straight"},count:2,bulletType:0,position:"random",oCount:2},
    {name:"enemy2",path:{type:"foldLine",angle:0.8,padding:30},position:{x:0,y:40},count:3,bulletType:0,position:{x:Global.width,y:30},oCount:5},
    {name:"enemy2",path:{type:"straight"},count:5,bulletType:0,position:"random",oCount:5},
    {name:"enemy1",path:{type:"goal"},count:6,bulletType:0,position:"random",oCount:6},
    {name:"group",path:{type:"straight"},count:5,bulletType:0,position:"random",oCount:5},
    {name:"enemy1",path:{type:"slash"},position:"random",count:7,bulletType:1,oCount:7},
    {name:"boss2"},
    {name:"enemy1",path:{type:"slash"},position:"random",count:4,bulletType:1,oCount:4},
    {name:"enemy2",path:{type:"goal"},position:"random",count:6,bulletType:0,oCount:6},
    {name:"enemy2",path:{type:"straight"},count:5,bulletType:2,position:"random",oCount:5},
    {name:"enemy1",path:{type:"goal"},count:6,bulletType:0,position:"random",oCount:6},
    {name:"enemy2",path:{type:"straight"},count:5,bulletType:0,position:"random",oCount:3},
    {name:"group",path:{type:"straight"},count:5,bulletType:0,position:"random",oCount:5},
    {name:"enemy2",path:{type:"slash"},position:"random",count:7,bulletType:1,oCount:7},
    {name:"enemy2",path:{type:"goal"},count:7,bulletType:0,position:"random",oCount:7},
    {name:"enemy1",path:{type:"foldLine",angle:0.2,padding:30},count:7,bulletType:2,position:{x:0,y:40},oCount:7},
    {name:"enemy2",path:{type:"foldLine",angle:0.8,padding:30},position:{x:0,y:40},count:5,bulletType:0,position:{x:Global.width,y:30},oCount:5},
    {name:"group",path:{type:"straight"},count:6,bulletType:0,position:"random",oCount:6},
    {name:"enemy2",path:{type:"foldLine",angle:0.2,padding:30},position:{x:0,y:40},count:7,bulletType:2,oCount:7},
    {name:"enemy2",path:{type:"straight"},count:7,bulletType:0,position:"random",oCount:3},
    {name:"none",count:2,oCount:2},
    {name:"boss"}
);


function init(speed){
    Global.interval = 12;
    Global.now = 0;
    //Global.clearAll();
    Global.playerInit();
    Global.bossInit();
    Global.main(speed);
}
Global.judgePlatform = function(){
    var sUserAgent  =  navigator .userAgent.toLowerCase();
    if(sUserAgent .match(/android/i) == "android" || sUserAgent .match(/iphone os/i) == "iphone os"){
        Global.isPhone = true;
    }
    else{
        Global.isPhone = false;
    }
}
//初始化屏幕分辨率
Global.initSize = function(){
    if(Global.isPhone){
        Global.width= window.innerWidth;
        Global.height = window.innerHeight;
        if(Global.width != 480 || Global.height != 800){
            myCanvas.width = Global.width;
            myCanvas.height = Global.height;
            Global.backCanvas.width = Global.width;
            Global.backCanvas.height = Global.height;
        }
    }

}
//产生敌机

Global.produceEnemy = function(){
    Global.now += 1;
    if(Global.now >= Global.interval){
        //alert(Global.round+":"+Global.roundArray[Global.round].count);
        Global.now = 0;
        if(Global.round >= Global.roundArray.length)
            return;
        if(Global.boss == 0 && Global.roundArray[Global.round].name == "boss2"){
            Global.boss = 1;
        }
        if(Global.boss == 1){
            if(boss2.produceSmall >= 1){
                boss2.produceSmall = 0;
                var angle,left;
                if(Math.random()>0.5){
                    angle = 0.8,left=Global.width;
                }
                else{
                    angle = 0.2,left= 0;
                }
                var name = "enemy1";
                if(Global.passBoss21){
                    name = "enemy2";
                }
                var rightPlane = new Plane(name,left,200,Global.planeSpeed,0,"straight",{type:"slash",angle:angle});
                Global.planeArray.push(rightPlane);
            }
            else{
                boss2.produceSmall += 1;
            }
            return;
        }
        if(Global.boss != 2 && Global.roundArray[Global.round].name == "boss"){
            Global.boss = 2;
        }
        if(Global.boss == 2){
            if(boss.produceSmall >= 1){
                boss.produceSmall = 0;
                var angle,left;
                if(Math.random()>0.5){
                    angle=0.8,left=Global.width;
                }
                else{
                    angle = 0.2,left =0;
                }
                var leftPlane = new Plane("enemy1",left,200,Global.planeSpeed,0,"straight",{type:"slash",angle:angle});
                Global.planeArray.push(leftPlane);
            }
            else{
                boss.produceSmall += 1;
            }
            return;
        }
        var index = 3;// Math.floor(num*Global.bulletTypeArray.length);
        //var newPlane = new Plane("enemy1",num*Global.width,0,5,0,"enemyBullet1",Global.bulletTypeArray[index],50,{num:3,gapAngle:1/6},Global.pathArray[0]);
        /*
        if(Global.round == 4 ||Global.round == 9){
            var treasure = new Treasure("treasure",Global.width/2,0,7);
            Global.treasureArray.push(treasure);
        }
        else if(Global.round == 7){
            var treasure = new Treasure("energy",Global.width/2,0,7);
            Global.treasureArray.push(treasure);
        }
        */
        var planes = Global.roundArray[Global.round];
        if(planes.path != "none"){
            if(planes.count > 0){
                planes.count -= 1;
                if(planes.name == "balls"){
                    var a = Math.random()*Global.width;
                    var b = Math.random()*Global.width;
                    var balls = new Balls(a,0,b,-100,10,planes.path);
                    Global.ballsArray.push(balls);
                    return;
                }
                if(planes.name == "group"){
                    var speed = Global.planeSpeed;
                    if(Global.round > 10){
                        speed = 20;
                    }
                    var plane1 = new Plane("enemy1",Global.createRandomX(),0,speed,0,"straight",planes.path);
                    var plane2 = new Plane("enemy2",Global.createRandomX(),0,speed,0,"straight",planes.path);
                    var plane3 = new Plane("enemy1",Global.createRandomX(),-100,speed,0,"straight",planes.path);
                    var plane4 = new Plane("enemy2",Global.createRandomX(),-200,speed,0,"straight",planes.path);
                    var plane5 = new Plane("enemy1",Global.createRandomX(),-200,speed,0,"straight",planes.path);
                    Global.planeArray.push(plane1);
                    Global.planeArray.push(plane2);
                    Global.planeArray.push(plane3);
                    Global.planeArray.push(plane4);
                    Global.planeArray.push(plane5);
                    return;
                }
                var x,y;
                if(planes.position == "random"){
                    var num = Math.random();
                    x = num * Global.width;
                    y = 0;
                }
                else{
                    x = planes.position.x;
                    y = planes.position.y;
                    //alert(x+"_shit");
                }
                var change = "";
                if((Global.round == 6 ||Global.round == 10) && planes.count == 0){
                    if(player.bulletLevel < 2){
                        change = "treasure";
                    }
                }
                var newPlane = new Plane(planes.name,x,y,Global.planeSpeed,0,Global.bulletTypeArray[planes.bulletType],planes.path,change);
                Global.planeArray.push(newPlane);
            }
            else{
                Global.round += 1;
            }
        }
        else{                               //for rest
            planes.count -= 1;
            if(planes.count <= 0)
            {
                Global.round += 1;
            }
        }
    }
}

Global.isCross = function(a,b,c,d){
    // 三角形abc 面积的2倍
    var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
    // 三角形abd 面积的2倍
    var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
    if ( area_abc*area_abd>=0 ) {
        return false;
    }
    // 三角形cda 面积的2倍
    var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
    // 三角形cdb 面积的2倍
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
    var area_cdb = area_cda + area_abc - area_abd ;
    if (  area_cda * area_cdb >= 0 ) {
        return false;
    }
    return true;
}
Global.playerInit = function(){
    player = new Player("player1",200,580,20);
}
Global.reDraw = function(){
    g.clearRect(0,0,Global.width,Global.height);
    player.calculatePosition();
    player.drawSelf();
    player.shoot();
    Global.produceEnemy();
    if(Global.boss == 1){
        boss2.calculatePosition();
        if(player.isHit(boss2)){
            player.harm(20);
            boss2.harm(20);
        }
        if(boss2.energy > 0){
            boss2.drawSelf();
            boss2.shoot();
        }
        else{
            Global.boss = 0;
            Global.round += 1;
        }
    }
    else if(Global.boss == 2){
        boss.calculatePosition();
        if(player.isHit(boss)){
            player.harm(20);
            boss.harm(20);
        }
        if(boss.energy <= 0){
            Global.gameOver(true);
        }
        else{
            boss.drawSelf();
            boss.shoot();
        }
    }
    //draw the enemy and produce the enemys' bullet
    var plane;
    for(var i=0,len=Global.planeArray.length;i<len;i++){
        plane = Global.planeArray[i];
        plane.calculatePosition();
        if(player.isHit(plane)){
            player.harm(plane.originalEnergy);
            plane.harm(plane.originalEnergy);
            Global.planeArray.splice(i,1);
            len -= 1;
        }
        else if(plane.isOut()){
            Global.planeArray.splice(i,1);
            len -= 1;
        }
        else{
            plane.drawSelf();
            plane.shoot();
        }
    }
    //check if the bullet hit something and draw it
    for(var i=0,len=Global.bulletArray.length;i<len;i++){
        Global.bulletArray[i].calculatePosition();
        if(Global.bulletArray[i].isOut()){
            Global.bulletArray.splice(i,1);
            len -= 1;
        }
        else{
            var isHit = false;
            if(Global.bulletArray[i].parent.indexOf("player")==-1){
                if(player.isHit(Global.bulletArray[i])){
                    isHit = true;
                    //alert("game over");
                    //window.clearInterval(Global.hehe);
                    player.harm(Global.bulletArray[i].power);
                    //break;
                }
            }
            else{
                for(var j=0,jlen=Global.planeArray.length;j<jlen;j++){
                    if(Global.planeArray[j].isHit(Global.bulletArray[i])){
                        Global.planeArray[j].harm(Global.bulletArray[i].power);
                        if(Global.planeArray[j].energy <= 0){
                            Global.planeArray.splice(j,1);
                            jlen -= 1;
                        }
                        isHit = true;
                        //alert("yes");
                        break;
                    }
                }
                if(Global.boss == 1){
                    if(boss2.isHit(Global.bulletArray[i])){
                        isHit = true;
                        boss2.harm(Global.bulletArray[i].power);
                        if(boss2.energy <= 0){
                            boss2.die();
                        }
                    }
                }
                else if(Global.boss == 2){
                    if(boss.isHit(Global.bulletArray[i])){
                        isHit = true;
                        boss.harm(Global.bulletArray[i].power);
                        if(boss.energy <= 0){
                            boss.die();
                        }
                    }
                }
                if(!isHit){
                    for(var k=0,klen=Global.ballsArray.length;i<klen;i++){
                        var ball1 = Global.ballsArray[k].ball1;
                        if(ball1.isHit(Global.bulletArray[i])){
                            alert(ball1.energy);
                            ball1.harm(Global.bulletArray[i].power);
                            alert(ball1.energy);
                            if(ball1.energy<=0){
                                Global.ballsArray.splice(k,1);
                                klen -= 1;
                                ball1.die();
                                Global.planeArray.push(ball2);
                                alert("jia");
                            }
                            isHit = true;
                            break;
                        }
                        var ball2 = Global.ballsArray[k].ball2;
                        if(ball2.isHit(Global.bulletArray[i])){
                            alert(ball2.energy);
                            ball2.harm(Global.bulletArray[i].power);
                            alert(ball2.energy);
                            if(ball2.energy<=0){
                                Global.ballsArray.splice(k,1);
                                klen -= 1;
                                ball2.die();
                                Global.planeArray.push(ball1);
                                alert("jia");
                            }
                            isHit = true;
                            break;
                        }
                    }
                }
            }
            if(!isHit){
                Global.bulletArray[i].drawSelf();
            }
            else{
                Global.bulletArray.splice(i,1);
                len -= 1;
            }
        }

    }
    for(var p=0,plen=Global.ballsArray.length;p<plen;p++){
        Global.ballsArray[p].calculatePosition();
        var result = Global.ballsArray[p].isHit(player);
        if(result){
            //alert(result);
            if(result == 1){
                player.harm(Global.ballsArray[p].ball1.originalEnergy);
            }
            else{
                player.harm(2);
            }
            Global.ballsArray.splice(p,1);
            plen -= 1;
        }
        else if(Global.ballsArray[p].isOut()){
            Global.ballsArray.splice(p,1);
            plen -= 1;
        }
        else{
            Global.ballsArray[p].drawSelf();
        }
    }
    var slen = Global.treasureArray.length;
    for(var s=0;s<slen;s++){
        var treasure = Global.treasureArray[s];
        treasure.calculatePosition();
        if(player.isHit(treasure)){
            player.getTreasure(treasure.name);
            Global.treasureArray.splice(s,1);
            slen -= 1;
        }
        else if(treasure.isOut()){
            Global.treasureArray.splice(s,1);
            slen -=1;
        }
        else{
            treasure.drawSelf();
        }
    }
    var zlen = Global.waveArray.length;
    for(var z=0;z<zlen;z++){
	if(Global.waveArray[z].drawSelf()){
	}
	else{
	    Global.waveArray.splice(z,1);
	    zlen -= 1;
	}
    }
    Global.drawScore();

}
Global.bossInit = function(){
    boss21 = new Boss("boss2",Global.width/2-50,0,5,100);
    boss22 = new Boss("boss2",Global.width/2-50,0,5,100);
    boss2 = boss21;
    boss = new Boss("boss",Global.width/2-50,0,5,100);
}
Global.main = function(speed){
    Global.backContext.drawImage(Gimg.ground,0,0,Gimg.back.width,Gimg.back.height,0,0,Global.width,Global.height);
    Global.reDrawInterval=setInterval(function(){Global.reDraw();},speed);
    //alert("cao");
    //setTimeout(function(){alert("shit");},speed);
}
Global.createRandomX = function(width){
    var k = Math.random()*(Global.width-80);
    return k;
}
Global.gameOver = function(win){
    window.clearInterval(Global.reDrawInterval);
    Global.clearAll();
    Global.isEnd = true;
    Global.drawEnd(win);
};
Global.drawScore = function(){
    g.save();
    g.fillStyle = "#ffffff";
    g.font = "15px Arial"
    g.drawImage(Gimg.player_energy_back,10,10,Gimg.player_energy_back.width,Gimg.player_energy_back.height);
    g.fillText(player.score*100,70,56);
    var ratio = 1.79*player.energy/player.originalEnergy;
    if(ratio>0){
        g.drawImage(Gimg.player_energy,14,26,Gimg.player_energy.width*ratio,Gimg.player_energy.height);
    }
    if(Global.boss==2){
        g.drawImage(Gimg.boss_energy_back,300,10,Gimg.boss_energy_back.width,Gimg.boss_energy_back.height);
        ratio = boss.energy/boss.originalEnergy*1.8;
        if(ratio > 0){
            var width = Gimg.boss_energy.width*ratio;
            var left = 300+Gimg.boss_energy_back.width-width-6;
            g.drawImage(Gimg.boss_energy,left,23,width,Gimg.boss_energy.height);
        }
    }
    g.restore();
}
Global.drawEnd = function(win){
    Global.page = 4;
    Global.isEnd = true;
    g.clearRect(0,0,Global.width,Global.height);
    g.clearRect(0,0,Global.width,Global.height);
    if(!win){
        g.drawImage(Gimg.end_back,0,0,Gimg.end_back.width,Gimg.end_back.height);
    }
    else{
        g.drawImage(Gimg.you_win,0,0,Gimg.end_back.width,Gimg.end_back.height);
    }
    g.drawImage(Gimg.high_back1,100,400,Gimg.high_back1.width,Gimg.high_back1.height);
    g.drawImage(Gimg.restart_before,260,400,Gimg.high_back2.width,Gimg.high_back2.height);
    g.save();
    g.fillStyle = "#ffffff";
    g.font = "23px Arial";
    var score = player.score*100;
    var width = g.measureText(score).width;
    g.fillText(score,240-width/2,375);

}
function Plane(name,x,y,speed,aspeed,bulletType,path,change){
    var self = this;
    self.name = name;
    self.x = x;
    self.y = y;
    self.speed = speed;
    //self.xspeed = self.speed * Math.cos(self.angle*Math.PI);
    //self.yspeed = self.speed * Math.sin(self.angle*Math.PI);
    //self.bulletName = bulletName;
    if(self.name == "enemy1"){
        self.bulletName = "enemyBullet1";
    }
    else if(self.name == "enemy2"){
        self.bulletName = "enemyBullet2";
    }
    else if(self.name.indexOf("player")!=-1){
        self.bulletName = "dan1";
	//alert(self.x+"shit"+self.y);
    }
    else{
        self.bulletName = "enemyBullet1";
    }
    self.bulletType = bulletType;
    self.now = 0;
    self.width = Gimg[self.name].width;
    self.height = Gimg[self.name].height;


    self.path = path || "";
    self.change = change||""; //设定是否可以转变为宝或者血
    if(self.change != ""){
        //alert(self.change);
    }
    //根据飞机类型给它生命值
    if(self.name == "enemy1"){
        self.originalEnergy = 3;
        if(Global.passBoss21){
            self.originalEnergy += 1;
        }
        self.energy = self.originalEnergy;
    }
    else if(self.name == "enemy2"){
        self.originalEnergy = 5;
        if(Global.passBoss21){
            self.originalEnergy += 2;
        }
        self.energy = self.originalEnergy;
    }
    else if(self.name.indexOf("player") == -1){
    }
    // 根据子弹类型给定一些参数
    if(bulletType == "slashes"){
        self.num = 12;
        self.gapAngle = 1/6;
    }
    else if(bulletType == "goal"){
        self.shootNum = 1;
    }
    if(self.path.type == "straight"){
        self.xspeed = 0;
        self.yspeed = self.speed;
    }
    else if(self.path.type == "goal"){
        self.calculateAngle();
        self.xspeed = self.speed*Math.cos(self.angle*Math.PI);
        self.yspeed = self.speed*Math.sin(self.angle*Math.PI);
    }
    else if(self.path.type == "smart"){
        self.now = 0;
    }
    else if(self.path.type == "slash"){
        self.angle = self.path.angle;
        self.calculateSpeedByAngle();
    }
    else if(self.path.type == "foldLine"){
        self.angle = self.path.angle;
        self.isInborder = false;
        self.calculateSpeedByAngle();
    }
}
Plane.prototype.calculatePosition = function(){
    var self = this;
    if(self.path.type=="straight" || self.path.type=="slash"||self.path.type=="goal"){
        self.x += self.xspeed;
        self.y += self.yspeed;
    }
    else if(self.path.type=="foldLine"){
        self.outBorderHandler();
        self.calculateSpeedByAngle();
        self.x += self.xspeed;
        self.y += self.yspeed;
        //alert(self.xspeed+","+self.yspeed);
    }
    else if(self.path.type == "smart"){
        var max = 4;
        self.yspeed = self.speed;
        if(self.now < max){
            self.calculateAngle();
            //alert(self.angle);
            if(self.y < player.y){
                self.xspeed = self.yspeed/Math.tan(self.angle*Math.PI);
                if(self.xspeed > 5)self.xspeed = 5;
            }
            //if the player is behind itself at first,set its type goal
            else if(typeof(self.xspeed) == "undefined"){
                //self.xspeed = 0;
                self.path.type = "goal";
                self.xspeed = self.speed*Math.cos(self.angle*Math.PI);
                self.yspeed = self.speed*Math.sin(self.angle*Math.PI);
            }
            //alert(self.xspeed+","+self.yspeed);
            self.now += 1;
        }
        self.x += self.xspeed;
        self.y += self.yspeed;
    }

}
Plane.prototype.outBorderHandler = function(){
    var self = this;
    if(self.x<=self.path.padding || self.x>=Global.width-self.path.padding-self.width){
        if(self.isInborder == true){
            self.angle = 1 - self.angle;
        }
    }
    else{
        self.isInborder = true;
    }
}
Plane.prototype.calculateSpeedByAngle = function(){
    var self = this; // Do not forget this code

    self.xspeed = self.speed*Math.cos(self.angle*Math.PI);
    self.yspeed = self.speed*Math.sin(self.angle*Math.PI);
    //alert(self.xspeed+","+self.yspeed);
}
Plane.prototype.isOut = function(){
    var self = this;
    if(self.x<0-self.width || self.x>Global.width ||  self.y >Global.height) return true;
    return false;
}
Plane.prototype.drawSelf = function(){
    var self = this;
    var img = Gimg[self.name];
    g.drawImage(img,0,0,img.width,img.height,self.x,self.y,img.width,img.height);
}
Plane.prototype.drawPlayer = function(){
    var self = this;
    if(playerNumber==1)
    {
	//alert(self.x+","+self.y);
	g.drawImage(Gimg.player, self.x, self.y ,53, 70) ;//85,100
	playerNumber=2;
    }else if(playerNumber==2)
    {
	g.drawImage(Gimg.player2, self.x, self.y , 53, 70);
	playerNumber=3;
    }else if(playerNumber==3)
    {
	g.drawImage(Gimg.player3, self.x, self.y ,53,70);
	playerNumber=1;
    }
}
Plane.prototype.shoot = function(){
    var self = this;
    var y = self.y+self.height;
    self.now+=1;
    if(self.name.indexOf("player")==-1 && self.now < Global.shootInterval){
        return;
    }
    if(self.name.indexOf("player")!=-1 && self.now < Global.playerShootInterval){
        return;
    }
    self.now = 0;
    var speed = Global.bulletSpeed;
    if(self.name.indexOf("player")!=-1){
        speed = 0-Global.bulletSpeed;
        y = self.y;
    }
    if(self.bulletType != "slashes"){
        var bullet = new Bullet(self.name,self.bulletName,self.bulletType,self.x+self.width/2,y,speed,0,0.5);
        Global.bulletArray.push(bullet);
    }
    else{
        //var angle = self.num;
        var angle = 0.5-(self.num-1)/2*self.gapAngle;
        var bullet;
        for(var i=0;i<self.num;i++){
            //alert(angle);
            bullet = new Bullet(self.name,self.bulletName,"slash",self.x+self.width/2,self.y+self.height,speed,0,angle);
            angle += self.gapAngle;
            Global.bulletArray.push(bullet);
        }
    }
}


Plane.prototype.isHit = function(thing){
    var self = this;
    if(thing.x+thing.width>=this.x&&thing.x<=this.x+this.width&&thing.y+thing.height>=this.y&&thing.y<=this.y+this.height){
        return true;
    }
    return false;
}
Plane.prototype.harm = function(power){
    var self = this;
    self.energy -= power;
    if(self.name == "boss"){
        //alert(self.name+","+self.energy+","+power);
    }
    if(self.name.indexOf("player")!=-1){
        if(self.energy <= 0){
            Global.gameOver(false);
        }
    }
    else{
	if(self.energy <= 0){
	    self.die();
	}
    }

}
Plane.prototype.die = function(){
    //alert("yes");
    var self = this;
    var wave = new Wave(self.x+self.width/2,self.y+self.height/2,g,0);
    Global.waveArray.push(wave);
    if(self.name.indexOf("player")==-1){
        player.score += self.originalEnergy;//need to change
    }
    else{
            Global.gameOver(false);
    }
    if(self.change != ""){
        var treasure = new Treasure(self.change,self.x,self.y,self.speed);
        Global.treasureArray.push(treasure);
    }
}
function Player(name,x,y,speed){
    var self = this;
    Plane.call(self,name,x,y,speed,0,"straight",{type:"straight"});
    self.score = 0;
    self.originalEnergy = self.energy = 35;
    self.bulletLevel = 1;
}
Player.prototype = Object.create(Plane.prototype);
Player.prototype.shoot = function(){
    var self = this;
    //self.bulletLevel = 1; // 调试
    self.now += 1;
    if(self.now < Global.playerShootInterval){
        return;
    }
    self.now = 0;
    var speed = 0- Global.bulletSpeed-10;
    //alert(self.bulletName+"~~");
    if(self.bulletLevel == 1){
        var bullet1 = new Bullet(self.name,"dan1",self.bulletType,self.x+self.width/2,self.y,speed,0,0.5);
    Global.bulletArray.push(bullet1);
    }
    else{
        if(self.bulletLevel == 2){
            self.bulletName = "dan1";
            var bullet1 = new Bullet(self.name,"dan1",self.bulletType,self.x+self.width/2-20,self.y,speed,0,0.5);
            Global.bulletArray.push(bullet1);
            var bullet2 = new Bullet(self.name,"dan1",self.bulletType,self.x+self.width/2+20,self.y,speed,0,0.5);
            Global.bulletArray.push(bullet2);
        }
        else{
            self.bulletName = "dan1";
            var bullet1 = new Bullet(self.name,"dan1",self.bulletType,self.x+self.width/2-20,self.y,speed,0,0.5);
            Global.bulletArray.push(bullet1);
            var bullet2 = new Bullet(self.name,"dan1",self.bulletType,self.x+self.width/2,self.y-20,speed,0,0.5);
            Global.bulletArray.push(bullet2);
            var bullet3 = new Bullet(self.name,"dan1",self.bulletType,self.x+self.width/2+20,self.y,speed,0,0.5);
            Global.bulletArray.push(bullet3);
        }
    }

}
Player.prototype.drawSelf = function(){
    var self = this;
    if(playerNumber==1)
    {
	//alert(self.x+","+self.y);
	g.drawImage(Gimg.player, self.x, self.y ,53, 70) ;//85,100
	playerNumber=2;
    }else if(playerNumber==2)
    {
	g.drawImage(Gimg.player2, self.x, self.y , 53, 70);
	playerNumber=3;
    }else if(playerNumber==3)
    {
	g.drawImage(Gimg.player3, self.x, self.y ,53,70);
	playerNumber=1;
    }
}
Plane.prototype.shoot = function(){
    var self = this;
    var y = self.y+self.height;
    self.now+=1;
    if(self.name.indexOf("player")==-1 && self.now < Global.shootInterval){
        return;
    }
    if(self.name.indexOf("player")!=-1 && self.now < Global.playerShootInterval){
        return;
    }
    self.now = 0;
    if(self.bulletType == "goal"){
        self.shootNum -= 1;
        if(self.shootNum < 0){
            return;
        }
    }
    var speed = Global.bulletSpeed;
    if(self.name.indexOf("player")!=-1){
        speed = 0-Global.bulletSpeed;
        y = self.y;
    }
    if(self.bulletType != "slashes"){
        var bullet = new Bullet(self.name,self.bulletName,self.bulletType,self.x+self.width/2,y,speed,0,0.5);
        Global.bulletArray.push(bullet);
    }
    else{
        //var angle = self.num;
        var angle = 0.5-(self.num-1)/2*self.gapAngle;
        var bullet;
        for(var i=0;i<self.num;i++){
            //alert(angle);
            bullet = new Bullet(self.name,self.bulletName,"slash",self.x+self.width/2,self.y+self.height,speed,0,angle);
            angle += self.gapAngle;
            Global.bulletArray.push(bullet);
        }
    }
}
function shootSound(){
    Gmedia["shoot"].currentTime = 0.01;
    Gmedia["shoot"].pause();
    Gmedia["shoot"].play();
}
Player.prototype.calculatePosition = function(){
    var self = this;
    //self.x = position.x - self.width/2;
    //self.y = position.y - self.height/2;

    var x = self.x +self.width/2;
    var y = self.y + self.height/2;
    var ratio = Math.sqrt((position.x-x)*(position.x-x)+(position.y-y)*(position.y-y)) / self.speed;
    if(ratio <= 1){
        ratio = 1;
    }
    self.x += (position.x-x)/ratio;
    self.y += (position.y-y)/ratio;
}
Player.prototype.getTreasure = function(name){
    var self = this;
    if(name == "treasure"){
        self.bulletLevel += 1;
        if(self.bulletLevel > 3){
            self.bulletLevel = 3;
        }
    }
    else if(name == "energy"){
        self.energy += 5;
        if(self.energy>self.originalEnergy){
        self.energy = self.originalEnergy;
        }
    }
}
function Boss(name,x,y,speed,energy){
    var self = this;
    Plane.call(self,name,x,y,speed,0,"straight",{});
    self.originalEnergy = energy;
    self.energy = self.originalEnergy;
    self.now = 0;
    self.bulletSpeed = 10;
    self.padding = 50;
    self.rightY = 100;
    self.isFirst = true;
    self.width = Gimg[self.name].width;
    self.height = Gimg[self.name].height;
    self.shootNow = 0;
    self.produceSmall = 0;
    if(self.name == "boss"){
        self.num = 16;
        self.gapAngle = 1/8;
    }
    else{
        self.num = 10;
        self.gapAngle = 1/5;
    }
}
Boss.prototype.calculatePosition = function(){
    var self = this;
    if(self.y<self.rightY){
        self.yspeed = self.speed;
        self.xspeed = 0;
    }
    else{
        self.outBorderHandler();
    }
    self.x += self.xspeed;
    self.y += self.yspeed;
    //alert(self.xspeed+","+self.yspeed);
}
Boss.prototype.outBorderHandler = function(){
    var self = this;
    if(self.x<=self.padding){
        //self.angle = 1-self.angle;
        self.xspeed = self.speed;
        self.yspeed = 0;
    }
    else if(self.x>=Global.width-self.padding-self.width){
        self.xspeed = 0-self.speed;
        self.yspeed = 0;
    }
    else{
        if(self.isFirst){
            self.xspeed = self.speed;
            self.yspeed = 0;
            self.isFirst = false;
        }
    }
}
Boss.prototype.shoot = function(){
    var self = this;
    self.now += 1;
    if(self.now < Global.shootInterval){
        return;
    }
    self.now = 0;
    if(self.name == "boss2"){
        if(self.shootNow > 4){
            self.shootNow = 0;
            var angle = 0.5 -(self.num-1)/2*self.gapAngle;
            var bullet;
            for(var i=0;i<self.num;i++){
                bullet = new Bullet("boss2","enemyBullet1","slash",self.x+self.width/2,self.y+self.height,Global.bulletSpeed,0,angle);
                angle += self.gapAngle;
                Global.bulletArray.push(bullet);
            }
        }
        else{
            self.shootNow += 1;
        }
        var bullet = new Bullet("boss2","enemyBullet3","straight",self.x+self.width/2-10,self.y+self.height,Global.bulletSpeed,0,0.5);
        Global.bulletArray.push(bullet);
        bullet = new Bullet("boss2","enemyBullet3","straight",self.x+self.width/2+10,self.y+self.height,Global.bulletSpeed,0,0.5);
        Global.bulletArray.push(bullet);
       // bullet = new Bullet("boss2","enemyBullet1","smart",self.x+self.width/2-30,self.y+self.height,Global.bulletSpeed,0,0.5);
       // Global.bulletArray.push(bullet);
       // bullet = new Bullet("boss2","enemyBullet1","smart",self.x+self.width/2+30,self.y+self.height,Global.bulletSpeed,0,0.5);
      //  Global.bulletArray.push(bullet);
    }
    else{
        var num = self.num+ Math.floor(Math.random()*5);
        var angle = 0.5 -(num-1)/2*self.gapAngle;
        var bullet;
        for(var i=0;i<num;i++){
            bullet = new Bullet("boss","enemyBullet1","slash",self.x+self.width/2,self.y+self.height,Global.bulletSpeed,0,angle);
            angle += self.gapAngle;
            Global.bulletArray.push(bullet);
        }
        bullet = new Bullet("boss","enemyBullet3","straight",self.x+self.width/2-50,self.y+self.height,Global.bulletSpeed,0,0.5);
        Global.bulletArray.push(bullet);
        bullet = new Bullet("boss","enemyBullet3","straight",self.x+self.width/2+50,self.y+self.height,Global.bulletSpeed,0,0.5);
        Global.bulletArray.push(bullet);

    }
}
Boss.prototype.die = function(){
    var self = this;
    player.score += self.originalEnergy;
    if(self.name == "boss2"){
        Global.round += 1;
        //alert("die:"+Global.round);
        Global.boss = 0;
        boss2 = boss22;
        Global.passBoss21 = true;
        var wave = new Wave(self.x+self.width/2,self.y+self.height/2,g,1);
        Global.waveArray.push(wave);
        var treasure = new Treasure("energy",self.x,self.y,10);
        Global.treasureArray.push(treasure);
    }
    else if (self.name == "boss"){
        Global.boss = 0;
        var wave = new Wave(self.x+self.width/2,self.y+self.height/2,g,2);
        Global.waveArray.push(wave);
        Global.gameOver(true);
    }
}
Boss.prototype.drawSelf = Plane.prototype.drawSelf;
Boss.prototype.isHit = Plane.prototype.isHit;
Boss.prototype.harm = Plane.prototype.harm;

function Treasure(name,x,y,speed,type){
    var self = this;
    Plane.call(self,name,x,y,speed,0,"straight",{type:"straight"});
    self.type = type;
}
Treasure.prototype = Object.create(Plane.prototype);


//x,y为坐标值，context为绘图的上下文
function Wave(x,y,context,large){
    var self =  this;
    self.x = x;
    self.y = y;
    self.now = 1;
    self.large = large;
    if(self.large == 0){
        self.end = 12;
    }
    else if(self.large == 1){
        self.end= 30;
    }
    else if(self.large == 2){
        self.end = 50;
    }
    self.transparence = 1;
    self.enlarge = true;
    self.context = context;
    self.large = large;
    //alert("wave");
}
Wave.prototype.drawSelf = function(){
    var self = this;
    if(self.enlarge){
        self.now += 1;
    }
    if(self.now >= self.end){
        self.enlarge = false;
    }
    var context = self.context;
    context.save();
    //context.fillStyle = "black";
    //context.clearRect(0,0,width,height);
    //context.fillRect(0,0,width,height);
    context.beginPath();
    context.translate(self.x,self.y);
    context.lineWidth = 1;
    if(self.enlarge){
    	context.strokeStyle = "rgb(154,215,251)";
    }
    else{
	self.transparence -= 0.5;
	if(self.transparence <= 0){
            context.closePath();
	    context.restore();
	    return false;
	}
	context.strokeStyle = "rgba(154,215,251,"+self.transparence+")";
    }
    if(!self.angle){
        self.angle = Math.random();
    }
    context.rotate(self.angle*Math.PI);
    context.scale(3,1);
    //alert(theNum);
    //alert(theNum);
    context.arc(0,0,self.now,0*Math.PI,2*Math.PI);
    //context.arc(width/2,height/2,100.0*Math.PI,2*Math.PI);
    context.stroke();
    context.closePath();
    context.restore();
    return true;
}
function Balls(x1,y1,x2,y2,speed,path){
    var self = this;
    self.ball1 = new Ball(x1,y1,speed,path);
    self.ball2 = new Ball(x2,y2,speed,path);
    Balls.lineColor = 1;
}
Balls.prototype.calculatePosition = function(){
    var self = this;
    self.ball1.calculatePosition();
    self.ball2.calculatePosition();
}
Balls.prototype.isOut = function(){
    var self = this;
    if(self.ball1.isOut()&&self.ball2.isOut()){
        return true;
    }
    return false;
}
Balls.prototype.isHit = function(thing){
    var self = this;
    if(self.ball1.isHit(thing)){
        Global.planeArray.push(self.ball2);
        player.score += self.ball1.originalEnergy;
        return 1;
    }
    else if(self.ball2.isHit(thing)){
        Global.planeArray.push(self.ball1);
        player.score += self.ball2.originalEnergy;
        return 1;
    }
    else if(self.lineHit(thing)){
        alert(player.x+","+player.y+","+self.ball1.x+","+self.ball1.y+","+self.ball2.x+","+self.ball2.y);
        self.ball1.die();
        self.ball2.die();
        return 2;
    }
    else{
        return 0;
    }
}
Balls.prototype.lineHit = function(thing){
    var self = this;
    var radius = self.ball1.height/2;
    var x1 = self.ball1.x+radius;
    var y1 = self.ball1.y+radius;
    var x2 = self.ball2.x+radius;
    var y2 = self.ball2.y+radius;
    var dis = Math.sqrt((self.ball2.x-self.ball1.x)*(self.ball2.x-self.ball1.x)+(self.ball2.y-self.ball1.y)*(self.ball2.y-self.ball1.y));
    var ratio = radius/dis;
    var a1 = x1 +(x2-x1)*ratio;
    var b1 = y1 +(y2-y1)*ratio;
    var a2 = x2 +(x1-x2)*ratio;
    var b2 = y2 +(y1-y2)*ratio;
    self.lineHead = {x:a1,y:b1};
    self.lineTrail = {x:a2,y:b2};
    if(Global.isCross(self.lineHead,self.lineTrail,{x:thing.x,y:thing.y},{x:thing.x+thing.width,y:thing.y})||Global.isCross(self.lineHead,self.lineTrail,{x:thing.x,y:thing.y+thing.height},{x:thing.x+thing.width,y:thing.y+thing.height})||Global.isCross(self.lineHead,self.lineTrail,{x:thing.x,y:thing.y},{x:thing.x,y:thing.y+thing.height})||Global.isCross(self.lineHead,self.lineTrail,{x:thing.x+thing.width,y:thing.y},{x:thing.x+thing.width,y:thing.y+thing.height})){
        alert("what hit you on the earth??");
        return true;
    }
    return false;

}
Balls.prototype.drawSelf = function(){
    var self = this;
    self.ball1.drawSelf();
    self.ball2.drawSelf();
    self.drawLine();
}
Balls.prototype.drawLine = function(){
    var self = this;
    var color = "rgb(228,245,254)";
    if(self.lineColor == 1){
        color = "rgb(228,245,254)";
        self.lineColor += 1;
    }
    else if(self.lineColor == 2){
        color = "rgb(87,193,249)";
        self.lineColor += 1;
    }
    else if(self.lineColor == 3){
        color = "rgb(3,165,252)";
        self.lineColor = 1;
    }
    var a1 = self.lineHead.x;
    var b1 = self.lineHead.y;
    var a2 = self.lineTrail.x;
    var b2 = self.lineTrail.y;
    g.save();
    g.beginPath();
    g.strokeStyle = color;
    g.lineWidth = 3;
    g.moveTo(a1,b1);
    g.lineTo(a2,b2);
    g.stroke();
    g.closePath();
    g.restore();
}
function Ball(x,y,speed,path){
    var self = this;
    Plane.call(self,"ball",x,y,speed,0,"slashes",path);
    self.num = 6;
    self.gapAngle = 1/3;
    self.originalEnergy = 1;
    self.energy = self.originalEnergy;
    self.isOdd = true;
}
Ball.prototype = Object.create(Plane.prototype);
Ball.prototype.isOut = function(){
    var self = this;
    if(self.x<0||self.x>Global.width||self.y>Global.height){
        return true;
    }
    return false;
}
Ball.prototype.harm = function(num){
    var self = this;
    self.energy -= num;
}
Ball.prototype.die = function(){
    var self = this;
    var bullet;
    alert("die");
    player.score += self.originalEnergy;
    var angle = 0.5-(self.num-1)/2*self.gapAngle;
    for(var i=0;i<self.num;i++){
        bullet = new Bullet(self.name,self.bulletName,"slash",self.x+self.width/2,self.y+self.height,Global.bulletSpeed,0,angle);
        angle += self.gapAngle;
        Global.bulletArray.push(bullet);
    }
}
Ball.prototype.shoot = function(){
}
Ball.prototype.drawSelf = function(){
    var self = this;
    if(self.y < 0 -self.height){
        return;
    }
    if(self.isOdd){
        var img = Gimg[self.name];
        self.isOdd = false;
    }
    else{
        var img = Gimg[self.name+"2"];
        self.isOdd = true;
    }
    g.drawImage(img,0,0,img.width,img.height,self.x,self.y,img.width,img.height);
}
function Bullet(parent,name,type,x,y,speed,aspeed,angle){
    var self = this;
    self.parent = parent; //the plane which produce it
    self.name = name;    // img name
    self.type = type;     // bullet type
    self.x = x;
    self.y = y;
    //alert(self.parent+","+self.name);
    if(self.name == "enemyBullet1"){
        self.power = 1;
    }
    else if(self.name == "enemyBullet2"){
        self.power = 2;
    }
    else if(self.name == "enemyBullet3"){
        self.power = 3;
    }
    else if(self.name == "dan1"){
        self.power = 1;
    }
    else if(self.name == "dan2"){
        self.power = 3;
    }
    if(self.parent.indexOf("player")!=-1){
    }
    //alert(self.y);
    self.speed = speed;    // the total speed
    self.aspeed = aspeed; //the accelerate speed
    self.angle = angle;
    self.width = Gimg[self.name].width;
    self.height = Gimg[self.name].height;
    if(self.type == "straight"){
        self.xspeed = 0;
        self.yspeed = speed;
    }
    else if(self.type == "slash"){
        if(self.parent.indexOf("boss")==-1){
            self.angle = (Math.random()*70+70)/180*Math.PI;
        }
        self.xspeed = Math.round(self.speed*Math.cos(self.angle*Math.PI));
        self.yspeed = Math.round(self.speed*Math.sin(self.angle*Math.PI));
        //alert(self.angle+","+self.xspeed+","+self.yspeed);
    }
    else if(self.type == "goal"){
        self.speed = self.speed/2;
        self.calculateAngle();
        self.xspeed = self.speed*Math.cos(self.angle*Math.PI);
        self.yspeed = self.speed*Math.sin(self.angle*Math.PI);
    }
    else if(self.type == "smart"){
        self.now = 0;
    }
    //self.width = width||6;
    //self.height = height||6;
}

Bullet.prototype.calculatePosition = function(){
    var self = this;
    if(self.parent.indexOf("player")!=-1){
        //alert(self.speed+","+self.xspeed+","+self.yspeed);
        //alert(self.type);
    }
    if(self.type == "straight"){
        self.y += self.speed;
        //alert("shit");
    }
    else if(self.type == "slash" || self.type == "goal"){
        self.x += self.xspeed;
        self.y += self.yspeed;
    }
    else if(self.type == "smart"){
        var max = 10;
        self.yspeed = self.speed;
        if(self.now < max){
            self.calculateAngle();
            //alert(self.angle);
            if(self.y < player.y){
                self.xspeed = self.yspeed/Math.tan(self.angle*Math.PI);
                if(self.xspeed > 5)self.xspeed = 5;
            }
            //if the player is behind itself at first,set its type goal
            else if(typeof(self.xspeed) == "undefined"){
                //self.xspeed = 0;
                self.type = "goal";
                self.xspeed = self.speed*Math.cos(self.angle*Math.PI);
                self.yspeed = self.speed*Math.sin(self.angle*Math.PI);
            }
            self.now += 1;
        }
        self.x += self.xspeed;
        self.y += self.yspeed;
    }
}
Bullet.prototype.calculateAngle = function(){
    var self = this;
    self.angle = Math.atan((player.y-self.y)/(player.x-self.x))/Math.PI;
    if(player.x < self.x){
        self.angle += 1;
    }
    //alert((self.y) + " yes");
}
Plane.prototype.calculateAngle = Bullet.prototype.calculateAngle;
Bullet.prototype.isOut = function(){
    var self = this;
    if(self.x<0 || self.x>Global.width || self.y <0 || self.y >Global.height) return true;
    return false;
}
Bullet.prototype.drawSelf = function(){
    var self = this;
    var img = Gimg[self.name];
    if(self.parent.indexOf("player")!=-1){
    }
    g.drawImage(img,0,0,img.width,img.height,self.x-self.width/2,self.y,img.width,img.height);
}


function main()
{
    Global.judgePlatform(); //判断平台是否android或iphone
    Global.initSize();//根据平台及分辨率进行初始化
    srcLoad(function(){
        Global.backContext.drawImage(Gimg.ground,0,0,Global.width,Global.height);
        //Global.drawEnd();
        //alert(Global.width+","+Global.height);
	StartLogTimer();
	//StartGame();
    });
}
function StartLogTimer()
{

    logtimer = setInterval("drawLog();",1000);
    Global.page = 1;
}

function StartGame()
{
    //alert(window.innerWidth+",shit,"+window.innerHeight);
    //alert("start");
    Global.isStart = true;
    window.clearInterval(log_animation);
    window.clearInterval(logtimer);
    //Global.clearAll();
    init(50);
}


//允许选择
function allowSelect()
{
    Global.page = 1;
}



//以下代码待定。。。
$=function(id){
	return document.getElementById(id);
}
preventDefault=function(ev){
	if(ev)ev.preventDefault();
	else window.event.returnValue = false;
}
Global.getMousePosition=function (ev){
    var x = y = 0,
	doc = document.documentElement,
	body = document.body;
    if(!ev) ev=window.event;
    if (window.pageYoffset) {
	x = window.pageXOffset;
	y = window.pageYOffset;
    }else{
	x = (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	y = (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
    }
    if(SupportsTouches){
	var evt = ev.touches.item(0);//仅支持单点触摸,第一个触摸点
	x=evt.pageX;
	y=evt.pageY;
    }else{
	x += ev.clientX;
	y += ev.clientY;
    }
    //alert(x+","+y);
    return {'x' : x, 'y' : y};
};




var SupportsTouches = ("createTouch" in document);//判断是否支持触摸
var StartEvent = SupportsTouches ? "touchstart" : "mousedown";//支持触摸式使用相应的事件替代
var MoveEvent = SupportsTouches ? "touchmove" : "mousemove";
var EndEvent = SupportsTouches ? "touchend" : "mouseup";
//鼠标按下
//myCanvas.onmousedown=mouseMove;
myCanvas.addEventListener(StartEvent,function(eve){
    Global.getMousePosition(eve);
    if(Global.page!=0 && Global.page != 2){
        mouseMove(eve);
    }
})

myCanvas.addEventListener(MoveEvent,function(eve){
    position=Global.getMousePosition(eve);
})



//}
//鼠标抬起
//在结束页面监听手势来判断点击位置
function endMouse(eve){
    eve = eve || window.event;
    position = Global.getMousePosition(eve);
    if(position.x>=106&&position.x<=210&&position.y>=405&&position.y<=441){
        Global.isEnd = false;
        g.drawImage(Gimg.high_back2,100,400,Gimg.high_back1.width,Gimg.high_back1.height);
        allow_log = 1;
        allow_score = 0;
        allow_about = 0;
        Global.isStart = false;
        StartLogTimer();

    }
    else if(position.x>=264&&position.x<=373&&position.y>=400&&position.y<=440){
        Global.isEnd = false;
        g.drawImage(Gimg.restart_after,260,400,Gimg.high_back2.width,Gimg.high_back2.height);
        setTimeout("StartGame()",600);
    }
}
//在开始页面监听手势来判断点击位置
var enterTimes = 0;
function mouseMove(ev)
{
    ev = ev || window.event;
    position = Global.getMousePosition(ev);
    if(Global.page == 1)
    {
	if(position.x>140 && position.x<340 && position.y>400 &&position.y<460){
	    window.clearInterval(logtimer);
	    circle_y=440;
            Global.page = 2;
	    //drawCircle();
	    setTimeout("StartGame()",600);
	}
	else if(position.x>140 && position.x<340 && position.y>460 && position.y<510)
	{
            Global.page = 3;
            window.clearInterval(logtimer);
	    circle_y=550;
	    //drawCircle();
	    setTimeout("drawAbout()",600);
	}
    }/*
    else if(allow_score && !allow_log && !allow_about)
    {
	if(position.x>320 && position.x<434 && position.y>680 && position.y<725)
	{
	    drawHighScoreBack();
		}
    }*/
    else if(Global.page == 3)
    {
	if(position.x>320 && position.x<434 && position.y>680 && position.y<725)
	{
            Global.page = 1;
	    drawAboutBack();
	}
    }
    else if(Global.page == 4){
        if(position.x>=106&&position.x<=210&&position.y>=405&&position.y<=441){
            Global.isEnd = false;
            g.drawImage(Gimg.high_back2,100,400,Gimg.high_back1.width,Gimg.high_back1.height);
            Global.page = 1;
            Global.isStart = false;
            StartLogTimer();
        }
        else if(position.x>=264&&position.x<=373&&position.y>=400&&position.y<=440){
            Global.isEnd = false;
            Global.page = 2;
            g.drawImage(Gimg.restart_after,260,400,Gimg.high_back2.width,Gimg.high_back2.high_back2);
            setTimeout("StartGame()",600);
        }
    }
    //document.getElementById('div1').value = mousePos.x;
    //document.getElementById('div2').value = mousePos.y;
}

//画动态的圆

function drawCircle()
{
    circle_timer=setInterval("drawChangeCircle();",100);
}
function drawChangeCircle()
{
    var height = Gimg.log_back1.height;
    var width = Gimg.log_back1.width;
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.back,0,0,Global.width,Global.height);
    g.save()
    g.globalAlpha=circle_alpha+0.2;
    g.drawImage(Gimg.log_back1,140,400,width,height);
    g.drawImage(Gimg.log_button,0,0,width,height/2,140,400,width,height/2);
    g.drawImage(Gimg.log_button,0,height/2,width,height/2,140,400+height/2,width,height/2);
    //g.drawImage(Gimg.log_button,0,110,200,60,140,510,200,60);
    g.drawImage(Gimg.change_circle,240-360*(0.8-circle_alpha),circle_y-165*(0.8-circle_alpha),720*(0.8-circle_alpha),330*(0.8-circle_alpha));
    g.drawImage(Gimg.change_circle,240-360*(1-circle_alpha),circle_y-165*(1-circle_alpha),720*(1-circle_alpha),330*(1-circle_alpha));
    g.globalAlpha=1;
    g.restore();
    if((circle_alpha-0.2)<0.01)
    {
	circle_alpha=0.8;
	window.clearInterval(circle_timer);
    }
    else
    {
	circle_alpha-=0.2;
    }
}
//画得分榜
function drawHighScore()
{
    allow_score=1;
    allow_log=0;
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.high_back,0,0,Global.width,Global.height);
    g.drawImage(Gimg.high_back1,320,680,114,45);

    //g.drawImage(Gimg.log_back1,0,0,200,110,140,400,200,110);
    //g.drawImage(Gimg.log_button,0,0,200,110,140,400,200,110);
}
function drawHighScoreBack()
{
    allow_score=0;
    allow_log=1;
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.high_back,0,0,Global.width,Global.height);
    g.drawImage(Gimg.high_back2,320,680,114,45);
    StartLogTimer();
    //g.drawImage(Gimg.log_back1,0,0,200,110,140,400,200,110);
    //g.drawImage(Gimg.log_button,0,0,200,110,140,400,200,110);
}


function drawAbout()
{
    allow_score = 0;
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.about_back,0,0,Global.width,Global.height);
    g.drawImage(Gimg.title,0,0,Global.width,229);
    g.drawImage(Gimg.about_intro,40,160,402,353);
    g.drawImage(Gimg.about_author,40,520,402,153);
    g.drawImage(Gimg.high_back1,320,680,114,45);
}
function drawAboutBack()
{
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.about_back,0,0,Global.width,Global.height);
    g.drawImage(Gimg.title,0,0,Global.width,229);
    g.drawImage(Gimg.about_intro,40,160,402,353);
    g.drawImage(Gimg.about_author,40,520,402,153);
    g.drawImage(Gimg.high_back2,320,680,114,45);
    StartLogTimer();
    Global.page = 1;
}
//function startLoop()
//{
//	gameStart.update();
//	updateObjs();
//	drawObjs();
//}

//得分
function drawScore()
{
    g.save();
    g.fillStyle = "#fff";
    g.fillText("SCORE: " + player.score, 200, 10);
    g.restore();
}

var log_animation;
var log_alpha=0;
//画登录页面

function drawLog()
{
    var width = Gimg.log_back1.width;
    var height = Gimg.log_back1.height;
    switch(logNumber)
    {

    case 0:
	log_alpha=0;
	log_animation=setInterval("drawlog1();",100);
        //drawlog1();
	logNumber++;
	break;
    case 1:
	window.clearInterval(log_animation);
	log_alpha=0;
	log_animation=setInterval("drawlog2();",100);
       // drawlog2();
	logNumber++;
	break;
    case 2:
	window.clearInterval(log_animation);
	log_alpha=0;
	g.clearRect(0,0,Global.width,Global.height);
	g.drawImage(Gimg.back,0,0,Global.width,Global.height);
	g.drawImage(Gimg.log_back1,140,400,width,height);
        g.drawImage(Gimg.log_button,140,400,width,height);
	logNumber++;
	break;
   case 3:
	g.clearRect(0,0,Global.width,Global.height);
	g.drawImage(Gimg.back,0,0,Global.width,Global.height);
	g.drawImage(Gimg.log_back2,140,400,width,height);
	g.drawImage(Gimg.log_button,140,400,width,height);
	logNumber++;
        break;
   case 4:
        g.clearRect(0,0,Global.width,Global.height);
        g.drawImage(Gimg.back,0,0,Global.width,Global.height);
        g.drawImage(Gimg.log_back3,140,400,width,height);
	g.drawImage(Gimg.log_button,140,400,width,height);
        logNumber++;
        break;
    case 5:
        g.clearRect(0,0,Global.width,Global.height);
	g.drawImage(Gimg.back,0,0,Global.width,Global.height);
	g.drawImage(Gimg.log_back2,140,400,width,height);
	g.drawImage(Gimg.log_button,140,400,width,height);
        logNumber = 2;
        break;
    }
}
//画透明的进度
function drawlog1()
{
    var height = Gimg.log_back1.height;
    var width = Gimg.log_back1.width;
    if(Global.isStart){
        return;
    }
    if(log_alpha>=1)
    {
	log_alpha=0;
    }
    log_alpha+=0.1;
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.back,0,0,Global.width,Global.height);
    g.save();
    g.globalAlpha = log_alpha;
    g.drawImage(Gimg.log_back1,0,0,width,height/2,140,400,width,height/2);
    g.drawImage(Gimg.log_button,0,0,width,height/2,140,400,width,height/2);
    g.restore();
}
function drawlog2()
{
    var height = Gimg.log_back1.height;
    var width = Gimg.log_back1.width;
    if(Global.isStart){
        return;
    }
    if(log_alpha>=1)
    {
	log_alpha=0;
    }
    log_alpha+=0.1;
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.back,0,0,Global.width,Global.height);
    g.drawImage(Gimg.log_back1,0,0,width,height/2,140,400,width,height/2);
    g.drawImage(Gimg.log_button,0,0,width,height/2,140,400,width,height/2);
    g.save();
    g.globalAlpha = log_alpha;
    g.drawImage(Gimg.log_back1,0,height/2,width,height/2,140,400+height/2,width,height/2);
    g.drawImage(Gimg.log_button,0,height/2,width,height/2,140,400+height/2-1,width,height/2);
    g.restore();
}
function drawlog3()
{
    if(Global.isStart){
        return;
    }
    if(log_alpha>=1)
    {
	log_alpha=0;
    }
    log_alpha+=0.1;
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.back,0,0,Global.width,Global.height);
    g.drawImage(Gimg.log_back1,140,400,200,110);
    g.drawImage(Gimg.log_button,140,400,200,110);
    g.save();
    g.globalAlpha = log_alpha;
    g.drawImage(Gimg.log_back1,140,510,200,60);
    g.drawImage(Gimg.log_button,140,510,200,60);
    g.restore();

}
//画加载页面
function drawStart()
{
    g.clearRect(0,0,Global.width,Global.height);
    g.drawImage(Gimg.back,0,0,Global.width,Global.height);

    g.save();
    g.fillStyle = "#fff";
    g.fillText(Math.round(srcNumber/Global.imgArray.length)*100+"%", 230, 484);


    if(angle==360)
    {
	angle=0;
    }
    angle+=10;
    g.translate(240,Global.width);
    g.rotate(angle*Math.PI/180);
    g.drawImage(Gimg.circle,-60,-60,120,120);
    g.rotate(-angle*Math.PI/180);
    g.translate(-240,-Global.width);
    g.restore();
}

//图片预加载
var timer;
var srcLoad=function(callback){
    var imgLen=Global.imgArray.length;
    var mediaLen = 0;//Global.mediaArray.length;
    var len = imgLen + mediaLen;
    for(var i=0;i<imgLen;i++)
    {
	Gimg[Global.imgArray[i].name]=new Image();
	Gimg[Global.imgArray[i].name].src=Global.imgArray[i].src;
	Gimg[Global.imgArray[i].name].onload=function()
	{
	    this.onload=true;
	    srcNumber++;
	    if(srcNumber==2)
	    {
	        g.drawImage(Gimg.back,0,0,Global.width,Global.height);
    		g.drawImage(Gimg.circle,180,420,120,120);
		timer=window.setInterval("drawStart();",50);

	    }
	    else if(srcNumber>2 && srcNumber<len)
	    {
		window.clearInterval(timer);
		timer=window.setInterval("drawStart();",50);
     	    }
	    if(srcNumber>=len)
	    {
		window.clearInterval(timer);
		callback();
	    }
	}
    }
    for(var j=0;j<mediaLen;j++){
        Gmedia[Global.mediaArray[j].name] = document.createElement('audio');
        Gmedia[Global.mediaArray[j].name].src = Global.mediaArray[j].src;
        Gmedia[Global.mediaArray[j].name].addEventListener("canplaythrough",function(){
            var self = this;
            self.isLoaded = true;
            srcNumber ++;
            if(srcNumber==2)
	    {
	        g.drawImage(Gimg.back,0,0,Global.width,Global.height);
    		g.drawImage(Gimg.circle,180,420,120,120);
		timer=window.setInterval("drawStart();",50);

	    }
	    else if(srcNumber>2 && srcNumber<len)
	    {
		window.clearInterval(timer);
		timer=window.setInterval("drawStart();",50);
     	    }
	    if(srcNumber>=len)
	    {
		window.clearInterval(timer);
		callback();
	    }
            alert("yes");
            self.play();
        },false);
        Gmedia[Global.mediaArray[j].name].addEventListener("ended",function(){
            alert("oh,yeah");
            this.currentTime = 0;
            this.play();
        },false);
        Gmedia[Global.mediaArray[j].name].play();
    }
}

//初始化
document.ontouchstart = function(e)
{
    e.preventDefault();
};
    window.onload = function(){main();}
