"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.ProductsController = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var ProductsController = /** @class */ (function () {
    function ProductsController() {
    }
    ProductsController.prototype.createProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, descricao, quantidade, preco, categoria, id_restaurante, newProduct, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, nome = _a.nome, descricao = _a.descricao, quantidade = _a.quantidade, preco = _a.preco, categoria = _a.categoria;
                        id_restaurante = parseInt(req.params.id);
                        if (isNaN(id_restaurante)) {
                            return [2 /*return*/, res.status(400).json({ error: "Invalid restaurant id" })];
                        }
                        return [4 /*yield*/, prisma.products.create({
                                data: {
                                    nome: nome,
                                    descricao: descricao,
                                    quantidade: parseInt(quantidade, 10),
                                    preco: parseFloat(preco),
                                    categoria: categoria,
                                    restaurants: {
                                        connect: {
                                            id: id_restaurante
                                        }
                                    }
                                }
                            })];
                    case 1:
                        newProduct = _b.sent();
                        return [2 /*return*/, res.json(newProduct)];
                    case 2:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.status(500).json({ error: "Error creating product" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var restaurantId, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        restaurantId = req.params.restaurantId;
                        return [4 /*yield*/, prisma.products.findMany({
                                where: {
                                    id_restaurante: Number(restaurantId)
                                }
                            })];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.json(products)];
                }
            });
        });
    };
    ProductsController.prototype.getProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = req.params.productId;
                        return [4 /*yield*/, prisma.products.findUnique({
                                where: {
                                    id: Number(productId)
                                }
                            })];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, res.json(product)];
                }
            });
        });
    };
    ProductsController.prototype.updateProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, nome, descricao, quantidade, preco, categoria, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, nome = _a.nome, descricao = _a.descricao, quantidade = _a.quantidade, preco = _a.preco, categoria = _a.categoria;
                        return [4 /*yield*/, prisma.products.update({
                                where: {
                                    id: Number(id)
                                },
                                data: {
                                    nome: nome,
                                    descricao: descricao,
                                    quantidade: quantidade,
                                    preco: preco,
                                    categoria: categoria
                                }
                            })];
                    case 1:
                        product = _b.sent();
                        return [2 /*return*/, res.json(product)];
                }
            });
        });
    };
    ProductsController.prototype.deleteProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, prisma.products["delete"]({
                                where: {
                                    id: Number(id)
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.json({ message: 'Product deleted successfully' })];
                }
            });
        });
    };
    return ProductsController;
}());
exports.ProductsController = ProductsController;
