# 控制理论中的代数基础（二）：线性变换与商空间

## 三、线性变换

### 1. 线性变换

一个从向量空间 $V$ 到向量空间 $W$ 的映射 $T$ 被称为**线性变换（linear transformation）**，如果它满足：

1. **可加性（additivity）**：

    $$
    T(v_1+v_2)=T(v_1)+T(v_2);
    $$

2. **齐次性（homogeneity）**：

    $$
    T(\alpha v)=\alpha T(v).
    $$

1. 若初始空间 $V$ 和目标空间 $W$ 是同一个空间，我们将线性变换 $T:V\to V$ 称为 $V$ 上的**线性算子（linear operator）**。

2. $\mathcal L(V,W)$ 表示从 $V$ 到 $W$ 的所有线性变换的集合。

3. 基本性质：

    1. $T(0_V)=0_W$；
    2. $T(\alpha_1v_1+\cdots+\alpha_nv_n)=\alpha_1T(v_1)+\cdots+\alpha_nT(v_n)$；
    3. $T(-v)=-T(v)$。

### 2. 零空间与值域

对 $T\in\mathcal L(V,W)$，定义**零空间（null space，又称核 kernel）**

$$
\operatorname{null}T=\{v\in V:T(v)=0_W\}.
$$

**值域（range，又称像 image）**：向量空间 $V$ 在 $T$ 映射下的像记为 $T(V)$ 或 $\operatorname{range}T$。

于是，$\operatorname{null}T$ 是 $V$ 的子空间，$\operatorname{range}T$ 是 $W$ 的子空间。

### 3. 单射与满射

**单射（injection）**：若 $T(u)=T(v)$ 必然有 $u=v$，则称函数 $T:V\to W$ 为单射。

**满射（surjection）**：若 $\operatorname{range}T=W$，则称函数 $T:V\to W$ 为满射。

1. 定理：$T$ 是单射，当且仅当

    $$
    \operatorname{null}T=\{0_V\}.
    $$

2. 既是单射又是满射的函数称为**双射（bijection）**。

### 4. 线性变换基本定理（rank–nullity theorem）

设 $V$ 是有限维向量空间，且 $T\in\mathcal L(V,W)$，则 $\operatorname{range}T$ 也是有限维的，且满足公式

$$
\boxed{\boldsymbol{\dim V=\dim\operatorname{null}T+\dim\operatorname{range}T}}.
$$

证明：设 $\dim V=n$，$\dim\operatorname{null}T=m$，只需证 $\dim\operatorname{range}T=n-m$。

设 $\operatorname{null}T$ 的一组基为 $u_1,\ldots,u_m$，并扩充为 $V$ 的一组基

$$
u_1,\ldots,u_m,v_1,\ldots,v_{n-m}.
$$

对任意 $v\in V$，可表示为

$$
v=c_1u_1+\cdots+c_mu_m+d_1v_1+\cdots+d_{n-m}v_{n-m}.
$$

于是

$$
T(v)=d_1T(v_1)+\cdots+d_{n-m}T(v_{n-m}),
$$

即 $\operatorname{range}T$ 可由 $T(v_1),\ldots,T(v_{n-m})$ 张成。只需证明它们线性无关。若

$$
d_1T(v_1)+\cdots+d_{n-m}T(v_{n-m})=0,
$$

则

$$
T(d_1v_1+\cdots+d_{n-m}v_{n-m})=0,
$$

故 $d_1v_1+\cdots+d_{n-m}v_{n-m}\in\operatorname{null}T$，进而 $d_1=\cdots=d_{n-m}=0$。$\square$

1. 若 $T(x)=Ax$，其中 $A\in\mathbb R^{m\times n}$，则

    $$
    T\in\mathcal L(\mathbb R^n,\mathbb R^m),\qquad
    \operatorname{null}T=N(A),\qquad
    \operatorname{range}T=C(A).
    $$

2. 对 $T\in\mathcal L(V,W)$：

    - 若 $\dim V>\dim W$，则 $T$ 必不是单射；
    - 若 $\dim V<\dim W$，则 $T$ 必不是满射。

    > 由上述维数结论易证：若 $A\in\mathbb R^{m\times n}$ 且 $m<n$，则方程 $Ax=0$ 必存在非零解。

### 5. 线性变换的矩阵表示

