<template>
    <div>
        <aside>
            <img src="../assets/error404.svg" alt="404 Image" />
        </aside>
        <main>
            <h1>Sorry!</h1>
            <p>
                Either you aren't cool enough to visit this page or it doesn't exist!
            </p>
            <router-link :to="{ name: 'login' }">Wanna login?</router-link>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'PageNotFound'
    }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&family=Roboto:wght@500&display=swap");

* {
    box-sizing: 0;
    margin: 0;
    padding: 0
}

body {
    background: linear-gradient(to right, white 50%, #383838 50%);
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: white;
}

div {
    display: flex;
    align-items: center;
    height: 100vh;
    max-width: 1000px;
    width: calc(100% - 4rem);
    margin: 0 auto;
}

div>* {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-width: 500px;
    width: 100%;
    padding: 2rem;
}

aside img {
    display: block;
    height: auto;
    width: 100%;
}

main {
    text-align: center;
}

main h1 {
    font-family: "Fontdiner Swanky", cursive;
    font-size: 3rem;
    color: #018aa8;
    margin-bottom: 1rem;
}

main p {
    margin-bottom: 1.5rem;
}

main p em {
    font-style: italic;
    color: #04B1DA;
}

@media (max-width: 700px) {
    body {
        background: #383838;
        font-size: 16px;
    }
    div {
        flex-flow: column;
    }
    div>* {
        max-width: 700px;
        height: 100%;
    }
    aside {
        background-image: none;
        background-color: white;
    }
    aside img {
        max-width: 300px;
    }
}
</style>