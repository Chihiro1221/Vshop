<template>
  <div class="desc" v-if="desc.id">
    <h2 class="title">{{ desc.title }}</h2>
    <span class="time">{{ formatDate(desc.add_time) }}</span>
    <div class="content">
      <p v-html="desc.content"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ComputedRef } from 'vue'
import { getMyDate } from '@/utils/useHome'
import { getNewsDesc } from '@/api/useHome'
import type { newsType } from '@/types/useHome'
const route = useRoute()
const id = computed(() => route.params.id)
const result = await getNewsDesc(id.value)
const desc: ComputedRef<newsType> = computed(() => result.message[0])
// 格式化时间
const formatDate = (time: string): string => {
  return getMyDate(new Date(time).getTime())
}
</script>

<style scoped lang="scss">
.desc {
  padding: 10px;
  padding-bottom: 150px;
  background: white;
  .title {
    font-size: 24px;
    text-align: center;
  }
  .time {
    display: block;
    text-align: right;
    margin-right: 20px;
  }
  .content {
    padding: 20px;
    p {
      font-size: 22px;
      line-height: 35px;
    }
  }
}
</style>
