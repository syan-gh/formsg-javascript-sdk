"use strict";
/**
 * @file Manages verification of otp form fields (email, sms, whatsapp)
 * @author Jean Tan
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var authenticate_1 = __importDefault(require("./authenticate"));
var generate_signature_1 = __importDefault(require("./generate-signature"));
var get_public_key_1 = __importDefault(require("./get-public-key"));
module.exports = function (params) {
    if (params === void 0) { params = {}; }
    var mode = params.mode, verificationOptions = params.verificationOptions;
    if (verificationOptions !== undefined) {
        var verificationPublicKey = get_public_key_1.default(mode);
        var verificationSecretKey = verificationOptions.secretKey, transactionExpiry = verificationOptions.transactionExpiry;
        return {
            authenticate: transactionExpiry !== undefined ?
                authenticate_1.default(verificationPublicKey, transactionExpiry)
                : function () { throw new Error('Provide transactionExpiry when initializing the formsg sdk to use this function.'); },
            generateSignature: verificationSecretKey !== undefined ?
                generate_signature_1.default(verificationSecretKey)
                : function () { throw new Error('Provide verificationSecretKey when initializing the formsg sdk to use this function.'); },
        };
    }
    return {};
};
