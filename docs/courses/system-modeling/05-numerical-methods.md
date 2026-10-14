# 系统建模与仿真（五）：连续系统仿真数值方法

## 七、经典的连续系统仿真建模方法学

### 1. 连续系统离散化原理

#### （1）连续模型与仿真模型

设系统模型为 $\dot y=f(y,u,t)$，$u(t)$ 为输入，$y(t)$ 为系统变量。令仿真时间间隔为 $h$，离散化后的输入为 $\hat u(t_n)$，系统变量为 $\hat y(t_n)$，其中 $t_n=nh$。

若 $\hat u(t_n)\approx u(t_n)$ 且 $\hat y(t_n)\approx y(t_n)$，即

$$
e_u(t_n)=\hat u(t_n)-u(t_n)\approx0,
\qquad e_y(t_n)=\hat y(t_n)-y(t_n)\approx0,
\quad n=0,1,2,\ldots,
$$

则认为两模型等价<span style="color:#c62828"><strong>（原连续模型与仿真模型的相似原理）</strong></span>。

#### <span style="color:#c62828">（2）仿真建模方法的三个基本要求</span>

<span style="color:#c62828"><strong>稳定性</strong></span>：原系统稳定，则离散化的仿真系统也应稳定。

<span style="color:#c62828"><strong>准确性</strong></span>：绝对误差准则

$$
|\hat y(t_n)-y(t_n)|\leq\delta,
$$

相对误差准则

$$
\left|\frac{\hat y(t_n)-y(t_n)}{\hat y(t_n)}\right|\leq\delta,
$$

其中 $\delta$ 为规定精度的误差量。

<span style="color:#c62828"><strong>快速性</strong></span>：第 $n$ 步计算对应原系统时间间隔 $h_n=t_{n+1}-t_n$，计算机所需时间为 $T_n$。

- $T_n=h_n$：实时仿真。
- $T_n<h_n$：超时仿真。
- $T_n>h_n$：亚实时仿真（离线仿真）。

#### （3）数值积分法

考虑具有初值的单变量一阶常微分方程：

