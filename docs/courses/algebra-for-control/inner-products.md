# 控制理论中的代数基础（三）：内积空间与正交投影

前述商空间也可以这样理解：任何一个线性变换在原像上都是一个同构（双射），只不过抹去了一部分维度（核空间 $\operatorname{null}T$）。

例：若

$$
T:\mathbb R^3\to\mathbb R^2
$$

将 $(x,y,z)$ 垂直投影至 $(x,y,0)$，显然 $T$ 不是单射。$T$ 抹去了 $z$ 轴，即 $\operatorname{null}T$。因此 $T$ 不是“点到点”的映射，而是“直线到点”：同一条垂线上的所有点构成一个陪集。这种将输入打包的方式将 $T$ 变为了单射。

## 四、内积空间

> 线性空间关注加法、数乘结构；引入长度与角度的几何特征。

### 1. 复数域／实数域上的内积

**内积（inner product）**为一个函数，将 $V$ 中任意向量对映射为数值

$$
\langle u,v\rangle\in F,
$$

满足以下公理：

1. **正性（positivity）**：对任意 $v\in V$，

    $$
    \langle v,v\rangle\ge0;
    $$

2. **定性（definiteness）**：当且仅当 $v=0$ 时，

    $$
    \langle v,v\rangle=0;
    $$

3. 对任意 $u,v,w\in V$，

    $$
    \langle u+v,w\rangle=\langle u,w\rangle+\langle v,w\rangle;
    $$

4. 对任意 $u,v\in V$、$\lambda\in F$，

    $$
    \langle\lambda u,v\rangle=\lambda\langle u,v\rangle;
    $$

5. **共轭对称性（conjugate symmetry）**：对任意 $u,v\in V$，

    $$
    \langle u,v\rangle=\overline{\langle v,u\rangle}.
    $$

    在实数域中，

    $$
    \langle u,v\rangle=\langle v,u\rangle.
    $$

内积的基本性质：

1. 对任意 $u\in V$，

    $$
    \langle0,u\rangle=0,
    \qquad
    \langle u,0\rangle=0;
    $$

2. 对任意 $u,v,w\in V$，

    $$
    \langle u,v+w\rangle=\langle u,v\rangle+\langle u,w\rangle;
    $$

3. 对任意 $\lambda\in F$、$u,v\in V$，

    $$
    \langle u,\lambda v\rangle=\overline\lambda\langle u,v\rangle.
    $$

> 因为复向量的内积定义为（为确保 $\langle z,z\rangle\ge0$）
>
> $$
> \langle w,z\rangle=w_1\overline{z_1}+\cdots+w_n\overline{z_n}.
> $$
>
> 例：
>
> 1. $n$ 维内积：
>
>     $$
>     \langle x,y\rangle=x^{\mathrm T}y.
>     $$
>
> 2. 矩阵内积：
>
>     $$
>     \langle x,y\rangle=x^{\mathrm T}My,
>     \qquad M\text{ 正定}.
>     $$
>
> 3. 函数空间：
>
>     $$
>     \langle f,g\rangle=\int_a^b f(x)g(x)\,\mathrm dx.
>     $$

### 2. 范数与距离

1. $v\in V$ 的**范数（norm，即欧几里得长度）**为

    $$
    \|v\|=\sqrt{\langle v,v\rangle}.
    $$

    欧氏空间中 $x,y\in V$ 之间的**距离（distance）**定义为

    $$
    \|x-y\|.
    $$

    基本性质：

    - 当且仅当 $v=0$ 时，$\|v\|=0$；
    - 对任意 $\lambda\in F$，$\|\lambda v\|=|\lambda|\,\|v\|$。

2. **正交性**：若

    $$
    \langle x,y\rangle=0,
    $$

    则称它们正交（垂直），记作 $x\perp y$。

    对任意 $v\in V$，$0\perp v$；$0$ 是 $V$ 中唯一一个与自身正交的向量。

3. **勾股定理（Pythagorean theorem）**：设 $u,v\in V$，$u\perp v$，则

    $$
    \|u+v\|^2=\|u\|^2+\|v\|^2.
    $$

    > 证明：
    >
    > $$
    > \begin{aligned}
    > \|u+v\|^2
    > &=\langle u+v,u+v\rangle\\
    > &=\langle u,u\rangle+\langle u,v\rangle
    >     +\langle v,u\rangle+\langle v,v\rangle\\
    > &=\langle u,u\rangle+\langle v,v\rangle\\
    > &=\|u\|^2+\|v\|^2.
    > \end{aligned}
    > $$
    >
    > $\square$

