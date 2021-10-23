import { config } from '../config/constant'
import { Request, Response} from 'express'
import shortId from 'shortid'
import { URLModel } from '../database/model/URL'

export class URLController {
    public async shorten(req:Request, response: Response): Promise<void>{
         //verificar se url já não existe
         const {originURL} = req.body
         const url = await URLModel.findOne({originURL})
         if(url){
             response.json(url)
             return 
         }
         //criar hash para url
         
         const hash = shortId.generate()
         const shortURL = `${config.API_URL}/${hash}`
         const newUrl = await URLModel.create({hash, shortURL, originURL})
         //salvar url no banco
         //retornar a url salva
         response.json({newUrl})
    }

    public async redirect(req: Request, response: Response): Promise<void> {
        //Obter o hash da URL
        const { hash } = req.params
        //Encontrar URL original através do hash
        const url = await URLModel.findOne({ hash })

        if(url) {
            response.redirect(url.originURL)
            return
        }
        response.status(400).json({ error: 'URL not found' })
    }
}