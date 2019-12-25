

const canvas = document.getElementById('canvas_p');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth*0.98;
canvas.height = window.innerHeight*0.3;

let canvas_h = canvas.height;
let canvas_w = canvas.width;
let box_w = canvas_w/27;
let box_h = canvas_h/8;
let pend_h = box_h*3;


let M = 3;
let m = 1;
let l = 1;
let g = 9.8;
let theta = 0.01;
theta = Math.PI/ 180*theta;
let x = -20;
let y = canvas_h-box_h; //const.


let ramda1 = -1;
let ramda2 = -2.6;
let ramda3 = -2.1;
let ramda4 = -3;

let k_x = 49.14;
let k_dx = 107.82;
let k_theta = 943.684;
let k_dtheta = 363.6;

let f = 0;
let dx = 0;
let dtheta = 0;
let dt = 0.01;

let theta_0 = 0;
theta_0 = Math.PI/ 180*theta_0;
let x_0 = 0+canvas_w/2;


document.getElementById('body_X').value = x_0;
document.getElementById('angle').value = theta_0/Math.PI*180;
document.getElementById('control_pole1').value = ramda1;
document.getElementById('control_pole2').value = ramda2;
document.getElementById('control_pole3').value = ramda3;
document.getElementById('control_pole4').value = ramda4;


let x_ve = [x,dx,theta,dtheta];

function Inverted_pendulum_function() {

  x = x + dt*x_ve[1];
  dx = dx + dt*(k_x/M*x_ve[0] + k_dx*x_ve[1]/M + (-m/M*g+k_theta/M)*x_ve[2] + k_dtheta/M*x_ve[3]);
  theta = theta + dt*x_ve[3];
  dtheta = dtheta + dt*(-k_x/M/l*x_ve[0] - k_dx*x_ve[1]/M/l + ((M+m)*g/M/l - k_theta/M/l)*x_ve[2] - k_dtheta/M/l*x_ve[3]);

  x_ve[0] = x;
  x_ve[1] = dx;
  x_ve[2] = theta;
  x_ve[3] = dtheta;

  let theta_show_tex = theta *180 /Math.PI;
  theta_show_tex %= 360;
  document.getElementById('theta_show').innerHTML = theta_show_tex.toFixed(3) ;
  let x_show_tex = x;
  document.getElementById('x_show').innerHTML = x_show_tex.toFixed(3) ;

}


function loop(timestamp) {
  //clear window
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  Inverted_pendulum_function();

  ctx.fillStyle = "#e42828";
  ctx.fillRect(x_0, 0, 1, canvas_h);

  ctx.fillStyle = "#374dbe";
  ctx.fillRect(x+canvas_w/2-box_w/2, y, box_w, box_h);

  ctx.beginPath();
  ctx.fillStyle = "#142475";
  ctx.arc(x+canvas_w/2, y, box_w*0.24, 0, 2*Math.PI);
  ctx.fill();

  ctx.save();
  ctx.fillStyle = "#142475";
  ctx.translate(x+canvas_w/2, y+box_w*0.17/2);
  ctx.rotate(theta-Math.PI/180*90);
  ctx.translate(-(x+canvas_w/2), -(y+box_w*0.17/2));
  ctx.fillRect(x+canvas_w/2, y, pend_h*l, box_w*0.17);
  ctx.restore();


  window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);



function change_button(){
  window.cancelAnimationFrame(loop);
/*
  x_0 = parseFloat(document.getElementById("body_X").value);
  theta_0 = parseFloat(document.getElementById("angle").value);
  theta_0 = Math.PI/ 180*theta_0;
*/
  window.requestAnimationFrame(loop);
}
