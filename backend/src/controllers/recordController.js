import Record from "../models/Record.js"

export const createRecord = async(req,res)=>{
  try{
    const {amount , type, category, date, notes} = req.body;


    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy:req.user._id,

    });

    res.status(201).json(record);
  }catch(error){
    res.status(500).json({message:error.message});


  };
  
}


export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = { createdBy: req.user._id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateRecord = async (req,res)=>{
  try{
    const record = await Record.findById(req.params.id);

    if(!record){
      return res.status(404).json({message:"Record not found"});
    }

    if(record.createdBy.toString()!== req.user._id.toString()){
      return res.status(403).json({message:"Not authorized"});
    }

    const {amount , type, category, date,notes} = req.body;


    record.amount = amount ?? record.amount;

    record.type = type ?? record.type;
    record.category = category ?? record.category;
    record.date = date?? record.date;
    record.notes = notes  ?? record.notes;

    await record.save();

    res.json({message:"Record updated", record});
  }catch(error){
    res.status(500).json({message:error.message});
  }
}


export const deleteRecord = async (req, res)=>{
  try{
    const record = await Record.findById(req.params.id);

    if(!record){
      return res.status(404).json({message:"Record not found"});
    }

    if(record.createdBy.toString()!== req.user._id.toString()){
      return res.status(403).json({message:"Not authorized"});
    }

    await record.deleteOne();

    res.json({message:"Record deleted"});


  }catch(error){
    res.status(500).json({message:error.message});
  }
}

