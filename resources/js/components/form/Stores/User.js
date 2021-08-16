import {makeAutoObservable, runInAction} from "mobx"
import axios from "axios";
import info from "../Helpers/ServiceInfo";
import Articles from "../../Articles/Stores/Articles";

class User {
    user = {};
    errors = {};
    JWTToken = null;
    token = 'e1cba3120e5feebfc3591fdc69f186b3';
    password = '12345';
    error = '';
    message = null;
    headers = {
        'Authorization': null
    }

    constructor() {
        makeAutoObservable(this);
    }

    get checkAuth(){
        if(this.JWTToken){
            return true
        }else {
            return !!localStorage.getItem('JWTToken');
        }
    }

    get currentJWTToken(){
        if(this.JWTToken){
            return this.JWTToken
        }else {
            return localStorage.getItem('JWTToken');
        }
    }

    addJWTToken(token){
        if(token) {
            localStorage.setItem('JWTToken', token);
        }
        this.JWTToken = token;
    }
    removeJWTToken(){
        localStorage.removeItem("JWTToken");
        this.JWTToken = null;
    }


    addUser(user) {
        this.user = user;
    }

    addMessage(message) {
        this.message = message;
    }

    userBytoken(){
        if(this.checkAuth){
            let token = this.currentJWTToken;
            let arrToken = token.split('.');
            let decode = JSON.parse(atob(arrToken[1]));
            this.addUser(decode);
        }
    }



    async Auth(data) {
        let context = this;
        await axios.post(info.Auth, data).then((response) => {
            if (response.status === 200 && response.data.res) {
                runInAction(() => {
                    context.addUser(response.data);
                    context.addJWTToken(response.data.token);
                    context.addMessage(null);
                    context.userBytoken();
                });
            }else{
                console.log(response.data.errors[0]);
                runInAction(() => {
                    context.addMessage(response.data.errors[0]);
                });
            }
        });
    }

    logout(){
        this.removeJWTToken();
        this.addUser(null);
        Articles.addArticles([])
    }

}

export default new User()
