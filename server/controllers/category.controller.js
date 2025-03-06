import CategoryModel from '../models/category.model.js'


export const AddCategoryController = async(req,res) =>{
    try {
        const {name,image} = req.body

        if(!name || !image) {
            return res.status(400).json({
                message: 'Please enter required field' ,
                error : true,
                success : false
            })
        }

        const addCategory = new  CategoryModel({
            name,
            image
        })

        const saveCategory =await addCategory.save()

        if(!saveCategory){
            return res.status(500).json({
                    message : "Not created",
                    success : false,
                    error : true
            })
        }

        return res.json({
            message : "Added category",
            data : saveCategory,
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async(req,res) => {

    try {
        const data =await CategoryModel.find()

        return res.json({
            data: data,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async(req, res) => {
    try {
        const {categoryId,name,image}= req.body

        const update = await CategoryModel.updateOne({
            _id : categoryId,
            
        },{
            name,
            image
        })
        return res.json({
            message : "updated category",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}