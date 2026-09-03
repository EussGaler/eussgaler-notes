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

则认为两模型在所规定的采样时刻和误差范围内近似等价（原连续模型与仿真模型的相似原理）。

#### （2）仿真建模方法的三个基本要求

稳定性：原系统稳定，则离散化的仿真系统也应稳定；需选择适当的数值方法与步长。

准确性：绝对误差准则

$$
|\hat y(t_n)-y(t_n)|\leq\delta,
$$

相对误差准则（$y(t_n)\neq0$）

$$
\left|\frac{\hat y(t_n)-y(t_n)}{y(t_n)}\right|\leq\delta,
$$

其中 $\delta$ 为规定精度的误差量。真值接近 $0$ 时，应结合绝对误差准则。

快速性：第 $n$ 步计算对应原系统时间间隔 $h_n=t_{n+1}-t_n$，计算机所需时间为 $T_n$。

- $T_n=h_n$：实时仿真。
- $T_n<h_n$：超实时仿真，也可通过等待与实际时间同步。
- $T_n>h_n$：慢于实时的仿真。

离线仿真不要求与实际时间同步，可以快于或慢于实时。

#### （3）数值积分法

考虑具有初值的单变量一阶常微分方程：

$$
\dot y=f(t,y),\qquad y(t_0)=y_0.
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

定义步长 $h=t_{k+1}-t_k$，积分项 $Q_k=\int_{t_k}^{t_{k+1}}f(t,y(t))\,\mathrm dt$。以数值近似代替 $Q_k$，得到 $y_{k+1}=y_k+Q_k$ 的数值递推。

根据 $Q_k$ 的不同计算方法，有不同数值积分法。

① Euler 法。

$$
Q_k\approx h f(t_k,y_k),
\qquad y_{k+1}=y_k+h f(t_k,y_k).
$$

即近似为矩形。

相当于 Taylor 展开舍去二次及以上项，故单步局部截断误差为 $O(h^2)$，全局误差为 $O(h)$。步长越小，截断误差通常越小。

舍入误差：由计算机有限精度产生的误差。步长越小，计算次数越多，舍入误差可能累积，故总误差并非一定随步长减小而减小。

Euler 法用折线代替曲线，精度较低，为单步法，属于自启动模式。

② 梯形法。

$$
Q_k\approx\frac h2\bigl(f(t_k,y_k)+f(t_{k+1},y_{k+1})\bigr).
$$

由于 $y_{k+1}$ 未知，梯形法是隐式法。可用 Euler 法先预估，再校正一次，得到预估—校正法：

$$
\begin{cases}
y_{k+1}^{(0)}=y_k+h f(t_k,y_k),&\text{预报公式},\\
y_{k+1}=y_k+\dfrac h2\bigl(f(t_k,y_k)+f(t_{k+1},y_{k+1}^{(0)})\bigr),&\text{校正公式}.
\end{cases}
$$

该单次校正格式即显式 Heun 法，精度高于 Euler 法，每步约需两次函数计算，可以自启动。其单步局部截断误差为 $O(h^3)$，全局误差为 $O(h^2)$；它不等同于完全求解隐式梯形方程。

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
K_1=f(t_k,y_k),\\
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

假定 $a_1=a_2$，有 $a_1=a_2=1/2$、$b_1=b_2=1$，得到二阶龙格—库塔公式（RK2）：

$$
\begin{cases}
y_{k+1}=y_k+\dfrac h2(K_1+K_2),\\
K_1=f(t_k,y_k),\\
K_2=f(t_k+h,y_k+hK_1).
\end{cases}
$$

其计算量与上述单次预估—校正法相同。

#### （2）四阶龙格—库塔法（RK4）

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

RK4 的公式不唯一。其单步局部截断误差为 $O(h^5)$，全局误差为 $O(h^4)$。

计算 $y_{k+1}$ 时只用到已有值 $y_k$，所以是单步法；不要求各步的 $h$ 固定，但在某一步的阶段计算中 $h$ 不变。

① 单步法／多步法：当从 $t_k$ 推到 $t_{k+1}$ 时，只需已有的 $t_k$ 时刻数据为单步法；若需用到 $t_k$ 及过去时刻 $t_{k-1},t_{k-2},\ldots$ 的数据，则为多步法。

