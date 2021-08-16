const info = {
    domain: 'http://faceprog.ru/',
    prefix: '/api/',
    routers: {
        auth: 'js-6-api/auth.php',
        articles: 'js-6-api/articles.php'
    },
    get Auth(){
        return `${this.prefix}${this.routers.auth}`;
    },
    get Articles(){
        return `${this.prefix}${this.routers.articles}`;
    }
}

export default info;
