<template>
	<div class="site">
		<div class="center">
			<img id="logo" src="@/assets/logo.png" alt>

			<v-alert type="warning" :value="devmode">Utviklermodus!</v-alert>

			<form action="/api/login" method="POST" @submit.prevent="login">
				<input
					type="text"
					v-model="username"
					class="input"
					autocomplete="username"
					:placeholder="$t('member_no_or_email')"
				/>
				<input
					type="password"
					v-model="password"
					class="input"
					autocomplete="password"
					:placeholder="$t('password')"
				/>
				<a href="https://min.speiding.no/request_password" class="gp">{{ $t('forgot_password') }}</a>
				<input type="submit" class="s-btn" :disabled="button_disabled" :value="$t('login')">
			
				<div class="spinner" v-if="button_disabled"></div>
			</form>
		</div>
		<a href="https://blispeider.no" class="blispeider">Interessert i speiding?</a>
	</div>
</template>


<style scoped>
	* {
		outline: rgba(0, 0, 0, 0.4);
	}

	.center {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
	}

	.site {
		width: 100%;
		height: 100%;
		background: #d5d4d8;
		position: absolute;
		margin: 0;
		padding: 0;
	}

	.blispeider {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
	}

	a.gp {
		color: rgba(0, 0, 0, 0.4);
		font-size: 75%;
		text-align: center;
		display: block;
		width: 100%;
	}
	#logo {
		display: block;
		width: 60vw;
		max-width: 300px;
		margin: 0 auto;
		margin-bottom: 30px;
	}

	.s-btn:disabled {
		color: #ddd;
	}

	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}

	.spinner {
		content: "";
		display: block;
		box-sizing: border-box;
		margin: 0 auto;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		border: 3px solid #f2cc07;
		border-top-color: #63ac3b;
		border-right-color: #751052;
		border-bottom-color: #2baccc;
		animation: spinner 0.6s linear infinite;
	}

	.input {
		text-align: center;
		border: 1px solid black;
		border-radius: 30px;
		padding: 10px;
		width: 65vw;
		background: rgba(255, 255, 255, 0.6);
		max-width: 500px;
		margin: 10px auto;
		display: block;
		outline: none;
	}
</style>


<script>
	export default {
		data: () => {
			return {
				username: "",
				password: "",
				button_disabled: false,
				devmode: process.env.NODE_ENV != 'production'
			};
		},
		methods: {
			login() {
				this.button_disabled = true;
				let username = this.username;
				let password = this.password;
				let vm = this;

				this.$store
					.dispatch("login", { username, password })
					.then(() => {
						vm.$router.push("/");
					})
					.catch(err => {
						this.button_disabled = false;
						if (err.status == 401) {
							vm.$store.dispatch("showSnackbar", {
								text: "Feil brukernavn/passord.",
								color: "error"
							});
						}else{
							vm.$store.dispatch("showSnackbar", {
								text: "En feil oppsto.",
								color: "error"
							});
						}
					});
			}
		}
	};
</script>
