const { resourceUsage } = require("process");
const Product = require("../models/product");
const fs = require("fs");

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo) {
      res.status(400).json({ success: false, message: "Please add Photo" });
    }
    if (!name || !price || !stock || !category) {
      fs.unlink(photo.path, () => {
        console.log("Photo deleted");
      });
      res.status(400).json({ success: false, message: "Please enter all field" });
    }
    const product = new Product({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo.path,
    });
    const newProduct = await Product.create(product);
    res.status(200).json({success: true,message: "Product added successfully",product: newProduct,});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getLatestProduct = async(req,res)=>{
    try{
        const products = await Product.find({}).sort({createdAt:-1}).limit(5);
        res.status(200).json({success:true,products:products});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.getAllCategories = async(req,res)=>{
    try{
        const categories = await Product.distinct("category");
        res.status(200).json({success:true,categories:categories});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.getAdminProducts = async(req,res)=>{
    try{
         const allProducts = await Product.find({});
         res.status(200).json({success:true,products:allProducts});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.getSingleProduct = async(req,res)=>{
    try{
        const _id = req.params.id;
        const product = await Product.findById({_id});
        if(!product){
            return res.status(400).json({success:false,message:"Product not found"});
        }
         res.status(200).json({success:true,product:product});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const { name, price, stock, category } = req.body;
        const photo = req.file;
        const product = await Product.findByIdAndUpdate(_id, req.body);
        if (!product) {
            fs.unlink(photo.path, () => {
                console.log("Photo deleted");
              });
            return res.status(404).json({ success: false, message: "Invalid Product ID" });
        }
        if (photo) {
            fs.unlink(product.photo, () => {
              console.log("Old Photo Deleted");
              });
            product.photo = photo.path;
            await product.save();
        }
        res.status(200).json({ success: true, message: "Product Updated Successfully", product: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteProduct = async(req,res)=>{
    try{
        const _id = req.params.id;
        const product = await Product.findByIdAndDelete({_id});
        fs.unlink(product.photo, () => {
            console.log("Product Photo Deleted");
            });
        if(!product){
            res.status(404).json({success:false,message:"product not found"});
        }
        res.status(200).json({success:true,message:"product deleted successfully"});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.getAllProducts = async(req,res)=>{
    try{
        const{search,price,category,sort} = req.query;

        const page = Number(req.query.page)||1;

        const limit =Number(process.env.PRODUCT_PER_PAGE) || 8;

        const skip = (page-1)*limit;
        
        const filters ={};
        if(search){
            filters.name = {$regex:search,$options:"i"}
        }
        if(price){
            filters.price={$lte:Number(price)}
        }
        if(category){
            filters.category=category
        }
        const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);
  
      const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
      ]);
      const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
        // const products = await Product.find({filters}).sort(sort&&{price:sort==="asc"?1:-1}).limit(limit).skip(skip);
        res.status(200).json({success:true,products:products,totalPage});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}
