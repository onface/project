<template>
    <span>
        {{title}}
    </span>
</template>
<script>
export default {
    name: 'app',
    data () {
        console.log("data")
        return {
            title: 'vue node'
        }
    }
}
</script>
<style>
    .demo {
        color:green;
    }
</style>
