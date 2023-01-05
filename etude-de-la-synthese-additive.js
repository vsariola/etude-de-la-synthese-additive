(_ => {
  if (!t) // if t == 0, initialize delay ring buffer into empty value
    d = [];
  // x = left channel, y = right channel
  x = y = d[m = t % 21e3] / 3 || 0; // pull values from the delay buffer. could be undefined, so we default to 0
  u = t / 42e3; // time in beats
  for (j = 0; ++j < 7;) { // j goes from 1 to 6, this is the "channel"
    for (i = 1; i < 7;) { // i goes from 1 to 6, this the partial
      k = j % 3 + 1; // this is the instrument, every two channels share the same instrument
      r = u * 2 ** j * k / 32; // this is the "row" in the pattern, different channels loop at different durations
      v = r % 1; // position within the row
      z = u < 144 && // this is not too important, but wanted a clean ending for the song
        sin(
          PI * 3 * (2846666506 >> (r & 1 + u / 16 & 7) * 4 & 15) * // frequency from min7 chord (2846666506)
          [6, 6, 8, 9, 6][u & u / 32] * // i-iv-v chord progression
          i ** k * u // k=0: partials 1,2,3... k=1: partials 1,4,9... k=2: partials 1,8,21...
        ) / 3 ** (v * i * k ** .5 + .003 / v) / 9; // envelope, higher partials decay faster;
      d[m] = x += sin(n = i++ * u / 99) * z; // evolving weights for partials, save left chn to buffer
      y += sin(n * i) * z; // right channel partials are given different weights
    }
  }
})(), [x, y]
