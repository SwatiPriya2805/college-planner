<template>
    <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="container-fluid" v-if="isAuthenticated">
            <ul class="nav navbar-nav py-2 ">
                <li  class="nav-item">
                    <h3 class="name">College Planner</h3>
                </li>
            </ul>

            <ul class="nav navbar-nav py-2">
                <li class="nav-item mx-1">
                    <router-link class="nav-link" active-class="active" :to="links[0]" exact>Home</router-link>
                </li>

                <li class="nav-item mx-1">
                    <router-link class="nav-link"  active-class="active" :to="links[1]" exact>Notice</router-link>
                </li>

                <li class="nav-item mx-1">
                    <router-link class="nav-link" active-class="active" :to="links[2]" exact>Department</router-link>
                </li>
                
                <li class="nav-item mx-1">
                    <router-link class="nav-link" active-class="active" :to="links[3]" exact>Club</router-link>
                </li>

                <li class="nav-item mx-1">
                    <router-link class="nav-link" active-class="active" :to="links[4]" exact>Calendar</router-link>
                </li>

                <li class="nav-item mx-1">
                    <span class="nav-link cursor-pointer" @click="logout()">Logout</span>
                </li>
            </ul>
            
        </div>
        <div class="container-fluid" v-else >
            <ul  class="nav navbar-nav py-2">
                <h3 class="name">College Planner</h3>
            </ul>
            <ul class="nav navbar-nav">
                <li class="nav-item mx-1">
                    <router-link class="nav-link" active-class="active" :to="links[0]" exact>Home</router-link>
                </li>

                <li class="nav-item mx-1">
                    <router-link class="nav-link" active-class="active" :to="links[5]" exact>Login</router-link>
                </li>

                <li class="nav-item mx-1">
                    <router-link class="nav-link"  active-class="active" :to="links[6]" exact>Sign Up</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

    export default {
        name: 'Navbar',
        data() {
            return {
                links: [
                    { name : 'home' },
                    { name : 'notice' },
                    { name : 'notes' },
                    { name : 'clubList' },
                    { name : 'calendar' },
                    { name : 'login' },
                    { name : 'signUp' }
                ],    
            };
        },
        computed: {
            email() {
                return this.$store.state.auth.email;
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            }
        },
        methods: {
            logout() {
                this.$store.dispatch( 'logout' )
                    .then( () => this.$router.push( { name: 'login' } ) );
            }
        }
    }
</script>

<style scoped>
.name{
    font-family: "Sofia", sans-serif;
    padding-top: 2px;
    text-shadow: 3px 3px 3px #ababab;
}
.navbar-light .navbar-nav .nav-link {
    color: rgba(0, 0, 0, 1);
}
.nav-item{
    font-size:1.3rem;
    font-weight: 400;
}
.emailStyle{
    color:#04B1DA;
}
.active{
    background-color: #36d2f550;
    border:1px solid #0593b3;
    border-radius: 0.6rem;
}
.nav-link {
    display: block;
    padding: 0.1rem 1.5rem;
}
.cursor-pointer {
    cursor: pointer;
}
</style>