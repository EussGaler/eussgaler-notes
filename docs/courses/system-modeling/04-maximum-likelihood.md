# 系统建模与仿真（四）：极大似然辨识

## 六、极大似然辨识

### 1. 极大似然估计法

设 $X$ 为离散型随机变量，概率函数为 $p(x;\theta)$。$X_1,\ldots,X_n$ 为取自 $X$ 的样本，则联合概率函数为

$$
\prod_{i=1}^{n}p(x_i;\theta),
$$

即事件 $X_1=x_1,\ldots,X_n=x_n$ 发生的概率为 $\prod_{i=1}^{n}p(x_i;\theta)$。记为<span style="color:#c62828"><strong>似然函数</strong></span>：

$$
{\color{#c62828}
L(\theta)=L(x_1,x_2,\ldots,x_n;\theta)
=\prod_{i=1}^{n}p(x_i;\theta).
}
$$

在 $\theta$ 取值范围内，我们需要选取 $\theta=\hat\theta$，使得 <span style="color:#c62828"><strong>$L(\hat\theta)$ 最大</strong></span>，即

$$
L(\hat\theta)=L(x_1,\ldots,x_n;\hat\theta)
=\max_{\theta\in\Theta}L(x_1,\ldots,x_n;\theta).
$$

令 $\mathrm dL(\theta)/\mathrm d\theta=0$。取对数，记 <span style="color:#c62828"><strong>$\ln L(\theta)$ 为对数似然函数</strong></span>，则有

$$
\frac{\mathrm d\ln L(\theta)}{\mathrm d\theta}=0.
$$

### 2. 考虑系统模型为线性差分方程

$$
y(k)=-a_1y(k-1)-\cdots-a_ny(k-n)
+b_0u(k)+\cdots+b_nu(k-n)+\xi(k),
$$

其中 <span style="color:#c62828"><strong>$\xi(k)\sim N(0,\sigma^2)$ 为高斯白噪声</strong></span>。由 $Y=\Phi\theta+\xi$，得 $\xi=Y-\Phi\theta$。

得似然函数

$$
L(\theta,\sigma^2)=p(\xi\mid\theta,\sigma^2)
=\frac1{(2\pi\sigma^2)^{N/2}}
\exp\left[-\frac1{2\sigma^2}(Y-\Phi\theta)^{\mathrm T}(Y-\Phi\theta)\right].
$$

$$
-\ln L(\theta,\sigma^2)=p(\xi\mid\theta,\sigma^2)
=\frac N2\ln\sigma^2+\frac N2\ln(2\pi)
+\frac1{2\sigma^2}(Y-\Phi\theta)^{\mathrm T}(Y-\Phi\theta).
$$

对 $\theta$、$\sigma^2$ 求偏导，令其为 $0$，可得

$$
{\color{#c62828}
\hat\theta_{\mathrm{ML}}
=(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}Y,
}
$$

过程同第五部分 1.（2）②。

$$
{\color{#c62828}
\hat\sigma^2_{\mathrm{ML}}
=\frac1N(Y-\Phi\hat\theta_{\mathrm{ML}})^{\mathrm T}
(Y-\Phi\hat\theta_{\mathrm{ML}}).
}
$$

当噪声为高斯白噪声时，$\theta$ 的极大似然估计与最小二乘估计等价。

### 3. ARMAX 模型的数值解法

考虑如下形式的模型：

$$
A(z^{-1})y(k)=B(z^{-1})u(k)+C(z^{-1})\varepsilon(k),
$$

$$
\begin{aligned}
A(z^{-1})&=1+a_1z^{-1}+\cdots+a_nz^{-n},\\
B(z^{-1})&=b_0+b_1z^{-1}+\cdots+b_nz^{-n},\\
C(z^{-1})&=1+c_1z^{-1}+\cdots+c_nz^{-n}.
\end{aligned}
$$

因此

$$
\varepsilon(k)=y(k)+\sum_{i=1}^{n}a_iy(k-i)
-\sum_{i=0}^{n}b_iu(k-i)-\sum_{i=1}^{n}c_i\varepsilon(k-i).
$$

令

$$
\theta=[a_1\ a_2\ \cdots\ a_n\ b_0\ b_1\ \cdots\ b_n\ c_1\ c_2\ \cdots\ c_n]^{\mathrm T},
$$

向量形式方程组可写为 $Y=\Phi\theta+\varepsilon$，即 $\varepsilon=Y-\Phi\theta$。

$\Phi$ 为 $y(k)$、$u(k)$、$\varepsilon(k)$ 观测值组成的矩阵。

其中

$$
\varepsilon=[\varepsilon(n+1)\ \cdots\ \varepsilon(n+N)]^{\mathrm T},
\qquad\varepsilon\sim N(0,\sigma^2I),
$$

噪声协方差矩阵为 $R=E[\varepsilon\varepsilon^{\mathrm T}]=\sigma^2I$。

#### （1）一般形式的非线性最小二乘问题

$$
{\color{#c62828}
\min_x f(x)=\frac12\sum_{i=1}^{n}f_i^2(x)=\frac12F^{\mathrm T}(x)F(x).
}
$$

其中 $x\in\mathbb R^m$ 为待优化的参数向量，$f_i(x)$ 为第 $i$ 个数据点的预测误差，为 $x$ 的非线性函数。

$F(x)=[f_1(x)\ \cdots\ f_n(x)]^{\mathrm T}$ 为残差向量函数。目标为最小化残差平方和的一半。

① 梯度计算。

$$
\nabla f(x)=\begin{bmatrix}\partial f/\partial x_1&\partial f/\partial x_2&\cdots&\partial f/\partial x_m\end{bmatrix}^{\mathrm T}.
$$

由 $f(x)=\frac12\sum_{i=1}^{n}f_i^2(x)$，得

$$
\frac{\partial f}{\partial x_j}
=\frac12\sum_{i=1}^{n}2f_i(x)\frac{\partial f_i}{\partial x_j}
=\sum_{i=1}^{n}f_i(x)\frac{\partial f_i}{\partial x_j}.
$$

得

$$
\nabla f(x)=\begin{bmatrix}
\sum_{i=1}^{n}f_i(x)\dfrac{\partial f_i}{\partial x_1}&
\sum_{i=1}^{n}f_i(x)\dfrac{\partial f_i}{\partial x_2}&\cdots&
\sum_{i=1}^{n}f_i(x)\dfrac{\partial f_i}{\partial x_m}
\end{bmatrix}^{\mathrm T}.
$$

记 Jacobian 矩阵为 $n\times m$ 矩阵：

$$
J(x)=\begin{bmatrix}
\dfrac{\partial f_1}{\partial x_1}&\dfrac{\partial f_1}{\partial x_2}&\cdots&\dfrac{\partial f_1}{\partial x_m}\\
\dfrac{\partial f_2}{\partial x_1}&\dfrac{\partial f_2}{\partial x_2}&\cdots&\dfrac{\partial f_2}{\partial x_m}\\
\vdots&\vdots&\ddots&\vdots\\
\dfrac{\partial f_n}{\partial x_1}&\dfrac{\partial f_n}{\partial x_2}&\cdots&\dfrac{\partial f_n}{\partial x_m}
\end{bmatrix}.
$$

则梯度可表示为 $\nabla f(x)=J^{\mathrm T}(x)F(x)$。

② Hessian 矩阵近似。

精确的 Hessian 矩阵为

$$
\nabla^2f(x)=\begin{bmatrix}
\dfrac{\partial^2f}{\partial x_1^2}&\dfrac{\partial^2f}{\partial x_1\partial x_2}&\cdots&\dfrac{\partial^2f}{\partial x_1\partial x_m}\\
\dfrac{\partial^2f}{\partial x_2\partial x_1}&\dfrac{\partial^2f}{\partial x_2^2}&\cdots&\dfrac{\partial^2f}{\partial x_2\partial x_m}\\
\vdots&\vdots&\ddots&\vdots\\
\dfrac{\partial^2f}{\partial x_m\partial x_1}&\dfrac{\partial^2f}{\partial x_m\partial x_2}&\cdots&\dfrac{\partial^2f}{\partial x_m^2}
\end{bmatrix}.
$$

由

$$
\begin{aligned}
\frac{\partial^2f}{\partial x_j\partial x_k}
&=\frac{\partial}{\partial x_k}\left(\sum_{i=1}^{n}f_i(x)\frac{\partial f_i}{\partial x_j}\right)\\
&=\sum_{i=1}^{n}\left(
\frac{\partial f_i}{\partial x_k}\frac{\partial f_i}{\partial x_j}
+f_i(x)\frac{\partial^2f_i}{\partial x_j\partial x_k}\right),
\end{aligned}
$$

可得

$$
\nabla^2f(x)=J^{\mathrm T}(x)J(x)+\sum_{i=1}^{n}f_i(x)\nabla^2f_i(x).
$$

<span style="color:#c62828"><strong>高斯—牛顿法的关键为忽略二阶项：</strong></span>

$$
\nabla^2f(x)\approx J^{\mathrm T}(x)J(x),
$$

只用一阶导数信息。

③ Gauss–Newton 迭代算法。

在当前迭代点 $x_k$ 处，对目标函数 $f(x)$ 进行二阶 Taylor 展开：

$$
f(x_k+\Delta x)=f(x_k)+\nabla f(x_k)^{\mathrm T}\Delta x
+\frac12\Delta x^{\mathrm T}\nabla^2f(x_k)\Delta x+R_2.
$$

为使近似函数最小，令

$$
\frac{\partial}{\partial\Delta x}
\left[f(x_k)+\nabla f(x_k)^{\mathrm T}\Delta x
+\frac12\Delta x^{\mathrm T}\nabla^2f(x_k)\Delta x\right]=0.
$$

得

$$
\nabla f(x_k)+\nabla^2f(x_k)\Delta x=0.
$$

得最优步长

$$
\Delta x=-[\nabla^2f(x_k)]^{-1}\nabla f(x_k).
$$

Newton 迭代公式为

$$
{\color{#c62828}
x_{k+1}=x_k+\Delta x=x_k-[\nabla^2f(x_k)]^{-1}\nabla f(x_k).
}
$$

代入②中的近似，得到 Gauss–Newton 公式：

$$
x_{k+1}=x_k-[J^{\mathrm T}(x_k)J(x_k)]^{-1}J^{\mathrm T}(x_k)F(x_k).
$$

#### （2）ARMAX 模型的似然函数

与前面同理，得似然函数

$$
p(\varepsilon\mid\theta,\sigma^2)=\frac1{(2\pi\sigma^2)^{N/2}}
\exp\left[-\frac1{2\sigma^2}\sum_{k=n+1}^{n+N}\varepsilon^2(k)\right].
$$

当 $\theta$ 为某个估计值时，将 $\varepsilon(k)$ 改写为 $v(k)$，得对数似然函数：

$$
\ln L=-\frac N2\ln(2\pi)-\frac N2\ln\sigma^2
-\frac1{2\sigma^2}\sum_{k=n+1}^{n+N}v^2(k).
$$

令 $\partial\ln L/\partial\sigma^2=0$，得

$$
\hat\sigma^2=\frac1N\sum_{k=n+1}^{n+N}v^2(k),
$$

其中

$$
{\color{#c62828}
v(k)=y(k)+\sum_{i=1}^{n}\hat a_i y(k-i)
-\sum_{i=0}^{n}\hat b_i u(k-i)-\sum_{i=1}^{n}\hat c_i v(k-i).\tag{1}
}
$$

将 $\sigma^2$ 的估计值代回 $\ln L$，得

$$
\ln L=-\frac N2-\frac N2\ln\left(\frac1N\sum_{k=n+1}^{n+N}v^2(k)\right)
-\frac N2\ln(2\pi).
$$

极大似然估计等价于

$$
{\color{#c62828}
\min_{\theta}V(\theta)=\sum_{k=n+1}^{n+N}v^2(k).
}
$$

#### （3）Newton–Raphson 法

由于 $V(\theta)$ 为非线性函数，只能通过迭代法求解。

① 选定初始值 $\hat\theta(0)$。对其中的参数 $a_1,\ldots,a_n,b_0,b_1,\ldots,b_n$，可按第 2 节中的 ARX 模型求解线性 LS 问题得到；$c_1,\ldots,c_n$ 可先假定为 $0$ 或小随机数。

② 目标优化函数：

$$
{\color{#c62828}J(\theta)=\frac12\sum_{k=n+1}^{n+N}v^2(k)},\qquad v(k)=y(k)-\hat y(k).
$$

计算梯度，由式 $(1)$，

$$
\frac{\partial v(k)}{\partial\hat a_i}
=y(k-i)-\sum_{j=1}^{n}\hat c_j\frac{\partial v(k-j)}{\partial\hat a_i},
$$

$$
\frac{\partial v(k)}{\partial\hat b_i}
=-u(k-i)-\sum_{j=1}^{n}\hat c_j\frac{\partial v(k-j)}{\partial\hat b_i},
$$

$$
\frac{\partial v(k)}{\partial\hat c_i}
=-v(k-i)-\sum_{j=1}^{n}\hat c_j\frac{\partial v(k-j)}{\partial\hat c_i}.
$$

由初始条件 $\partial v(k)/\partial\hat\theta=0$（$k\leq n$），可计算以上三式。

$$
\frac{\partial J}{\partial\hat\theta}
=\sum_{k=n+1}^{n+N}v(k)\frac{\partial v(k)}{\partial\hat\theta}.
$$

近似 Hessian 矩阵：同第 3 节（1）②，得

$$
\frac{\partial^2J}{\partial\hat\theta\,\partial\hat\theta^{\mathrm T}}
\approx\sum_{k=n+1}^{n+N}\frac{\partial v(k)}{\partial\hat\theta}
\frac{\partial v(k)}{\partial\hat\theta^{\mathrm T}}.
$$

迭代：同第 3 节（1）③，得

$$
{\color{#c62828}
\hat\theta(k+1)=\hat\theta(k)
-\left[
\left(\frac{\partial^2J}{\partial\theta\,\partial\theta^{\mathrm T}}\right)^{-1}
\frac{\partial J}{\partial\theta}
\right]_{\theta=\hat\theta(k)},
}
$$

得到新的估计值 $\hat\theta(k+1)$。

直至 $v(k)$ 方差的相对误差小于某个数，所得 $\hat\theta$ 即为极大似然估计值。

### 4. 递推极大似然估计（RML）

#### （1）在线辨识

每观测一次数据，就递推计算一次参数估计值的在线辨识算法。

设系统为 ARMAX 模型：

$$
A(z^{-1})y(k)=B(z^{-1})u(k)+C(z^{-1})v(k).
$$

令

$$
\theta=[a_1\ \cdots\ a_n\ b_0\ \cdots\ b_n\ c_1\ \cdots\ c_n]^{\mathrm T},
$$

目标优化函数

$$
J(\theta)=\frac12\sum_{k=n+1}^{n+N}v^2(k).
$$

#### （2）递推推导

① 将 $J(\theta)$ 写为递推形式：

$$
J_k(\theta)=J_{k-1}(\theta)+\frac12v_k^2(\theta).
$$

将 $J_{k-1}(\theta)$ 在 $\hat\theta_{k-1}$ 点 Taylor 展开，一阶导数近似为 $0$，有

$$
J_k(\theta)=
\frac12(\theta-\hat\theta_{k-1})^{\mathrm T}P_{k-1}^{-1}(\theta-\hat\theta_{k-1})
+\frac12\eta_k+\frac12v_k^2(\theta),\tag{2}
$$

其中

$$
P_{k-1}^{-1}=
\left.\frac{\partial^2J_{k-1}(\theta)}{\partial\theta\,\partial\theta^{\mathrm T}}\right|_{\hat\theta_{k-1}}
$$

为正定对称阵，$\eta_k$ 为 Taylor 展开的余项。

记 $v(n+k)$ 为 $v_k$，将 $v_k$ 在 $\hat\theta_{k-1}$ 点 Taylor 展开：

$$
v_k(\theta)\approx v_k(\hat\theta_{k-1})
+\left.\frac{\partial v_k}{\partial\theta}\right|_{\hat\theta_{k-1}}
(\theta-\hat\theta_{k-1}).\tag{3}
$$

令 $J_k^*(\theta)=2J_k(\theta)$，记 $\hat v_k=v_k(\hat\theta_{k-1})$，由式 $(2)$、$(3)$ 整理得

$$
\begin{aligned}
J_k^*(\theta)={}&
(\theta-\hat\theta_{k-1})^{\mathrm T}
\left[P_{k-1}^{-1}+\varphi_k^{(f)}\varphi_k^{(f)\mathrm T}\right]
(\theta-\hat\theta_{k-1})\\
&-2\hat v_k\varphi_k^{(f)\mathrm T}(\theta-\hat\theta_{k-1})
+\hat v_k^2+\eta_k,
\end{aligned}
$$

其中

$$
\varphi_k^{(f)}=-\left.\left(\frac{\partial v_k}{\partial\theta}\right)^{\mathrm T}\right|_{\hat\theta_{k-1}}
$$

为滤波回归向量。

② 记 $\tilde\theta_{k-1}=\theta-\hat\theta_{k-1}$，将 $J_k^*(\theta)$ 配为二次型：

$$
J_k^*(\theta)=
(\tilde\theta_{k-1}-r_k)^{\mathrm T}P_k^{-1}(\tilde\theta_{k-1}-r_k)+\eta_k^*,
$$

其中

$$
\begin{cases}
P_k^{-1}=P_{k-1}^{-1}+\varphi_k^{(f)}\varphi_k^{(f)\mathrm T},\\
r_k=P_k\varphi_k^{(f)}\hat v_k\triangleq G_k\hat v_k,\\
\eta_k^*=-r_k^{\mathrm T}P_k^{-1}r_k+\hat v_k^2+\eta_k.
\end{cases}\tag{4}
$$

定义

$$
\begin{aligned}
y_{k-i}^{(f)}&=\frac{\partial v_k}{\partial a_i}
=[\hat C(z^{-1})]^{-1}y_{k-i},\\
-u_{k-i}^{(f)}&=\frac{\partial v_k}{\partial b_i}
=-[\hat C(z^{-1})]^{-1}u_{k-i},\\
-v_{k-i}^{(f)}&=\frac{\partial v_k}{\partial c_i}
=-[\hat C(z^{-1})]^{-1}v_{k-i}.
\end{aligned}
$$

它们分别为 $y_{k-i}$、$u_{k-i}$、$v_{k-i}$ 的滤波值。因此

$$
\varphi_k^{(f)}=
[-y_{k-1}^{(f)}\ \cdots\ -y_{k-n}^{(f)}\ 
u_k^{(f)}\ u_{k-1}^{(f)}\ \cdots\ u_{k-n}^{(f)}\ 
\hat v_{k-1}^{(f)}\ \cdots\ \hat v_{k-n}^{(f)}]^{\mathrm T}.
$$

进一步：

$$
\begin{cases}
y_k^{(f)}=y_k-\hat c_1y_{k-1}^{(f)}-\cdots-\hat c_ny_{k-n}^{(f)},\\
u_k^{(f)}=u_k-\hat c_1u_{k-1}^{(f)}-\cdots-\hat c_nu_{k-n}^{(f)},\\
\hat v_k^{(f)}=\hat v_k-\hat c_1\hat v_{k-1}^{(f)}-\cdots-\hat c_n\hat v_{k-n}^{(f)},
\end{cases}
$$

其中

$$
\hat v_k=y_k+\sum_{i=1}^{n}\hat a_i y_{k-i}
-\sum_{i=0}^{n}\hat b_i u_{k-i}-\sum_{i=1}^{n}\hat c_i\hat v_{k-i}.
$$

③ 取 $\tilde\theta_{k-1}|_{\theta=\hat\theta_k}=r_k=G_k\hat v_k$ 为 $J_k^*(\theta)$ 的最小值。对式 $(4)$，由矩阵求逆引理，有

$$
P_k=P_{k-1}
-P_{k-1}\varphi_k^{(f)}\varphi_k^{(f)\mathrm T}P_{k-1}
\left(1+\varphi_k^{(f)\mathrm T}P_{k-1}\varphi_k^{(f)}\right)^{-1}.
$$

增益矩阵的递推公式：

$$
G_k=P_{k-1}\varphi_k^{(f)}
\left(1+\varphi_k^{(f)\mathrm T}P_{k-1}\varphi_k^{(f)}\right)^{-1}.
$$

#### （3）RML 算法

$$
\hat v_k=y_k-\varphi_k^{\mathrm T}\hat\theta_{k-1},
$$

$$
\varphi_k=[-y_{k-1}\ \cdots\ -y_{k-n}\ 
u_k\ u_{k-1}\ \cdots\ u_{k-n}\ 
\hat v_{k-1}\ \cdots\ \hat v_{k-n}]^{\mathrm T}.
$$

$y_k^{(f)}$、$u_k^{(f)}$、$\hat v_k^{(f)}$、$\varphi_k^{(f)}$ 的定义如（2）②所示。

$$
{\color{#c62828}
\begin{cases}
\hat\theta_k=\hat\theta_{k-1}+G_k\hat v_k,\\[3pt]
G_k=P_{k-1}\varphi_k^{(f)}
\left(1+\varphi_k^{(f)\mathrm T}P_{k-1}\varphi_k^{(f)}\right)^{-1},\\[3pt]
P_k=(I-G_k\varphi_k^{(f)\mathrm T})P_{k-1}.
\end{cases}
}
$$
