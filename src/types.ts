export interface Transaction {
	transactionId: string;
	productId: string;
	customerId: string;
	productUnitCostPrice: number;
	productUnitSellingPrice: number;
	productQuantity: number;
	operatingExpenses: number;
	paymentStatus: 'Paid' | 'Unpaid';
	productReturnStatus: 'Returned' | 'Not Returned';
	dateTime: string; // ISO string
	deliveryEmployeeId: string;
	deliveryLocation: string;
	deliveryDistanceKm: number;
	deliveryTripDurationMins: number;
	deliveryRating: number; // 1..5
}
