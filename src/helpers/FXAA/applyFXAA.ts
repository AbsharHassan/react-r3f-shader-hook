// code sourced from https://github.com/mattdesl/glsl-fxaa/blob/master/index.glsl

import fxaa from './fxaa'
import texcoord from './texcoords'

const applyFXAA = `
${texcoord}
${fxaa}
vec4 apply(sampler2D tex, vec2 fragCoord, vec2 resolution) {
	mediump vec2 v_rgbNW;
	mediump vec2 v_rgbNE;
	mediump vec2 v_rgbSW;
	mediump vec2 v_rgbSE;
	mediump vec2 v_rgbM;

	//compute the texture coords
	texcoords(fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
	
	//compute FXAA
	return fxaa(tex, fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`

export default applyFXAA
