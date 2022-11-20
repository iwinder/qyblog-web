<template>
  <div class="main">
    <div class="table-form" >
      <slot name="searchForm"></slot>
    </div>
    <div class="table-operations">
      <slot name="operations"></slot>
    </div>
    <div class="table-main">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.main{
  margin-top: 8px;
}
.table-operations {
  margin: 10px 0;
}
</style>