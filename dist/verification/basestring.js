"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Formats given data into a string for signing
 */
function basestring(_a) {
    var transactionId = _a.transactionId, formId = _a.formId, fieldId = _a.fieldId, answer = _a.answer, time = _a.time;
    return transactionId + "." + formId + "." + fieldId + "." + answer + "." + time;
}
exports.default = basestring;
