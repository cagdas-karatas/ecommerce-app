export type Product = {
    id: number;
    productName: string;
    sellerName: string;
    productDescription: string;
    price: number;
    productCategory: string;
    imageUrl: string;
    rate: number;
    countOfReviews: number;
};

export type ShopRequest = {
    shopName: string,
    taxNumber: string,
    companyPhoneNumber: string,
    shopAddress: string,
    approveStatus: string,
    userId: number
}