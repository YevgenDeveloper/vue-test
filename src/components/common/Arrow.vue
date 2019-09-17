<template>
    <div class="round-wrap">
        <svg viewBox="0 0 100 100">
            <path
                    d="
       M 50,16
       l 0,72
       M 20,60
       l 30,28
       M 80,60
       l -30,28"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-width="4"
            />
        </svg>
    </div>
</template>

<script>
  export default {
    name: "Arrow"
  }
</script>

<style lang="scss" scoped>
    .round-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    svg {
        width: 20px;
        height: 20px;
        transform: rotate(90deg);
    }
</style>
