/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Visa } from "../../entity/visa";
import { webGet } from "../../utils/http"

Page({
    data: {
        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPrice2: 0
    },


    async updateCart() {
        const carts = getApp().globalData.carts;
        for (let i = 0; i < carts.length; i++) {
            const visa = await webGet<Visa>(`/visa/detail/${carts[i].commodityId}`, {})
            carts[i].picLink = visa?.picLink
            carts[i].picLinkTem = visa?.picLinkTem
            carts[i].currentPrice = visa?.currentPrice
        }
        this.setData({ carts: carts })
        this.setAllSelect()
        this.culTotal()
    },

    checkBtn(e: any) {
        const index = e.currentTarget.dataset.index
        const carts = this.data.carts;
        carts[index].select = !carts[index].select

        this.setAllSelect()
        this.culTotal()
    },
    handleVerticalDrag(e: { changedTouches: any }) {
        console.log(e.changedTouches[0])
    },

    allSelect() {
        const carts = this.data.carts;
        carts.forEach((i: any) => i.select = !this.data.allselect)
        this.setAllSelect()
        this.culTotal()
    },
    setAllSelect() {
        const carts = this.data.carts;
        if (carts && carts.findIndex((item: any) => !item.select) == -1) {
            this.setData({ allselect: true })
        } else {
            this.setData({ allselect: false })
        }
        this.setData({ carts: carts })
    },

    add(e: any) {
        const index = e.currentTarget.dataset.index
        const add = e.currentTarget.dataset.add
        const carts = this.data.carts;
        carts[index].quantity = carts[index].quantity + add
        if (carts[index].quantity < 1) carts.splice(index, 1)
        this.setData({ carts: carts })
        this.culTotal()
    },


    //??????????????????
    culTotal() {
        let total = 0;
        const carts = this.data.carts;
        carts.forEach((item: any) => total += item.select ? item.currentPrice * item.quantity : 0)

        const total2 = Number((8.43 * total).toFixed(2));
        this.setData({ totalPrice: total, totalPrice2: total2 })
    },

    async settle() {
        wx.showToast({
            title: 'loading',
            icon: 'loading',
            duration: 700
        })
        const userInfo = getApp().globalData.userInfo
        setTimeout(() => {
            if (userInfo.userName && userInfo.email && userInfo.phone && userInfo.handSignCity) {
                wx.navigateTo({ url: "/pages/cart-settle/cart-settle" })
            } else wx.showModal({
                    title: '??????',
                    content: '???????????????????????????',
                    showCancel: false,
                    confirmText: "????????????",
                    success: () => wx.navigateTo({ url: "/pages/user-set/user-set" })
                })
        }, 800)
    }
});
