import * as fs from 'fs';
import * as pngjs from 'pngjs';

const HEIGHT = 16;
const WIDTH = 16;

(async function () {
	const in_path = "pngs"
	const files = fs.readdirSync(`${in_path}/`);
	// const weights: number[][][] = [];
	files.forEach((file, index) => {
		fs.createReadStream(`${in_path}/${file}`)
			.pipe(new pngjs.PNG())
			.on("parsed", function () {
				let txt = "";
				if (this.height !== HEIGHT) {
					throw new Error(`At ${file}, expected height ${HEIGHT}, got ${this.height}`);
				}
				if (this.width !== WIDTH) {
					throw new Error(`At ${file}, expected width ${WIDTH}, got ${this.width}`);
				}

				// v is a vector containing all the HEIGHT * WIDTH pixels.
				const v: number[] = [];
				for (var y = 0; y < this.height; y++) {
					for (var x = 0; x < this.width; x++) {
						var idx = (this.width * y + x) << 2;
						if (this.data[idx] === 0
							&& this.data[idx + 1] === 0
							&& this.data[idx + 2] === 0
							&& this.data[idx + 3] === 255
						) {
							// black; +1
							v[this.width * y + x] = 1;
							txt += "@";
						} else if (this.data[idx] === 255
							&& this.data[idx + 1] === 255
							&& this.data[idx + 2] === 255
							&& this.data[idx + 3] === 255
						) {
							// white; -1
							v[this.width * y + x] = -1;
							txt += "-";
						} else {
							throw new Error(`Invalid color rgba(${this.data[idx]},${this.data[idx + 1]},${this.data[idx + 2]},${this.data[idx + 3]}) found in ${file}`);
						}
					}
					txt += "\n"
				}

				/*// hebbian learning
				// weight is a matrix of (HEIGHT * WIDTH) rows and (HEIGHT * WIDTH) columns.
				const weight: number[][] = [];
				for (let k = 0; k < HEIGHT * WIDTH; k++) {
					weight[k] = [];
					for (let l = 0; l < HEIGHT * WIDTH; l++) {
						weight[k][l] = k == l ? 0 : v[k] * v[l];
					}
				}*/
				fs.writeFileSync(`txts/${file}.txt`, JSON.stringify(v) + ",\n");
				//console.log(JSON.stringify(weight));
				// console.log(`${file}:\n${txt}`);
				//weights.push(weight);
			});
	});

	/*await new Promise(r => setTimeout(r, 4000));
	console.log("Waited for two seconds. ");
	let count = weights.length;
	let final_weight: number[][] = [];
	for (let m = 0; m < count; m++) {
		for (let k = 0; k < HEIGHT * WIDTH; k++) {
			final_weight[k] = Array.from({ length: HEIGHT * WIDTH }, () => 0);
			for (let l = 0; l < HEIGHT * WIDTH; l++) {
				final_weight[k][l] += weights[m][k][l] / count;
			}
		}
	}*/

	
})();