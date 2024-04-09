let inputdir={x:0 ,y:0};


const foodsound=new Audio('food.mp3');
const gameoversound=new Audio('gameover.mp3');
const musicsound=new Audio('musicsound.mp3');

let lastpainttime=0;
let score=0;
let speed=8;
let snakearr=[
    {x:13 ,y:15}
]
food={x:15 ,y:15}

function main(ctime){
    
    window.requestAnimationFrame(main);
    if((ctime - lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime=ctime;
    gameengine();

}

function isCollide(snake){
    
    //if you bump yourself
    for (let i = 1; i < snakearr.length; i++) {

        if(snake[i].x== snake[0].x && snake[i].y==snake[0].y) {
            return true;
        }
    }
    //if you bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 ||snake[0].y>=18 || snake[0].y<=0) {
          return true;
        }
    
}

function gameengine(){
   
    board.innerHTML="";
    //display snake
    snakearr.forEach((e,index)=>{
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart=e.y;
        snakeelement.style.gridColumnStart=e.x;
        
        if(index==0){
            snakeelement.classList.add('head')
        }
        else{
            snakeelement.classList.add('snake')
        }
         board.appendChild(snakeelement);
    });
  //display food
  foodelement=document.createElement('div');
  foodelement.style.gridRowStart=food.y;
  foodelement.style.gridColumnStart=food.x;
  foodelement.classList.add('food')
   board.appendChild(foodelement);
  

   //updating snakearr and food

   if(isCollide(snakearr)){
    gameoversound.play();
    musicsound.pause();
    inputdir={x:0 ,y:0};
    alert("Game Over.Press Any Key to Play Again!");
    snakearr=[{x:13 ,y:15}];
    musicsound.play();
    score=0;
   }

   //if snake eaten the food increment score and regenrate the food

   if(snakearr[0].y==food.y && snakearr[0].x==food.x){

    foodsound.play();
    score +=1;
    if(score>highscoreval){
        highscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(highscoreval));
        highscorebox.innerHTML="Highscore:"+ highscoreval;
    }
    scorebox.innerHTML="Score:"+score;
    snakearr.unshift({x:snakearr[0].x +inputdir.x,y:snakearr[0].y +inputdir.y});
    let a=2;
    let b=16;
    food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}

   }
   //move snake
   for (let i = snakearr.length-2; i >= 0; i--) {
    
    snakearr[i+1]={...snakearr[i]};
   }
  snakearr[0].x += inputdir.x;
  snakearr[0].y += inputdir.y;
  

}

let highscore=localStorage.getItem("highscore");
if(highscore==null){
    highscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore);
   highscorebox.innerHTML="Highscore:"+ highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir={x:0 ,y:0};   //start
    

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x=  0;
            inputdir.y= -1 ;
            break;

            case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x=  0;
            inputdir.y= 1 ;
            break;

            case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x= 1 ;
            inputdir.y= 0 ;
            break;

            case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x=  -1;
            inputdir.y= 0 ;
            break;
   default:
    break;
    }

 

})