---
title: "Introduction to Modulo Arithmetic"
date: 2020-11-23 20:38:00
image: "./root-image.png"
description: "In this post, I attempt to simplify modulo arithmetic for everyone. We learn basic rules, and some intermediate concepts."
tags:
  - Modulo Arithmetic
  - Mathematics
  - Computer Science
---

Hi everyone. In this post, we will learn about modulo arithmetic and discuss 
some rules and their use-cases.

Modular arithmetic is a system of arithmetic for integers, which consists of remainders. 
Consider the following expression:
$$
    a = qn + r \quad | \quad 0 \le r \lt a 
$$

$$
    \therefore\:, \;\; a \equiv r \;\; (mod \;\; n)
$$
For example,
$$
    13 \equiv 21 \;\; (mod \;\; 2)
$$
as
$$
    13 = 1 \;\; (mod \;\; 2)
$$
and 
$$
    21 = 1 \;\; (mod \;\; 2)
$$

> Note: $\equiv$ is not the same as $=$

<br>

### Addition properties
* If $a + b = c$, then $a\;($mod $N)$ $+$ $b\;($mod $N)$ $\equiv$ $c\;($mod $N)$.
* If $a \equiv b \;($mod $N)$, then $a + k \equiv b + k \;($mod $N)$ for any integer $k$.
* If $a \equiv b \;($mod $N)$ and $c \equiv d \;($mod $N)$, then $a + c \equiv b + d \;($mod $N)$.
* If $a \equiv b \;($mod $N)$, then $-a \equiv -b \;($mod $N)$.

<br>

### Multiplication properties
* If $a \cdot b = c$, then $a\;($mod $N)$ $\cdot$ $b\;($mod $N)$ $\equiv$ $c\;($mod $N)$.
* If $a \equiv b \;($mod $N)$, then $ka \equiv kb \;($mod $N)$ for any integer, $k$.
* If $a \equiv b \;($mod $N)$ and $c \equiv d \;($mod $N)$, then $ac \equiv bd \;($mod $N)$.

<br>

### Exponentiation property
If $a \equiv b \;($mod $N)$, then $a^k \equiv b^k \;($mod $N)$, for any positive integer, $k$.

<br>

### Division property
If gcd$(k, N) = 1$, and $ka \equiv kb\;($mod $N)$, then $a \equiv b\;($mod $N)$.
> You can't just divide both sides, unless the above property is true.

<br>

### Modular inverse 
If $a$ and $N$ are integers such that gcd$(a, N) = 1$, then there exists an integer, 
$x$, such that $ax \equiv 1 \;($mod $N)$.
