import { Request, Response, Router } from "express";
import { AuthUtil } from "../../utils/auth-util";
import { section } from "../../utils/section";
import sectionModel from "../models/section.model";

const routes = Router();

routes.post('/', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid');
        
        const sectionWithUserId = {
            ...section,
            userId: userId
        };

        const createdSection = await sectionModel.create(sectionWithUserId);
        
        res.status(200).json(createdSection);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar seção' });
    }
});

// Rota para obter uma seção por ID
routes.get('/:id', async (req: Request, res: Response) => {
    try {
        const sectionId = req.params.id;
        const userId = AuthUtil.getLoggedUser(req, 'uid');  
        
        const section = await sectionModel.findOne({ id: sectionId, userId });

        if (!section) {
            return res.status(404).json({ message: 'Seção não encontrada' });
        }

        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar seção' });
    }
});

// Rota para obter todos os itens das unidades de uma seção específica
routes.get('/:id/questions', async (req: Request, res: Response) => {
    try {
        const sectionId = req.params.id;
        const userId = AuthUtil.getLoggedUser(req, 'uid');  
        
        const section = await sectionModel.findOne({ id: sectionId, userId });

        if (!section) {
            return res.status(404).json({ message: 'Seção não encontrada.' });
        }

        const allItems = section.units.flatMap(unit => unit.items);

        res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens da seção.' });
    }
});

// Rota para atualizar o status de um item
routes.patch('/:sectionId/questions/:itemId', async (req, res) => {
    try {
        const { sectionId, itemId } = req.params;
        const { completed, disabled } = req.body;
        
        const userId = AuthUtil.getLoggedUser(req, 'uid');  

        const updatedSection = await sectionModel.findOneAndUpdate(
            { id: sectionId, userId, 'units.items.id': itemId },
            {
                $set: {
                    'units.$[].items.$[elem].completed': completed,
                    'units.$[].items.$[elem].disabled': disabled
                }
            },
            {
                new: true,
                arrayFilters: [{ 'elem.id': itemId }]
            }
        );

        if (!updatedSection) {
            return res.status(404).json({ message: 'Seção ou item não encontrado.' });
        }

        const updatedItem = updatedSection.units.flatMap(unit => unit.items).find(item => item.id == itemId);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o item.' });
    }
});

export default routes;