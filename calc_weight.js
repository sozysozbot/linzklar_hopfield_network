"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var HEIGHT = 16;
var WIDTH = 16;
var pixel_vectors = JSON.parse(fs.readFileSync("pixels.json", { encoding: "utf-8" }));
var N = pixel_vectors.length;
var final_weight = [];
for (var m = 0; m < N; m++) {
    for (var k = 0; k < HEIGHT * WIDTH; k++) {
        final_weight[k] = Array.from({ length: HEIGHT * WIDTH }, function () { return 0; });
        for (var l = 0; l < HEIGHT * WIDTH; l++) {
            final_weight[k][l] += k == l ? 0 : pixel_vectors[m][k] * pixel_vectors[m][l] / N;
        }
    }
}
fs.writeFileSync("final_weight.json", JSON.stringify(final_weight, null, 4));
