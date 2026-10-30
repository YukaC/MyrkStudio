export const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uScroll;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main(){
    float aspect = uRes.x / uRes.y;
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    float t = uTime;

    vec3 bg   = vec3(0.020, 0.020, 0.031);
    vec3 crim = vec3(0.890, 0.235, 0.373);
    vec3 ice  = vec3(0.62, 0.70, 0.80);

    vec3 col = mix(bg * 1.6, bg, smoothstep(-0.5, 0.6, p.y));

    float c = smoothstep(0.35, 0.9, fbm(p * vec2(1.6, 2.6) + vec2(t * 0.015, 0.0)));
    col += mix(ice * 0.06, crim * 0.12, smoothstep(-0.2, 0.6, p.x)) * c;

    float wob = 0.08 * sin(p.x * 3.0 + t * 0.12) + 0.05 * fbm(p * 3.0 + t * 0.05);
    float band = smoothstep(0.18, 0.0, abs(p.y - 0.22 - wob));
    col += mix(ice, crim, 0.5 + 0.5 * sin(p.x * 2.0 + t * 0.1)) * band * 0.10;

    /* The crimson sun and the ice moon used to sit here as two free-floating
       bodies. They competed with the emblem, which is the composition's subject,
       and read as stray flares over the copy — the field keeps the fog, the
       drifting band and the snow, and the emblem owns everything that glows. */

    float snow = 0.0;
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 g = vUv * vec2(aspect, 1.0) * (18.0 + fi * 14.0);
      g.x += t * (0.4 + fi * 0.25) + sin(t * 0.3 + fi) * 0.5;
      g.y += t * (0.8 + fi * 0.5) + uScroll * 6.0;
      vec2 id = floor(g);
      vec2 fr = fract(g) - 0.5;
      vec2 off = (vec2(hash(id + 3.0), hash(id + 9.0)) - 0.5) * 0.5;
      float flake = step(0.93, hash(id + fi * 17.0)) * smoothstep(0.16, 0.0, length(fr + off));
      snow += flake * (0.8 - fi * 0.2);
    }
    col += vec3(0.93, 0.95, 0.98) * snow * 0.55;

    col *= smoothstep(1.25, 0.3, length(vUv - 0.5) * 1.6);
    col = mix(col, bg, uScroll);
    gl_FragColor = vec4(col, 1.0);
  }
`;
