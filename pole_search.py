import numpy as np
import matplotlib.pyplot as plt


k1 = -1
k2 = 2
k3 = -4
k4 = -1

M = 3
m = 1
l = 1
g = 9.8


def det_ABK(s):
    return s*((s-k2/M)*s*(s+k4/M/l) - m*g/M/M*k3*k1/l/M + k1*k4/l/M/M*s + (s-k2/M)*(-(M+m)*g/M/l+k3/l/M)) + (-k3/M*s*(s+k2/l/M) + m*g/M/M*k3*k1/l/M + k3/M*s*k3/l/M + k1/M*(k3/l/M-(m+M)*g/l/M))


x_min = -6.2
x_max = 6.2
x = np.arange(x_min,x_max,0.01)
y = det_ABK(x)


xx = [x_min,x_max]
yy = [0,0]
plt.plot(x,y)
plt.plot(xx,yy)
plt.show()
