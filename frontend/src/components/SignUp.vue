<template>
    <div class="row container-fluid mt-5 pt-4">
        <div class="col-12 w-90">
            <h3>Sign Up</h3>
            <hr class="border-info"/>
            <div class="row mx-1">
                <div class="col col-sm-12 col-md-12 col-lg-6 mt-5">
                    <form name="form" @submit.prevent="signUp">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input 
                                type="text"
                                class="form-control"
                                name="name"
                                id="name"
                                v-model.trim="form.name"
                                placeholder="User" 
                                @blur="$v.form.name.$touch()"
                                :class="{
                                    'is-invalid': shouldAppendErrorClass($v.form.name),
                                    'is-valid': shouldAppendValidClass($v.form.name)
                                }"
                            />
                            <div v-if="$v.form.name.$error">
                                <div v-if="!$v.form.name.required" class="error-message">
                                    <small>The name field is required</small>
                                </div>
                                <div v-if="!$v.form.name.minLength" class="error-message">
                                    <small>The name must have at least 4 characters</small>
                                </div>
                                <div v-if="!$v.form.name.maxLength" class="error-message">
                                    <small>The name must have at most 30 characters</small>
                                </div>
                            </div>
                        </div>

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

                        <div class="form-group">
                            <label for="department">Department</label>
                            <select 
                                class="select-department form-control"
                                name="department" 
                                id="department" 
                                v-model="department"
                                >
                                <option class="option-department" value="imh" selected>IMH</option>
                            </select>
                        </div>
                        <br/>
                        
                        <div class="form-group d-grid gap-2 col-12 mx-0">
                            <button class="btn btn-info btn-block" :disabled="$v.form.$invalid">SignUp</button>
                            <app-spinner v-if="processing" />
                        </div>
                    </form>
                </div>

                <!---svg code-->
                <div class="col col-sm-12 col-md-12 col-lg-5 mt-5 pt-5">
                    <img
                        src="../assets/signUp.svg"
                        alt="Sign-Up image"
                        class="image"
                        height="300"
                        width="450"
                    />
                </div>
                <!---end of svg code -->
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { email, required, minLength,maxLength, } from 'vuelidate/lib/validators'
    import { signUp } from '@/services/auth';
    import config from '@/config';

    export default {
        name: 'AppSignUp',
        data() {
            return {
                processing: false,
                department:'imh',
                form: {
                    name:'',
                    email: '',
                    password: '',
                    department:'imh',
                    valid: false,
                    role: 'general',
                    token: '1234abcd'// pass a randomly generated token to db
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
                    // https://stackoverflow.com/questions/61176720/how-to-validate-password-with-vuelidate
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
                },
                name: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(30)
                }
            },
        },
        methods: {
            signUp() {
                this.$v.form.$touch();

                if( !this.$v.form.$invalid ) {
                    signUp( this.form )
                        .then( () => this.$router.push( { name: 'firstLogin' } ) )
                        .then(()=>{
                            Vue.$toast.open({
                                message:'Signed In Successfully',
                                duration: config.toastDuration,
                                type: 'success'
                            });
                        })
                        .then(()=>{
                            Vue.$toast.open({
                                message:'Validation TOKEN is sent on your email',
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
        width:290px !important; 
    }
}
.image{
    text-align: center;
    align-items: center;
}
</style>