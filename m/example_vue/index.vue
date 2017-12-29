<template>
	<div class="hello">
	    <h1 class="hd">{{ msg }}</h1>
	    <h1>{{ msg }}</h1>
	</div>
</template>


<script>
import './index.less';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js '
    }
  }
}
</script>

<!-- style 权重 高于 import './**.less' -->
<style>
.hello {
	color: green;
}
</style>