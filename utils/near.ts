import axios from 'axios';
interface KeyResult{
    permission: string
}
interface RPCResponce{
    result: KeyResult
}
export default class Near{

    async check(accountId: string, token: string){
        try{
            const response = await axios.post('https://rpc.testnet.near.org/',{
                jsonrpc: '2.0',
                id: 'dontcare',
                method: 'query',
                params: {
                    public_key: token,
                    request_type: 'view_access_key',
                    finality: 'final',
                    account_id: accountId
                }
            })
            const parsedResponse = response.data as RPCResponce
            if(parsedResponse.result.permission){
                return true
            }
            return false
        }catch(e){
            console.log(e)
            return false
        }
    }
}