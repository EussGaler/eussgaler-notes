# 控制理论中的代数基础（一）：线性代数基础

## 一、线代基础

### 1. 行列式

对 $n$ 阶**行列式（determinant）**

$$
D=
\begin{vmatrix}
a_{11} & \cdots & a_{1n}\\
\vdots & & \vdots\\
a_{n1} & \cdots & a_{nn}
\end{vmatrix},
$$

有以下性质：

1. $D=D^{\mathrm T}$。

2. 互换任意两行（列），行列式变号。

3. 某一行（列）乘 $k$，则行列式乘 $k$：

    $$
    \begin{vmatrix}
    \vdots & & \vdots\\
    ka_{i1} & \cdots & ka_{in}\\
    \vdots & & \vdots
    \end{vmatrix}=kD.
    $$

4. 若某一行（列）的元素均为两个数之和，则该行列式可拆为两个行列式之和：

    $$
    \begin{vmatrix}
    \vdots & & \vdots\\
    a_{i1}+a'_{i1} & \cdots & a_{in}+a'_{in}\\
    \vdots & & \vdots
    \end{vmatrix}
    =D+
    \begin{vmatrix}
    \vdots & & \vdots\\
    a'_{i1} & \cdots & a'_{in}\\
    \vdots & & \vdots
    \end{vmatrix}.
    $$

5. 将某一行（列）的 $k$ 倍加到另一行（列），行列式不变：

    $$
    D=
    \begin{vmatrix}
    \vdots & & \vdots\\
    a_{j1}+ka_{i1} & \cdots & a_{jn}+ka_{in}\\
    \vdots & & \vdots
    \end{vmatrix}.
    $$

6. **行列式展开定理（Laplace expansion）**：将 $a_{ij}$ 所在行、列去掉，所剩的 $n-1$ 阶行列式为 $a_{ij}$ 的**余子式（minor）**，记为 $M_{ij}$；$a_{ij}$ 的**代数余子式（cofactor）**为

    $$
    A_{ij}=(-1)^{i+j}M_{ij}.
    $$

    按行展开：

    $$
    a_{i1}A_{j1}+a_{i2}A_{j2}+\cdots+a_{in}A_{jn}
    =
    \begin{cases}
    D,&i=j,\\
    0,&i\ne j.
    \end{cases}
    $$

    按列展开同理。

7. **Cramer 法则（Cramer's rule）**：对于线性方程组

    $$
    \begin{cases}
    a_{11}x_1+\cdots+a_{1n}x_n=b_1,\\
    \qquad\vdots\\
    a_{n1}x_1+\cdots+a_{nn}x_n=b_n,
    \end{cases}
    $$

    记

    $$
    D_i=
    \begin{vmatrix}
    a_{11}&\cdots&b_1&\cdots&a_{1n}\\
    a_{21}&\cdots&b_2&\cdots&a_{2n}\\
    \vdots&&\vdots&&\vdots\\
    a_{n1}&\cdots&b_n&\cdots&a_{nn}
    \end{vmatrix},
    $$

    $D_1,\ldots,D_n$ 同理。若系数行列式 $D\ne0$，则该线性方程组有唯一解

    $$
    x_i=\frac{D_i}{D},\qquad i=1,2,\ldots,n.
    $$

    若齐次方程组有非零解，则 $D=0$：

    $$
    \begin{bmatrix}
    a_{11}&\cdots&a_{1n}\\
    \vdots&&\vdots\\
    a_{n1}&\cdots&a_{nn}
    \end{bmatrix}
    \begin{bmatrix}
    x_1\\ \vdots\\ x_n
    \end{bmatrix}=0.
    $$

### 2. 矩阵

1. 对 $n$ 阶方阵 $A$，$A$ 可逆当且仅当 $|A|\ne0$。

    1. 记 $\operatorname{adj}(A)$ 或 $A^*$ 为 $A$ 的**伴随矩阵（adjugate matrix）**，即

        $$
        \operatorname{adj}(A)=
        \begin{bmatrix}
        A_{11}&\cdots&A_{n1}\\
        \vdots&&\vdots\\
        A_{1n}&\cdots&A_{nn}
        \end{bmatrix},
        $$

        $A_{ij}$ 为 $a_{ij}$ 的代数余子式。则有

        $$
        AA^*=A^*A=|A|I_n,
        $$

        故

        $$
        \boxed{A^{-1}=\frac{A^*}{|A|}}.
        $$

    2. 若 $A,B$ 可逆，则 $AB$ 可逆，且

        $$
        (AB)^{-1}=B^{-1}A^{-1},\qquad (A^{\mathrm T})^{-1}=(A^{-1})^{\mathrm T}.
        $$

    3. $|A|=0$ 则称 $A$ 为**奇异阵（singular matrix）**；$|A|\ne0$ 则称 $A$ 为**非奇异阵（nonsingular matrix）**。

