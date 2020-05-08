/**
 * Formats given data into a string for signing
 */
declare function basestring({ transactionId, formId, fieldId, answer, time }: VerificationBasestringOptions): string;
export default basestring;
