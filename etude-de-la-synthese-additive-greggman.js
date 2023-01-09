(_ => {
  if (!t) // if t == 0, initialize delay ring buffer into empty value
    d = [];
  // x = left channel, y = right channel
  // pull values from the delay buffer. could be undefined, so we default to 0,0
  // note the ping pong delay: left delays right, right delays left
  [y, x] = d[t - 21e3] || [0, 0];
  u = t / 134e4; // time in sections
  // the 4.5 is not too important, but I wanted a clean ending for the song
  for (j = 0; u < 4.5 & ++j < 7;) { // j goes from 1 to 6, this is the "channel"
    for (i = 1; i < 7;) { // i goes from 1 to 6, this the partial
      k = j % 3 + 1; // this is the instrument, every two channels share the same instrument
      r = u * 2 ** j * k; // this is the "row" in the pattern, different channels loop at different durations
      v = r % 1; // position within the row
      z = sin(
        PI * 96 * (2846666506 >> (r & 1 + u * 2 & 7) * 4 & 15) * // frequency from min7 chord (2846666506)
        [6, 6, 8, 9][u * 32 & u & 3] * // i-iv-v chord progression
        i ** k * u // k=1: partials 1,2,3... k=2: partials 1,4,9... k=3: partials 1,8,21...
      ) / 3 ** (v * i * k ** .5 + .003 / v) / 3; // envelope, higher partials decay faster;
      x += sin(n = i++ * u / 3) * z; // evolving weights for partials, save left chn to buffer
      y += sin(n * i) * z; // right channel partials are given different weights
    }
  }
})(), d[t] = [x / 3, y / 3]

// after minifying: 254 characters
// (s=>{for(t||(d=[]),[y,x]=d[t-21e3]||[0,0],u=t/134e4,j=0;u<4.5&++j<7;)for(i=1;i<7;)k=j%3+1,r=u*2**j*k,v=r%1,z=sin(96*PI*(2846666506>>4*(r&1+2*u&7)&15)*[6,6,8,9][32*u&u&3]*i**k*u)/3**(v*i*k**.5+.003/v)/3,x+=sin(n=i++*u/3)*z,y+=sin(n*i)*z})(),d[t]=[x/3,y/3]
