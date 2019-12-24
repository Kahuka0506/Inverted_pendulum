

const canvas = document.getElementById('canvas_p');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth*0.98;
canvas.height = window.innerHeight*0.3;

let canvas_h = canvas.height;
let canvas_w = canvas.width;
let box_w = canvas_w/30;
let box_h = canvas_h/10;
let pend_h = box_h*3;


let M = 3;
let m = 1;
let l = 1;
let g = 9.8;
let theta = 10;
theta = Math.PI/ 180*theta;
let x = canvas_w/2;
let y = canvas_h-box_h; //const.

let K = 200;

let f = 0;
let dx = 0;
let dtheta = 0;
let dt = 0.001;

let theta_0 = 0;
theta_0 = Math.PI/ 180*theta_0;
let x_0 = canvas_w/2+canvas_w*0.3;
let befor_x_0 = canvas_w/2+canvas_w*0.3;


document.getElementById('body_X').value = x_0;
document.getElementById('angle').value = theta_0/Math.PI*180;
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

let aas = 0;
let thth = 0;
let old_theta = 0;
let old_dtheta = 0;
let old_x = 0;
let old_dx = 0;
let theta_show_tex = 1;
let x_show_tex = 1;

function Inverted_pendulum_function() {
  aas = M+m-m*l*Math.cos(theta)*Math.cos(theta);
  thth = f + m*l*dtheta*dtheta*Math.sin(theta) - m*l*g*Math.sin(theta)*Math.cos(theta);
  old_theta = theta;
  old_dtheta = dtheta;
  old_dx = dx;
  old_x = x;

  f = (x_0 - x)*K-dx*K/8;

  x = x + dt*dx;
  dx = dx + dt*(thth/aas);
  //dx = 0;
  //x = x;

  theta = theta + dt*dtheta;
  dtheta = dtheta + dt*(g*Math.sin(old_theta) - Math.cos(old_theta)*thth/aas);


  theta_show_tex = theta *180 /Math.PI;
  theta_show_tex %= 360;
  document.getElementById('theta_show').innerHTML = theta_show_tex.toFixed(3) ;
  x_show_tex = x;
  document.getElementById('x_show').innerHTML = x_show_tex.toFixed(3) ;


}




function loop(timestamp) {
  //clear window
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = "#e42828";
  //control_x_basic
  //control_x_basic();
  //ctx.fillRect(x, 0, 1, canvas_h); //for control_x_basic

  //control_x_follow
  //control_x_follow();
  //ctx.fillRect(befor_x_0, 0, 1, canvas_h); //for control_x_follow


  Inverted_pendulum_function();
  ctx.fillRect(x_0, 0, 1, canvas_h);

  ctx.fillStyle = "#f41745";
  if(f >= 0) ctx.fillRect(x-(box_w/2+f/900), y+box_h*0.48, box_w/2+f/900, box_h*0.3);
  else ctx.fillRect(x, y+box_h*0.48, box_w/2+Math.abs(f)/900, box_h*0.3);

  ctx.fillStyle = "#374dbe";
  ctx.fillRect(x-box_w/2, y, box_w, box_h);

  ctx.beginPath();
  ctx.fillStyle = "#142475";
  ctx.arc(x, y, box_w*0.24, 0, 2*Math.PI);
  ctx.fill();

  ctx.save();
  ctx.fillStyle = "#142475";
  ctx.translate(x, y+box_w*0.17/2);
  ctx.rotate(theta-Math.PI/180*90);
  ctx.translate(-(x), -(y+box_w*0.17/2));
  ctx.fillRect(x, y, pend_h*l, box_w*0.17);
  ctx.restore();


  window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);



function change_button(){
  window.cancelAnimationFrame(loop);
  befor_x_0 = x_0;
  x_0 = parseFloat(document.getElementById("body_X").value);
  theta_0 = parseFloat(document.getElementById("angle").value);
  theta_0 = Math.PI/ 180*theta_0;
  K = parseFloat(document.getElementById("control_K").value);
  window.requestAnimationFrame(loop);
}