4. **正交分解（orthogonal decomposition）**：设 $u,v\in V$，$v\ne0$，设标量

    $$
    c=\frac{\langle u,v\rangle}{\|v\|^2},
    $$

    令向量 $w=u-cv$，则

    $$
    \langle w,v\rangle=0,
    \qquad
    u=cv+w.
    $$

    **任何向量 $u$ 都能被分解为一个平行于 $v$ 的分量 $cv$ 和一个垂直于 $v$ 的分量 $w$。**

5. **柯西—施瓦茨不等式（Cauchy–Schwarz inequality）**：设 $u,v\in V$，则

    $$
    |\langle u,v\rangle|\le\|u\|\,\|v\|,
    $$

    当且仅当 $u$ 与 $v$ 共线时等号成立。

    证明：$v=0$ 时显然成立。$v\ne0$ 时，由 (4)，设

    $$
    u=\frac{\langle u,v\rangle}{\|v\|^2}v+w,
    \qquad w\perp v.
    $$

    由 (3)，

    $$
    \begin{aligned}
    \|u\|^2
    &=\left\|\frac{\langle u,v\rangle}{\|v\|^2}v\right\|^2+\|w\|^2\\
    &=\frac{|\langle u,v\rangle|^2}{\|v\|^2}+\|w\|^2\\
    &\ge\frac{|\langle u,v\rangle|^2}{\|v\|^2}.
    \end{aligned}
    $$

    即

    $$
    |\langle u,v\rangle|\le\|u\|\,\|v\|.
    $$

    当且仅当 $w=0$，即 $u,v$ 共线时取等。$\square$

    > 推论：设 $x_1,\ldots,x_n,y_1,\ldots,y_n\in\mathbb R$，则
    >
    > $$
    > (x_1y_1+\cdots+x_ny_n)^2
    > \le(x_1^2+\cdots+x_n^2)(y_1^2+\cdots+y_n^2).
    > $$
    >
    > 若 $f,g$ 为在 $[-1,1]$ 上连续的实值函数，则
    >
    > $$
    > \left|\int_{-1}^1 f(x)g(x)\,\mathrm dx\right|^2
    > \le
    > \left(\int_{-1}^1|f(x)|^2\,\mathrm dx\right)
    > \left(\int_{-1}^1|g(x)|^2\,\mathrm dx\right).
    > $$

6. **三角不等式（triangle inequality）**：

    $$
    \|u\|+\|v\|\ge\|u+v\|.
    $$

    **平行四边形等式（parallelogram law）**：

    $$
    \|u+v\|^2+\|u-v\|^2=2(\|u\|^2+\|v\|^2).
    $$

    在实内积空间中，两向量的**夹角（angle）**定义为

    $$
    \theta=\arccos\frac{\langle x,y\rangle}{\|x\|\,\|y\|},
    $$

    其中

    $$
    -1\le\frac{\langle x,y\rangle}{\|x\|\,\|y\|}\le1.
    $$

7. 定理：

    $$
    \|x\|=\max_{\|y\|=1}|\langle x,y\rangle|.
    $$

    即 $x$ 的长度等于它与空间中所有单位向量 $y$ 的内积绝对值的最大值。

    证明：

    $$
    |\langle x,y\rangle|
    \le\|x\|\,\|y\|=\|x\|.
    $$

    当 $x=0$ 时等式显然成立；当 $x\ne0$ 且

    $$
    y=\frac{x}{\|x\|}
    $$

    时，$|\langle x,y\rangle|=\|x\|$，取等。$\square$

8. 范数的推广：若一个将向量映射为实值的函数 $\|v\|$ 满足以下公理，则称为范数：

    1. 正定性：$\|v\|=0\iff v=0$；
    2. 齐次性：$\|\alpha v\|=|\alpha|\,\|v\|$；
    3. 三角不等式：对任意 $u,v$，$\|u+v\|\le\|u\|+\|v\|$。

    > 不一定线性，也不一定满足勾股定理。

9. $\mathbb R^n$ 中的 **$L_p$ 范数（$L_p$ norm）**：

    $$
    \|v\|_p=\left(\sum_{i=1}^n|v_i|^p\right)^{1/p}.
    $$

    **$L_\infty$ 范数（infinity norm）**：

    $$
    \|v\|_\infty=\max_i|v_i|.
    $$

### 3. 正交集合与坐标重构

1. **正交集合（orthogonal set）**：若一个集合中任何两个向量都互相正交，则称为正交集合。

