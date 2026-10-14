# 系统建模与仿真（三）：最小二乘法辨识

## 五、最小二乘法辨识

古典辨识：脉冲响应法、阶跃响应法、频域响应法。

近代辨识：最小二乘法、极大似然法。

### 1. 基本的最小二乘估计

辨识对象：以<span style="color:#c62828"><strong>单输入单输出系统差分方程</strong></span>为模型<span style="color:#c62828"><strong>（SISO）</strong></span>。

辨识内容：<span style="color:#c62828"><strong>系统模型参数</strong></span>。

在模型阶次 $n$ 已知的情况下，根据系统的输入输出数据，估计差分方程的参数。

#### （1）基于输入、输出的系统模型

对 SISO 系统，

$$
\begin{cases}
x(k)+a_1x(k-1)+\cdots+a_nx(k-n)
=b_0u(k)+\cdots+b_nu(k-n),\\
y(k)=x(k)+v(k).
\end{cases}
$$

$u(k)$ 为输入，$x(k)$ 为理论输出，$y(k)$ 为观测值，$v(k)$ 为观测噪声。

代入 $x(k)=y(k)-v(k)$，得

$$
y(k)+a_1y(k-1)+\cdots+a_ny(k-n)
=b_0u(k)+\cdots+b_nu(k-n)+{\color{#c62828}\xi(k)},
$$

其中

$$
\xi(k)=v(k)+\sum_{i=1}^{n}a_iv(k-i).
$$

当前输出：

$$
y(k)=-a_1y(k-1)-\cdots-a_ny(k-n)
+b_0u(k)+\cdots+b_nu(k-n)+\xi(k).
$$

设<span style="color:#c62828"><strong>观测数据有 $n+N$ 个</strong></span>（已知 $u(1),y(1),\ldots,u(n+N),y(n+N)$），令 $k=n+1,\ldots,n+N$，有

$$
\begin{bmatrix}
y(n+1)\\y(n+2)\\\vdots\\y(n+N)
\end{bmatrix}
=\begin{bmatrix}
-y(n)&\cdots&-y(1)&u(n+1)&\cdots&u(1)\\
-y(n+1)&\cdots&-y(2)&u(n+2)&\cdots&u(2)\\
\vdots&&\vdots&\vdots&&\vdots\\
-y(n+N-1)&\cdots&-y(N)&u(n+N)&\cdots&u(N)
\end{bmatrix}
\begin{bmatrix}a_1\\\vdots\\a_n\\b_0\\\vdots\\b_n\end{bmatrix}
+\begin{bmatrix}\xi(n+1)\\\xi(n+2)\\\vdots\\\xi(n+N)\end{bmatrix}.
$$

记作

$$
Y_{N\times1}=\Phi_{N\times(2n+1)}\theta_{(2n+1)\times1}+\xi_{N\times1},
\qquad\text{即 }{\color{#c62828}Y=\Phi\theta+\xi}.
$$

$Y$ 为输出向量，$\Phi$ 为测量矩阵，$\theta$ 为参数向量，$\xi$ 为噪声向量；$N$ 为数据长度。

#### （2）基本的最小二乘法（LS，Least Squares）

在存在噪声 $\xi$，且数据长度 $N\gg2n+1$ 的情况下，<span style="color:#c62828"><strong>估计参数 $\theta$</strong></span>。

① 辨识准则：残差平方和最小。

残差 $e=Y-\hat Y$，$\hat Y$ 为用估计参数 $\hat\theta$ 得到的输出：$\hat Y=\Phi\hat\theta$。

指标函数：

$$
J=\sum_{k=n+1}^{n+N}e^2(k)
=e^{\mathrm T}e
=(Y-\Phi\hat\theta)^{\mathrm T}(Y-\Phi\hat\theta).
$$

最小二乘法即使 $J$ 最小：

$$
{\color{#c62828}
\hat\theta=\underset{\vartheta}{\operatorname{arg\,min}}\,
(Y-\Phi\vartheta)^{\mathrm T}(Y-\Phi\vartheta).
}
$$

② 估计 $\theta$：$J$ 为极值，即令 $\partial J/\partial\hat\theta=0$。

$$
\begin{aligned}
0&=\frac{\partial}{\partial\hat\theta}
(Y-\Phi\hat\theta)^{\mathrm T}(Y-\Phi\hat\theta)\\
&=\frac{\partial}{\partial\hat\theta}
\left(Y^{\mathrm T}Y-Y^{\mathrm T}\Phi\hat\theta
-\hat\theta^{\mathrm T}\Phi^{\mathrm T}Y
+\hat\theta^{\mathrm T}\Phi^{\mathrm T}\Phi\hat\theta\right)\\
&=\frac{\partial}{\partial\hat\theta}
\left(Y^{\mathrm T}Y-2\hat\theta^{\mathrm T}\Phi^{\mathrm T}Y
+\hat\theta^{\mathrm T}\Phi^{\mathrm T}\Phi\hat\theta\right)\\
&=-2\Phi^{\mathrm T}Y+2\Phi^{\mathrm T}\Phi\hat\theta.
\end{aligned}\tag{1}
$$

由 $Y^{\mathrm T}\Phi\hat\theta$ 为标量，

$$
Y^{\mathrm T}\Phi\hat\theta
=(Y^{\mathrm T}\Phi\hat\theta)^{\mathrm T}
=\hat\theta^{\mathrm T}\Phi^{\mathrm T}Y.
$$

<span style="color:#c62828"><strong>若 $\Phi^{\mathrm T}\Phi$ 可逆，则有</strong></span>

$$
{\color{#c62828}
\hat\theta=(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}Y.
}
$$

> 式 $(1)$ 用到了矩阵求导。设
>
> $$
> \theta=[\theta_1\ \cdots\ \theta_n]^{\mathrm T},
> \qquad b=[b_1\ \cdots\ b_n]^{\mathrm T}.
> $$
>
> 记 $f(\theta)=\theta^{\mathrm T}b=\theta_1b_1+\cdots+\theta_nb_n$，则
>
> $$
> \frac{\partial f}{\partial\theta}
> =\begin{bmatrix}\partial f/\partial\theta_1\\\vdots\\\partial f/\partial\theta_n\end{bmatrix}
> =\begin{bmatrix}b_1\\\vdots\\b_n\end{bmatrix}=b.
> $$
>
> 故有
>
> $$
> \frac{\partial(-2\hat\theta^{\mathrm T}\Phi^{\mathrm T}Y)}{\partial\hat\theta}
> =-2\Phi^{\mathrm T}Y.
> $$
>
> 对二次型 $f(\theta)=\theta^{\mathrm T}A\theta$，$A=(a_{ij})_{n\times n}$ 为对称阵，
>
> $$
> f(\theta)=\sum_{i=1}^{n}\sum_{j=1}^{n}\theta_i a_{ij}\theta_j,
> $$
>
> $$
> \frac{\partial f}{\partial\theta_k}
> =\sum_{j=1}^{n}a_{kj}\theta_j+\sum_{i=1}^{n}\theta_i a_{ik}
> =2\sum_{i=1}^{n}a_{ki}\theta_i.
> $$
>
> 则
>
> $$
> \frac{\partial f}{\partial\theta}
> =2\begin{bmatrix}\sum_{i=1}^{n}a_{1i}\theta_i\\\vdots\\\sum_{i=1}^{n}a_{ni}\theta_i\end{bmatrix}
> =2A\theta.
> $$
>
> 故有
>
> $$
> \frac{\partial(\hat\theta^{\mathrm T}\Phi^{\mathrm T}\Phi\hat\theta)}{\partial\hat\theta}
> =2\Phi^{\mathrm T}\Phi\hat\theta.
> $$
>

③ 若要求唯一的严格极小值，需 Hessian 正定。

由式 $(1)$，

$$
\nabla^2J=2\Phi^{\mathrm T}\Phi\succ0.
$$

即 $\Phi^{\mathrm T}\Phi$ 为正定阵。而 $\Phi$ 与输入、输出相关，需限定输入信号。若仅半正定，最小值仍可能存在，但参数解未必唯一。

#### （3）LS 对输入信号的要求

$$
\Phi^{\mathrm T}\Phi\succ0.
$$

将 $\Phi$ 按 $u$、$y$ 分块，有

$$
\Phi^{\mathrm T}\Phi=
\begin{bmatrix}\Phi_{yy}&\Phi_{yu}\\\Phi_{uy}&\Phi_{uu}\end{bmatrix}.
$$

在平稳、各态遍历等条件下，$N\to\infty$ 时，

$$
\lim_{N\to\infty}\frac1N\Phi^{\mathrm T}\Phi
=\begin{bmatrix}R_y&R_{yu}\\R_{uy}&R_u\end{bmatrix}\triangleq R.
$$

其中，矩阵块为

$$
R_y=\begin{bmatrix}
R_y(0)&\cdots&R_y(n-1)\\
\vdots&\ddots&\vdots\\
R_y(n-1)&\cdots&R_y(0)
\end{bmatrix},
$$

$$
R_{yu}=\begin{bmatrix}
-R_{uy}(-1)&-R_{uy}(0)&\cdots&-R_{uy}(n-1)\\
-R_{uy}(-2)&-R_{uy}(-1)&\cdots&-R_{uy}(n-2)\\
\vdots&\vdots&\ddots&\vdots\\
-R_{uy}(-n)&-R_{uy}(-n+1)&\cdots&-R_{uy}(0)
\end{bmatrix}=R_{uy}^{\mathrm T},
$$

$$
R_u=\begin{bmatrix}
R_u(0)&R_u(1)&\cdots&R_u(n)\\
R_u(1)&R_u(0)&\cdots&R_u(n-1)\\
\vdots&\vdots&\ddots&\vdots\\
R_u(n)&R_u(n-1)&\cdots&R_u(0)
\end{bmatrix}.
$$

上述带自变量的 $R_y(\tau)$、$R_u(\tau)$、$R_{uy}(\tau)$ 为自（互）相关函数 $R_{uy}(\tau)=E[u(t)y(t+\tau)]$。

若 $\Phi^{\mathrm T}\Phi$ 正定，则 $R$ 正定，因此矩阵 $R_u$ 正定。故 $J$ 为极小值 $\Longrightarrow$ 矩阵 $R_u$ 正定。

若 $u(k)$ 的 $(n+1)$ 阶相关矩阵 $R_u$ 为正定阵，则称 $u(k)$ 为 $(n+1)$ 阶<span style="color:#c62828"><strong>持续激励信号</strong></span>。

例：白噪声序列、<span style="color:#c62828"><strong>满足相应阶数条件的伪随机二进制噪声序列、有色噪声随机信号序列</strong></span>。

#### （4）最小二乘估计的概率性质

① 估计的无偏性。

若 $E[\hat\theta]=E[\theta]=\theta$，则 $\hat\theta$ 为 $\theta$ 的无偏估计。

由

$$
\begin{aligned}
E[\hat\theta]
&=E[(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}Y]\\
&=E[(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}(\Phi\theta+\xi)]\\
&=E[\theta+(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}\xi]\\
&=\theta+E[(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}\xi],
\end{aligned}
$$

得

$$
{\color{#c62828}
\text{LS 无偏}\quad\Longleftrightarrow\quad
E[(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}\xi]=0.
}
$$

其中

$$
\Phi^{\mathrm T}\xi=
\begin{bmatrix}
-y(n)&-y(n+1)&\cdots&-y(n+N-1)\\
\vdots&\vdots&&\vdots\\
-y(1)&-y(2)&\cdots&-y(N)\\
u(n+1)&u(n+2)&\cdots&u(n+N)\\
\vdots&\vdots&&\vdots\\
u(1)&u(2)&\cdots&u(N)
\end{bmatrix}
\begin{bmatrix}\xi(n+1)\\\xi(n+2)\\\vdots\\\xi(n+N)\end{bmatrix}.
$$

由 $y(k)$ 表达式可得，$y(k)$ 只与 $\xi(k),\xi(k-1),\ldots$ 有关，与 $\xi(k+1),\xi(k+2),\ldots$ 无关，故

$$
E[y(k)\xi(k+i)]=E[y(k)]E[\xi(k+i)].
$$

若 $\xi(k)$ 均值为 $0$，即 $E[\xi(k)]=0$，且与 $u(k)$ 无关，则 $E[\Phi^{\mathrm T}\xi]=0$，LS 为无偏估计。即：

<span style="color:#c62828"><strong>$\xi(k)$ 为零均值不相关随机序列且与 $u(k)$ 无关 $\Rightarrow$ LS 为无偏估计。</strong></span>

② 估计的一致性。

若 $\lim_{N\to\infty}\operatorname{Var}\tilde\theta=0$，则 $\hat\theta$ 为 $\theta$ 的一致性估计。

其中 $\operatorname{Var}\tilde\theta$ 为估计误差 $\tilde\theta=\theta-\hat\theta$ 的方差。

与①同理，得

$$
\tilde\theta=-(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}\xi,
$$

$$
\operatorname{Var}\tilde\theta
=E[\tilde\theta\tilde\theta^{\mathrm T}]
=E[(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}\xi\xi^{\mathrm T}\Phi(\Phi^{\mathrm T}\Phi)^{-1}].
$$

若 $\xi$ 为零均值不相关随机序列且与 $u(k)$ 无关，则 $\Phi^{\mathrm T}$ 与 $\xi$ 无关。

且展开 $\xi\xi^{\mathrm T}$ 可得

$$
E[\xi\xi^{\mathrm T}]=\sigma^2I_N,
$$

$\sigma^2$ 为 $\xi(k)$ 的方差。

$$
\begin{aligned}
\operatorname{Var}\tilde\theta
&=\sigma^2E[(\Phi^{\mathrm T}\Phi)^{-1}\Phi^{\mathrm T}\Phi(\Phi^{\mathrm T}\Phi)^{-1}]\\
&=\sigma^2E[(\Phi^{\mathrm T}\Phi)^{-1}],
\end{aligned}
$$

$$
\begin{aligned}
\lim_{N\to\infty}\operatorname{Var}\tilde\theta
&=\lim_{N\to\infty}\frac{\sigma^2}{N}
E\left[\left(\frac1N\Phi^{\mathrm T}\Phi\right)^{-1}\right]\\
&=\lim_{N\to\infty}\frac{\sigma^2}{N}R^{-1}=0.
\end{aligned}
$$

其中 $R$ 为总体协方差矩阵，定义如（3）中所示。由 $u(k)$ 为持续激励信号得 $R$ 正定，$R^{-1}$ 存在有限。

<span style="color:#c62828"><strong>$\xi(k)$ 为零均值不相关随机序列且与 $u(k)$ 无关 $\Rightarrow$ LS 为一致性估计。</strong></span>

③ 估计的有效性：$\hat\theta$ 的方差达到最小值。

充分条件：$\xi(k)$ 为零均值且服从正态分布的白噪声序列。

④ 估计的渐近正态性：参数估计值服从正态分布。

充分条件：$\xi(k)$ 为零均值且服从正态分布的白噪声序列。

#### （5）基本最小二乘法的偏差

由 $\xi(k)$ 表达式可得，$\xi(k)$ 为相关随机序列，故<span style="color:#c62828"><strong>基本最小二乘法为有偏估计</strong></span>。

修正算法：广义最小二乘、辅助变量方法。

### 2. 递推最小二乘法<span style="color:#c62828"><strong>（RLS）</strong></span>

若 $(n+N)$ 组观测数据时的 $\hat\theta$ 已知，又得到新的观测值 $u(n+N+1)$、$y(n+N+1)$，如何用最小二乘法<span style="color:#c62828"><strong>在线估计</strong></span>新的估计值 $\hat\theta$？

#### （1）递推推导

设已有长度为 $N$ 的 I/O 数据，由 LS 估计，有

$$
Y_N=\Phi_N\theta+\xi_N,
\qquad\hat\theta_N=(\Phi_N^{\mathrm T}\Phi_N)^{-1}\Phi_N^{\mathrm T}Y_N,
$$

$$
\tilde\theta_N=\theta-\hat\theta_N
=-(\Phi_N^{\mathrm T}\Phi_N)^{-1}\Phi_N^{\mathrm T}\xi_N.
$$

$$
\operatorname{Var}\tilde\theta_N
=\sigma^2(\Phi_N^{\mathrm T}\Phi_N)^{-1}.
$$

① 记 $P_N=(\Phi_N^{\mathrm T}\Phi_N)^{-1}$，则有

$$
\hat\theta_N=P_N\Phi_N^{\mathrm T}Y_N.\tag{2}
$$

对新的 I/O 数据 $u(n+N+1)$、$y(n+N+1)$，需得到

$$
\hat\theta_{N+1}=f\bigl(\hat\theta_N,u(n+N+1),y(n+N+1)\bigr).
$$

由

$$
y(n+N+1)=
\begin{bmatrix}-y(n+N)&\cdots&-y(N+1)&u(n+N+1)&\cdots&u(N+1)\end{bmatrix}\theta
+\xi(n+N+1),
$$

记为 $y_{N+1}=\psi_{N+1}^{\mathrm T}\theta+\xi_{N+1}$，故可将输入输出方程写作

$$
\begin{bmatrix}Y_N\\y_{N+1}\end{bmatrix}
=\begin{bmatrix}\Phi_N\\\psi_{N+1}^{\mathrm T}\end{bmatrix}\theta
+\begin{bmatrix}\xi_N\\\xi_{N+1}\end{bmatrix}.
$$

由 LS 可得

$$
\begin{aligned}
\hat\theta_{N+1}
&=\left(
\begin{bmatrix}\Phi_N\\\psi_{N+1}^{\mathrm T}\end{bmatrix}^{\mathrm T}
\begin{bmatrix}\Phi_N\\\psi_{N+1}^{\mathrm T}\end{bmatrix}
\right)^{-1}
\begin{bmatrix}\Phi_N\\\psi_{N+1}^{\mathrm T}\end{bmatrix}^{\mathrm T}
\begin{bmatrix}Y_N\\y_{N+1}\end{bmatrix}\\
&=(\Phi_N^{\mathrm T}\Phi_N+\psi_{N+1}\psi_{N+1}^{\mathrm T})^{-1}
(\Phi_N^{\mathrm T}Y_N+\psi_{N+1}y_{N+1}).
\end{aligned}
$$

记作

$$
\begin{cases}
\hat\theta_{N+1}=P_{N+1}(\Phi_N^{\mathrm T}Y_N+\psi_{N+1}y_{N+1}),\\
P_{N+1}=(P_N^{-1}+\psi_{N+1}\psi_{N+1}^{\mathrm T})^{-1}.
\end{cases}\tag{3}
$$

② 求 $P_{N+1}$：矩阵求逆引理（Woodbury 矩阵恒等式）。

若相应矩阵的逆均存在，则有

$$
(A+BC^{\mathrm T})^{-1}
=A^{-1}-A^{-1}B(I+C^{\mathrm T}A^{-1}B)^{-1}C^{\mathrm T}A^{-1}.
$$

两边乘 $A+BC^{\mathrm T}$ 易证。

令 $A=P_N^{-1}$、$B=\psi_{N+1}$、$C^{\mathrm T}=\psi_{N+1}^{\mathrm T}$，则有

$$
P_{N+1}=P_N-P_N\psi_{N+1}
(1+\psi_{N+1}^{\mathrm T}P_N\psi_{N+1})^{-1}
\psi_{N+1}^{\mathrm T}P_N.
$$

由于 $\psi_{N+1}^{\mathrm T}P_N\psi_{N+1}$ 为标量，可见矩阵求逆转化为了求倒数。

代入式 $(3)$，由式 $(2)$ 整理得

$$
\hat\theta_{N+1}=\hat\theta_N
+P_N\psi_{N+1}(1+\psi_{N+1}^{\mathrm T}P_N\psi_{N+1})^{-1}
(y_{N+1}-\psi_{N+1}^{\mathrm T}\hat\theta_N).
$$

#### <span style="color:#c62828">（2）RLS 算法</span>

$$
{\color{#c62828}
\begin{cases}
\hat\theta_{N+1}=\hat\theta_N+K_{N+1}(y_{N+1}-\psi_{N+1}^{\mathrm T}\hat\theta_N),\\[3pt]
K_{N+1}=P_N\psi_{N+1}(1+\psi_{N+1}^{\mathrm T}P_N\psi_{N+1})^{-1},\\[3pt]
P_{N+1}=P_N-P_N\psi_{N+1}(1+\psi_{N+1}^{\mathrm T}P_N\psi_{N+1})^{-1}\psi_{N+1}^{\mathrm T}P_N.
\end{cases}
}
$$

RLS 需获取两个初值：$\hat\theta_0$、$P_0$。

初值获取方法：取少量 I/O 数据（$N_0>2n+1$），用 LS 估算出 $\hat\theta_0$、$P_0$。

或直接取

$$
\hat\theta_0=0,\qquad P_0=c^2I_{(2n+1)\times(2n+1)},
$$

其中 $c$ 为充分大的数。
