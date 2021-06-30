<template>
    <div class="row mt-5 pt-4 container-fluid">
        <div class="w-90 col-12">
            <h3>Login</h3>
            <hr class="border-info"/>
            <div class="row mx-1">
                <div class="col col-sm-12 col-md-12 col-lg-6 mt-5">
                    <!---input form for login -->
                    <form name="form" @submit.prevent="login">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                class="form-control"
                                name="email"
                                id="email"
                                placeholder="hello@bitmesra.ac.in"
                                v-model.trim="form.email"
                                @blur="$v.form.email.$touch()"
                                :class="{
                                    'is-invalid': shouldAppendErrorClass($v.form.email),
                                    'is-valid': shouldAppendValidClass($v.form.email)
                                }"
                            />
                            <div v-if="$v.form.email.$error">
                                <div v-if="!$v.form.email.required" class="error-message">
                                    <small>The email field is required</small>
                                </div>
                                <div v-if="!$v.form.email.email" class="error-message">
                                    <small>Invalid email address</small>
                                </div>
                                <div v-if="!$v.form.email.emailCheck" class="error-message">
                                    <small>Invalid email address, must contain '@bitmesra.ac.in'</small>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                autocomplete="off"
                                class="form-control"
                                name="password"
                                id="password"
                                v-model.trim="form.password"
                                @blur="$v.form.password.$touch()"
                                :class="{
                                    'is-invalid': shouldAppendErrorClass($v.form.password),
                                    'is-valid': shouldAppendValidClass($v.form.password)
                                }"
                            />
                            <div v-if="$v.form.password.$error">
                                <div v-if="!$v.form.password.required" class="error-message">
                                    <small>The password field is required</small>
                                </div>
                                <div v-if="!$v.form.password.minLength" class="error-message">
                                    <small>The password must have at least 8 characters</small>
                                </div>
                                <div v-if="!$v.form.password.containsUppercase" class="error-message">
                                    <small>The password must have at least 1 uppercase character</small>
                                </div>
                                <div v-if="!$v.form.password.containsLowercase" class="error-message">
                                    <small>The password must have at least 1 lowercase character</small>
                                </div>
                                <div v-if="!$v.form.password.containsNumber" class="error-message">
                                    <small>The password must have at least 1 digit</small>
                                </div>
                                <div v-if="!$v.form.password.containsSpecial" class="error-message">
                                    <small>The password must have at least 1 special character</small>
                                </div>
                            </div>
                        </div>

                        <br/>
                        <div class="form-group d-grid gap-2 col-12 mx-0">
                            <button class="btn btn-info btn-block" :disabled="$v.form.$invalid" type="submit">Login</button>
                            <app-spinner v-if="processing" />
                        </div>
                    </form>
                    <div class="text-muted">
                        <br/>
                        <p class="pl-2">Already signed up? Want to login for the first time</p>
                    </div> 
                    <div class="form-group d-grid gap-2 col-12 mx-0 my-2">
                        <button class="btn btn-info btn-block" @click="firstLogin">First Login</button>
                    </div>    
                </div>
                <!---svg code-->
                <div class="col col-sm-12 col-md-12 col-lg-5 mt-5 pt-4">
                    <img
                        src="../assets/signUp.svg"
                        alt="Sign-Up image"
                        class="image"
                        height="228"
                        width="380"
                    />
                    
                    <div class="text-muted">
                        <br/>
                        <p class="pl-2">Don't have an account? Sign Up</p>
                    </div> 
                    <div class="form-group d-grid gap-2 col-12 mx-0 my-2">
                        <button class="btn btn-info btn-block" @click="signup">Sign Up</button>
                    </div>  
                </div>
                <!---end of svg code -->
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { email, required, minLength } from 'vuelidate/lib/validators';
    import config from '@/config';

    export default {
        name: 'Login',
        data() {
            return {
                processing: false,
                form: {
                    email: '',
                    password: ''
                }
            };
        },
        validations: {
            form: {
                email: {
                    email,
                    required,
                    emailCheck: function( value ) {
                        const subStr ="@bitmesra.ac.in";
                        if( value.includes(subStr) ){
                             return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                password: {
                    required,
                    minLength: minLength( 8 ),
                    //validate-password-with-vuelidate
                    containsUppercase: function(value) {
                        return /[A-Z]/.test(value)
                    },
                    containsLowercase: function(value) {
                        return /[a-z]/.test(value)
                    },
                    containsNumber: function(value) {
                        return /[0-9]/.test(value)
                    },
                    containsSpecial: function(value) {
                        return /[#?!@$%^&*-]/.test(value)
                    }
                }
            }
        },
        methods: {
            login() {
                this.$v.form.$touch();

                if( !this.$v.form.$invalid ) {
                        this.$store.dispatch( 'login', this.form )
                        .then(() => this.$router.push( { name: 'home' } ))
                        .then(()=>{
                            Vue.$toast.open({
                                message:'Logged In Successfully',
                                duration: config.toastDuration,
                                type: 'success'
                            });
                        })
                        .catch( error => {
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        });
                } else {
                    console.log( 'invalid input values' );
                }
            },
            shouldAppendValidClass( field ) {
                console.log( field );
                return !field.$invalid && field.$model && field.$dirty;
            },
            shouldAppendErrorClass( field ) {
                return field.$error;
            },

            signup(){
                this.$router.push( { name: 'signUp' } )
            },

            firstLogin(){
                this.$router.push( { name: 'firstLogin' } )
            }
        }
    }
</script>

<style scoped>
@media screen and (min-width: 992px) {
    .col-lg-5{
        margin-top: 45px !important;
        margin-left:75px;
    }
}
@media screen and (min-width: 300px) and (max-width:500px) {
    .image{
        width:280px !important; 
    }
}
.image{
    text-align: center;
}
</style>