1. 设 $T\in\mathcal L(\mathbb R^n,\mathbb R^m)$，必定存在一个矩阵 $A_{m\times n}$，使得对所有 $x\in\mathbb R^n$ 都有

    $$
    T(x)=Ax.
    $$

    事实上，

    $$
    A=[T(e_1)\ T(e_2)\ \cdots\ T(e_n)]
    $$

    称为 $T$ 的**标准矩阵（standard matrix）**。

    > 例：$\mathbb R^2$ 中绕原点逆时针旋转 $\varphi$：
    >
    > $$
    > T(e_1)=
    > \begin{bmatrix}\cos\varphi\\\sin\varphi\end{bmatrix},
    > \qquad
    > T(e_2)=
    > \begin{bmatrix}-\sin\varphi\\\cos\varphi\end{bmatrix},
    > $$
    >
    > 因而
    >
    > $$
    > A=
    > \begin{bmatrix}
    > \cos\varphi&-\sin\varphi\\
    > \sin\varphi&\cos\varphi
    > \end{bmatrix}.
    > $$
    >
    > 沿 $x_2$ 轴反射：
    >
    > $$
    > T(e_1)=\begin{bmatrix}-1\\0\end{bmatrix},
    > \qquad
    > T(e_2)=\begin{bmatrix}0\\1\end{bmatrix},
    > \qquad
    > A=\begin{bmatrix}-1&0\\0&1\end{bmatrix}.
    > $$

2. **矩阵表示定理（matrix representation theorem）**：若 $E=\{v_1,\ldots,v_n\}$ 和 $F=\{w_1,\ldots,w_m\}$ 分别为向量空间 $V,W$ 的有序基，则对每个线性变换 $T:V\to W$，存在 $A\in\mathbb R^{m\times n}$，使得

    $$
    [T(v)]_F=A[v]_E.
    $$

    事实上，

    $$
    \boldsymbol{A=\bigl[[T(v_1)]_F\ \cdots\ [T(v_n)]_F\bigr]}
    $$

    **称为 $T$ 相对有序基 $E,F$ 的表示矩阵（representing matrix）。**

    > 上述 (1)、(2) 均由定义易证。

    在线性变换 $T$ 下，向量 $v\in V$ 映射为 $w=T(v)\in W$；选定基 $E,F$ 后，坐标向量 $x=[v]_E\in\mathbb R^n$ 映射为

    $$
    y=[T(v)]_F=Ax\in\mathbb R^m.
    $$

    因此可以通过坐标与 $A$ 计算 $T(v)$。

3. 利用增广矩阵计算 $A$：记

    $$
    F=[w_1\ \cdots\ w_m].
    $$

    则 $A$ 的第 $j$ 列为

    $$
    F^{-1}T(v_j),
    $$

    构造

    $$
    [F:T(v_1)\ \cdots\ T(v_n)]\longrightarrow[I:A]
    $$

    即可求得 $A$。

### 6. 相抵矩阵与相似矩阵

设 $T\in\mathcal L(V,W)$ 在基 $E,F$ 下的表示矩阵为 $A$，即

$$
[T(v)]_F=A[v]_E.
$$

当基变为 $E',F'$ 时，过渡矩阵为 $P,Q$：

