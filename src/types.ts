export type Product = {
    productId: number;
    shopId: number;
    productName: string;
    productDescription: string;
    categoryId: number;
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

export type Category = {
    categoryId: number,
    categoryName: string
}