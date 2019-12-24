import numpy as np
import matplotlib.pyplot as plt

x = [0]
dx = [0]
theta = [10]
dtheta = [0]
f = [0]
t = [0]

M = 3
m = 1
l = 1
g = 9.8

K = 20
dt = 0.01

for i in range(0,10000,1):
    t.append(t[i]+dt)
    #f.append(1)
    #f.append((0-theta[i])*K-dtheta[i]*K/10)
    f.append(K*(100-x[i])-dx[i]*K/8)
    x.append(x[i] + dt*dx[i])
    dx.append(dx[i] + dt*(f[i] + m*l*dtheta[i]*dtheta[i]*np.sin(theta[i]) - m*l*g*np.sin(theta[i])*np.cos(theta[i]))/(M+m-m*l*np.cos(theta[i])*np.cos(theta[i])))
    theta.append(theta[i]+dt*dtheta[i])
    dtheta.append(dtheta[i] + dt*(g*np.sin(theta[i]) - (f[i] + m*l*dtheta[i]*dtheta[i]*np.sin(theta[i]) - m*l*g*np.sin(theta[i])*np.cos(theta[i]))/(M+m-m*l*np.cos(theta[i])*np.cos(theta[i]))*np.cos(theta[i])))

plt.plot(t,f)
plt.show()
plt.plot(t,x)
plt.show()
theta = np.array(theta)
plt.plot(t,theta/np.pi*180%360)
plt.show()
