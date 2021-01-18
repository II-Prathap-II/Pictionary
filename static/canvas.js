var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

canvas.height = screen.availHeight*0.8;
canvas.width = window.innerWidth;
ctx.lineWidth = 3
var drawing
function startPosition(e){
    drawing = true
    ctx.moveTo(e.clientX, e.clientY);
    ws.send(e.clientX +","+ e.clientY + "," + "true")
    draw(e)
    
}
function endPosition(e){
    drawing = false;
}
function draw(e){
    if(drawing){
    ctx.strokeStyle = "red";
    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke();      
    ws.send(e.clientX +","+ e.clientY + "," + "false")
    }
}
canvas.addEventListener("mousedown",startPosition);
canvas.addEventListener("mouseup",endPosition);
canvas.addEventListener("mousemove",draw)    

ws.addEventListener('message', function(event){

    const drawPoint = event.data.split(',')
    if(drawPoint[2] == "true"){
        ctx.moveTo(drawPoint[0], drawPoint[1])
    }
    else{
        ctx.lineTo(drawPoint[0], drawPoint[1])
        ctx.stroke(); 
    }
    
})



