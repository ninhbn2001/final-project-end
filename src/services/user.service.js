import { UserModel } from "*/models/user.model"
// import { cloneDeep } from "lodash";

const createNew = async (data) => {
    try {
        const createdUser = await UserModel.createNew(data)
        const getNewUser = await UserModel.findOneById(createdUser.insertedId.toString())
        return getNewUser;
    } catch (error) {
        throw new Error(error)
    }
}


// const update = async (id, data) => {
//     try {
//         const updateData = {
//             ...data,
//             updateAt: Date.now()
//         }
//         if (updateData._id) delete updateData._id
//         if (updateData.columns) delete updateData.columns

//         const updatedBoard = await BoardModel.update(id, updateData)

//         return updatedBoard;
//     } catch (error) {
//         throw new Error(error)
//     }
// }

export const UserService = {  createNew }