2. 任一矩阵 $A$ 都可通过行（列）初等变换（整行或整列倍乘或相加）变换为行（列）阶梯形矩阵。

3. 矩阵 $A$ 的非零子式的最高阶数为 $A$ 的**秩（rank）**，记作 $r(A)$。

    1. $A$ 经初等变换后秩不变。若 $A$ 经有限次初等变换后能化为 $B$，则称 $A$ 与 $B$ 等价。

    2. 对 $n$ 阶方阵 $A$，

        $$
        |A|\ne0\iff r(A)=n,
        $$

        即 $A$ **满秩（full rank）** $\iff$ $A$ **可逆（invertible）**。

        若 $A$ 可逆，则可以只经过初等行（列）变换将其化为单位阵 $I_n$。

    3. 求矩阵的逆：

        $$
        [A:I_n]\xrightarrow{\text{初等行变换}}[I_n:A^{-1}],
        $$

        $$
        [A:B]\xrightarrow{\text{初等行变换}}[I_n:C],\qquad C=A^{-1}B.
        $$

        同理，初等列变换有

        $$
        \begin{bmatrix}A\\I_n\end{bmatrix}
        \xrightarrow{\text{初等列变换}}
        \begin{bmatrix}I_n\\A^{-1}\end{bmatrix},
        $$

        $$
        \begin{bmatrix}A\\B\end{bmatrix}
        \xrightarrow{\text{初等列变换}}
        \begin{bmatrix}I_n\\C\end{bmatrix},
        \qquad C=BA^{-1}.
        $$

        > 证明：初等行变换可看作左乘初等矩阵 $P_i$。记
        >
        > $$
        > P_1\cdots P_sA=I_n,
        > $$
        >
        > 则
        >
        > $$
        > P_1\cdots P_sB=A^{-1}B.
        > $$
        >
        > 即经过 $P_1,\ldots,P_s$ 后，$A$ 变为 $I_n$，$B$ 变为 $A^{-1}B$。$\square$

4. **秩不等式**：记 $A$ 为 $m\times n$ 阵，$B$ 为 $n\times s$ 阵，则

    $$
    r(A)+r(B)-n\le r(AB)\le \min\{r(A),r(B)\}.
    $$

    **降阶公式**：$A$ 为 $m\times n$ 阵，$B$ 为 $n\times m$ 阵，$m>n$。对常数 $c$，有

    $$
    \left|cI_m-AB\right|=c^{m-n}\left|cI_n-BA\right|.
    $$

## 二、向量空间

### 1. 向量空间公理

一个集合 $V$ 连同在数域 $F$ 上的加法和标量乘法运算，若满足以下 8 条公理，则被称为**向量空间（vector space）**：

- A1：交换律：$x+y=y+x$；
- A2：结合律：$(x+y)+z=x+(y+z)$；
- A3：零元：$\exists 0\in V$，使得 $x+0=x$；
- A4：加法逆元：$\forall x\in V$，$\exists -x\in V$，使得 $x+(-x)=0$；
- A5：$(ab)x=a(bx)$；
- A6：$a(x+y)=ax+ay$；
- A7：$(a+b)x=ax+bx$；
- A8：乘法单位元：$1x=x$。

其中 $a,b\in F$，$x,y\in V$。

1. 对数乘和加法的封闭性：若 $x,y\in V$，$\alpha\in F$，则 $\alpha x\in V$，$x+y\in V$。

2. 定理：$0x=0$，且加法逆元唯一。

    > 证明：
    >
    > $$
    > 1x=(1+0)x=x+0x.
    > $$
    >
    > 同时加 $-x$，得 $0x=0$。$\square$

> 例：$\mathbb R_+$ 作为向量空间，定义加法 $x\oplus y=xy$，数乘 $\alpha\odot x=x^\alpha$。
>
> 此时 $1$ 为零元：$1\oplus x=x$；$x$ 的加法逆元为 $x^{-1}$：
>
> $$
> x\oplus\frac1x=1.
> $$

