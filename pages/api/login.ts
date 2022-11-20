// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import XMPPLogin from '../../utils/xmpp'

type Data = {
  name: string
}
const xmpp =new XMPPLogin()
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method=="POST"){
    try{
        const token: string = req.body.token || ''
        xmpp.login(token).then((response)=>{
          res.status(200).json(response)
        })
    }catch(e){
      const error = { message: "Something Went Wrong"}
      res.status(500).json(error)
    }
  }else{
    const error = { message: 'No Method Found'}
    res.status(500).json(error)
  }
}