$$
[v]_E=P[v]_{E'},
\qquad
[w]_F=Q[w]_{F'}.
$$

代入得

$$
Q[T(v)]_{F'}=AP[v]_{E'},
$$

故新基下的表示矩阵为

$$
B=Q^{-1}AP.
$$

1. **相抵矩阵（equivalent matrices）**：设 $A,B\in\mathbb R^{m\times n}$。若存在非奇异矩阵 $P\in\mathbb R^{n\times n}$、$Q\in\mathbb R^{m\times m}$，使得

    $$
    B=Q^{-1}AP,
    $$

    则称 $B$ 与 $A$ 相抵。

2. **相似矩阵（similar matrices）**：设 $A,B\in\mathbb R^{n\times n}$。若存在非奇异矩阵 $S\in\mathbb R^{n\times n}$，使得

    $$
    B=S^{-1}AS,
    $$

    则称 $B$ 与 $A$ 相似。

    若为线性算子 $T\in\mathcal L(V,V)$，则 $B=S^{-1}AS$ 为 $T$ 从旧基 $E$ 到新基 $E'$ 的表示矩阵。

### 7. 扭曲与变形

**仿射变换（affine transformation）**：

$$
w=Av+b,
$$

其中 $A$ 控制旋转、缩放、剪切等线性变换，$b$ 控制平移。

1. **扭曲（warping）**：将三角形区域 $(v_1,v_2,v_3)$ 映射至 $(w_1,w_2,w_3)$。映射边：令

    $$
    B=[v_2-v_1\ v_3-v_1],
    \qquad
    C=[w_2-w_1\ w_3-w_1].
    $$

    由 $AB=C$，得到

    $$
    A=CB^{-1}.
    $$

    代入 $w_1=Av_1+b$，得到

    $$
    b=w_1-Av_1.
    $$

    颜色直接传递：

    $$
    \rho_1(w)=\rho_0(v).
    $$

2. **变形／渐变（morphing）**：引入时间参数 $t$，在中间时刻 $0<t<1$，空间形状的插值为

    $$
    u_i(t)=(1-t)v_i+tw_i,
    $$

    颜色的插值为

    $$
    \rho_t(u)=(1-t)\rho_0(v)+t\rho_1(w).
    $$

### 8. 线性变换的代数运算

1. 设 $S,T\in\mathcal L(V,W)$，$\lambda$ 为标量，$S+T$ 与 $\lambda T$ 同样是 $V$ 到 $W$ 的线性变换，定义为

    $$
    (S+T)(v)=S(v)+T(v),
    $$

    $$
    (\lambda T)(v)=\lambda T(v).
    $$

2. 所有从 $V$ 映射到 $W$ 的线性变换集合 $\mathcal L(V,W)$ 本身构成一个向量空间。若 $\dim V=n$、$\dim W=m$，则

    $$
    \dim\mathcal L(V,W)=mn.
    $$

    > $V$ 的 $n$ 个基向量映射后变为 $T(v_1),\ldots,T(v_n)$。由 $\dim W=m$，每个 $T(v_i)$ 需要 $m$ 个坐标表示，故
    >
    > $$
    > \dim\mathcal L(V,W)=mn.
    > $$
    >
    > 该空间的零是**零变换（zero transformation）** $T_0$：对任意 $v\in V$，$T_0(v)=0_W$。

3. **矩阵加法的推导：为什么矩阵相加是对应元素相加？**

    设 $S,T\in\mathcal L(V,W)$，$A,B$ 分别为二者的表示矩阵，$S+T$ 的表示矩阵为 $C$。对基向量 $v_j$，设

    $$
    S(v_j)=\sum_{i=1}^m a_{ij}w_i,
    \qquad
    T(v_j)=\sum_{i=1}^m b_{ij}w_i.
    $$

    则

    $$
    (S+T)(v_j)=\sum_{i=1}^m(a_{ij}+b_{ij})w_i.
    $$

    因而 $C$ 的每个元素为 $A,B$ 对应元素之和。

4. **线性变换的复合（composition of linear maps）**：

    > 设 $T\in\mathcal L(U,V)$、$S\in\mathcal L(V,W)$，定义 $ST\in\mathcal L(U,W)$ 为
    >
    > $$
    > (ST)(u)=S(T(u)),\qquad \forall u\in U.
    > $$
    >
    > 由可加性和齐次性可知 $ST$ 也是线性变换。

5. **矩阵乘法的推导：为什么要行、列交错相乘？**

    设 $\dim U=p$、$\dim V=n$、$\dim W=m$，各自的基为

    $$
    \{u_1,\ldots,u_p\},\quad
    \{v_1,\ldots,v_n\},\quad
    \{w_1,\ldots,w_m\}.
    $$

    各自的矩阵表示为

    $$
    M(S)=A\in\mathbb R^{m\times n},\qquad
    M(T)=B\in\mathbb R^{n\times p},\qquad
    M(ST)=C\in\mathbb R^{m\times p}.
    $$

    由定义

    $$
    T(u_j)=\sum_{k=1}^n b_{kj}v_k,
    \qquad
    S(v_k)=\sum_{i=1}^m a_{ik}w_i.
    $$

    对复合变换 $ST$，

    $$
    \begin{aligned}
    ST(u_j)
    &=S(T(u_j))
    =S\left(\sum_{k=1}^n b_{kj}v_k\right)\\
    &=\sum_{k=1}^n b_{kj}S(v_k)
    =\sum_{i=1}^m\left(\sum_{k=1}^n b_{kj}a_{ik}\right)w_i.
    \end{aligned}
    $$

    又

    $$
    ST(u_j)=\sum_{i=1}^m c_{ij}w_i,
    $$

    得

    $$
    c_{ij}=\sum_{k=1}^n a_{ik}b_{kj},
    $$

    即矩阵 $C=AB$ 的元素公式。$\square$

### 9. 可逆性与同构

1. **可逆性（invertibility）与逆变换（inverse transformation）**：设 $T\in\mathcal L(V,W)$。若存在 $S\in\mathcal L(W,V)$，使得

    $$
    ST=I_V,\qquad TS=I_W,
    $$

    其中 $I_V$ 与 $I_W$ 为 $V,W$ 上的**恒等变换（identity transformation）**，则称 $S$ 为 $T$ 的逆、$T$ 是可逆的，记作

    $$
    S=T^{-1}.
    $$

2. 定理：一个可逆的线性变换有且仅有一个逆。

    > 证明：若 $S_1,S_2$ 均为 $T^{-1}$，则
    >
    > $$
    > S_1=S_1I_W=S_1(TS_2)=(S_1T)S_2=I_VS_2=S_2.
    > $$

3. 定理：设 $T\in\mathcal L(V,W)$，**$T$ 可逆，当且仅当 $T$ 既是单射又是满射，即为双射。**

    证明：若 $T$ 可逆，且 $T(u)=T(v)$，同时左乘 $T^{-1}$，有
    $(T^{-1}T)(u)=(T^{-1}T)(v)$，即 $u=v$，故 $T$ 为单射。
    又对任意 $w\in W$，取 $v=T^{-1}(w)$，即有 $T(v)=w$，故 $T$ 为满射。

    若 $T$ 为双射，对每个 $w\in W$，存在唯一的 $v\in V$ 使得 $T(v)=w$。定义映射 $S:W\to V$，使得 $S(w)=v$。只需证明 $S$ 为线性变换。考虑

    $$
    T\bigl(S(\alpha_1w_1+\alpha_2w_2)\bigr)=\alpha_1w_1+\alpha_2w_2,
    $$

    且

    $$
    T\bigl(\alpha_1S(w_1)+\alpha_2S(w_2)\bigr)
    =\alpha_1w_1+\alpha_2w_2.
    $$

    由于 $T$ 为单射，

    $$
    S(\alpha_1w_1+\alpha_2w_2)=\alpha_1S(w_1)+\alpha_2S(w_2),
    $$

    $S$ 为线性变换。$\square$

4. **线性变换引理**：若 $v_1,\ldots,v_n$ 为 $V$ 的一组基，$w_1,\ldots,w_n$ 为 $W$ 中的向量，则存在唯一一个线性变换 $T:V\to W$，使得对所有 $i\in\{1,\ldots,n\}$，有

    $$
    T(v_i)=w_i.
    $$

    > 证明：对任意
    >
    > $$
    > v=c_1v_1+\cdots+c_nv_n,
    > $$
    >
    > 定义
    >
    > $$
    > T(v)=c_1w_1+\cdots+c_nw_n.
    > $$
    >
    > 由坐标的唯一性可得 $T$ 也是唯一的。$\square$
    >
    > 例：定义
    >
    > $$
    > T:\mathbb R^3\to\mathcal P_2(\mathbb R),
    > \qquad
    > T([a,b,c]^{\mathrm T})=ax^2+bx+c,
    > $$
    >
    > 则 $T$ 为一个同构。

5. **同构向量空间（isomorphic vector spaces）**：**同构（isomorphism）**即存在可逆线性变换。若 $V,W$ 之间存在一个同构，则称这两个线性空间同构。

6. 定理：**有限维向量空间 $V$ 与 $W$ 同构，当且仅当**

    $$
    \boldsymbol{\dim V=\dim W}.
    $$

    证明：若同构，则存在双射线性变换 $T$。由单射得 $\operatorname{null}T=\{0\}$，由满射得 $\dim\operatorname{range}T=\dim W$，故

    $$
    \dim V=\dim\operatorname{null}T+\dim\operatorname{range}T=\dim W.
    $$

    若 $\dim V=\dim W=n$，设二者的一组基分别为 $v_1,\ldots,v_n$ 和 $w_1,\ldots,w_n$。由线性变换引理构造 $T:V\to W$，使 $T(v_i)=w_i$，易证 $T$ 为双射。$\square$

7. 定理（线性算子）：假设 $V$ 为有限维空间，$T\in\mathcal L(V)$，即 $T$ 为 $V$ 上的线性算子，则以下命题等价：

    1. $T$ 可逆；
    2. $T$ 为单射；
    3. $T$ 为满射。

    > 证明：由
    >
    > $$
    > \dim V=\dim\operatorname{range}T+\dim\operatorname{null}T
    > $$
    >
    > 易证三者等价。$\square$

8. 定理（**线性变换空间与矩阵空间同构**）：设 $V,W$ 的一组基分别为 $v_1,\ldots,v_n$、$w_1,\ldots,w_m$，则将线性变换映射为矩阵表示的过程

    $$
    M:\mathcal L(V,W)\to F^{m\times n}
    $$

    实际上是同构，且

    $$
    \dim\mathcal L(V,W)=\dim F^{m\times n}=mn.
    $$

    证明：即证 $M$ 为可逆的线性变换。

    线性：由 8.(3) 得

    $$
    M(T_1+T_2)=M(T_1)+M(T_2),
    \qquad
    M(\lambda T)=\lambda M(T).
    $$

    单射：设 $T\in\operatorname{null}M$，即 $T$ 的表示矩阵为零矩阵，则 $T$ 把 $v_1,\ldots,v_n$ 都映射为 $0$，故 $T(v)=0$，因此 $M$ 为单射。

    满射：对任意 $A=(a_{ij})\in F^{m\times n}$，可构造线性变换 $T$，使

    $$
    T(v_j)=\sum_{i=1}^m a_{ij}w_i.
    $$

    显然 $M(T)=A$，因此 $M$ 为满射。$\square$

### 10. 向量空间的直积与商空间

#### 10.1 直积

1. 对向量空间 $V_1,\ldots,V_m$，它们的**直积（direct product）** $V_1\times\cdots\times V_m$ 是由所有可能的元组

    $$
    (v_1,\ldots,v_m),\qquad v_i\in V_i,
    $$

    组成的集合。

    加法：

    $$
    (v_1,\ldots,v_m)+(u_1,\ldots,u_m)
    =(v_1+u_1,\ldots,v_m+u_m).
    $$

    标量乘法：

    $$
    \lambda(v_1,\ldots,v_m)=(\lambda v_1,\ldots,\lambda v_m).
    $$

2. 定理：对有限维向量空间，

    $$
    \boldsymbol{\dim(V_1\times\cdots\times V_m)
    =\dim V_1+\cdots+\dim V_m}.
    $$

    证明：设 $V_i$ 为 $d_i$ 维的，其一组基为 $v_{i1},v_{i2},\ldots,v_{id_i}$。在 $V_1\times\cdots\times V_m$ 中构造如下 $d_1+\cdots+d_m$ 个向量：分别将各个基向量放在对应的分量，其余分量为 $0$。易证它们线性无关。$\square$

3. 构造映射

    $$
    \Gamma:V_1\times\cdots\times V_m\to V_1+\cdots+V_m,
    $$

    $$
    \Gamma(v_1,\ldots,v_m)=v_1+\cdots+v_m.
    $$

    和空间 $V_1+\cdots+V_m$ 为直和，有以下两种等价说法：

    1. $\Gamma$ 为单射；
    2. $\dim(V_1+\cdots+V_m)=\dim V_1+\cdots+\dim V_m$。

    证明：若为直和，设 $(u_1,\ldots,u_m)\in\operatorname{null}\Gamma$，即 $u_1+\cdots+u_m=0$。由直和等价条件，得 $u_1=\cdots=u_m=0$，即 $\operatorname{null}\Gamma$ 中只有零元。

    反之，若 $\Gamma$ 为单射，设存在一组 $u_i\in V_i$，使 $u_1+\cdots+u_m=0$，则 $(u_1,\ldots,u_m)\in\operatorname{null}\Gamma$。由单射条件得 $u_1=\cdots=u_m=0$，故为直和。$\square$

    注意到 $\Gamma$ 为满射。若为直和，由 (1) 得 $\Gamma$ 为单射，故 $\Gamma$ 是一个同构。于是

    $$
    \dim(V_1\times\cdots\times V_m)=\dim(V_1+\cdots+V_m),
    $$

    再由 10.2 得

    $$
    \dim(V_1+\cdots+V_m)=\dim V_1+\cdots+\dim V_m.
    $$

    若维数相等，由线性变换基本定理，

    $$
    \dim(V_1\times\cdots\times V_m)
    =\dim\operatorname{null}\Gamma+\dim(V_1+\cdots+V_m),
    $$

    故 $\dim\operatorname{null}\Gamma=0$，即 $\Gamma$ 为单射，由 (1) 得 $V_1+\cdots+V_m$ 为直和。$\square$

#### 10.2 商空间

4. **等价关系（equivalence relation）**：对向量空间 $V$ 和它的一个子空间 $U$，规定当且仅当两个向量的差 $v-w\in U$ 时这两个向量等价，记为

    $$
    v\sim w.
    $$

    **陪集（coset，又称等价类 equivalence class）**：与向量 $v$ 等价的所有向量的集合称为 $v$ 所在的陪集，记作

    $$
    v+U=\{v+u:u\in U\}.
    $$

    > 例：若 $V$ 为三维空间 $\mathbb R^3$，$U$ 为过原点的 $xy$ 平面，则 $v+U$ 是所有与 $xy$ 平面平行的平面。

5. 定理（**陪集等价**）：$U$ 为 $V$ 的子空间，$v,w\in V$，则有

    $$
    \boldsymbol{v-w\in U
    \iff v+U=w+U
    \iff (v+U)\cap(w+U)\ne\varnothing}.
    $$

    证明：

    1. 若 $v-w\in U$，对任意 $u\in U$，$v+u=w+(v-w)+u$，且 $(v-w)+u\in U$，得 $v+U\subset w+U$。同理可得 $w+U\subset v+U$，故 $v+U=w+U$。
    2. 若 $v+U=w+U$，则 $(v+U)\cap(w+U)=v+U\ne\varnothing$。
    3. 若 $(v+U)\cap(w+U)\ne\varnothing$，则存在 $u_1,u_2\in U$，使 $v+u_1=w+u_2$，故 $v-w=u_2-u_1\in U$。$\square$

6. **商空间（quotient space）**：

    $$
    V/U=\{v+U:v\in V\}
    $$

    为所有这些陪集构成的集合。

    加法：

    $$
    (v+U)+(w+U)=(v+w)+U.
    $$

    数乘：

    $$
    a(v+U)=av+U.
    $$

    **商映射（quotient map）**

    $$
    \pi:V\to V/U
    $$

    为一个线性变换，定义为

    $$
    \pi(v)=v+U,\qquad \forall v\in V.
    $$

    > 商空间也是向量空间，零向量为 $U$ 本身：
    >
    > $$
    > 0+U=U.
    > $$

7. 定理：若 $V$ 为有限维的，$U$ 为 $V$ 的子空间，则

    $$
    \dim(V/U)=\dim V-\dim U.
    $$

    证明：考虑 $\operatorname{null}\pi$。若 $\pi(v)=0_{V/U}=U$，则 $v+U=U$，即 $v\in U$，故

    $$
    \operatorname{null}\pi=U.
    $$

    显然 $\pi$ 为满射，$\operatorname{range}\pi=V/U$。由线性变换基本定理，

    $$
    \dim V=\dim(\operatorname{null}\pi)+\dim(\operatorname{range}\pi),
    $$

    得

    $$
    \dim(V/U)=\dim V-\dim U.
    $$

    > 设 $\dim V=n$、$\dim U=m$，$U$ 的一组基为 $u_1,\ldots,u_m$，并将其扩充为 $V$ 的一组基
    >
    > $$
    > u_1,\ldots,u_m,u_{m+1},\ldots,u_n.
    > $$
    >
    > 则
    >
    > $$
    > u_{m+1}+U,\ldots,u_n+U
    > $$
    >
    > 为 $V/U$ 的一组基。

8. 定理：设 $V$ 为有限维向量空间，$U$ 为 $V$ 的子空间，$V/U$ 有基

    $$
    \beta_1+U,\ldots,\beta_k+U.
    $$

    令

    $$
    W=\operatorname{Span}(\beta_1,\ldots,\beta_k),
    $$

    则必有

    $$
    V=W\oplus U,
    $$

    且 $\beta_1,\ldots,\beta_k$ 为 $W$ 的一组基。

    证明：先证 $V=W+U$。对任意 $v\in V$，$v+U\in V/U$，有

    $$
    v+U=c_1(\beta_1+U)+\cdots+c_k(\beta_k+U)
    =(c_1\beta_1+\cdots+c_k\beta_k)+U.
    $$

    由定理 5 得

    $$
    v-(c_1\beta_1+\cdots+c_k\beta_k)\in U.
    $$

    记 $w=c_1\beta_1+\cdots+c_k\beta_k$，$u=v-w$，显然 $w\in W$、$u\in U$，从而 $v=u+w$，得 $V=U+W$。

    再证 $W\cap U=\{0_V\}$：若 $v\in W\cap U$，由 $v\in W$ 得

    $$
    v=c_1\beta_1+\cdots+c_k\beta_k.
    $$

    又由 $v\in U$ 得 $v+U=U=0_{V/U}$。将上式变为陪集，有

    $$
    v+U=c_1(\beta_1+U)+\cdots+c_k(\beta_k+U).
    $$

    由于 $\beta_1+U,\ldots,\beta_k+U$ 线性无关，得

    $$
    c_1=\cdots=c_k=0,
    $$

    即 $v=0_V$。因此 $W\cap U=\{0_V\}$，结合 $V=W+U$，得

    $$
    V=W\oplus U.
    $$

    再证 $\beta_1,\ldots,\beta_k$ 线性无关。若

    $$
    c_1\beta_1+\cdots+c_k\beta_k=0_V,
    $$

    左右同时转化为陪集，有

    $$
    c_1(\beta_1+U)+\cdots+c_k(\beta_k+U)=U=0_{V/U}.
    $$

    由 $\beta_1+U,\ldots,\beta_k+U$ 线性无关，得 $c_1=\cdots=c_k=0$。$\square$

9. 设 $T\in\mathcal L(V,W)$，定义新的映射

    $$
    \widetilde T:V/(\operatorname{null}T)\to W,
    $$

    $$
    \widetilde T\bigl(v+\operatorname{null}T\bigr)=T(v).
    $$

    > 实际上，这是将 $T$ 改造为单射。先说明映射的合法性：若
    >
    > $$
    > v_1+\operatorname{null}T=v_2+\operatorname{null}T,
    > $$
    >
    > 则 $v_2-v_1\in\operatorname{null}T$，因此
    >
    > $$
    > T(v_2)-T(v_1)=T(v_2-v_1)=0,
    > $$
    >
    > 即 $T(v_2)=T(v_1)$。

10. 定理（**第一同构定理（first isomorphism theorem）**）：**设 $T\in\mathcal L(V,W)$，则：**

    1. **$\widetilde T\circ\pi=T$**，其中 $\pi:V\to V/\operatorname{null}T$ 为商映射；
    2. **$\widetilde T$ 为单射；**
    3. **$\operatorname{range}\widetilde T=\operatorname{range}T$；**
    4. **$V/\operatorname{null}T$ 和 $\operatorname{range}T$ 同构。**

    证明：

    1. 对任意 $v\in V$，

        $$
        (\widetilde T\circ\pi)(v)
        =\widetilde T(\pi(v))
        =\widetilde T\bigl(v+\operatorname{null}T\bigr)
        =T(v).
        $$

    2. 设

        $$
        \widetilde T\bigl(v+\operatorname{null}T\bigr)=0_W,
        $$

        则 $T(v)=0_W$，即 $v\in\operatorname{null}T$，故

        $$
        v+\operatorname{null}T
        =\operatorname{null}T
        =0_{V/\operatorname{null}T}.
        $$

        因此 $\widetilde T$ 的零空间只有零向量，$\widetilde T$ 为单射。

    3. 由 $\widetilde T$ 的定义显然有

        $$
        \operatorname{range}\widetilde T=\operatorname{range}T.
        $$

    4. 由 (3) 得 $\widetilde T$ 是从 $V/\operatorname{null}T$ 到 $\operatorname{range}T$ 的满射，由 (2) 得 $\widetilde T$ 为单射，故这两个空间同构。$\square$
