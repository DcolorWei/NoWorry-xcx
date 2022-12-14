export interface Order {
    createTime?: string;
    openid?: string;
    favourablePrice?: number

    orderDetailInfoGroup?: OrderDetailInfo[];
    orderId?: number;
    orderPaymentPrice?: number;
    orderStatus?: number;
    orderTotalPrice?: number;
    favourablePrice?:number;
    payTime?: string;
}

export interface OrderDetailInfo {
    boughtQuantity?: number;
    commodityBrief?: string;
    commodityId?: number;
    commodityName?: string;
    favourablePrice?: number
    invPrice?: number;
    orderDetailId?: number;
    orderId?: string;
    picLink?: string;
    picLinkTem?: string;
    status?: number
}

export interface SubmitCart {
    orderDetail: CartDetail[];
    orderTotalPrice: number;
    /**
     * 支付方式
     */
    payWay: string;
    /**
     * oJth05Jx9ITN9s85MnT5odUbPlAg43
     */
    token: string;
}

export interface CartDetail {
    boughtQuantity?: number;
    commodityId?: number;
    invPrice?: number;
    remark?: string
}