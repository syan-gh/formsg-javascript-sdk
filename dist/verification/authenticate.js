"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tweetnacl_1 = __importDefault(require("tweetnacl"));
var tweetnacl_util_1 = require("tweetnacl-util");
var basestring_1 = __importDefault(require("./basestring"));
function default_1(publicKey, transactionExpirySeconds) {
    /*
      *  Checks if signature was made within TRANSACTION_EXPIRE_AFTER_SECONDS before submission was created
      * @param {Number} signatureTime ms
      * @param {Number} submissionCreatedAt ms
      */
    function isSignatureTimeValid(signatureTime, submissionCreatedAt) {
        var maxTime = submissionCreatedAt;
        var minTime = maxTime - transactionExpirySeconds * 1000;
        return signatureTime > minTime && signatureTime < maxTime;
    }
    /**
       *  Verifies signature
       * @param {object} data
       * @param {string} data.signatureString
       * @param {number} data.submissionCreatedAt date in milliseconds
       * @param {string} data.fieldId
       * @param {string} data.answer
       * @param {string} data.publicKey
       */
    function authenticate(_a) {
        var signatureString = _a.signatureString, submissionCreatedAt = _a.submissionCreatedAt, fieldId = _a.fieldId, answer = _a.answer;
        try {
            var _b = signatureString
                .split(',')
                .reduce(function (acc, v) {
                var i = v.indexOf('=');
                acc[v.substring(0, i)] = v.substring(i + 1);
                return acc;
            }, {}), transactionId = _b.v, time = _b.t, formId = _b.f, signature = _b.s;
            var signatureDate = +time;
            if (isSignatureTimeValid(signatureDate, submissionCreatedAt)) {
                var data = basestring_1.default({ transactionId: transactionId, formId: formId, fieldId: fieldId, answer: answer, time: signatureDate });
                return tweetnacl_1.default.sign.detached.verify(tweetnacl_util_1.decodeUTF8(data), tweetnacl_util_1.decodeBase64(signature), tweetnacl_util_1.decodeBase64(publicKey));
            }
            else {
                console.info("Signature was expired for signatureString=\"" + signatureString + "\" signatureDate=\"" + signatureDate + "\" submissionCreatedAt=\"" + submissionCreatedAt + "\"");
                return false;
            }
        }
        catch (error) {
            console.error("An error occurred for             signatureString=\"" + signatureString + "\"             submissionCreatedAt=\"" + submissionCreatedAt + "\"             fieldId=\"" + fieldId + "\"             answer=\"" + answer + "\"             error=\"" + error + "\"");
            return false;
        }
    }
    return authenticate;
}
exports.default = default_1;
