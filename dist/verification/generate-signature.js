"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tweetnacl_1 = __importDefault(require("tweetnacl"));
var tweetnacl_util_1 = require("tweetnacl-util");
var basestring_1 = __importDefault(require("./basestring"));
function default_1(privateKey) {
    function generateSignature(_a) {
        var transactionId = _a.transactionId, formId = _a.formId, fieldId = _a.fieldId, answer = _a.answer;
        var time = Date.now();
        var data = basestring_1.default({ transactionId: transactionId, formId: formId, fieldId: fieldId, answer: answer, time: time });
        var signature = tweetnacl_1.default.sign.detached(tweetnacl_util_1.decodeUTF8(data), tweetnacl_util_1.decodeBase64(privateKey));
        return "f=" + formId + ",v=" + transactionId + ",t=" + time + ",s=" + tweetnacl_util_1.encodeBase64(signature);
    }
    return generateSignature;
}
exports.default = default_1;
