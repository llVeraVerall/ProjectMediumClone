<template>
	<div>article</div>
</template>

<script>
import {actionTypes} from '@/store/modules/article'

export default {
	name: 'McvArticle',
	mounted() {
		console.log(this.$route)
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  }
}
</script>