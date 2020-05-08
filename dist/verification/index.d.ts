/**
 * @file Manages verification of otp form fields (email, sms, whatsapp)
 * @author Jean Tan
 */
declare const _default: (params?: PackageInitParams) => {
    authenticate: Function;
    generateSignature: ({ transactionId, formId, fieldId, answer }: VerificationSignatureOptions) => string;
} | {
    authenticate?: undefined;
    generateSignature?: undefined;
};
/**
 * Provider that accepts configuration
 * before returning the webhooks module
 */
export = _default;
