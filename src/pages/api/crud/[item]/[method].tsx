import { NextApiRequest, NextApiResponse } from "next";
import AppController from "~/server/Controllers/AppController";
import Result from "~/utils/ResultType";

export default async function ExecuteController(req: NextApiRequest, res: NextApiResponse) {
    const { item, method } = req.query;
    
    if (!(typeof item === 'string' && typeof method === 'string')) {
        res.status(400).send("Incorrect format of item and method");
        return;
    } 
    else {        
        if (item in AppController) {
            if (method in (AppController as any)[item] && typeof ((AppController as any)[item][method]) === 'function') {
                const response: Result<any> = await (AppController as any)[item][method](req, res);
                if (response.result) res.status(response.statusCode).send(response.data);
                else res.status(response.statusCode).send(response.error);
                return;
            }
        }
        res.status(400).send("Incorrect item or method name");
        return;
    }

    
}