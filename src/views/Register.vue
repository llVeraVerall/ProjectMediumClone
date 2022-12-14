<template>
	<div class="regis-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Sing Up</h1>
					<p class="text-xs-center">
						<router-link :to="{name: 'login'}">Need an account?</router-link>
					</p>
					<McvValidationsErrors v-if='validationsErrors' :validation-errors='validationsErrors'>
					</McvValidationsErrors>
					<form @submit.prevent="onSubmit">
						<fieldset class="form-group">
							<input type="text" class="form-control orm-control-lg" placeholder="user name" v-model="username" />
						</fieldset>

						<fieldset class="form-group">
							<input type="text" class="form-control orm-control-lg" placeholder="email" v-model="email" />
						</fieldset>

						<fieldset class="form-group">
							<input type="password" class="form-control orm-control-lg" placeholder="password" v-model="password" />
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right" :disabled='isSubmitting'>Sing Up</button>
						</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import McvValidationsErrors from '@/components/ValidationsError';
import {actionTypes} from '@/store/modules/auth';

export default {
	name: 'McvRegister',
	components: {
		McvValidationsErrors
	},
	data() {
		return {
			username: '',
			email: '',
			password: ''
		}
	},
	computed: {
		isSubmitting() {
			return this.$store.state.auth.isSubmitting
		},
		validationsErrors() {
			return this.$store.state.auth.validationsErrors
		}
	},
	methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
			username: this.username,
			email: this.email,
			password: this.password
        })
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
