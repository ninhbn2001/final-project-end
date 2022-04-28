import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";
import { CardModel } from "./card.model"
import { ColumnModel } from "./column.model"
import { MileModel } from "./mile.model"

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    mileOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}


const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(boardCollectionName).insertOne(value)
        return result

    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data
        }
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return result.value

    } catch (error) {
        throw new Error(error)
    }
}

const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(boardId) },
            { $push: { columnOrder: columnId } },
            { returnDocument: 'after' }
        )
        return result.value

    } catch (error) {
        throw new Error(error)
    }
}

const pushMileOrder = async (boardId, columnId) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(boardId) },
            { $push: { columnOrder: columnId } },
            { returnDocument: 'after' }
        )
        return result.value

    } catch (error) {
        throw new Error(error)
    }
}

const getFullBoard = async (boardId) => {
    try {
        const result = await getDB().collection(boardCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(boardId),
                    _destroy: false
                }
            },
            {
                $lookup: {
                    from: ColumnModel.columnCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }
            },
            {
                $lookup: {
                    from: CardModel.cardCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            },

        ]).toArray()

        return result[0] || {}

    } catch (error) {
        throw new Error(error)
    }
}

const getAllColumnFromBoard = async (boardId) => {
    try {
        const result = await getDB().collection("columns").find({ boardId: ObjectId(boardId) }).toArray();
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getAllmileFromBoard = async (boardId) => {
    try {
        const result = await getDB().collection("miles").find({ boardId: ObjectId(boardId) }).toArray();
        return result
    } catch (error) {
        throw new Error(error)
    }
}


const getAllBoard = async () => {
    try {
        const result = await getDB().collection(boardCollectionName).find({}).toArray();
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteBoard = async (id) => {
    try {

        const result = await getDB().collection(boardCollectionName).deleteOne({ _id: ObjectId(id) })
        return result

    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = { boardCollectionName, createNew, getFullBoard, pushColumnOrder, update, findOneById, getAllBoard, pushMileOrder, getAllColumnFromBoard, getAllmileFromBoard, deleteBoard } 