2. 定理：任何包含非零向量的正交集合必定线性无关。

    > 证明：若
    >
    > $$
    > \sum_{i=1}^n c_iv_i=0,
    > $$
    >
    > 同乘 $v_i$ 得
    >
    > $$
    > c_i\|v_i\|^2=0,
    > $$
    >
    > 从而 $c_i=0$。$\square$

3. **坐标重构（coordinate reconstruction）**：在子空间 $V$ 中，设 $v_1,\ldots,v_n$ 为一组**正交基（orthogonal basis）**，若

    $$
    u=c_1v_1+\cdots+c_nv_n,
    $$

    则

    $$
    c_i=\frac{\langle u,v_i\rangle}{\|v_i\|^2},
    \qquad i=1,2,\ldots,n.
    $$

    > 由 (2) 易证。

    **正交投影（orthogonal projection）**：将 $u$ 投影至 $V$ 所在直线上。设投影向量 $w=cv$，令误差 $z=u-w=u-cv$，则 $z\perp v$，有

    $$
    \langle z,v\rangle=0
    =\langle u,v\rangle-c\|v\|^2,
    $$

    即

    $$
    c=\frac{\langle u,v\rangle}{\|v\|^2}.
    $$

    投影到高维子空间：设子空间 $W$ 有一组正交基 $v_1,\ldots,v_k$，将 $u$ 投影到 $W$ 得到 $w$，则

    $$
    w=\frac{\langle u,v_1\rangle}{\|v_1\|^2}v_1+\cdots+
    \frac{\langle u,v_k\rangle}{\|v_k\|^2}v_k,
    $$

    即分别投影到各正交基上再相加。

    > 证明同上。

4. **施密特正交化（Gram–Schmidt process）**。

利用原始基 $\{u_1,\ldots,u_k\}$ 构造正交基 $\{v_1,\ldots,v_k\}$：

$$
v_1=u_1,
$$

$$
v_2=u_2-\frac{\langle u_2,v_1\rangle}{\|v_1\|^2}v_1,
$$

$$
v_3=u_3-\frac{\langle u_3,v_1\rangle}{\|v_1\|^2}v_1
-\frac{\langle u_3,v_2\rangle}{\|v_2\|^2}v_2,
$$

$$
\cdots
$$

$$
v_k=u_k-
\frac{\langle u_k,v_1\rangle}{\|v_1\|^2}v_1-
\frac{\langle u_k,v_2\rangle}{\|v_2\|^2}v_2-
\cdots-
\frac{\langle u_k,v_{k-1}\rangle}{\|v_{k-1}\|^2}v_{k-1}.
$$

归纳易证两两正交。

**标准正交化（orthonormalization）**：令

$$
e_i=\frac{v_i}{\|v_i\|},
$$

可得一组**标准正交基（orthonormal basis）**，满足

$$
\langle e_j,e_i\rangle=
\begin{cases}
1,&i=j,\\
0,&i\ne j.
\end{cases}
$$

在标准正交基下，对任意 $v\in V$，

$$
v=\langle v,e_1\rangle e_1+\cdots+\langle v,e_n\rangle e_n.
$$

> 例：在 $L^2([ -\pi,\pi ])$ 实函数空间中（连续函数可视为其中的子空间），内积为
>
> $$
> \langle f,g\rangle=\int_{-\pi}^{\pi}f(x)g(x)\,\mathrm dx,
> $$
>
> 完整的无限三角函数序列构成一组标准正交基：
>
> $$
> \frac1{\sqrt{2\pi}},
> \frac{\cos x}{\sqrt\pi},
> \frac{\sin x}{\sqrt\pi},
> \frac{\cos2x}{\sqrt\pi},
> \frac{\sin2x}{\sqrt\pi},
> \ldots,
> \frac{\cos nx}{\sqrt\pi},
> \frac{\sin nx}{\sqrt\pi},
> \ldots.
> $$
>
> 标准正交化也可直接写为
>
> $$
> e_1=\frac{u_1}{\|u_1\|},
> $$
>
> $$
> e_2=\frac{u_2-\langle u_2,e_1\rangle e_1}
> {\|u_2-\langle u_2,e_1\rangle e_1\|},
> $$
>
> $$
> \cdots
> $$
>
> $$
> e_k=
> \frac{u_k-\langle u_k,e_1\rangle e_1-\cdots-\langle u_k,e_{k-1}\rangle e_{k-1}}
> {\|u_k-\langle u_k,e_1\rangle e_1-\cdots-\langle u_k,e_{k-1}\rangle e_{k-1}\|}.
> $$

