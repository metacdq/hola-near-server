import Near from "./near";
import {Base64} from 'js-base64';
import axios from 'axios';

export default class XMPPLogin{
    near: Near
    options = {
        headers: {'Authorization': 'Basic YWxhbkBjaGF0LmNpbmRha3UuY29tOmFsYW5tcjMz'}
    }
    xNear= "HOLA-NEAR"
    baseUrl = 'http://chat.cindaku.com/api/'
    constructor(){
        this.near = new Near()

    }
    async register(accountId: string, password: string){
        try{
            const regsiter=await axios.post(`${this.baseUrl}register`, {
                user: accountId,
                host: "chat.cindaku.com",
                password: password
            }, this.options)
            const result = regsiter.data as string
            return result
        }catch(e){
            throw e
        }

    }
    async check(accountId: string){
        try{
            const response=await axios.post(`${this.baseUrl}check_account`, {
                user: accountId,
                host: "chat.cindaku.com",
            }, this.options)
            return response.data == 0
        }catch(e){
            return false
        }
    }
    async login(token: string){
        try{
            const decoded = Base64.decode(token)
            const data  = decoded.split('&')
            const isLogin = await this.near.check(data[0], data[1])
            if(isLogin){
                const isRegistered = await this.check(data[0])
                const accessToken = Base64.encode(`${this.xNear}-${data[0]}`)
                if(!isRegistered){
                    const register = await this.register(data[0], accessToken)
                    if(register!="Success"){
                        return {
                            status: false,
                            message: register
                        }
                    }
                }
                return {
                    status: true,
                    data: {
                        xmpp_token: accessToken
                    }
                }
            }
            return {
                status: false,
                message: 'unauthorized'
            }
        }catch(e){
            return {
                status: false,
                message: e.message
            }
        }
    }
}