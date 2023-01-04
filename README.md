# Etude de la synthèse additive - 256b bytebeat - Lovebyte 2023

This repository contains the source code for the 256b bytebeat song "Etude de la
synthèse additive", made by pestis / brainlez Coders! and released at Lovebyte
2023 256b bytebeat music compo. This song is accompanied by a Lovebyte 2023
seminar talk, which explains the underlying concepts how the song is composed.

Should be played with the following settings:
- floatbeat
- infix
- 44 kHz

## Technical

If you really stretch the definition of "additive synthesis", the song can be
considered to be built on three different kinds of additive synthesis:
1) There is fairly standard additive synthesis, in that instruments are
   synthesized by adding several partials i.e. sinusoidal oscillators. Each
   oscillator has its own amplitude envelope. There is three different
   instruments with index k=1..3, and each has partials at frequencies f ~ n^k.
   The k=2..3 create more bell-like instruments, while k=1 has a more saw tooth
   shape.
2) A note pattern loops are built from the notes of min7 chord, and a i-iv-v
   chord progression is added on top. Then, several versions of this loop,
   stretched to different durations in time and with varying instruments, are
   played on top of each other. This can be viewed as another type of "additive
   synthesis", only where we add up sped up versions of the loops, instead of
   oscillators.
3) Finally, there is a feedback delay effect. The result of this delay is to add
   several copies of the same song on top of each other, each time-shifted (and
   progressively reduced in volume). If you squint really hard, you can view
   this as a third type "additive synthesis".