### 2. 子空间

若 $V$ 的非空子集 $U$ 满足以下条件，则称 $U$ 是 $V$ 的**子空间（subspace）**：

1. $0\in U$；
2. 对加法和数乘封闭：对任意 $\alpha$ 和 $x,y\in U$，有 $\alpha x\in U$，$x+y\in U$。

> 例：$\mathbb R^2$ 不是 $\mathbb R^3$ 的子空间，但
>
> $$
> U=\{[x_1,x_2,0]^{\mathrm T}:x_1,x_2\in\mathbb R\}
> $$
>
> 是 $\mathbb R^3$ 的子空间。
>
> 第二象限不是子空间，因为标量 $\alpha$ 可取 $-1$。

1. **子空间的和（sum of subspaces）**：

    $$
    U_1+U_2+\cdots+U_m
    =\{u_1+\cdots+u_m:u_1\in U_1,\ldots,u_m\in U_m\},
    $$

    为包含这些子空间的最小子空间。

2. **直和（direct sum）**：若 $U_1+\cdots+U_m$ 中的每一个元素都只能有**唯一的方式**表示为 $u_1+\cdots+u_m$，则称这个和为直和，记作

    $$
    U_1\oplus U_2\oplus\cdots\oplus U_m.
    $$

3. 定理：设 $U$ 和 $W$ 为 $V$ 的子空间，**$U+W$ 是直和当且仅当**

    $$
    \boldsymbol{U\cap W=\{0\}}.
    $$

    证明：若为直和，对任意 $v\in U\cap W$，必有 $-v\in U\cap W$。由于

    $$
    0=v+(-v)=0+0,
    $$

    表示方法唯一，必有 $v=0$，故 $U\cap W=\{0\}$。

    若 $U\cap W=\{0\}$，假设

    $$
    0=u+w,\qquad u\in U,\ w\in W,
    $$

    则 $u=-w\in W$，即 $u\in U\cap W$，所以 $u=w=0$。由 2.(4) 得 $U+W$ 为直和。$\square$

    > 上述“交集只有零向量”的判据不能直接推广到 $m$（$m>2$）个子空间。反例：$U_1$ 为 $x$ 轴，$U_2$ 为 $y$ 轴，$U_3$ 为直线 $y=x$，则
    >
    > $$
    > (0,0)=(1,0)+(0,1)+(-1,-1).
    > $$

4. **直和的等价条件**：$U_1,\ldots,U_m$ 为 $U$ 的子空间，**$U_1+\cdots+U_m$ 为直和，当且仅当将 $0$ 写成**

    $$
    u_1+\cdots+u_m=0,\qquad u_i\in U_i,
    $$

    **的唯一方式是 $u_1=\cdots=u_m=0$。**

    证明：若为直和，用 $0\in U_j\ (j=1,\ldots,m)$ 将 $0$ 唯一地表示为

    $$
    0+\cdots+0=0.
    $$

    若表示唯一，设

    $$
    v=v_1+\cdots+v_m=u_1+\cdots+u_m,
    \qquad v_j,u_j\in U_j,
    $$

    作差得

    $$
    0=(v_1-u_1)+\cdots+(v_m-u_m),
    $$

    则 $v_j=u_j$，表示唯一，故为直和。$\square$

### 3. 生成空间

向量 $v_1,v_2,\ldots,v_n$ 的所有**线性组合（linear combination）**

$$
c_1v_1+\cdots+c_nv_n
$$

构成的集合称为这些向量的**生成空间（span）**，记作

$$
\operatorname{Span}(v_1,\ldots,v_n).
$$

**生成集（spanning set）**：若 $V$ 中每个向量都能写成 $v_1,\ldots,v_n$ 的线性组合，则称 $\{v_1,\ldots,v_n\}$ 为 $V$ 的一组生成集。

**线性无关（linear independence）**：若方程

$$
c_1v_1+\cdots+c_nv_n=0
$$

只有在所有标量 $c_i=0$ 时成立，则称向量组 $\{v_1,\ldots,v_n\}$ 线性无关，否则称为**线性相关（linear dependence）**。

1. 定理：向量在生成空间中的线性组合表示是唯一的，当且仅当这些向量线性无关。

2. 定理：若向量组线性相关，则其中至少存在一个向量

    $$
    v_j\in\operatorname{Span}(v_1,\ldots,v_{j-1}),
    $$

    且移除 $v_j$ 后，不会改变整个向量组的生成空间。

