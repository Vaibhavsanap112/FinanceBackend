import Record from "../models/Record.js";

export const getSummary = async (req , res)=>
{
  try{
    const userId = req.user._id;

    const records = await Record.find({createdBy:userId});

    let totalIncome = 0;
    let totalExpense =0;

    const categoryTotals={};
    records.forEach((rec)=>{
      if(rec.type=="income") totalIncome +=rec.amount;
      else totalExpense+=rec.amount;

      if(!categoryTotals[rec.category]){
        categoryTotals[rec.category]=0;
      }
      categoryTotals[rec.category]+=rec.amount;
    });


  const recent = await Record.find({ createdBy: userId })
  .sort({ date: -1 })
  .limit(5);

   const balance = totalIncome-totalExpense;

    res.json({
      totalIncome,
      categoryTotals,
      totalExpense,
      balance,
      recent
    });
  }catch(error){
    res.status(500).json({message:error.message});
  }
}

export const getTrends = async( req, res)=>{

  try{
    const userId = req.user._id;
    const records =await Record.find({createdBy:userId});

    const monthly ={};
    const weekly={};

    records.forEach((rec)=>{

      const date = new Date(rec.date);

      const week = Math.ceil(date.getDate()/7);
      const weekKey = `Week ${week}`;
      weekly[weekKey] = (weekly[weekKey]|| 0)+rec.amount;



    })
    res.json({
      monthly,
      weekly,
    })
  }catch(error){
    res.status(500).json({message:error.message});
  }
}