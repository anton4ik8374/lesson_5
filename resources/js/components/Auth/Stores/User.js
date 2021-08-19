import {makeAutoObservable, runInAction} from "mobx"
import mainApi from '../../Helpers/Api'
import info from "../../Helpers/ServiceInfo";
import { setTokens, cleanTokensData, getJWTPayload, getAccessToken, getRefreshToken } from "../../Helpers/tokens";


class User {
    user = {};
    errors = {};
    token = 'e1cba3120e5feebfc3591fdc69f186b3';
    password = '12345';
    error = '';
    loaded = false;
    check = false;
    message = null;

    constructor() {
        makeAutoObservable(this);
    }

    get checkAuth(){
        return this.check;
    }

    get currentAccessToken(){
        return getAccessToken();
    }

    toggleLoaded(status){
        this.loaded = status;
    }

    addCheck(status){
        this.check = status;
    }

    addJWTToken(access, refresh){
        if(access) {
            setTokens(access, refresh);
        }
    }

    removeJWTToken(){
        cleanTokensData();
    }

    addUser(user) {
        this.user = user;
    }

    addMessage(message) {
        this.message = message;
    }


    async Auth(data) {
        let context = this;
        await mainApi.post(info.Login, data).then((response) => {
            if (response.status === 200 && response.data.res) {
                runInAction(() => {
                    context.addJWTToken(response.data.accessToken, response.data.refreshToken );
                    context.addCheck(response.data.res);
                    context.addUser(getJWTPayload(response.data.accessToken));
                });
            }else{
                runInAction(() => {
                    context.addMessage(response.data.errors[0]);
                });
            }
        });
    }

    async Check() {
        if(getAccessToken()) {
            let context = this;
            await mainApi.post(info.Check).then((response) => {
                if (response.status === 200 && response.data.res) {
                    runInAction(() => {
                        context.addCheck(response.data.res);
                        context.addUser(getJWTPayload(getAccessToken()));
                    });
                }
            }).catch(result => {
                context.refresh();
            });
        }else if(getRefreshToken()){
            this.refresh();
        }
        if(!this.loaded){
            this.toggleLoaded(true);
        }
    }

    async refresh() {
        let context = this;
        await mainApi.post(info.Refresh).then((response) => {
            if (response.data.res) {
                context.addCheck(response.data.res);
                runInAction(() => {
                    context.addJWTToken(response.data.accessToken, response.data.refreshToken);
                    context.addUser(getJWTPayload(response.data.accessToken));
                    context.Check()
                });
            }else{
                runInAction(() => {
                    context.removeJWTToken();
                    context.addCheck(false);
                    context.addUser({});
                });
            }
        });
    }

    logout(){
        this.removeJWTToken();
        this.addCheck(false);
        this.addUser({});
    }

}

export default new User()