### 4. 基

向量组 $v_1,\ldots,v_n$ 构成空间 $V$ 的**基（basis）**，当且仅当它们**线性无关**，又**生成整个空间 $V$**。

**维数（dimension）**：$V$ 的基所含的向量个数，记作

$$
\dim V=n.
$$

> 例：$\mathbb R^n$ 的**标准基（standard basis）**为 $e_1,e_2,\ldots,e_n$。
>
> 多项式空间 $\mathcal P_n$ 的基为 $1,x,\ldots,x^n$，维数为 $n+1$。

1. 定理：若 $v_1,\ldots,v_n$ 是空间 $V$ 的生成集，则 $V$ 中任一线性无关向量组所含的向量个数小于或等于 $n$。

    证明：设 $\{u_1,\ldots,u_m\}$ 是 $V$ 中的线性无关向量组，且 $m>n$。

    由 3.(2)，考虑 $\{v_1,\ldots,v_n,u_1\}$。由于 $u_1\in V$，该向量组线性相关，可以删去一个 $v_j$，使剩余向量仍能生成 $V$。不妨记删去的是 $v_1$。

    再考虑 $\{v_2,\ldots,v_n,u_1,u_2\}$，仍能删去一个 $v_j$。重复操作，必能得到 $\{u_1,u_2,\ldots,u_n\}$。

    注意不能删去 $u_1$，因为被删的向量必须能被其他向量线性表示。若不能删去 $v_2,v_3,\ldots,v_n$，则
    $u_2=c_1u_1+c_2v_2+\cdots+c_nv_n$ 中 $c_2=\cdots=c_n=0$，即 $u_2=c_1u_1$，与二者线性无关矛盾。

    故而 $\{u_1,\ldots,u_{n+1}\}$ 必线性相关，矛盾！故 $m\le n$。$\square$

2. 推论：一个空间的任意两组基包含相同数量的向量。

3. 定理：设 $V$ 为 $n$ 维空间，则：

    1. 任意 $n$ 个线性无关的向量都能生成 $V$；
    2. 少于 $n$ 个向量不可能生成 $V$；
    3. 任意生成 $V$ 的 $n$ 个向量必然线性无关；
    4. 任何少于 $n$ 个的线性无关向量组都可以扩充成为 $V$ 的基；
    5. 任何多于 $n$ 个的生成集都可以精简成为 $V$ 的基。

4. 定理：设 $U$ 是有限维空间 $V$ 的子空间，则必存在另一个子空间 $W$，使得

    $$
    V=U\oplus W.
    $$

    证明：取出 $U$ 的一组基 $u_1,\ldots,u_m$，并扩充为 $V$ 的基

    $$
    u_1,\ldots,u_m,w_1,\ldots,w_n.
    $$

    令

    $$
    W=\operatorname{Span}(w_1,\ldots,w_n)
    $$

    即可。$\square$

### 5. 基变换

1. **坐标（coordinates）**：对**有序基（ordered basis）** $E=\{v_1,\ldots,v_n\}$，若

    $$
    v=c_1v_1+\cdots+c_nv_n,
    $$

    **则称列向量**

    $$
    c=[c_1,\ldots,c_n]^{\mathrm T}
    $$

    **为 $v$ 相对于基 $E$ 的坐标向量（coordinate vector），记为 $[v]_E$。**

2. **过渡矩阵（change-of-basis matrix）**：设 $E$ 为旧基，$F$ 为新基，满足

    $$
    [x]_F=S[x]_E,
    $$

    的矩阵称为过渡矩阵。过渡矩阵的每一列是旧基向量在新基下的坐标。

    证明：记

    $$
    V=[v_1\ \cdots\ v_n],\qquad W=[w_1\ \cdots\ w_n]
    $$

    分别为旧基 $E$ 和新基 $F$ 的向量。对任一向量 $x$，有

    $$
    x=V[x]_E=W[x]_F.
    $$

    由于 $W$ 满秩，故

    $$
    S=W^{-1}V,
    $$

    即

    $$
    [x]_F=S[x]_E.
    $$

    记 $v_1$ 在基 $F$ 下的坐标为 $s_1$，则 $v_1$ 在基 $E$ 下的坐标为 $[1,0,\ldots,0]^{\mathrm T}$，有

    $$
    V[1,0,\ldots,0]^{\mathrm T}=Ws_1,
    $$

    即 $s_1=W^{-1}v_1$。故 $S$ 的每一列为旧基在新基下的坐标。$\square$

