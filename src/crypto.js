'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var nacl = require('tweetnacl');

var _require = require('tweetnacl-util'),
    encodeBase64 = _require.encodeBase64,
    decodeBase64 = _require.decodeBase64,
    encodeUTF8 = _require.encodeUTF8,
    decodeUTF8 = _require.decodeUTF8;

/**
 * A field type available in FormSG as a string
 * @typedef {string} FieldType
 * @example
 * 'section'
 * 'radiobutton'
 * 'dropdown'
 * 'checkbox'
 * 'nric'
 * 'email'
 * 'table'
 * 'number'
 * 'rating'
 * 'yes_no'
 * 'decimal'
 * 'textfield' // Short Text
 * 'textarea' // Long Text
 * 'attachment'
 * 'date'
 * 'mobile'
 */

/**
 * Represents an answer provided to a form question.
 * @typedef {object} Response
 * @property {string} _id - The field ID of the response
 * @property {string} question - The form question
 * @property {string} answer - The answer to the form
 * @property {FieldType} fieldType - The field type
 */

/**
 * Encrypted basestring containing the submission public key,
 * nonce and encrypted data in base-64.
 * @typedef {string} EncryptedContent
 * A string in the format of <SubmissionPublicKey>;<Base64Nonce>:<Base64EncryptedData>
 */

/**
 * Encrypts submission with a unique keypair for each submission
 * @param {String} formPublicKey base64
 * @param {Response[]} responses Array of Response objects
 * @returns {EncryptedContent}
 * @throws error if any of the encrypt methods fail
 */


function encrypt(formPublicKey, responses) {
  var submissionKeypair = generate();
  var nonce = nacl.randomBytes(24);
  var encrypted = encodeBase64(nacl.box(decodeUTF8(JSON.stringify(responses)), nonce, decodeBase64(formPublicKey), decodeBase64(submissionKeypair.secretKey)));
  return submissionKeypair.publicKey + ';' + encodeBase64(nonce) + ':' + encrypted;
}

/**
 * Decrypts an encrypted submission.
 * @param {string} formPrivateKey base64
 * @param {EncryptedContent} encryptedContent encrypted string encoded in base64
 * @return {Object | null} Parsed JSON submission object if successful.
 */
function decrypt(formPrivateKey, encryptedContent) {
  try {
    var _encryptedContent$spl = encryptedContent.split(';'),
        _encryptedContent$spl2 = _slicedToArray(_encryptedContent$spl, 2),
        submissionPublicKey = _encryptedContent$spl2[0],
        nonceEncrypted = _encryptedContent$spl2[1];

    var _nonceEncrypted$split = nonceEncrypted.split(':').map(decodeBase64),
        _nonceEncrypted$split2 = _slicedToArray(_nonceEncrypted$split, 2),
        nonce = _nonceEncrypted$split2[0],
        encrypted = _nonceEncrypted$split2[1];

    var decrypted = nacl.box.open(encrypted, nonce, decodeBase64(submissionPublicKey), decodeBase64(formPrivateKey));
    return JSON.parse(encodeUTF8(decrypted));
  } catch (err) {
    return null;
  }
}

/**
 * A base-64 encoded cryptographic keypair suitable for curve25519.
 * @typedef {Object} Keypair
 * @property {string} publicKey The base-64 encoded public key
 * @property {string} secretKey The base-64 encoded secret key
 */

/**
 * Generates a new keypair for encryption.
 * @returns {Keypair}
 */
function generate() {
  var kp = nacl.box.keyPair();
  return {
    publicKey: encodeBase64(kp.publicKey),
    secretKey: encodeBase64(kp.secretKey)
  };
}

/**
 * Returns true if a pair of public & secret keys are associated with each other
 * @param {string} publicKey
 * @param {string} secretKey
 */
function valid(publicKey, secretKey) {
  var plaintext = 'testtext';
  try {
    var ciphertext = encrypt(publicKey, plaintext);
    return decrypt(secretKey, ciphertext) === plaintext;
  } catch (err) {
    return false;
  }
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  generate: generate,
  valid: valid
};