$$
{\color{#c62828}
\dot y=f(t,y),\qquad y(t_0)=y_0.
}
$$

在 $[t_k,t_{k+1}]$ 上积分，得

$$
\int_{t_k}^{t_{k+1}}\frac{\mathrm dy}{\mathrm dt}\,\mathrm dt
=\int_{t_k}^{t_{k+1}}f(t,y(t))\,\mathrm dt,
$$

即

$$
y(t_{k+1})=y(t_k)+\int_{t_k}^{t_{k+1}}f(t,y(t))\,\mathrm dt.
$$

定义步长 $h=t_{k+1}-t_k$，积分项 $Q_k=\int_{t_k}^{t_{k+1}}f(t,y(t))\,\mathrm dt$，得 <span style="color:#c62828"><strong>$y_{k+1}=y_k+Q_k$</strong></span>。

根据 <span style="color:#c62828"><strong>$Q_k$</strong></span> 的不同计算方法，有不同数值积分法。

① Euler 法。

$$
Q_k=h f(t_k,y_k).
$$

即近似为矩形。

相当于 Taylor 展开舍去二次项，故<span style="color:#c62828"><strong>截断误差为 $O(h^2)$</strong></span>。步长越小，截断误差越小。

<span style="color:#c62828"><strong>舍入误差</strong></span>：由计算机精度产生的误差，步长越小，计算次数越多，误差越大。

Euler 法用折线代替曲线，精度较低，为单步法，属于自启动模式。

② 梯形法。

$$
Q_k=\frac h2\bigl(f(t_k,y_k)+f(t_{k+1},y_{k+1})\bigr).
$$

由于 $y_{k+1}$ 未知，需用 Euler 法迭代一次，即<span style="color:#c62828"><strong>预估—校正法</strong></span>：

$$
{\color{#c62828}
\begin{cases}
y_{k+1}^{(0)}=y_k+h f(t_k,y_k),&\text{预报公式},\\
y_{k+1}=y_k+\dfrac h2\bigl(f(t_k,y_k)+f(t_{k+1},y_{k+1}^{(0)})\bigr),&\text{校正公式}.
\end{cases}
}
$$

精度高于 Euler 法，计算量为其二倍，不能自启动。<span style="color:#c62828"><strong>截断误差为 $O(h^3)$</strong></span>。

### 2. 龙格—库塔法

#### （1）二阶龙格—库塔法

对于系统

$$
\begin{cases}\dot y=f(t,y),\\y(t_0)=y_0,\end{cases}
$$

假设其解为 $y(t)$。记 $t_{k+1}=t_k+h$，在 $t_k$ 处 Taylor 展开以求 $t_{k+1}$ 处的值，保留 $h^2$ 项，有

$$
y(t_{k+1})=y(t_k)+f(t_k,y(t_k))h
+\left.\frac12\left(\frac{\partial f}{\partial t}
+\frac{\partial f}{\partial y}\frac{\mathrm dy}{\mathrm dt}\right)h^2\right|_{t=t_k}
+O(h^3).\tag{1}
$$

假设数值格式为

$$
\begin{cases}
y_{k+1}=y_k+(a_1K_1+a_2K_2)h,\\
K_1=f(t_k,y_k)=\left.\dot y\right|_{t_k},\\
K_2=f(t_k+b_1h,y_k+b_2K_1h).
\end{cases}\tag{2}
$$

将 $K_2$ 在 $(t_k,y_k)$ 处展开，保留 $h$ 项，有

$$
K_2=f(t_k,y_k)+
\left.\left(\frac{\partial f}{\partial t}b_1+
\frac{\partial f}{\partial y}b_2K_1\right)h\right|_{(t_k,y_k)}+O(h^2).
$$

代入式 $(2)$，得

$$
y_{k+1}=y_k+(a_1+a_2)f(t_k,y_k)h
+\left.\left(a_2b_1\frac{\partial f}{\partial t}
+a_2b_2K_1\frac{\partial f}{\partial y}\right)h^2\right|_{(t_k,y_k)}+O(h^3).
$$

与式 $(1)$ 比较得

$$
a_1+a_2=1,\qquad a_2b_1=a_2b_2=\frac12.
$$

假定 $a_1=a_2$，有 $a_1=a_2=1/2$、$b_1=b_2=1$，得到二阶龙格—库塔公式<span style="color:#c62828"><strong>（RK2）</strong></span>：

$$
{\color{#c62828}
\begin{cases}
y_{k+1}=y_k+\dfrac h2(K_1+K_2),\\
K_1=f(t_k,y_k),\\
K_2=f(t_k+h,y_k+hK_1).
\end{cases}
}
$$

其计算量与预估—校正法相同。

#### <span style="color:#c62828">（2）四阶龙格—库塔法（RK4）</span>

同理，Taylor 展开保留到 $h^4$，可得常用的四阶龙格—库塔法：

$$
\begin{cases}
y_{k+1}=y_k+\dfrac h6(K_1+2K_2+2K_3+K_4),\\
K_1=f(t_k,y_k),\\
K_2=f\left(t_k+\dfrac h2,y_k+\dfrac h2K_1\right),\\
K_3=f\left(t_k+\dfrac h2,y_k+\dfrac h2K_2\right),\\
K_4=f(t_k+h,y_k+hK_3).
\end{cases}
$$

RK4 的公式不唯一。其截断误差为 $O(h^5)$。

计算 $y_{k+1}$ 时只用到已有值 $y_k$，所以是<span style="color:#c62828"><strong>单步法</strong></span>；不要求各步的 $h$ 固定，但在某一步的阶段计算中 $h$ 不变。

① 单步法／多步法：当从 $t_k$ 推到 $t_{k+1}$ 时，只需已有的 $t_k$ 时刻数据为单步法；若需用到 $t_k$ 及过去时刻 $t_{k-1},t_{k-2},\ldots$ 的数据，则为多步法。

② 显式／隐式：计算 $y_{k+1}$ 时，若 $y_k$、$Q_k$ 等数据均已知，则为显式法（如 Euler、RK），否则为隐式法（如预估—校正法）。

③ 当方法和计算机确定后，仿真误差只与步长有关。

#### （3）龙格—库塔法的一般形式

$$
y_{k+1}=y_k+h\sum_{i=1}^{s}c_iK_i,
$$

其中 $s$ 为级数。

$$
K_i=f\left(t_k+a_ih,y_k+h\sum_{j=1}^{i-1}b_{ij}K_j\right),
$$

$$
a_1=0,\qquad a_i=\sum_{j=1}^{i-1}b_{ij},\qquad\sum_{i=1}^{s}c_i=1.
$$

#### <span style="color:#c62828">（4）龙格—库塔法的误差估计</span>

找另一个低阶的龙格—库塔公式，两个公式计算结果之差作为估计的误差。

① RKM4 法。

高阶方法：龙格—库塔—默森（Merson）法，四阶五级公式：

$$
y_{k+1}=y_k+\frac h6(K_1+4K_4+K_5),
$$

其中

$$
\begin{aligned}
K_1&=f(t_k,y_k),\\
K_2&=f\left(t_k+\frac h3,y_k+\frac h3K_1\right),\\
K_3&=f\left(t_k+\frac h3,y_k+\frac h6(K_1+K_2)\right),\\
K_4&=f\left(t_k+\frac h2,y_k+\frac h8(K_1+3K_3)\right),\\
K_5&=f\left(t_k+h,y_k+\frac h2(K_1+4K_4-3K_3)\right).
\end{aligned}
$$

低阶方法（三阶四级公式）：

$$
\hat y_{k+1}=y_k+\frac h6(3K_1-9K_3+12K_4).
$$

估计当前步误差为

$$
E_k=\hat y_{k+1}-y_{k+1}
=\frac h6(2K_1-9K_3+8K_4-K_5).
$$

采用 $y_k$、$y_{k+1}$ 计算。

② RKF1–2 法。

高阶方法：

$$
y_{k+1}=y_k+\frac h{512}(K_1+510K_2+K_3),
$$

其中

$$
\begin{aligned}
K_1&=f(t_k,y_k),\\
K_2&=f\left(t_k+\frac h2,y_k+\frac h2K_1\right),\\
K_3&=f\left(t_k+h,y_k+\frac h{256}(K_1+255K_2)\right).
\end{aligned}
$$

低阶方法：

$$
\hat y_{k+1}=y_k+\frac h{256}(K_1+255K_2).
$$

误差估计为

$$
E_k=\hat y_{k+1}-y_{k+1}=\frac h{512}(K_1-K_3).
$$

③ 其他方法：RKF4–5 法、RKS4 法。

#### （5）步长控制

① 加倍—减半法。

定义局部误差

$$
e_k=\frac{E_k}{|y_{k+1}|}.
$$

设定误差上限 $\varepsilon_{\max}$ 和误差下限 $\varepsilon_{\min}$。

$$
\begin{cases}
e_k\geq\varepsilon_{\max}:&\text{拒绝本步，将 }h_k\text{ 减半并重算本步},\\
\varepsilon_{\min}<e_k<\varepsilon_{\max}:&\text{接受本步， }h_{k+1}=h_k,\\
e_k\leq\varepsilon_{\min}:&\text{接受本步， }h_{k+1}=2h_k.
\end{cases}
$$

② 最优步长法。

### 3. 线性多步法

RK 法在每一步都需要求取几个点上的斜率值，计算量较大。

线性多步法的核心思想为<span style="color:#c62828"><strong>利用当前和过去多个时间步的已知函数值和导数值，来预测下一个时间步。</strong></span>

一般形式：

$$
y_{n+1}=\alpha_0y_n+\alpha_1y_{n-1}+\cdots+\alpha_ry_{n-r}
+h(\beta_{-1}f_{n+1}+\beta_0f_n+\cdots+\beta_rf_{n-r}).
$$

$\beta_{-1}\neq0$ 时为隐式公式，$\beta_{-1}=0$ 时为显式公式。

#### （1）<span style="color:#c62828">预报公式</span>的推导<span style="color:#c62828">（$y_{n+k}$）</span>

已知 $t_n,t_{n+1},\ldots,t_{n+k-1}$ 时刻的 $y_n,\ldots,y_{n+k-1}$ 及 $\dot y_n,\dot y_{n+1},\ldots,\dot y_{n+k-1}$，$y_{n+k}$、$\dot y_{n+k}$ 未知。

<span style="color:#c62828"><strong>用一个 $m$ 次多项式 $y_m(t)$ 来拟合这些点，使得</strong></span>

$$
{\color{#c62828}
y_m(t_{n+k-j})=y_{n+k-j},\qquad
\dot y_m(t_{n+k-j})=\dot y_{n+k-j}.
}
$$

① 记

$$
y_m(t)=\sum_{i=0}^{m}d_i\left(\frac{t_{n+k}-t}{h}\right)^i
=\sum_{i=0}^{m}d_i\tau^i,
\qquad\tau=\frac{t_{n+k}-t}{h}.
$$

则

$$
\dot y_m(t)=-\frac1h\sum_{i=1}^{m}i d_i
\left(\frac{t_{n+k}-t}{h}\right)^{i-1}
=-\frac1h\sum_{i=1}^{m}i d_i\tau^{i-1}.
$$

由 $t_{n+k}-t_{n+k-j}=jh$，得

$$
\begin{aligned}
y_{n+k-j}&=y_m(t_{n+k-j})
=\sum_{i=0}^{m}d_i\left(\frac{t_{n+k}-t_{n+k-j}}h\right)^i
=\sum_{i=0}^{m}d_ij^i,\\
\dot y_{n+k-j}&=\dot y_m(t_{n+k-j})
=-\frac1h\sum_{i=1}^{m}i d_ij^{i-1}.
\end{aligned}
$$

在新时刻有 <span style="color:#c62828"><strong>$y_{n+k}=d_0$、$\dot y_{n+k}=-d_1/h$</strong></span>。

② 记预报的 $d_0,d_1,\ldots,d_m$ 为 $d_0^p,d_1^p,\ldots,d_m^p$。写作矩阵形式：

$$
\begin{bmatrix}
1&1&1&\cdots&1\\
1&2&2^2&\cdots&2^m\\
1&3&3^2&\cdots&3^m\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1&k&k^2&\cdots&k^m\\
0&1&2&\cdots&m\\
0&1&2\cdot2&\cdots&m\cdot2^{m-1}\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
0&1&2k&\cdots&mk^{m-1}
\end{bmatrix}
\begin{bmatrix}d_0^p\\d_1^p\\\vdots\\d_m^p\end{bmatrix}
=\begin{bmatrix}
y_{n+k-1}\\y_{n+k-2}\\\vdots\\y_n\\
-h\dot y_{n+k-1}\\-h\dot y_{n+k-2}\\\vdots\\-h\dot y_n
\end{bmatrix}.
$$

记为 <span style="color:#c62828"><strong>$V^p d^p=Z^p$</strong></span>，则 $d^p=(V^p)^{-1}Z^p$，从而 $y_{n+k}^{p}=d_0^p$、$\dot y_{n+k}^{p}=-d_1^p/h$。

③ 由于最终计算只需 $d_0,d_1$，为简化，引入 $e_1^{\mathrm T}=[1\ 0\ \cdots\ 0]$，则

$$
y_{n+k}^{p}=e_1^{\mathrm T}d^p=e_1^{\mathrm T}(V^p)^{-1}Z^p.
$$

<span style="color:#c62828"><strong>定义辅助矩阵</strong></span>

$$
{\color{#c62828}
(\phi^p)^{\mathrm T}=e_1^{\mathrm T}(V^p)^{-1},
\qquad (V^p)^{\mathrm T}\phi^p=e_1.
}
$$

记

$$
{\color{#c62828}
(\phi^p)^{\mathrm T}=[a_1^p\ \cdots\ a_k^p\ b_1^p\ \cdots\ b_k^p],
}
$$

则

$$
{\color{#c62828}
y_{n+k}^{p}=(\phi^p)^{\mathrm T}Z^p
=\sum_{j=1}^{k}a_j^p y_{n+k-j}-h\sum_{j=1}^{k}b_j^p\dot y_{n+k-j}.
}
$$

#### （2）校正公式的推导<span style="color:#c62828">（$\dot y_{n+k}$）</span>

记校正的 $d_0,\ldots,d_m$ 为 $d_0^c,\ldots,d_m^c$。由于已得到 $y_{n+k}$，可在（1）②中的矩阵中加一行：

$$
\begin{bmatrix}
1&0&0&\cdots&0\\
&&V^p&&
\end{bmatrix}
\begin{bmatrix}d_0^c\\\vdots\\d_m^c\end{bmatrix}
=\begin{bmatrix}y_{n+k}\\Z^p\end{bmatrix}.
$$

记为 $V^cd^c=Z^c$。

引入 $e_2^{\mathrm T}=[0\ 1\ 0\ \cdots\ 0]$，则

$$
-h\dot y_{n+k}^{c}=e_2^{\mathrm T}d^c=e_2^{\mathrm T}(V^c)^{-1}Z^c.
$$

定义

$$
(\phi^c)^{\mathrm T}=e_2^{\mathrm T}(V^c)^{-1}
=[a_0^c\ \cdots\ a_k^c\ b_1^c\ \cdots\ b_k^c],
$$

有 <span style="color:#c62828"><strong>$(V^c)^{\mathrm T}\phi^c=e_2$</strong></span>，

$$
{\color{#c62828}
\dot y_{n+k}^{c}=-\frac1h(\phi^c)^{\mathrm T}Z^c
=-\frac1h\left(\sum_{j=0}^{k}a_j^c y_{n+k-j}
-h\sum_{j=1}^{k}b_j^c\dot y_{n+k-j}\right).
}
$$

#### （3）统一形式

预报公式和校正公式可统一为

$$
{\color{#c62828}
\sum_{i=0}^{k}\alpha_i y_{n+k-i}
-h\sum_{i=0}^{k}\beta_i\dot y_{n+k-i}=0.
}
$$

- $\alpha_0=0$、$\beta_0=-1$ 时，显式给出 $\dot y_{n+k}$。
- $\alpha_0=-1$、$\beta_0=0$ 时，显式给出 $y_{n+k}$。
- $\alpha_0\neq0$、$\beta_0\neq0$ 时，为隐式校正公式。

线性多步法本质上是用插值多项式近似 $f(t,y)$，然后在 $[t_k,t_{k+1}]$ 上积分：

$$
Q_k=\int_{t_k}^{t_{k+1}}f(t,y(t))\,\mathrm dt
\approx\int_{t_k}^{t_{k+1}}p_r(t)\,\mathrm dt,
$$

$$
y_{k+1}=y_k+\int_{t_k}^{t_{k+1}}p_r(t)\,\mathrm dt.
$$
