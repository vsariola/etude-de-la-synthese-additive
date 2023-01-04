(_ => {
  if (!t) // if t == 0, initialize delay ring buffer into empty value
    d = [];
  p = 2e4; // time per beat
  // x = left channel, y = right channel
  x = y = d[t % p] / 3 || 0; // pull values from the delay buffer. could be undefined, so we default to 0
  u = t / p / 2; // time in beats
  for (j = 1; ++j < 8;) { // j goes from 2 to 7, this is the "channel"
    for (i = 1; i < 7;) { // i goes from 1 to 6, this the partial
      k = j >> 1; // this is the instrument, every two channels share the same instrument
      r = u * 2 ** (j - 7) * k; // this is the "row" in the pattern, different channels loop at different durations
      v = r % 1; // position within the row
      z = u < 132 && // this is not too important, but wanted a clean ending for the song
        3 ** -(v * i * k ** .5 + .005 / v) / 8 * // envelope, higher partials decay faster
        sin(
          PI * 3 * (2846666506 >> (r & 1 + u / 16 & 7) * 4 & 15) * // frequency from min7 chord (2846666506)
          [6, 6, 8, 9][u & u / 32] * // i-iv-v chord progression
          i ** k * u // k=0: partials 1,2,3... k=1: partials 1,4,9... k=2: partials 1,8,21...
        );
      d[t % p] = x += sin(n = i++ * u / 99) * z; // evolving weights for partials, save left chn to buffer
      y += sin(n * i) * z; // right channel partials are given different weights
    }
  }
})(), [x, y]
