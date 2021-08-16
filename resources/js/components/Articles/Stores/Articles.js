import {makeAutoObservable, runInAction} from "mobx"
import axios from "axios";
import info from "../../form/Helpers/ServiceInfo";
import User from "../../form/Stores/User";

class Articles {
    articles = [];
    message = null;

    constructor() {
        makeAutoObservable(this);
    }

    addMessage(message) {
        this.message = message;
    }

    addArticles(articles) {
        this.articles = articles;
    }

    filters() {
        let userId = Number(User.user.userId);
        let newArticle = this.articles.filter(article => userId === Number(article.id_user));
        this.addArticles(newArticle);
    }
    filtersDelet(idArticles) {
        let newArticle = this.articles.filter(article => Number(idArticles) !== Number(article.id_article));
        this.addArticles(newArticle);
    }

    async loading() {
        let context = this;
        await axios.get(info.Articles,{headers: { Authorization:  User.currentJWTToken }}).then((response) => {
            if (response.status === 200) {
                runInAction(() => {
                    context.addArticles(response.data);
                });
            }else{
                context.addMessage(response.data.errors[0]);
            }
        }).catch(error => {
            context.addMessage('Непредвиденная ошибка!');
        });
    }

    async delete(id) {
        let context = this;
        await axios.delete(`${info.Articles}?id=${id}`,{headers: { Authorization:  User.currentJWTToken }}).then((response) => {
            if (response.status === 200 && response.data.res) {
                context.filtersDelet(id);
                context.addMessage(null);
            }else{
                context.addMessage(response.data.errors[0]);
            }
        }).catch(error => {
            context.addMessage('Непредвиденная ошибка!');
        });
    }

}

export default new Articles()
