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
var _loop_1 = function (k) {
    final_weight[k] = Array.from({ length: HEIGHT * WIDTH }, function () { return 0; });
    var _loop_2 = function (l) {
        if (Math.random() < 0.001) {
            var w = pixel_vectors.map(function (v) { return v[k] * v[l]; });
            console.log({ k: k, l: l, positive: w.filter(function (a) { return a === 1; }).length, negative: w.filter(function (a) { return a === -1; }).length });
        }
        for (var m = 0; m < N; m++) {
            final_weight[k][l] += k == l ? 0 : pixel_vectors[m][k] * pixel_vectors[m][l] / N;
        }
    };
    for (var l = 0; l < HEIGHT * WIDTH; l++) {
        _loop_2(l);
    }
};
for (var k = 0; k < HEIGHT * WIDTH; k++) {
    _loop_1(k);
}
fs.writeFileSync("final_weight.json", JSON.stringify(final_weight, null, 4));
