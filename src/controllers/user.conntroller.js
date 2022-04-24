import { UserService } from '*/services/user.service'
import { HttpStatusCode } from "*/utilities/constants";
import { UserModel } from "../models/user.model";


const createNew = async (req, res) => {
    try {
        const result = await UserService.createNew(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

// const getData = async (req, res) => {
//     try {
//         const data = req.params.data

//         let getData = await UserModel.userCollectionName.find(data)
//         res.status(200).json("get data is successful", getData)
//     } catch (error) {
//         console.log(error)
//     }
// }




// const getFullBoard = async (req, res) => {
//     try {
//         const { id } = req.params
//         const result = await BoardService.getFullBoard(id)
//         res.status(HttpStatusCode.OK).json(result)
//     } catch (error) {
//         res.status(HttpStatusCode.INTERNAL_SERVER).json({ 
//             errors: error.message
//          })
//     }
//  }

//  const update = async (req, res) => {
//     try {
//         const { id } = req.params
//         const result = await BoardService.update(id, req.body)
//         res.status(HttpStatusCode.OK).json(result)
//     } catch (error) {
//         res.status(HttpStatusCode.INTERNAL_SERVER).json({ 
//             errors: error.message
//          })
//     }
//  }

export const UserController = { createNew }
