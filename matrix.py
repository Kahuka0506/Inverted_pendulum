import numpy as np
import matplotlib.pyplot as plt

M = 3
m = 1
l = 1
g = 9.8

x = np.array([[-20],[0],[0.01],[0]])
A = np.array([[0,1,0,0],[0,0,-m/M*g,0],[0,0,0,1],[0,0,(m+M)/M/l*g,0]])
B = np.array([[0],[1/M],[0],[-1/l/M]])
C = np.array([[1,0,0,0],[0,0,1,0]])

f = 0

K = np.array([[1,-2,4,-2]])

print("A : ")
print(A)
print("B : ")
print(B)
print("C : ")
print(C)
print("K : ")
print(K)
print("A+BK : ")
print(A+np.dot(B,K))



ramda1 = -1
ramda2 = -2.6
ramda3 = -2.1
ramda4 = -3

I = np.array([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])

bb0 = ramda1*ramda2*ramda3*ramda4
bb1 = -(ramda1*ramda2*ramda3 + ramda1*ramda3*ramda4 + ramda1*ramda2*ramda4 + ramda4*ramda2*ramda3)
bb2 = ramda1*ramda2 + ramda2*ramda3 + ramda3*ramda4 + ramda1*ramda4
bb3 = -(ramda1 + ramda2 + ramda3 + ramda4)

KK = np.array([[M,0,M*l*l,0]])
AA = np.dot(A,A)
AAA = np.dot(AA,A)
AAAA = np.dot(AAA,A)
KA = AAAA + bb3*AAA + bb2*AA + bb1*A + bb0*I

K = np.dot(KK,KA)

print(K)




x_graph = [x[0][0]]
dx_graph = [x[1][0]]
theta_graph = [x[2][0]]
dtheta_graph = [x[3][0]]
t = [0]
dt = 0.01


for i in range(0,10000,1):
    t.append(t[i]+dt)
    x = np.dot((A+np.dot(B,K)),x) + B*f
    x_graph.append(x_graph[i] + dt*x[0][0])
    dx_graph.append(dx_graph[i] + dt*x[1][0])
    theta_graph.append(theta_graph[i] + dt*x[2][0])
    dtheta_graph.append(dtheta_graph[i] + dt*x[3][0])
    x[0][0] = x_graph[i+1]
    x[1][0] = dx_graph[i+1]
    x[2][0] = theta_graph[i+1]
    x[3][0] = dtheta_graph[i+1]



plt.plot(t,x_graph)
plt.show()
theta_graph = np.array(theta_graph)
plt.plot(t,theta_graph/np.pi*180)
plt.show()
