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
exports.OrdersController = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var OrdersController = /** @class */ (function () {
    function OrdersController() {
    }
    OrdersController.prototype.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, productIds, nome_cliente, cidade_cliente, endereco_cliente, telefone_cliente, restaurantId, products, countMap, notEnoughProducts, valor_total, firstId, order;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, productIds = _a.productIds, nome_cliente = _a.nome_cliente, cidade_cliente = _a.cidade_cliente, endereco_cliente = _a.endereco_cliente, telefone_cliente = _a.telefone_cliente;
                        restaurantId = parseInt(req.params.id);
                        // Checa se o restaurante existe
                        if (isNaN(restaurantId)) {
                            return [2 /*return*/, res.status(400).json({ error: "Invalid restaurant id" })];
                        }
                        return [4 /*yield*/, prisma.products.findMany({
                                where: {
                                    id: {
                                        "in": productIds
                                    }
                                }
                            })];
                    case 1:
                        products = _b.sent();
                        countMap = productIds.reduce(function (map, id) {
                            map[id] = (map[id] || 0) + 1;
                            return map;
                        }, {});
                        notEnoughProducts = products.some(function (product) {
                            var count = countMap[product.id] || 0;
                            return product.quantidade < count;
                        });
                        // Retorna um erro se não houver produtos suficientes
                        if (notEnoughProducts) {
                            return [2 /*return*/, res.status(400).json({ error: "Not enough products available" })];
                        }
                        valor_total = products.reduce(function (sum, product) {
                            var count = countMap[product.id];
                            var totalPrice = product.preco * count;
                            sum += totalPrice;
                            return sum;
                        }, 0);
                        firstId = products[0].id_restaurante;
                        if (!products.every(function (p) { return p.id_restaurante === firstId; })) {
                            return [2 /*return*/, res.status(400).json({ error: "All products must belong to the same restaurant" })];
                        }
                        return [4 /*yield*/, prisma.orders.create({
                                data: {
                                    valor_total: valor_total,
                                    nome_cliente: nome_cliente,
                                    cidade_cliente: cidade_cliente,
                                    endereco_cliente: endereco_cliente,
                                    telefone_cliente: telefone_cliente,
                                    restaurants: {
                                        connect: {
                                            id: restaurantId
                                        }
                                    },
                                    order_product: {
                                        create: productIds.map(function (productId) { return ({
                                            products: {
                                                connect: {
                                                    id: productId
                                                }
                                            }
                                        }); })
                                    }
                                }
                            })];
                    case 2:
                        order = _b.sent();
                        // Atualiza a quantidade de produtos
                        return [4 /*yield*/, Promise.all(products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                                var count, newQuantity;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            count = countMap[product.id] || 0;
                                            newQuantity = product.quantidade - count;
                                            return [4 /*yield*/, prisma.products.update({
                                                    where: {
                                                        id: product.id
                                                    },
                                                    data: {
                                                        quantidade: newQuantity
                                                    }
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        // Atualiza a quantidade de produtos
                        _b.sent();
                        return [2 /*return*/, res.json(order)];
                }
            });
        });
    };
    OrdersController.prototype.getOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, prisma.orders.findMany({
                                where: {
                                    restaurante_id: Number(id)
                                }
                            })];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, res.json(orders)];
                }
            });
        });
    };
    OrdersController.prototype.getOrderById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, prisma.orders.findUnique({
                                where: {
                                    id: Number(id)
                                }
                            })];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, res.json(order)];
                }
            });
        });
    };
    OrdersController.prototype.updateOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, productIds, nome_cliente, cidade_cliente, endereco_cliente, telefone_cliente, products, countMap, notEnoughProducts, valor_total, firstId, order;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, productIds = _a.productIds, nome_cliente = _a.nome_cliente, cidade_cliente = _a.cidade_cliente, endereco_cliente = _a.endereco_cliente, telefone_cliente = _a.telefone_cliente;
                        return [4 /*yield*/, prisma.products.findMany({
                                where: {
                                    id: {
                                        "in": productIds
                                    }
                                }
                            })];
                    case 1:
                        products = _b.sent();
                        countMap = productIds.reduce(function (map, id) {
                            map[id] = (map[id] || 0) + 1;
                            return map;
                        }, {});
                        notEnoughProducts = products.some(function (product) {
                            var count = countMap[product.id] || 0;
                            return product.quantidade < count;
                        });
                        // Retorna um erro se não houver produtos suficientes
                        if (notEnoughProducts) {
                            return [2 /*return*/, res.status(400).json({ error: "Not enough products available" })];
                        }
                        valor_total = products.reduce(function (sum, product) {
                            var count = countMap[product.id];
                            var totalPrice = product.preco * count;
                            sum += totalPrice;
                            return sum;
                        }, 0);
                        firstId = products[0].id_restaurante;
                        if (!products.every(function (p) { return p.id_restaurante === firstId; })) {
                            return [2 /*return*/, res.status(400).json({ error: "All products must belong to the same restaurant" })];
                        }
                        return [4 /*yield*/, prisma.orders.update({
                                where: {
                                    id: Number(id)
                                },
                                data: {
                                    valor_total: valor_total,
                                    nome_cliente: nome_cliente,
                                    cidade_cliente: cidade_cliente,
                                    endereco_cliente: endereco_cliente,
                                    telefone_cliente: telefone_cliente,
                                    order_product: {
                                        create: productIds.map(function (productId) { return ({
                                            products: {
                                                connect: {
                                                    id: productId
                                                }
                                            }
                                        }); })
                                    }
                                }
                            })];
                    case 2:
                        order = _b.sent();
                        // Atualiza a quantidade de produtos
                        return [4 /*yield*/, Promise.all(products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                                var count, newQuantity;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            count = countMap[product.id] || 0;
                                            newQuantity = product.quantidade - count;
                                            return [4 /*yield*/, prisma.products.update({
                                                    where: {
                                                        id: product.id
                                                    },
                                                    data: {
                                                        quantidade: newQuantity
                                                    }
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        // Atualiza a quantidade de produtos
                        _b.sent();
                        return [2 /*return*/, res.json(order)];
                }
            });
        });
    };
    OrdersController.prototype.deleteOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, order, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, prisma.order_product.deleteMany({
                                where: {
                                    orders: {
                                        id: Number(id)
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.orders["delete"]({
                                where: {
                                    id: Number(id)
                                }
                            })];
                    case 3:
                        order = _a.sent();
                        if (!order) {
                            return [2 /*return*/, res.status(400).json({ error: "Order not found" })];
                        }
                        return [2 /*return*/, res.json({ message: 'Order deleted successfully' })];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(400).json({ error: "Error deleting order" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.deleteAllOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderDetails, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, prisma.order_product.deleteMany({
                                where: {
                                    orders: {
                                        restaurante_id: Number(id)
                                    }
                                }
                            })];
                    case 2:
                        orderDetails = _a.sent();
                        return [4 /*yield*/, prisma.orders.deleteMany({
                                where: {
                                    restaurante_id: Number(id)
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({ message: 'All orders deleted successfully' })];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(400).json({ error: "Error deleting all orders" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersController;
}());
exports.OrdersController = OrdersController;
