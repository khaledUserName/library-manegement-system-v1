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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("../models/payment");
const staff_1 = require("../models/staff");
const responses_1 = __importDefault(require("../traits/responses"));
const bookController_1 = __importDefault(require("./bookController"));
class PaymentController {
    static getPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json();
        });
    }
    static createPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.count("ha ha");
            bookController_1.default.isAvailable(Number(req.body.book_id)).then((result) => {
                if (!result)
                    return res.json({ messge: "the book is unavilable" });
            });
            let staff = yield staff_1.Staff.findOne({
                where: { credential_id: req.body.id },
            });
            yield payment_1.Payment.create({
                staff_id: staff === null || staff === void 0 ? void 0 : staff.staff_id,
                book_id: req.body.book_id,
                reader_id: req.body.reader_id,
                payment_date: new Date().toString(),
            })
                .then((result) => {
                bookController_1.default.updateStatus(Number(req.body.book_id), "sold");
                return responses_1.default.creation(res, result, "reservation");
            })
                .catch((err) => responses_1.default.server(res, err));
        });
    }
    static showPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json();
        });
    }
    static updatePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json();
        });
    }
    static deletePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json();
        });
    }
}
exports.default = PaymentController;
