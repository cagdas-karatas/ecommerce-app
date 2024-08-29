export type Product = {
    productId: number;
    shopId: number;
    productName: string;
    productDescription: string;
    categoryId: string;
    price: number;
    imageName: string;
};

export type ShopRequest = {
    shopRequestId: number,
    shopName: string,
    taxNumber: string,
    companyPhoneNumber: string,
    shopAddress: string,
    approveStatus: string,
    userId: number
}