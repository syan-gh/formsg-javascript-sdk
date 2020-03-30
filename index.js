'use strict';

var webhooks = require('./src/webhooks');
var crypto = require('./src/crypto');

/**
 * Entrypoint into the FormSG SDK
 * @param {Object} options
 * @param {string} [options.mode] If set to 'staging' this will initialise
 * the SDK for the FormSG staging environment
 * @param {string} [options.webhookSecretKey] Optional base64 secret key for signing webhooks
 */
module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$mode = _ref.mode,
      mode = _ref$mode === undefined ? 'production' : _ref$mode,
      webhookSecretKey = _ref.webhookSecretKey;

  return {
    webhooks: webhooks({ mode: mode, webhookSecretKey: webhookSecretKey }),
    crypto: crypto
  };
};