5. 矩阵的 **QR 分解（QR decomposition）**：设 $V$ 为 $k$ 维空间，旧基

    $$
    Y=[y^{(1)}\ \cdots\ y^{(k)}]
    $$

    经施密特正交化得到标准正交基

    $$
    Q=[x^{(1)}\ \cdots\ x^{(k)}].
    $$

    这里**正交矩阵（orthogonal matrix）**默认为方阵，因此 $Q$ 满足：

    $$
    \boldsymbol{Q^{\mathrm T}Q=I},
    \qquad
    \boldsymbol{Q^{-1}=Q^{\mathrm T}}.
    $$

    用新基表示旧基：

    $$
    y^{(1)}=a_{11}x^{(1)},
    $$

    $$
    y^{(2)}=a_{12}x^{(1)}+a_{22}x^{(2)},
    $$

    $$
    \cdots
    $$

    $$
    y^{(k)}=a_{1k}x^{(1)}+\cdots+a_{kk}x^{(k)}.
    $$

    因而

    $$
    Y=Q
    \begin{bmatrix}
    a_{11}&a_{12}&\cdots&a_{1k}\\
    0&a_{22}&\cdots&a_{2k}\\
    \vdots&\vdots&\ddots&\vdots\\
    0&0&\cdots&a_{kk}
    \end{bmatrix}
    \triangleq QR,
    $$

    其中 $R$ 为**上三角矩阵（upper triangular matrix）**。

6. **标准正交列表（orthonormal list）**：向量列表 $e_1,\ldots,e_m$ 满足：当 $j=k$ 时 $\langle e_j,e_k\rangle=1$；当 $j\ne k$ 时 $\langle e_j,e_k\rangle=0$。

    因而

    $$
    \|a_1e_1+\cdots+a_me_m\|^2
    =|a_1|^2+\cdots+|a_m|^2.
    $$

    坐标表示定理：设 $V$ 的一组标准正交基为 $e_1,\ldots,e_n$。对任意 $v\in V$，有

    $$
    v=\langle v,e_1\rangle e_1+\cdots+\langle v,e_n\rangle e_n,
    $$

    $$
    \|v\|^2=|\langle v,e_1\rangle|^2+\cdots+|\langle v,e_n\rangle|^2.
    $$

### 4. 线性泛函与 Riesz 表示定理

1. **线性泛函（linear functional）**：将空间 $V$ 中的向量映射为标量域 $F$（实数／复数）的线性函数称为线性泛函，记作

    $$
    \varphi\in\mathcal L(V,F).
    $$

2. **Riesz 表示定理（Riesz representation theorem）**：$V$ 为有限维向量空间，且 $\varphi\in\mathcal L(V,F)$，必然存在唯一的 $u\in V$，使得对任意 $v\in V$ 均有

    $$
    \varphi(v)=\langle v,u\rangle.
    $$

    证明：取 $V$ 的一组标准正交基 $e_1,\ldots,e_n$。对任意 $v\in V$，

    $$
    v=\langle v,e_1\rangle e_1+\cdots+\langle v,e_n\rangle e_n.
    $$

    故

    $$
    \begin{aligned}
    \varphi(v)
    &=\langle v,e_1\rangle\varphi(e_1)+\cdots+\langle v,e_n\rangle\varphi(e_n)\\
    &=\langle v,\overline{\varphi(e_1)}e_1\rangle+\cdots+
    \langle v,\overline{\varphi(e_n)}e_n\rangle\\
    &=\left\langle v,
    \overline{\varphi(e_1)}e_1+\cdots+
    \overline{\varphi(e_n)}e_n
    \right\rangle\\
    &\triangleq\langle v,u\rangle.
    \end{aligned}
    $$

    即

    $$
    \boldsymbol{u=\overline{\varphi(e_1)}e_1+\cdots+
    \overline{\varphi(e_n)}e_n}.
    $$

    下面证唯一性。若

    $$
    \varphi(v)=\langle v,u_1\rangle=\langle v,u_2\rangle,
    $$

    则对任意 $v\in V$，

    $$
    \langle v,u_1-u_2\rangle=0.
    $$

    令 $v=u_1-u_2$，有

    $$
    \langle u_1-u_2,u_1-u_2\rangle=0,
    $$

    故 $u_1=u_2$。$\square$

    > 即：所有线性映射均可等价于求内积。

### 5. 正交补与正交投影

1. **正交补空间**：$U$ 为线性空间 $V$ 的子集，$U$ 的正交补为

    $$
    U^\perp=\{v\in V:\langle v,u\rangle=0,\ \forall u\in U\},
    $$

    即 $V$ 中所有与 $U$ 中每一个向量都正交的向量构成的集合。

    > 更多性质见第一篇“子空间的正交性”（原笔记第 5 页第 7 节）。

