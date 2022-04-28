import express from "express";
import { BoardController } from "../controllers/board.controller";
import { BoardValidation } from '*/validations/board.validation'


const router = express.Router()

router.route('/')
    // .get((req, res) => console.log('GET boards'))
    .post(BoardValidation.createNew, BoardController.createNew)
    .get(BoardController.getAllBoard)

router.route('/getBoard/:id')
    .get(BoardController.getAllColumnFromBoard)

router.route('/getMile/:id')
    .get(BoardController.getAllmileFromBoard)
    
router.route('/:id')
    // .get((req, res) => console.log('GET boards'))
    .get(BoardController.getFullBoard)
    .put(BoardValidation.update, BoardController.update)
    .delete( BoardController.deleteBoard) 
    

export const boardRoutes = router