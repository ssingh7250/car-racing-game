const score=document.querySelector('.score');
const startscreen=document.querySelector('.start_screen');
const game_area=document.querySelector('.game_area');



document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

let keys={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};
let player={speed:5,score:0};

function keyDown(e)
{
    e.preventDefault();
    keys[e.key]=true;
   
    
}
function keyUp(e)
{
    e.preventDefault();
    keys[e.key]=false;
     
  
    
}

 function iscollide(a,b)
{
    Areact=a.getBoundingClientRect();
    Breact=b.getBoundingClientRect();
    
    return !((Areact.bottom<Breact.top)|| (Areact.top>Breact.bottom)||(Areact.left>Breact.right)
            ||(Areact.right<Breact.left));
        
    
    
}
function endgame()
{
    
   
    player.start=false;
    startscreen.classList.remove('hide'); 
       
     

}

function movesline()
{
    let Line=document.querySelectorAll('.Line');
    Line.forEach(function(item)
    {   
            if(item.y>=700)
                {
                    item.y-=750;
                }
        item.y += player.speed;
        item.style.top=item.y + "px";
                 
    })    
    
}
function moveEnemy(car)
{
    let Enemy=document.querySelectorAll('.Enemy');
    Enemy.forEach(function(item)
    {   
            if(iscollide(car,item))
                {
                    
                    endgame();
                }
            if(item.y>=750)
                {
                    item.y-=700;
                   item.style.left=Math.floor(Math.random()*350)+"px";
                }
        item.y += player.speed;
        item.style.top=item.y + "px";
                 
    })    
    
}


function gameplay()
{
        const car=document.querySelector('.car');
           
        const road=game_area.getBoundingClientRect();
    
    
    if(player.start){
            
            movesline();
            moveEnemy(car);
        
        if(keys.ArrowUp && player.y>(road.top+70)){player.y-=player.speed;}
        if(keys.ArrowDown  && player.y<(road.bottom-70)){player.y+=player.speed;}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed;}
        if(keys.ArrowRight && player.x<(road.width-70)){player.x+=player.speed;}
        
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        
        
    window.requestAnimationFrame(gameplay);
        
        player.score++;
        
        score.innerText="Score:"+player.score;
        
    }
}


function start()
{
   // game_area.classList.remove('hide');
    startscreen.classList.add('hide');
 game_area.innerHTML="";
    player.start=true;
    player.score=0;
window.requestAnimationFrame(gameplay);
    for(x=0;x<5;x++)
        {
    const roadLine=document.createElement('div');
    roadLine.setAttribute('class','Line');
            roadLine.y=(x*150);
            roadLine.style.top=roadLine.y+"px";
    game_area.appendChild(roadLine);
        }
    
    const car=document.createElement('div');
    car.setAttribute('class','car');
    game_area.appendChild(car);
    
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    
    for(x=0;x<3;x++)
        {
    const Enemycar=document.createElement('div');
    Enemycar.setAttribute('class','Enemy');
    Enemycar.y=((x+1)*350)*-1;
            Enemycar.style.backgroundColor=randamcolor();
            Enemycar.style.left=Math.floor(Math.random()*350)+"px";
    Enemycar.style.top=Enemycar.y+"px";
    game_area.appendChild(Enemycar);
        }
    
    
    
}

function randamcolor(){
    
        function c()
    {
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2); 
        
    }
    
    return "#"+c()+c()+c();
}

startscreen.addEventListener('click',start);




















