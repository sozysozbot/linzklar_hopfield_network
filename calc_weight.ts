import * as fs from 'fs';

const HEIGHT = 16;
const WIDTH = 16;
type Vector = number[]; // HEIGHT * WEIGHT
const pixel_vectors: Vector[] = JSON.parse(fs.readFileSync("pixels.json", { encoding: "utf-8" }));
const N = pixel_vectors.length;
const final_weight: number[][] = [];
for (let m = 0; m < N; m++) {
	for (let k = 0; k < HEIGHT * WIDTH; k++) {
		final_weight[k] = Array.from({ length: HEIGHT * WIDTH }, () => 0);
		for (let l = 0; l < HEIGHT * WIDTH; l++) {
			final_weight[k][l] += k == l ? 0 : pixel_vectors[m][k] * pixel_vectors[m][l] / N;
		}
	}
}
fs.writeFileSync(`final_weight.json`, JSON.stringify(final_weight, null, 4));