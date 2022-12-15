<template>
	<div class="ng-scope">
	<div class="auth-page ng-scope">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center ng-binding">Sign in</h1>
					<p class="text-xs-center">
						<router-link :to="{name: 'register'}">
            Need an account?
						</router-link>
					</p>
					<mcv-validation-errors v-if="validationErrors"
            :validation-errors="validationErrors"
          ></mcv-validation-errors>
					<form @submit.prevent="onSubmit">
						<fieldset class="form-group">
							<input type="text" class="form-control orm-control-lg" placeholder="email" v-model="email" />
						</fieldset>
						<fieldset class="form-group">
							<input type="password" class="form-control orm-control-lg" placeholder="password" v-model="password" />
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right ng-binding" :disabled='isSubmitting'>Sign in</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import  McvValidationErrors from '@/components/ValidationsError';
import {actionTypes} from '@/store/modules/auth';

export default {
	name: 'McvLogin',
	components: {
		McvValidationErrors
	},
	data() {
		return{
			email: '',
			password: ''
		}
	},
	computed: {
		...mapState({
			isSubmitting: state => state.auth.isSubmitting,
			validationErrors: state => state.auth.validationErrors
		})
	// computed: {
	// 	isSubmitting() {
	// 		return this.$store.state.auth.isSubmitting
	// 	},
	// 	validationErrors() {
	// 		return this.$store.state.auth.validationErrors
	// 	}
	},
	methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'home'})
        })
    }
  }
}
</script>
