<template>
  <div>
    <van-submit-bar :price="countPrice" :button-text="`提交订单(${count})`" @submit="onSubmit" :decimal-length="2">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip> 总计不包含运费<a href="javascript:;" class="clear" @click="clearCart">清空购物车</a></template>
    </van-submit-bar>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import type { cartGoodsType } from '@/types/useCart'
import { ComponentInstance } from 'vant/lib/utils'

const router = useRouter()
const store = useStore(key)
const countPrice = computed(() => store.getters['cart/countPrice'])
const count = computed(() => store.getters['cart/count'])

// 全选按钮状态
const checked = computed({
  get() {
    return store.getters['cart/allChecked']
  },
  set(status: boolean) {
    store.commit('cart/allSelected', status)
  },
})
// 提交订单
const onSubmit = (): void => {
  const isLogin = computed(() => store.state.personal?.isLogin)
  if (isLogin.value) {
    let flag: ComponentInstance | null = null
    new Promise(resolve => {
      if (!store.getters['cart/count']) {
        Toast.fail('请选择商品!')
        return
      }
      flag = Toast.loading({
        message: '正在跳转订单支付页面...',
        forbidClick: true,
      })
      setTimeout(() => {
        // 获取购物车里的商品列表信息
        const cartGoodsList: ComputedRef<cartGoodsType[]> = computed(() => {
          return store.state.cart?.cart.goodsDesc.filter(goods => goods.done) as unknown as cartGoodsType[]
        })
        resolve(cartGoodsList.value)
      }, 1000)
    }).then(value => {
      flag?.clear()
      store.commit('personal/addGoods', value)
      router.push('/personal/order?title=我的订单')
    })
  } else {
    let flag: any = null
    new Promise(resolve => {
      flag = Toast.loading({
        message: '正在为您跳转到登录页...',
        forbidClick: true,
      })
      setTimeout(() => {
        resolve(null)
      }, 1000)
    }).then(_ => {
      router.push('/login')
      flag.clear()
    })
  }
}
// 清空购物车
const clearCart = (): void => {
  store.commit('cart/clearCart')
}
</script>

<style scoped lang="scss">
.clear {
  float: right;
}
</style>
