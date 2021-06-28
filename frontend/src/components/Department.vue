<template>
    <div class="container">
        <h3>Department </h3>
        <hr class="border-info">
        <div class="container">
            <div class="row px-2">
                <router-link class="mr-3 p-1 text-decoration-none" active-class="active" :to="{ name: 'notes'}" exact>
                    Notes
                </router-link> 
                <router-link class="mr-3 p-1 text-decoration-none" active-class="active" :to="{ name: 'addNotes'}" exact>
                    Add notes
                </router-link> 
                <router-link class="text-decoration-none p-1 mr-3" active-class="active" :to="{ name: 'timetable'}" exact>
                   Timetable
                </router-link>
                <router-link class="text-decoration-none p-1 mr-3" active-class="active" :to="{ name: 'addTimetable'}" exact>
                   Add Timetable
                </router-link>
                 <router-link class="text-decoration-none p-1" active-class="active" :to="{ name: 'chat'}" exact>
                   Chat
                </router-link>
            </div>
            <div class="row my-3 text-decoration-none">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        name:'Department',
    }
</script>

<style scoped>
.active{
    background-color: #36d2f550;
    border:1px solid #0593b3;
    border-radius: 0.4rem;
    color:black;
    text-shadow: none;
}
a{
    color:black;
    font-size:1.2rem;
    text-shadow:  3px 3px 3px #ababab;
}
</style>
