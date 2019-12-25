

const canvas = document.getElementById('canvas_p');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight*0.5;

let canvas_h = canvas.height;
let canvas_w = canvas.width;
let box_w = canvas_w/22;
let box_h = canvas_h/8;
let pend_h = box_h*3;


let M = 3;
let m = 1;
let l = 1;
let g = 9.8;
let y = canvas_h-box_h; //const.
let f = 0;
let dt = 0.006;

let ramda1 = -1;
let ramda2 = -2.6;
let ramda3 = -2.1;
let ramda4 = -3;
let k_x = 49.14;
let k_dx = 107.82;
let k_theta = 943.684;
let k_dtheta = 363.6;

ramda1 =  -3.1 ,ramda2 =  -2.6 ,ramda3 =  -2.1 ,ramda4 =  -4.3 ;
k_x =  218.3454 ,k_dx =  309.165 ,k_theta =  1657.3774 ,k_dtheta =  664.9050000000001 ;


let theta = 0;
theta = Math.PI/ 180*theta;
let x = -10;
let dx = 0;
let dtheta = 0;


let x_0 = 0;
let x_0_0 = 0;

document.getElementById('body_X').value = x_0;
document.getElementById('control_pole1').innerHTML = ramda1;
document.getElementById('control_pole2').innerHTML = ramda2;
document.getElementById('control_pole3').innerHTML = ramda3;
document.getElementById('control_pole4').innerHTML = ramda4;


let x_ve = [x,dx,theta,dtheta];

function Inverted_pendulum_function() {

  /*
  x = x + dt*x_ve[1];
  dx = dx + dt*(k_x/M*x_ve[0] + k_dx*x_ve[1]/M + (-m/M*g+k_theta/M)*x_ve[2] + k_dtheta/M*x_ve[3]);
  theta = theta + dt*x_ve[3];
  dtheta = dtheta + dt*(-k_x/M/l*x_ve[0] - k_dx*x_ve[1]/M/l + ((M+m)*g/M/l - k_theta/M/l)*x_ve[2] - k_dtheta/M/l*x_ve[3]);

  x_ve[0] = x;
  x_ve[1] = dx;
  x_ve[2] = theta;
  x_ve[3] = dtheta;
  */

  aas = M+m-m*l*Math.cos(theta)*Math.cos(theta);
  thth = f + m*l*dtheta*dtheta*Math.sin(theta) - m*l*g*Math.sin(theta)*Math.cos(theta);

  let old_theta = theta;

  f = k_x*(x - x_0_0) + k_dx*dx + k_theta*theta + k_dtheta*dtheta;
  if(x_0 < x_0_0) x_0_0 -= 0.1;
  else if(x_0 > x_0_0) x_0_0 += 0.1;

  x = x + dt*dx;
  dx = dx + dt*(thth/aas);
  theta = theta + dt*dtheta;
  dtheta = dtheta + dt*(g*Math.sin(old_theta) - Math.cos(old_theta)*thth/aas);


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

  ctx.fillStyle = "#f41745";
  if(f >= 0) ctx.fillRect(x+canvas_w/2-(box_w/2+f), y+box_h*0.48, box_w/2+f, box_h*0.1);
  else ctx.fillRect(x+canvas_w/2, y+box_h*0.48, box_w/2+Math.abs(f), box_h*0.1);

  ctx.fillStyle = "#f25a5a";
  ctx.fillRect(x_0_0+canvas_w/2, 0, 1, canvas_h);
  ctx.fillStyle = "#e42828";
  ctx.fillRect(x_0+canvas_w/2, 0, 2, canvas_h);

  ctx.fillStyle = "#374dbe";
  ctx.fillRect(x+canvas_w/2-box_w/2, y, box_w, box_h);

  ctx.save();
  ctx.fillStyle = "#374dbe";
  ctx.translate(x+canvas_w/2, y+box_w*0.17/2);
  ctx.rotate(theta-Math.PI/180*90);
  ctx.translate(-(x+canvas_w/2), -(y+box_w*0.17/2));
  ctx.fillRect(x+canvas_w/2, y, pend_h*l, box_w*0.17);
  ctx.restore();

  ctx.beginPath();
  ctx.fillStyle = "#142475";
  ctx.arc(x+canvas_w/2, y, box_w*0.24, 0, 2*Math.PI);
  ctx.fill();


  window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);



function change_button(){
  window.cancelAnimationFrame(loop);
  x_0 = parseFloat(document.getElementById("body_X").value);
  x_0_0 = x;
  window.requestAnimationFrame(loop);
}
