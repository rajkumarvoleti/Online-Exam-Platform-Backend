import { Request, Response } from "express"
import { IHttpRequest, IHttpResponse } from "../interfaces/http"
import { catchErrors } from "../handlers/errorHandlers"

export default function makeExpressCallback (controller: any) {
  return (req:Request, res:Response) => {
    console.log("line 7");
    console.log(req.session.id);
    const httpRequest:IHttpRequest = {
      body: req.body,
      query: req.query,
      session: req.session,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    catchErrors(controller(httpRequest)
      .then((httpResponse: IHttpResponse) => {
        // console.log("line 25");
        // console.log(httpResponse.body);

        if (httpResponse.headers)
          res.set(httpResponse.headers)
        if(httpResponse.clearCookie)
          res.clearCookie(req.session.id);
        if(httpResponse.body.isAuth){
          // console.log("hello");
          req.session.user = httpResponse.body.user;
          httpResponse.session = req.session;
        }
        // console.log("Line 34");
        // console.log(req.session);
        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((error:any) => res.status(500).send({ error }))
    )
  }
}