② 显式／隐式：计算 $y_{k+1}$ 时，若右端各项均可直接由已知数据求得，则为显式法（如显式 Euler、上述 RK）；否则为隐式法（如隐式梯形法）。上述 Euler 预估并校正一次的格式仍为显式法。

③ 当方法和计算机确定后，在给定问题与计算区间下，仿真误差主要与步长有关。

#### （3）龙格—库塔法的一般形式

显式 RK 法：

$$
y_{k+1}=y_k+h\sum_{i=1}^{s}c_iK_i,
$$

其中 $s$ 为级数，即每步的阶段数，不是精度阶数。

$$
K_i=f\left(t_k+a_ih,y_k+h\sum_{j=1}^{i-1}b_{ij}K_j\right),
$$

$$
a_1=0,\qquad a_i=\sum_{j=1}^{i-1}b_{ij},\qquad\sum_{i=1}^{s}c_i=1.
$$

这些为基本一致性条件；更高精度阶数还需满足相应的高阶条件。

#### （4）龙格—库塔法的误差估计

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

低阶方法（三阶，使用前四个阶段）：

$$
\hat y_{k+1}=y_k+\frac h6(3K_1-9K_3+12K_4).
$$

估计当前步误差为

$$
E_k=\hat y_{k+1}-y_{k+1}
=\frac h6(2K_1-9K_3+8K_4-K_5).
$$

采用 $y_{k+1}$ 继续计算。该差值一般反映低阶公式的局部误差，不应无条件当作高阶解真实误差的精确值。

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

定义局部相对误差指标（$y_{k+1}\neq0$）

$$
e_k=\frac{|E_k|}{|y_{k+1}|}.
$$

设定误差上限 $\varepsilon_{\max}$ 和误差下限 $\varepsilon_{\min}$。

$$
\begin{cases}
e_k\geq\varepsilon_{\max}:&\text{拒绝本步，将 }h_k\text{ 减半并重算本步},\\
\varepsilon_{\min}<e_k<\varepsilon_{\max}:&\text{接受本步， }h_{k+1}=h_k,\\
e_k\leq\varepsilon_{\min}:&\text{接受本步， }h_{k+1}=2h_k.
\end{cases}
$$

解接近零时，应使用绝对误差与相对误差组合的尺度，避免除零。

② 最优步长法。

### 3. 线性多步法

RK 法在每一步都需要求取几个点上的斜率值，计算量较大。

线性多步法的核心思想为利用当前和过去多个时间步的已知函数值和导数值，来预测下一个时间步。

一般形式：

$$
y_{n+1}=\alpha_0y_n+\alpha_1y_{n-1}+\cdots+\alpha_ry_{n-r}
+h(\beta_{-1}f_{n+1}+\beta_0f_n+\cdots+\beta_rf_{n-r}).
$$

$\beta_{-1}\neq0$ 时为隐式公式，$\beta_{-1}=0$ 时为显式公式。

#### （1）预报公式的推导（$y_{n+k}$）

已知 $t_n,t_{n+1},\ldots,t_{n+k-1}$ 时刻的 $y_n,\ldots,y_{n+k-1}$ 及 $\dot y_n,\dot y_{n+1},\ldots,\dot y_{n+k-1}$，$y_{n+k}$、$\dot y_{n+k}$ 未知。

用一个 $m$ 次多项式 $y_m(t)$ 来拟合这些点，使得

$$
y_m(t_{n+k-j})=y_{n+k-j},\qquad
\dot y_m(t_{n+k-j})=\dot y_{n+k-j}.
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
y_{n+k-j}=\sum_{i=0}^{m}d_ij^i,
\qquad\dot y_{n+k-j}=-\frac1h\sum_{i=1}^{m}i d_ij^{i-1}.
$$

在新时刻有 $y_{n+k}\approx d_0$、$\dot y_{n+k}\approx-d_1/h$。

② 记预报的 $d_0,d_1,\ldots,d_m$ 为 $d_0^p,d_1^p,\ldots,d_m^p$。使用全部 $k$ 个函数值和 $k$ 个导数值时取 $m=2k-1$，写作矩阵形式：

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

