'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * The constituents of the X-FormSG-Signature
 * @typedef {Object} Signature
 * @property {string} v1 - The ed25519 signature
 * @property {string} t - The epoch used for signing
 * @property {string} s - The submission ID
 * @property {string} f - The form ID
 */
/**
 * Parses the X-FormSG-Signature header into its constitutents
 * @param {string} header The X-FormSG-Signature header
 * @returns {Signature}
 */
function parseSignatureHeader(header) {
  return header.split(',').map(function (kv) {
    return kv.split(/=(.*)/);
  }).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    acc[k] = v;
    return acc;
  }, {});
}

module.exports = {
  parseSignatureHeader: parseSignatureHeader
};