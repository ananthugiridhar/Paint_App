//SUBMITTED BY :  ANANTHU S
// MAIL : ananthugiridhar@gmail.com


//TASK :  Build a paint app using plain javascript and HTML Canvas
//        . rect size according to the mouse drag
//        . delete rect on double click
//        . fill each rect with different color
//        . clear button for clearing the canvas
//        . drag the rectangle by clicking and draging them





//global variables
var canvas;
var rect_count;
var drag;
var color;
var init_color;
var rectangles = [];
var start_location;
var tempX;
var tempY;
var finalX;
var finalY;
var momentX, momentY;
var moveIndex;
var moveRectX, moveRectY;


window.addEventListener("load", init);




//INIT

function init(){
    canvas = document.querySelector("#my_canvas");
    context = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.85;
    canvas.height = window.innerHeight * 0.85;

    context.lineWidth = 5;
    context.lineCap = 'round';

    //initializing variables
    init_color = '#000000';
    rect_count = 0;
    drag = false;
    rectangles = [];

    //adding event listeners
    canvas.addEventListener("mousedown", draw_start);

    canvas.addEventListener("dblclick", delete_rect);

}


//to get the current coordinates
function getCurrentCoordinates(event){
    var x = event.clientX - canvas.getBoundingClientRect().left,
    y = event.clientY - canvas.getBoundingClientRect().top;
    // var x = event.clientX;
    // var y = event.clientY;

    return {x: x, y:y};
}





//.................MODULE 1.................................





//...............................................
//..............FOR DRAWING RECTANGLES......................
//.......................................................





function draw_start(event){
    start_location = getCurrentCoordinates(event);
    
    
    if(clicked_rect_index(start_location.x, start_location.y) >= 0){
        
        canvas.removeEventListener("mouseup", draw_stop);
        canvas.removeEventListener("mousemove", drag_draw);
        drag = false;

        momentX = start_location.x;
        momentY = start_location.y;
        moveIndex = clicked_rect_index(start_location.x, start_location.y);
        moveRectX = rectangles[moveIndex].x1;
        moveRectY = rectangles[moveIndex].y1;
        
        // clicked_rect(event, start_location.x, start_location.y, clicked_rect_index(start_location.x, start_location.y));
        moveRectClicked()
        return;
    }
    
    
    else{
        drag = true;
        // canvas.addEventListener("mousedown", draw_start);
        canvas.removeEventListener("mousemove", rectMove, false);
        canvas.removeEventListener("mouseup", moveComplete, false);
        canvas.addEventListener("mouseup", draw_stop);
        canvas.addEventListener("mousemove", drag_draw);
        color = "#" + Math.floor(Math.random()*16777215).toString(16);
        // getImage();
    }

}


function drag_draw(event){

    if(!drag) return;
    // putImage();
    var position = getCurrentCoordinates(event);

    draw_rect(position)
    context.fillStyle = color;
    context.fill()

}


function draw_stop(event){
    drag = false;
    // putImage();
    var position = getCurrentCoordinates(event);

    draw_rect(position);
    context.fillStyle = color;
	context.fill();	
	rect_count=rect_count+1;
    temp_rect = {x1: tempX, y1: tempY, x2: finalX, y2:finalY, color: color};

    rectangles.push(temp_rect);
    console.log(temp_rect);

    


}



function draw_rect(cordinates){
    tempX = start_location.x;
	tempY = start_location.y;
    finalX = cordinates.x - start_location.x ;
    finalY = cordinates.y - start_location.y  ;

    context.beginPath();
    context.rect(tempX, tempY, finalX, finalY);
   
    context.closePath();
}





// function getImage() {
//     canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
// }

// function putImage() {
//     context.putImageData(canvasImage, 0, 0);
// }






function isRectClicked(shape,mx,my) {	
    var check = false;
    if((mx > shape.x1 && mx <= shape.x2+shape.x1) && (my > shape.y1 && my <= shape.y2+shape.y1)) check = true;
   
    return (check);
    
}


function clicked_rect_index(Xpos, Ypos){
    var index = -1;
    for (i=0; i < rect_count; i++) {
          
        if	(isRectClicked(rectangles[i], Xpos, Ypos)) {
            index = i;		
        }
    }
    return index;
}





//............MODULE 2.........................






//.............................................................
//for deleting the rectangle that is double clicked
//....................................................


function delete_rect(event) 
{
    var i;
    var bRect = canvas.getBoundingClientRect();
    
//		var highestIndex=-1;
    dragIndexDelete=-1;
    
    mouseX = Math.floor((event.clientX - bRect.left)*(canvas.width/bRect.width));
    mouseY = Math.floor((event.clientY - bRect.top)*(canvas.height/bRect.height));
    
    //To find that which rectangle has been clicked
    dragIndexDelete = clicked_rect_index(mouseX, mouseY);
    
    //Remove the rectangle from the array
    if ( dragIndexDelete> -1 ){
        // rect_del(dragIndexDelete)
        //console.log(rectangles);
        rectangles.splice(dragIndexDelete,1);
        rect_count=rect_count-1;
        clear_canvas();
        fillCanvas1();
        
    }
		
					
		
}
















//...........................................................
//..............FOR MOVING RECTANGLES............................
//...............................................................


function moveRectClicked(){
    
    canvas.addEventListener("mousemove", rectMove, false);
    canvas.addEventListener("mouseup", moveComplete, false);
    
   

}

function rectMove(event){
    var bRect = canvas.getBoundingClientRect();
    mouseX = Math.floor((event.clientX - bRect.left)*(canvas.width/bRect.width));
    mouseY = Math.floor((event.clientY - bRect.top)*(canvas.height/bRect.height));

    var x,y;
    x = mouseX - momentX ;
    y = mouseY-momentY;
   
    momentX = mouseX;
    momentY = mouseY;


    rectangles[moveIndex].x1 = rectangles[moveIndex].x1 + x;
    rectangles[moveIndex].y1 = rectangles[moveIndex].y1 + y;
    
    clear_canvas();
    fillCanvas1();


}

function moveComplete(event){
    drag = false;
    canvas.removeEventListener("mousemove", rectMove, false);
    canvas.removeEventListener("mouseup", moveComplete, false)

    clear_canvas();
    fillCanvas1()

}










//to clear the canvas
function clear_canvas(){
    context.fillStyle = 'white';
    context.fillRect(0,0, canvas.width, canvas.height);
   
	context.fill();
}
function clearAll(){
    rectangles = [];
    rect_count = 0;
    drag = false;
    clear_canvas();
    draw_start()
}



//TO delete a particular rect
function rect_del(index){
    
    context.fillStyle = 'white';
    context.fillRect(rectangles[index].x1-10, rectangles[index].y1-10, rectangles[index].x2+10, rectangles[index].y2+10);
   
	context.fill();   

}


//fill the canvas with the rectangles

function fillCanvas1(){
    
    for(let i=0; i<rectangles.length;i++ ){
        
        let x = rectangles[i].x1;
        let y = rectangles[i].y1;
        let z = rectangles[i].x2;
        let b = rectangles[i].y2;
        let col = rectangles[i].color;

        context.fillStyle = col;
        context.fillRect(x,y,z,b);
        context.fill;
    }
    

}




//responsive height and width of canvas
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;

})