3. 由 (2) 的证明，可构造增广矩阵 $[W:V]$，利用初等行变换化为

    $$
    [W:V]\longrightarrow[I:W^{-1}V],
    $$

    即可求得

    $$
    S=W^{-1}V.
    $$

### 6. 基本子空间

1. 任一 $m\times n$ 矩阵 $A$ 都带有 4 个基本子空间：

    1. **列空间（column space）** $C(A)$：$A$ 的列向量的所有线性组合，为 $\mathbb R^m$ 的子空间；
    2. **零空间（null space）** $N(A)$：齐次方程组 $Ax=0$ 的所有解的集合，为 $\mathbb R^n$ 的子空间；
    3. **行空间（row space）** $C(A^{\mathrm T})$：$A^{\mathrm T}$ 的列空间，为 $\mathbb R^n$ 的子空间；
    4. **左零空间（left null space）** $N(A^{\mathrm T})$：$A^{\mathrm T}y=0$ 的所有解的集合，为 $\mathbb R^m$ 的子空间。

2. 求空间 $C(A)$ 的基：记 $A$ 的行最简梯形矩阵为 $R$。由于初等行变换不改变方程组的解集，即

    $$
    Ax=0\iff Rx=0,
    $$

    $A$ 中列向量的相关性与 $R$ 中列向量一致。$R$ 中包含非零主元的列线性无关，因此 $A$ 中与主元列对应的列即为 $C(A)$ 的一组基。

    > 例：对于方程 $Ax=b$，将 $Ax$ 看作 $A$ 各列向量的线性组合。显然，方程有解当且仅当
    >
    > $$
    > b\in C(A).
    > $$
    >
    > 1. 对任意 $b\in\mathbb R^m$ 都有解，当且仅当 $C(A)=\mathbb R^m$；
    > 2. 解唯一，当且仅当 $A$ 的列向量线性无关。
    >
    > 维度限制：若 $C(A)=\mathbb R^m$，则必有 $n\ge m$；若 $A$ 的列向量线性无关，则必有 $n\le m$。因此，若 $A$ 的列向量构成 $\mathbb R^m$ 的基，则必有 $n=m$。
    >
    > 例：
    >
    > $$
    > A=
    > \begin{bmatrix}
    > 1&4&5&-3&6\\
    > 3&2&5&1&8\\
    > 2&1&3&1&5
    > \end{bmatrix}
    > \xrightarrow{\text{初等行变换}}
    > \begin{bmatrix}
    > 1&0&1&1&2\\
    > 0&1&1&-1&1\\
    > 0&0&0&0&0
    > \end{bmatrix}.
    > $$
    >
    > 因而 $C(A)$ 的一组基为
    >
    > $$
    > \begin{bmatrix}1\\3\\2\end{bmatrix},
    > \qquad
    > \begin{bmatrix}4\\2\\1\end{bmatrix},
    > $$
    >
    > 且
    >
    > $$
    > A=
    > \begin{bmatrix}
    > 1&4\\
    > 3&2\\
    > 2&1
    > \end{bmatrix}
    > \begin{bmatrix}
    > 1&0&1&1&2\\
    > 0&1&1&-1&1
    > \end{bmatrix}.
    > $$

### 7. 子空间的正交性

1. **向量正交（orthogonal vectors）**：若 $x,y\in\mathbb R^n$ 满足内积 $x^{\mathrm T}y=0$，则称 $x,y$ 正交。

    **子空间正交（orthogonal subspaces）**：若对子空间 $X$ 中任意元素 $x$ 及子空间 $Y$ 中任意元素 $y$ 都有

    $$
    x^{\mathrm T}y=0,
    $$

    则称 $X,Y$ 正交，记作 $X\perp Y$。

    **正交补空间（orthogonal complement）**：$Y$ 的正交补为

    $$
    Y^\perp=\{x\in\mathbb R^n:x^{\mathrm T}y=0\text{ 对所有 }y\in Y\text{ 成立}\}.
    $$

2. 定理：若 $X,Y$ 为正交子空间，则

    $$
    X\cap Y=\{0\}.
    $$

    > 证明：设 $x\in X\cap Y$，则 $x$ 与自身正交，即 $x^{\mathrm T}x=0$，故 $x=0$。$\square$

