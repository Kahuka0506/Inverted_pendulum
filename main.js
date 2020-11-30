

const canvas = document.getElementById('canvas_p');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth*0.78;
canvas.height = window.innerHeight*0.55;

let canvas_h = canvas.height;
let canvas_w = canvas.width;
let box_w = canvas_w/20;
let box_h = canvas_h/9;
let pend_h = box_h*3;


let M = 3;
let m = 2;
let l = 1.3;
let g = 9.8;
let y = canvas_h-box_h; //const.
let f = 0;
let dt = 0.001;

let ramda1 = -1;
let ramda2 = -2.6;
let ramda3 = -2.1;
let ramda4 = -3;
let k_x = 49.14;
let k_dx = 107.82;
let k_theta = 943.684;
let k_dtheta = 363.6;


//ramda1 =  -3.1 ,ramda2 =  -2.6 ,ramda3 =  -2.1 ,ramda4 =  -4.3 ;
//k_x =  218.3454 ,k_dx =  309.165 ,k_theta =  1657.3774 ,k_dtheta =  664.9050000000001 ;

ramda1 =  -1.0 ,ramda2 =  -0.9 ,ramda3 =  -2.1 ,ramda4 =  -1.3 ;
k_x =  7.371 ,k_dx =  24.741000000000007 ,k_theta =  867.2959130769233 ,k_dtheta =  275.54229000000004 ;
                
                    
function calculate_K(){
    
    
    let A = [[0,1,0,0],[0,0,-m/M*g,0],[0,0,0,1],[0,0,(m+M)/M/l*g,0]];
    let AA = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            AA[i][j] = 0.0;
            for(let k = 0; k < 4; k++){
                AA[i][j] += A[i][k]*A[k][j];
                
            }
        }
    }
    let AAA = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            AAA[i][j] = 0.0;
            for(let k = 0; k < 4; k++){
                AAA[i][j] += AA[i][k]*A[k][j];
                
            }
        }
    }
    let AAAA = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            AAAA[i][j] = 0.0;
            for(let k = 0; k < 4; k++){
                AAAA[i][j] += AAA[i][k]*A[k][j];
                
            }
        }
    }
                        
    let I = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];

    let K = [k_x,k_dx,k_theta,k_dtheta];
    let KK = [M,0,M*l*l,0];

             
                        
                        
    let bb0 = ramda1*ramda2*ramda3*ramda4;
    let bb1 = -(ramda1*ramda2*ramda3 + ramda1*ramda3*ramda4 + ramda1*ramda2*ramda4 + ramda4*ramda2*ramda3);
    let bb2 = ramda1*ramda2 + ramda2*ramda3 + ramda3*ramda4 + ramda1*ramda4;
    let bb3 = -(ramda1 + ramda2 + ramda3 + ramda4);

                        
    let KA = AAAA;

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            KA[i][j] += (bb3*AAA[i][j] + bb2*AA[i][j] + bb1*A[i][j] + bb0*I[i][j]);
            
        }
        
    }
    
    
    for(let i = 0; i < 4; i++){
        K[i] = 0.0;
        for(let j = 0; j < 4; j++){
            K[i] += KK[j]*KA[j][i];
        }
        
    }
    
    
  k_x = K[0];
  k_dx = K[1];
  k_theta = K[2];
  k_dtheta = K[3];
                        
                        
  document.getElementById('K_0_show').innerHTML = K[0].toFixed(3) ;
  document.getElementById('K_1_show').innerHTML = K[1].toFixed(3) ;
  document.getElementById('K_2_show').innerHTML = K[2].toFixed(3) ;
  document.getElementById('K_3_show').innerHTML = K[3].toFixed(3) ;

}

calculate_K();
                    
                    
let theta = 30;
theta = Math.PI/ 180*theta;
let x = 0;
let dx = 0;
let dtheta = 0;


let x_0 = 0;
let x_0_0 = 0;

document.getElementById('body_X').value = x_0;
document.getElementById('ramda1_in').value = ramda1;
document.getElementById('ramda2_in').value = ramda2;
document.getElementById('ramda3_in').value = ramda3;
document.getElementById('ramda4_in').value = ramda4;


let x_ve = [x,dx,theta,dtheta];
let dv = 0;
let changing = 0;
let dist = 0;

function Inverted_pendulum_function() {

  aas = M+m-m*l*Math.cos(theta)*Math.cos(theta);
  thth = f + m*l*dtheta*dtheta*Math.sin(theta) - m*l*g*Math.sin(theta)*Math.cos(theta);

  let old_theta = theta;

  f = k_x*(x - x_0_0) + k_dx*(dx-dv) + k_theta*theta + k_dtheta*dtheta;
  if(changing == 1){
    dv = 0;
    if(x_0 < x_0_0) changing = 2;
    else if (x_0 > x_0_0) changing = 3;
  }else if(changing == 2){
    if(x_0_0 - x_0 >= 3*dist/4) dv -= 0.01,x_0_0 += dv*dt;
    else if (x_0_0 - x_0 >= dist/4) dv += 0,x_0_0 += dv*dt;
    else if(x_0_0 - x_0 > 0){
      dv += 0.01,x_0_0 += dv*dt;
      if(dv >= 0) x_0_0 = x_0, changing = 0,　dv = 0;
    }else {
      x_0_0 = x_0, changing = 0,　dv = 0;
    }
  }else if (changing == 3) {
    if(-x_0_0 + x_0 >= 3*dist/4) dv += 0.01,　x_0_0 += dv*dt;
    else if (-x_0_0 + x_0 >= dist/4) dv += 0,　x_0_0 += dv*dt;
    else if(-x_0_0 + x_0 > 0){
      dv -= 0.01, x_0_0 += dv*dt;
      if(dv <= 0) x_0_0 = x_0, changing = 0,　dv = 0;
    }else {
      x_0_0 = x_0, changing = 0,　dv = 0;
    }
  }


  x = x + dt*dx;
  dx = dx + dt*(thth/aas);
  theta = theta + dt*dtheta;
  dtheta = dtheta + dt*(g*Math.sin(old_theta) - Math.cos(old_theta)*thth/aas);


  let theta_show_tex = theta *180 /Math.PI;
  //theta_show_tex %= 360;
  document.getElementById('theta_show').innerHTML = theta_show_tex.toFixed(3) ;
  let x_show_tex = x;
  document.getElementById('x_show').innerHTML = x_show_tex.toFixed(3) ;

}


function loop(timestamp) {
  //clear window
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < 34; i++) {
    Inverted_pendulum_function();
  }

  ctx.fillStyle = "#f41745";
  if(f >= 0) ctx.fillRect(x+canvas_w/2-(box_w/2+f*2), y+box_h*0.48, box_w/2+f*2, box_h*0.1);
  else ctx.fillRect(x+canvas_w/2, y+box_h*0.48, box_w/2+Math.abs(f*2), box_h*0.1);

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
  if(changing == 0){
    window.cancelAnimationFrame(loop);
    x_0 = parseFloat(document.getElementById("body_X").value);
    ramda1 = parseFloat(document.getElementById("ramda1_in").value);
    ramda2 = parseFloat(document.getElementById("ramda2_in").value);
    ramda3 = parseFloat(document.getElementById("ramda3_in").value);
    ramda4 = parseFloat(document.getElementById("ramda4_in").value);
    calculate_K();
      
    
      
      
    x_0_0 = x;
    dist = Math.abs(x_0_0 - x_0);
    changing = 1;
    window.requestAnimationFrame(loop);
  }

}
