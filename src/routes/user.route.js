import express from "express";
import { UserController } from '*/controllers/user.conntroller';
import { UserValidation } from '*/validations/user.validation'

const router = express.Router()

router.route('/')
// .get((req, res) => console.log('GET boards'))
.post(UserValidation.createNew, UserController.createNew) 


// router.route('/:id')
// // .get((req, res) => console.log('GET boards'))
// .get(BoardController.getFullBoard) 
// .put(BoardValidation.update, BoardController.update)
// router.route('/getusers')
// .get(UserController.getData) 

export const userRoutes = router