3. **线性代数基本定理 Part 2**：

    $$
    \boldsymbol{N(A)=C(A^{\mathrm T})^\perp},
    \qquad
    \boldsymbol{N(A^{\mathrm T})=C(A)^\perp}.
    $$

    证明：设

    $$
    A^{\mathrm T}=[v_1\ \cdots\ v_m],
    $$

    即

    $$
    A=
    \begin{bmatrix}
    v_1^{\mathrm T}\\
    \vdots\\
    v_m^{\mathrm T}
    \end{bmatrix}.
    $$

    先证 $N(A)\subset C(A^{\mathrm T})^\perp$。由 $Ax=0$，得

    $$
    v_1^{\mathrm T}x=v_2^{\mathrm T}x=\cdots=v_m^{\mathrm T}x=0.
    $$

    由 $\operatorname{Span}(v_1,\ldots,v_m)=C(A^{\mathrm T})$，有 $x\in C(A^{\mathrm T})^\perp$。

    再证 $C(A^{\mathrm T})^\perp\subset N(A)$。对 $x'\in C(A^{\mathrm T})^\perp$，有

    $$
    v_1^{\mathrm T}x'=\cdots=v_m^{\mathrm T}x'=0,
    $$

    故 $Ax'=0$，即 $x'\in N(A)$。$\square$

4. **线性代数基本定理 Part 1**：若 $r=r(A)$，则

    $$
    \boldsymbol{\dim C(A)=\dim C(A^{\mathrm T})=r},
    $$

    $$
    \boldsymbol{\dim N(A)=n-r},
    \qquad
    \boldsymbol{\dim N(A^{\mathrm T})=m-r}.
    $$

    证明：先证 $\dim C(A)=\dim C(A^{\mathrm T})=r$。设 $\dim C(A)=r$，取 $C(A)$ 的一组基 $c_1,\ldots,c_r\in\mathbb R^m$，则 $A$ 的每一列都可用 $c_1,\ldots,c_r$ 线性表示。因此可将 $A$ 写作

    $$
    A=[c_1\ \cdots\ c_r]
    \begin{bmatrix}
    v_1^{\mathrm T}\\
    \vdots\\
    v_r^{\mathrm T}
    \end{bmatrix},
    \qquad v_1,\ldots,v_r\in\mathbb R^n.
    $$

    则

    $$
    A^{\mathrm T}=[v_1\ \cdots\ v_r]
    \begin{bmatrix}
    c_1^{\mathrm T}\\
    \vdots\\
    c_r^{\mathrm T}
    \end{bmatrix},
    $$

    表明 $A^{\mathrm T}$ 的每一列都可以用 $v_1,\ldots,v_r$ 线性表示，故

    $$
    C(A^{\mathrm T})\subset\operatorname{Span}(v_1,\ldots,v_r),
    \qquad \dim C(A^{\mathrm T})\le r.
    $$

    假设 $\dim C(A^{\mathrm T})=k<r$，取一组基 $v'_1,\ldots,v'_k$，同理可得 $\dim C(A)\le k<r$，矛盾。因此

    $$
    \dim C(A^{\mathrm T})=\dim C(A)=r.
    $$

    再证 $\dim N(A)=n-r$。由下述定理 5，有

    $$
    \dim C(A^{\mathrm T})+\dim C(A^{\mathrm T})^\perp=n.
    $$

    再由基本定理 Part 2，$N(A)=C(A^{\mathrm T})^\perp$，故

    $$
    \dim N(A)=n-r.
    $$

    $\dim N(A^{\mathrm T})=m-r$ 同理。

5. 定理（维数互补）：若 $S$ 为 $\mathbb R^n$ 的子空间，则

    $$
    \dim S+\dim S^\perp=n.
    $$

6. 定理（正交直和）：

    $$
    \mathbb R^n=S\oplus S^\perp,
    $$

    即 $\mathbb R^n$ 中任何向量均可唯一分解为一个 $S$ 中的向量和一个 $S^\perp$ 中的向量之和。

7. 定理：

    $$
    (S^\perp)^\perp=S.
    $$

先证定理 6。

存在性：要证对任意 $x\in\mathbb R^n$，存在 $u\in S$、$v\in S^\perp$，使得 $x=u+v$。设 $\dim S=r$，取一组标准正交基 $\{e_1,\ldots,e_r\}$，构造

