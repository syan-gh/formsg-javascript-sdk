"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var verification_keys_1 = require("../resource/verification-keys");
var stage_1 = __importDefault(require("../util/stage"));
/**
 * Retrieves the appropriate public key.
 * Defaults to production.
 * @param mode The package mode to retrieve the public key for.
 */
function getPublicKey(mode) {
    switch (mode) {
        case stage_1.default.development:
        case stage_1.default.staging:
            return verification_keys_1.VERIFICATION_KEYS.staging.publicKey;
        case stage_1.default.test:
            return verification_keys_1.VERIFICATION_KEYS.test.publicKey;
        default:
            return verification_keys_1.VERIFICATION_KEYS.production.publicKey;
    }
}
exports.default = getPublicKey;