记为 $V^p d^p=Z^p$，则 $d^p=(V^p)^{-1}Z^p$，从而 $y_{n+k}^{p}=d_0^p$、$\dot y_{n+k}^{p}=-d_1^p/h$。

③ 由于最终计算只需 $d_0,d_1$，为简化，引入 $e_1^{\mathrm T}=[1\ 0\ \cdots\ 0]$，则

$$
y_{n+k}^{p}=e_1^{\mathrm T}d^p=e_1^{\mathrm T}(V^p)^{-1}Z^p.
$$

定义辅助向量

$$
(\phi^p)^{\mathrm T}=e_1^{\mathrm T}(V^p)^{-1},
\qquad (V^p)^{\mathrm T}\phi^p=e_1.
$$

记

$$
(\phi^p)^{\mathrm T}=[a_1^p\ \cdots\ a_k^p\ b_1^p\ \cdots\ b_k^p],
$$

则

$$
y_{n+k}^{p}=(\phi^p)^{\mathrm T}Z^p
=\sum_{j=1}^{k}a_j^p y_{n+k-j}-h\sum_{j=1}^{k}b_j^p\dot y_{n+k-j}.
$$

#### （2）校正公式的推导（$\dot y_{n+k}$）

记校正的系数为 $d_0^c,\ldots,d_{m_c}^c$。由于已得到 $y_{n+k}$ 的预报值，可在上一矩阵中加入该点的函数值条件。

为使加入条件后的插值系统仍为方阵，校正多项式取 $m_c=2k$，并将原有各行扩展到该次数。

$$
\begin{bmatrix}
1&0&0&\cdots&0\\
&&\widetilde V^p&&
\end{bmatrix}
\begin{bmatrix}d_0^c\\\vdots\\d_{m_c}^c\end{bmatrix}
=\begin{bmatrix}y_{n+k}\\Z^p\end{bmatrix}.
$$

这里 $\widetilde V^p$ 是原函数值、导数值插值行扩展至 $2k+1$ 列的矩阵。记为 $V^cd^c=Z^c$。

引入 $e_2^{\mathrm T}=[0\ 1\ 0\ \cdots\ 0]$，则

$$
-h\dot y_{n+k}^{c}=e_2^{\mathrm T}d^c=e_2^{\mathrm T}(V^c)^{-1}Z^c.
$$

定义

$$
(\phi^c)^{\mathrm T}=e_2^{\mathrm T}(V^c)^{-1}
=[a_0^c\ \cdots\ a_k^c\ b_1^c\ \cdots\ b_k^c],
$$

有 $(V^c)^{\mathrm T}\phi^c=e_2$，

$$
\dot y_{n+k}^{c}=-\frac1h(\phi^c)^{\mathrm T}Z^c
=-\frac1h\left(\sum_{j=0}^{k}a_j^c y_{n+k-j}
-h\sum_{j=1}^{k}b_j^c\dot y_{n+k-j}\right).
$$

把新点导数与微分方程 $\dot y_{n+k}=f(t_{n+k},y_{n+k})$ 联立，可形成隐式校正方程。

#### （3）统一形式

预报公式和校正公式可统一为

$$
\sum_{i=0}^{k}\alpha_i y_{n+k-i}
-h\sum_{i=0}^{k}\beta_i\dot y_{n+k-i}=0.
$$

- $\alpha_0=0$、$\beta_0=1$ 时，显式给出 $\dot y_{n+k}$。
- $\alpha_0=-1$、$\beta_0=0$ 时，显式给出 $y_{n+k}$。
- $\alpha_0\neq0$、$\beta_0\neq0$ 时，为隐式校正公式。

对 Adams 型线性多步法，其构造是用插值多项式近似 $f(t,y(t))$，然后在 $[t_k,t_{k+1}]$ 上积分：

$$
Q_k=\int_{t_k}^{t_{k+1}}f(t,y(t))\,\mathrm dt
\approx\int_{t_k}^{t_{k+1}}p_r(t)\,\mathrm dt,
$$

$$
y_{k+1}=y_k+\int_{t_k}^{t_{k+1}}p_r(t)\,\mathrm dt.
$$

并非所有线性多步法都按此积分形式构造；另有对解插值后求导的构造方式。