2. 基本性质：

    1. 若 $U$ 为 $V$ 的子集，则 $U^\perp$ 为 $V$ 的子空间；
    2. $\{0\}^\perp=V$，$V^\perp=\{0\}$；
    3. 若 $U$ 为 $V$ 的子空间，则 $U\cap U^\perp=\{0\}$；
    4. 若 $U\subset W$，则 $W^\perp\subset U^\perp$。

3. **正交投影算子（orthogonal projection operator）** $P_U$：设 $U$ 为 $V$ 的有限维子空间。对任意 $v\in V$，可写作

    $$
    v=u+w,
    \qquad u\in U,\quad w\in U^\perp.
    $$

    定义 $V$ 到 $U$ 的正交投影算子 $P_U$：

    $$
    P_Uv=u.
    $$

    > 例：$U$ 为一维子空间 $\operatorname{Span}(u)$，则
    >
    > $$
    > P_Uv=\frac{\langle v,u\rangle}{\|u\|^2}u.
    > $$

4. 正交投影的性质：对 $v\in V$ 及 $P_U$，有：

    1. $P_U$ 为一个线性映射，即 $P_U\in\mathcal L(V)$；
    2. 若 $u\in U$，则 $P_Uu=u$；
    3. 若 $w\in U^\perp$，则 $P_Uw=0$；
    4. $\operatorname{range}P_U=U$，$\operatorname{null}P_U=U^\perp$；
    5. **幂等性（idempotence）**：$P_U^2=P_U$；
    6. 范数不等式：$\|P_Uv\|\le\|v\|$；
    7. 若已知 $U$ 的标准正交基 $e_1,\ldots,e_m$，则

        $$
        P_Uv=\langle v,e_1\rangle e_1+\cdots+\langle v,e_m\rangle e_m.
        $$

5. **最佳逼近定理（best approximation theorem）**：设 $U$ 为 $V$ 的有限维子空间，$v\in V$。在 $U$ 的所有向量中，$v$ 在 $U$ 上的正交投影 $P_Uv$ 是距离 $v$ 最近的向量，即对任意 $u\in U$，

    $$
    \|v-P_Uv\|\le\|v-u\|.
    $$

    > 证明：
    >
    > $$
    > v-u=(v-P_Uv)+(P_Uv-u).
    > $$
    >
    > 其中 $v-P_Uv\in U^\perp$，$P_Uv-u\in U$，二者正交，由勾股定理显然成立。$\square$

6. **正交投影的矩阵表示**：设子空间 $W$ 由 $A$ 的列向量张成，即

    $$
    W=C(A),\qquad A\in\mathbb R^{n\times m},
    $$

    **并且这些列向量构成 $W$ 的一组基**。将 $\mathbb R^n$ 中的向量 $u$ 投影到 $W$ 上，设投影向量为 $w$，则

    $$
    \boxed{\boldsymbol{w=A(A^{\mathrm T}A)^{-1}A^{\mathrm T}u}}.
    $$

    证明：由 $w\in C(A)$，存在 $b\in\mathbb R^m$，使得

    $$
    w=Ab.
    $$

    又 $u-w\in W^\perp$，且

    $$
    W^\perp=C(A)^\perp=N(A^{\mathrm T}),
    $$

    故

    $$
    A^{\mathrm T}(u-w)=0.
    $$

    即

    $$
    0=A^{\mathrm T}u-A^{\mathrm T}w
    =A^{\mathrm T}u-A^{\mathrm T}Ab,
    $$

    得

    $$
    b=(A^{\mathrm T}A)^{-1}A^{\mathrm T}u.
    $$

    因而

    $$
    w=Ab=A(A^{\mathrm T}A)^{-1}A^{\mathrm T}u.
    $$

    记 $P_Wu=w$，则有 **$n\times n$ 的正交投影矩阵（orthogonal projection matrix）**

    $$
    \boxed{\boldsymbol{P_W=A(A^{\mathrm T}A)^{-1}A^{\mathrm T}}}.
    $$

    下面证明 $A^{\mathrm T}A$ 可逆，即证 $A^{\mathrm T}A$ 的列向量线性无关。设

    $$
    A^{\mathrm T}Ab=0.
    $$

    左乘 $b^{\mathrm T}$，得

    $$
    0=b^{\mathrm T}A^{\mathrm T}Ab=(Ab)^{\mathrm T}(Ab)=\|Ab\|^2,
    $$

    从而 $Ab=0$。由于 $A$ 的列向量为基，线性无关，故有 $b=0$，即 $A^{\mathrm T}A$ 的列向量线性无关。$\square$
