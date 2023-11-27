---
title: "The Fascinating World of Analytical Math"
description: "Applications of Prime and Complex Numbers in Computer Science and Beyond"
created: 2023-11-17 11:50 PM
tags: ["math", "prime", "fft"]
---

# The Fascinating World of Analytical Math

Prime and complex numbers have always fascinated mathematicians and scientists alike, as they possess unique properties that make them stand out from other numbers.

We started with counting objects, 1, 2, 3... Now we reached to some functions which we cannot even express elementarily.

$$Li(x) =\int_{2}^{x}\frac{1}{lnt}dt \quad OR \quad W(x.e^x) = x$$

<sub>The famous [Logarthmic integral](https://www.ams.org/publications/authors/books/postpub/acalc-ExpositoryTalkonPrimes.pdf) and [Lambert W function](https://en.wikipedia.org/wiki/Lambert_W_function).<br>We can calculate them at certain value but we cannot express them using elementary equations.</sub>

## Introduction

I usually talk about Computer Science, and by the basic description above it might seem we're going too deep into math, but trust me on this one, this is so useful for analytical & critical thinking as well as so beautiful you'll probably fall in love with it.

So basically math is broadly categorized in two sections,

1. Elementary Math: Basic math involving algebraic notations, equation solving.
2. Analytical Math: Evolved from calculus, study of properties of functions, maybe even leaving the real number line.

The analytical math is interesting, it revolves around studying harmonic waves, discovering patterns, generalizing curves, and many more.

With every step, unexpected and fascinating results fall in.

## Complex Numbers

Complex numbers inhibit some really interesting properties. Everything starts with defining $i = \sqrt{-1}$ or $i^2 = -1$.

This leads to expansion of Number line into 2D.

![Complex Plane](https://upload.wikimedia.org/wikipedia/commons/a/ab/Complex_plane_malayalam.png)

Any point can be represented by Cartesian coordinates $(x, y)$ or by a new coordinate system $(r, \theta)$ known as polar coordinates.

$$r.e^{i\theta} = r.(cos\theta + i.sin\theta)$$

Where $r = \sqrt{x^2 + y^2}$ is magnitude and $\theta = tan^{-1}(y/x)$ angle of the vector from origin.

The $r.e^{i\theta}$ is nothing but a notation, it doesn't have much to do with the constant $e$ in reality, only calculated from the right hand side equality.

But due to this identity, it holds some really beautiful symmetries. If for the moment we just think about the unit circle ($r = 1$), squaring a complex number simply doubles the power $(e^{i\theta})^2 = e^{i.2\theta}$ which can be evaluated by replacing $\theta$ by $2\theta$ in the RHS of equation.

### Rotating curves

A really simple but powerful usage of this is to rotate a curve.

Magnitude of $e^{i\theta}$ is 1, as $\sqrt{cos^2\theta+sin^2\theta} = 1$. Which means multiplying it with any regular point $x+iy$ only rotates it without changing the distance from the origin.

Let's apply it on the simplest parabola,

$$y = x^2$$

In complex plane we'll represent it by a point $(x, y)$, as $x+iy$. So it'll be $x+ix^2$.

Let's multiply it by $e^{i\pi/6}$,

$$(x+ix^2).(cos\tfrac{\pi}{6}+isin\tfrac{\pi}{6})$$
$$(x+ix^2).(\tfrac{\sqrt{3}}{2} + i\tfrac{1}{2})$$
$$\tfrac{\sqrt{3}x - x^2}{2} + i.\tfrac{x + \sqrt{3}x^2}{2}$$

Here's the graphed version: https://www.desmos.com/calculator/midjoyfqe0

![Parabola Rotated](/blogs/prime-numbers/parabola-rotated.png)

Amazing, isn't it?


### FFT

The Fast Fourier Transform is one of the most ingeneous and my personal favourite algorithm.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/h7apO7q16V0?si=hDUTTwaLZdi8eT-G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

This video is the most elegant introduction to it and its internal working, that complex roots of unity can be used to calculate points in $logn$ time using hidden symmetry in complex world.

What derives from them is even more interesting,

$$Coefficient \hspace{1pt} Repr \quad \mathop{\longleftrightarrows}^{\text{FFT}}_{\text{IFFT}} \quad Point \hspace{1pt} Value \hspace{1pt} Repr \quad \mathop{\longleftrightarrows}^{\text{FFT}}_{\text{IFFT}} \quad Frequency \hspace{1pt} Domain$$

Plugging a polynomial's coefficient gives $f(x)$ output at complex roots of unity, plugging those $f(x)$ outputs of any curve moves it from y-t domain into y-freq domain.

Same function for two completely unrelated tasks.

Using this point-value representation, you can multiply two polynomials in effectively $O(nlogn)$ time.

And it doesn't stop there, you can split the signal into its frequency domain, apply filters, convert it back to signals.

We can use it to perform frequency analysis over image (high freq = more color change), so if we remove low-frequency we can [effectively detect edges](https://www.youtube.com/watch?v=GKsCWivmlHg&t=25m2s).

Apply the same thing to sound, you built an equalizer. Denoise or increase/drop base, and convert back into sound.

Apply the same on to image's sub-pixel group, you found the base of JPEG compression.

Apply the same algorithm on a periodic function to find its period, which is used in Shor's algorithm (QFT) to factor a number in polynomial time.

It is even useful in time-series data analysis, chemistry as with calculations of isotopic distributions, solving differential equations and what not?

## Abstract Algebra

When we're introduced to vectors, we're exposed to new operations, _dot and cross-products_.

When we're exposed to $\mathbb{Z}$ (integers) we're exposed to _prime numbers_. This is because concept of prime numbers quite literally doesn't exist in the $\mathbb{R}$ (real) numbers.

And same goes to complex numbers, although they all possess some unique properties, we have to effectively learn and relate these properites in order to render them useful or comprehensible for our purpose.

Ring theory exactly tackles this, by generalizing the number systems and studying them as a whole. And allows more systems to emerge from them.

But before getting deeper, I'd like to show a basic application of abstract algebra.

### Calculating higher powers

Let's say I give you a not so good-looking expression,

$$x = \frac{1 + \sqrt{5}}{2}$$

And you've to tell $x^{12}$, how'd you do it?

Now let's do some interesting things, let's say $x^2 - x - 1 = 0$ is the equation that has the above solution $x$, so if we divide $x^{12} = f(x).(x^2-x-1) + ax + b$, then regardless of what $f(x)$ quotient would be that part of the term will become 0, as dividend is 0 at the root of it.

Thus we're trying to find the remainder $ax+b$ when $x^{12}$ is divided by $x^2-x-1$. But that's 12 steps, let's simplify.

If $\alpha$ is any generic root of the equation, we must have $\alpha^2-\alpha-1 = 0$, so $\alpha^2 = \alpha + 1$.

We can keep taking the modulo in small parts of $x^{12}$ when $\alpha$ is plugged into it.

$\alpha^{12} = \alpha^2.\alpha^2.\alpha^2.\alpha^2.\alpha^2.\alpha^2$

$\alpha^{12} = (1+\alpha).(1+\alpha).(1+\alpha).(1+\alpha).(1+\alpha).(1+\alpha)$

$\alpha^{12} = (\alpha^2 + 2\alpha + 1).(\alpha^2 + 2\alpha + 1).(\alpha^2 + 2\alpha + 1)$

$\alpha^{12} = (3\alpha + 2).(3\alpha + 2).(3\alpha + 2)$

$\alpha^{12} = (9\alpha^2 + 12\alpha + 4).(3\alpha + 2)$

$\alpha^{12} = (21\alpha + 13).(3\alpha + 2)$

$\alpha^{12} = (144\alpha + 89)$

Plugging in the value we get $171+72\sqrt5$, quite faster than manual multiplication right?

### Rings & Field Arithmatic

Integers have served us as an abstraction for counting objects for centuries, but sometimes things like complex numbers help us in understanding our world better. Rings help us generalize our view of different number systems.

We define a ring such as $(Z, +, \times)$ along with units $\{1, -1\}$. Units serve as excluded numbers in prime factorization of any number so everything is kept unique. For example, $-5$ is prime as it cannot be factored any further, and since units are prohibited to be written in prime factorization.

With this we're ready to define a few rings,

$$\mathbb{Z}[i] = \{a+bi : a,b \in \mathbb{Z}\} \quad Units = \{\pm 1, \pm i\}$$

$\mathbb{Z}[i]$ is read as "$\mathbb{Z}$ associated with $i$", i.e. sum of $\mathbb{Z}$ with as many powers of i and $\mathbb{Z}$.<br>Note that 2 is no longer prime in this number system, $2 = (1-i)(1+i)$.

Let's go further,

$$\mathbb{Z}[2] = \mathbb{Z} \quad Units = \{\pm 1\}$$
$$\mathbb{Z}[2^{-1}] = \{\tfrac{a}{2^b} : b \in \mathbb{Z}^{\geq 0}\} \quad Units = \{\pm 2^n : n \in \mathbb{Z}\}$$
$$\mathbb{R}[i] = \mathbb{C} \quad Units = \{\pm 1, \pm i\}$$

Note that, $5\mathbb{Z} = \{5n : n \in \mathbb{Z}\}$ is a (subset of) $\subset \mathbb{Z}$, as it only contains multiples of 5, not all integers.

#### Quotient Ring

A quotient ring $\mathbb{Z}/5\mathbb{Z}$ is defined as $\{5\mathbb{Z}, \hspace{2pt} 5\mathbb{Z}+1, \hspace{2pt} 5\mathbb{Z}+2, \hspace{2pt} 5\mathbb{Z}+3, \hspace{2pt} 5\mathbb{Z}+4\}$, a remainder set of all the numbers of $\mathbb{Z}$ when divided by multiples of 5 ($5\mathbb{Z}$).

It is isomorphic to $\mathbb{Z}_5 = \{0, 1, 2, 3, 4\}$ where all the elements are defined modulo 5. So $1 \hspace{2pt} (mod \hspace{2pt} 5)$ in reality is equivalent to $5\mathbb{Z}+1$.

We encounter them all the time, even the wall-clock resets after 12 O'clock.

#### Polynomial Ring

$\mathbb{R}[x]$ is set of all polynomials with as many powers of x, with coefficients coming from $\mathbb{R}$.<br>$\mathbb{R}[x] = \{a_0 + a_1.x + a_2.x^2 + ... + a_n.x^n : a_i \in \mathbb{R}\}$

$\mathbb{R}[x]/x$ is precisely isomorphic to $\mathbb{R}$ itself ($\mathbb{R}[x]/x \simeq \mathbb{R}$), because we're letting $x$ to behave like $0$.

$\mathbb{R}[x]/(x^2+1) \simeq \mathbb{C}$, because we're letting $x$ to behave like $i$ (as $x^2+1=0$).<br>In its numeral system, $x^2 = -1$, $x^3 = -x$, $x^4 = 1$, $x$ behaves entirely like $i$, yet its abstract, not finalizing $x = i$ as its only solution, $(a+bx) \simeq (a+bi)$.<br>And even, $\mathbb{R}[x]/(x^2+4) \simeq \mathbb{C}$.

Note that, $\mathbb{R}[x]/(x-2) \simeq \mathbb{R}[2] \simeq \mathbb{R}$, as we're just letting $x-2 = 0$, which happens to be R associate of 2.

From here, we can also define $\mathbb{R}^2 \simeq \mathbb{C}$. This is obvious as there is a natural bijection $(a,b) \mapsto a+bi$.

### Base & Extension Fields

<!--
111 ~ x^2+x+1

https://math.stackexchange.com/questions/4216211/what-exactly-is-an-isomorphism
auto-isomorphism with GF(p^m) with different primitive polynomials

A polynomial is a ideal, primitive polynomial is maximal ideal
6Z is not maximal ideal as 2Z and 3Z exist between Z and 6Z

Field has only 2 ideals {0} and F.

R[x]
gcd(f(x), g(x)) = d(x)

R[i][x] = C[x]  every poly is factorizable here

R[x]/(x^2+1) basically means we're considering x^2+1 like it is 0, so x exactly behaves like i
R[x]/(x^2+1) ~ C (algebraically)        a+bx <-> a+bi
-->

### Primitive Polynomials (multiple primes)


## Integer Factorization

### Miller Rabin & Extensions

