const info = {
    domain: 'http://faceprog.ru/',
    prefix: '/api/',
    routers: {
        login: 'auth/login.php',
        refresh: 'auth/refresh.php',
        check: 'auth/check.php',
        articles: 'articles.php'
    },
    get Login(){
        return `${this.routers.login}`;
    },
    get Refresh(){
        return `${this.routers.refresh}`;
    },
    get Check(){
        return `${this.routers.check}`;
    },
    get Articles(){
        return `${this.routers.articles}`;
    }
}

export default info;
