import type { Transaction } from './types.js';

export function validateTransactions(data: unknown): Transaction[] {
    if (!Array.isArray(data)) {
        throw new Error("Transaction data must be an array.");
    }

    const transactions: Transaction[] = [];

    data.forEach((transaction, index) => {

        if (
            !transaction ||
            typeof transaction !== "object" ||
            Array.isArray(transaction)
        ) {
            throw new Error(`Transaction ${index + 1} is not a valid object.`);
        }

        const txn = transaction as any;

        if (typeof txn.transactionId !== "string") {
            throw new Error(`Transaction ${index + 1}: invalid transactionId.`);
        }

        if (typeof txn.productId !== "string") {
            throw new Error(`Transaction ${index + 1}: invalid productId.`);
        }

        if (typeof txn.customerId !== "string") {
            throw new Error(`Transaction ${index + 1}: invalid customerId.`);
        }

        if (
            typeof txn.productUnitCostPrice !== "number" ||
            !Number.isFinite(txn.productUnitCostPrice) ||
            txn.productUnitCostPrice < 0
        ) {
            throw new Error(
                `Transaction ${index + 1}: invalid productUnitCostPrice.`
            );
        }

        if (
            typeof txn.productUnitSellingPrice !== "number" ||
            !Number.isFinite(txn.productUnitSellingPrice) ||
            txn.productUnitSellingPrice < 0
        ) {
            throw new Error(
                `Transaction ${index + 1}: invalid productUnitSellingPrice.`
            );
        }

        if (
            !Number.isInteger(txn.productQuantity) ||
            txn.productQuantity <= 0
        ) {
            throw new Error(
                `Transaction ${index + 1}: productQuantity must be a positive integer.`
            );
        }

        if (
            typeof txn.operatingExpenses !== "number" ||
            !Number.isFinite(txn.operatingExpenses) ||
            txn.operatingExpenses < 0
        ) {
            throw new Error(
                `Transaction ${index + 1}: invalid operatingExpenses.`
            );
        }

        if (
            txn.paymentStatus !== "Paid" &&
            txn.paymentStatus !== "Unpaid"
        ) {
            throw new Error(
                `Transaction ${index + 1}: paymentStatus must be 'Paid' or 'Unpaid'.`
            );
        }

        if (
            txn.productReturnStatus !== "Returned" &&
            txn.productReturnStatus !== "Not Returned"
        ) {
            throw new Error(
                `Transaction ${index + 1}: productReturnStatus must be 'Returned' or 'Not Returned'.`
            );
        }

        if (
            typeof txn.dateTime !== "string" ||
            Number.isNaN(Date.parse(txn.dateTime))
        ) {
            throw new Error(
                `Transaction ${index + 1}: invalid dateTime.`
            );
        }

        if (typeof txn.deliveryEmployeeId !== "string") {
            throw new Error(
                `Transaction ${index + 1}: invalid deliveryEmployeeId.`
            );
        }

        if (typeof txn.deliveryLocation !== "string") {
            throw new Error(
                `Transaction ${index + 1}: invalid deliveryLocation.`
            );
        }

        if (
            typeof txn.deliveryDistanceKm !== "number" ||
            !Number.isFinite(txn.deliveryDistanceKm) ||
            txn.deliveryDistanceKm < 0
        ) {
            throw new Error(
                `Transaction ${index + 1}: invalid deliveryDistanceKm.`
            );
        }

        if (
            typeof txn.deliveryTripDurationMins !== "number" ||
            !Number.isFinite(txn.deliveryTripDurationMins) ||
            txn.deliveryTripDurationMins < 0
        ) {
            throw new Error(
                `Transaction ${index + 1}: invalid deliveryTripDurationMins.`
            );
        }

        if (
            !Number.isInteger(txn.deliveryRating) ||
            txn.deliveryRating < 1 ||
            txn.deliveryRating > 5
        ) {
            throw new Error(
                `Transaction ${index + 1}: deliveryRating must be an integer from 1 to 5.`
            );
        }

        transactions.push(txn as Transaction);
    });

    return transactions;
}