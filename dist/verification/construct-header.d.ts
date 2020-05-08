/**
 * Formats given data into a string for signing
 */
declare function constructHeader({ transactionId, formId, fieldId, answer, time }: {
    transactionId: string;
    formId: string;
    fieldId: string;
    answer: string;
    time: number;
}): string;
export default constructHeader;
