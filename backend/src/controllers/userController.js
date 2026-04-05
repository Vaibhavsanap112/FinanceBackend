import User from "../models/User.js"

export const getAllUsers = async (req,res)=>{
  try{
    const users = await User.find().select("-password");

    res.json(users);
  }catch(error){
    res.status(500).json({message:error.message});
  }
}

export const updateUser = async(req,res)=>{
  try{
    const {role, isActive}= req.body;

    const user = await User.findById(req.params.id);

    if(!user){
      return res.status(4004).json({message:"User not found"});
    }

    if(role) user.role =role;
    if(isActive!== undefined) user.isActive = isActive;

    await user.save();

    res.json({
      message:"User updated successfully",
      user,
    });
  }catch(error){
    res.status(500).json({message:error.message});
  }
}