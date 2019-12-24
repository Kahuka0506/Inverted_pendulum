

const canvas = document.getElementById('canvas_p');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth*0.98;
canvas.height = window.innerHeight*0.5;

let canvas_h = canvas.height;
let canvas_w = canvas.width;
let box_w = canvas_w/30;
let box_h = canvas_h/20;
let pend_h = box_h*3;


let M = 3;
let m = 1;
let l = 1;
let theta = 0;
let x = canvas_w/2;
let y = canvas_h-box_h; //const.

let K = 1300;
let f = 0;
let dx = 0;
let dtheta = 0;

let dt = 0.001;

let theta_0 = 0;

let x_0 = canvas_w/2+canvas_w*0.3;
let befor_x_0 = canvas_w/2+canvas_w*0.3;


document.getElementById('body_X').value = x_0;
document.getElementById('angle').value = theta_0;
document.getElementById('control_K').value = K;

function control_x_follow() {
  if(x_0 - befor_x_0 > 0) befor_x_0+=2;
  else befor_x_0-=2;

  f = (befor_x_0 - x)*K-dx*K/13;
  x = x + dt*dx;
  dx = dx + dt*(f/(M+m));
}

function control_x_basic() {
  f = (x_0 - x)*K-dx*K/8;
  x = x + dt*dx;
  dx = dx + dt*(f/(M+m));
}


function loop(timestamp) {
  //clear window
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  control_x_basic();
  //control_x_follow();
  ctx.fillStyle = "#e42828";
  //ctx.fillRect(befor_x_0, 0, 1, canvas_h); //for control_x_follow
  ctx.fillRect(x_0, 0, 1, canvas_h); //for control_x_basic

  ctx.fillStyle = "#e66f88";
  if(f >= 0) ctx.fillRect(x-(box_w/2+f/2000), y+box_h*0.47, box_w/2+f/2000, box_h*0.2);
  else ctx.fillRect(x, y+box_h*0.47, box_w/2+Math.abs(f)/2000, box_h*0.2);


  ctx.fillStyle = "#374dbe";
  ctx.fillRect(x-box_w/2, y, box_w, box_h);

  ctx.save();
  ctx.fillStyle = "#374dbe";
  ctx.translate(x-box_w*0.17/2, y);
  ctx.rotate(Math.PI/ 180*(theta-90));
  ctx.translate(-(x-box_w*0.17/2), -y);
  ctx.fillRect(x-box_w*0.17/2, y, pend_h*l, box_w*0.17);
  ctx.restore();


  ctx.beginPath();
  ctx.fillStyle = "#142475";
  ctx.arc(x, y, box_w*0.24, 0, 2*Math.PI);
  ctx.fill();


  window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);



function change_button(){
  window.cancelAnimationFrame(loop);
  befor_x_0 = x_0;
  x_0 = parseFloat(document.getElementById("body_X").value);
  theta_0 = parseFloat(document.getElementById("angle").value);
  K = parseFloat(document.getElementById("control_K").value);
  window.requestAnimationFrame(loop);
}
