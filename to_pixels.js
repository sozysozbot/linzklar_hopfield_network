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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var pngjs = __importStar(require("pngjs"));
var HEIGHT = 16;
var WIDTH = 16;
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var in_path, files;
        return __generator(this, function (_a) {
            in_path = "pngs";
            files = fs.readdirSync(in_path + "/");
            // const weights: number[][][] = [];
            files.forEach(function (file, index) {
                fs.createReadStream(in_path + "/" + file)
                    .pipe(new pngjs.PNG())
                    .on("parsed", function () {
                    var txt = "";
                    if (this.height !== HEIGHT) {
                        throw new Error("At " + file + ", expected height " + HEIGHT + ", got " + this.height);
                    }
                    if (this.width !== WIDTH) {
                        throw new Error("At " + file + ", expected width " + WIDTH + ", got " + this.width);
                    }
                    // v is a vector containing all the HEIGHT * WIDTH pixels.
                    var v = [];
                    for (var y = 0; y < this.height; y++) {
                        for (var x = 0; x < this.width; x++) {
                            var idx = (this.width * y + x) << 2;
                            if (this.data[idx] === 0
                                && this.data[idx + 1] === 0
                                && this.data[idx + 2] === 0
                                && this.data[idx + 3] === 255) {
                                // black; +1
                                v[this.width * y + x] = 1;
                                txt += "@";
                            }
                            else if (this.data[idx] === 255
                                && this.data[idx + 1] === 255
                                && this.data[idx + 2] === 255
                                && this.data[idx + 3] === 255) {
                                // white; -1
                                v[this.width * y + x] = -1;
                                txt += "-";
                            }
                            else {
                                throw new Error("Invalid color rgba(" + this.data[idx] + "," + this.data[idx + 1] + "," + this.data[idx + 2] + "," + this.data[idx + 3] + ") found in " + file);
                            }
                        }
                        txt += "\n";
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
                    fs.writeFileSync("txts/" + file + ".txt", JSON.stringify(v) + ",\n");
                    //console.log(JSON.stringify(weight));
                    // console.log(`${file}:\n${txt}`);
                    //weights.push(weight);
                });
            });
            return [2 /*return*/];
        });
    });
})();