$$
u=(x^{\mathrm T}e_1)e_1+\cdots+(x^{\mathrm T}e_r)e_r,
$$

令 $v=x-u$。下面证 $v\in S^\perp$。两边乘 $e_j^{\mathrm T}\ (j=1,2,\ldots,r)$，得

$$
\begin{aligned}
e_j^{\mathrm T}v
&=e_j^{\mathrm T}x-e_j^{\mathrm T}\bigl((x^{\mathrm T}e_1)e_1+\cdots+(x^{\mathrm T}e_r)e_r\bigr)\\
&=e_j^{\mathrm T}x-(x^{\mathrm T}e_j)(e_j^{\mathrm T}e_j)\\
&=e_j^{\mathrm T}x-x^{\mathrm T}e_j=0.
\end{aligned}
$$

即 $v$ 与 $e_1,\ldots,e_r$ 均正交，故 $v\in S^\perp$。

唯一性：设

$$
x=u_1+v_1=u_2+v_2,
\qquad u_1,u_2\in S,\quad v_1,v_2\in S^\perp.
$$

作差得

$$
u_1-u_2=v_2-v_1.
$$

由于左边属于 $S$，右边属于 $S^\perp$，且 $S\cap S^\perp=\{0\}$，得

$$
u_1=u_2,\qquad v_1=v_2.
$$

再证定理 5。设 $\dim S=r$，$\dim S^\perp=k$，分别取一组基

$$
\{v_1,\ldots,v_r\},\qquad \{u_1,\ldots,u_k\}.
$$

考虑线性组合

$$
c_1v_1+\cdots+c_rv_r+d_1u_1+\cdots+d_ku_k=0.
$$

则

$$
c_1v_1+\cdots+c_rv_r=-(d_1u_1+\cdots+d_ku_k).
$$

左边属于 $S$，右边属于 $S^\perp$。由 $S\cap S^\perp=\{0\}$，得两边均等于 $0$，故

$$
c_1=\cdots=c_r=d_1=\cdots=d_k=0.
$$

所以 $v_1,\ldots,v_r,u_1,\ldots,u_k$ 线性无关，故 $r+k\le n$。

又由定理 6，任一 $\mathbb R^n$ 中的向量均可以分解为 $S$ 与 $S^\perp$ 中的向量之和，可得

$$
\mathbb R^n\subset\operatorname{Span}(v_1,\ldots,v_r,u_1,\ldots,u_k),
$$

即 $n\le r+k$。故 $n=r+k$。$\square$

最后证定理 7。显然有

$$
S\subset(S^\perp)^\perp,
$$

只需证 $(S^\perp)^\perp\subset S$。取 $z\in(S^\perp)^\perp$，可分解为

$$
z=u+v,\qquad u\in S,\quad v\in S^\perp.
$$

则

$$
z^{\mathrm T}v=(u+v)^{\mathrm T}v=u^{\mathrm T}v+v^{\mathrm T}v=v^{\mathrm T}v.
$$

又 $z^{\mathrm T}v=0$，得 $v^{\mathrm T}v=0$，因此 $v=0$，$z=u$，故 $z\in S$。$\square$

### 8. 总结

考虑方程 $Ax=b$。

1. 对定义域，相当于 $A$ 矩阵将 $\mathbb R^n$ 分为了 $C(A^{\mathrm T})$ 与 $N(A)$ 两部分：

    $$
    C(A^{\mathrm T})\oplus N(A)=\mathbb R^n.
    $$

    任一 $x\in\mathbb R^n$ 有唯一分解

    $$
    x=x_{\mathrm{row}}+x_{\mathrm{null}},
    \qquad x_{\mathrm{row}}\in C(A^{\mathrm T}),\quad x_{\mathrm{null}}\in N(A).
    $$

    在映射过程中，$x_{\mathrm{null}}$ 不起作用：

    $$
    Ax=Ax_{\mathrm{row}}=b.
    $$

2. 在值域中，由于方程有解当且仅当 $b\in C(A)$，$x$ 最终映射至 $C(A)$。相当于 $\mathbb R^m$ 也被 $A$ 划分为 $C(A)$ 与 $N(A^{\mathrm T})$ 两部分，其中 $C(A)$ 为值域，而 $N(A^{\mathrm T})$ 为通过 $A$ 不可能映射到的部分。

    $$
    C(A)\oplus N(A^{\mathrm T})=\mathbb R^m.
    $$
