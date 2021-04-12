// const plans = require("../Model/plansModel.json")
// const {v4 : uuidv4} = require("uuid");
// let fs = require("fs");
// let path = require("path");

const planModel = require("../Model/plansModel")

async function createPlan(req, res) {
  
  try{
    let sentPlan = req.body;
    let plan = await planModel.create(sentPlan);
    res.status(200).json({
      message:"Plan Created Successfully !",
      data:plan
    })
  }
  catch(error){
    res.status(501).json({
      message:"Failed to create a plan",
      error : error.errors.discount.message
    })
  }

}
async function getAllPlans(req, res) {
  try{
    let plans = await planModel.find({});
    res.status(200).json({
      message:"Got all plans successfully !!",
      data : plans
    })
  }
  catch(error){
    res.status(501).json({
      message:"Failed to get all plan",
      error : error
    })
  }
}

async function getPlanById(req, res) {
  try{
    let { id } = req.params;
    let plan = await planModel.findById(id);
    res.status(200).json({
      message: "Succesfully get plan by id",
      data: plan,
    });
  }
  catch(error){
    res.status(404).json({
      message: "Plan Not found !!!",
      error:error
    });

  }
}


async function updatePlanById(req, res) {
  try{
    let id = req.params.id ;  //params has plan id, token has userid  
    let {updateObj} = req.body;
    // let updatedPlan = await planModel.findByIdAndUpdate(id , updateObj , {new:true} );
    let plan = await planModel.findById(id);
    console.log(plan);
    
    for(key in updateObj){
      plan[key] = updateObj[key];
    }
    
    // create // save    
    let updatedPlan = await plan.save();
    // console.log(updatedPlan);
    res.status(200).json({
      message:"updated plan successfully !!",
      data : updatedPlan
    })
  }
  catch(error){
    // console.log(error);
    res.status(501).json({
      message:"failed to update plan",
      error:error.errors.discount.message
    })
  }

}


async function deletePlanById(req, res) {
  try{
    let { id } = req.params;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    res.status(200).json({
      message:"Plan deleted !!",
      data : deletedPlan
    })
  }
  catch(error){
    res.status(501).json({
      message:"Plan failed to delete !!",
      error
    })
  }
  
}


// function getAllPlans(req, res) {
//   if (plans.length) {
//     res.status(200).json({
//       message: "Succesfully got all plans",
//       data: plans,
//     });
//   } else {
//     res.status(200).json({
//       message: "No Food Plans Found ",
//     });
//   }
// }
// function createPlan(req, res) {
//   let plan = req.body;
//   plan.id = uuidv4();
//   plans.push(plan);

//   let plansPath = path.join(__dirname, '..', 'Model', 'plansModel.json');
//   console.log(plansPath);
  
//   fs.writeFileSync(plansPath , JSON.stringify(plans));

//   res.status(201).json({
//     message: "Successfully create a plan !",
//     data: plans,
//   });
// }
// function getPlanById(req, res) {
//   let { id } = req.params;

//   let filteredPlans = plans.filter(function (plan) {
//     return plan.id == id;
//   });
//   if (filteredPlans.length) {
//     res.status(200).json({
//       message: "Succesfully get plan by id",
//       data: filteredPlans[0],
//     });
//   } else {
//     res.status(404).json({
//       message: "Plan Not found !!!",
//     });
//   }
// }
// function updatePlanById(req, res) {
//   let { id } = req.params;
//   let updateObj = req.body;
//   // { "plan":"", "food":"" }
//   let filteredPlan = plans.filter(function (plan) {
//     return plan.id == id;
//   });
//   if (filteredPlan.length) {
//     let plan = filteredPlan[0];
//     for (key in updateObj) {
//       plan[key] = updateObj[key];
//     }
//     fs.writeFileSync("../Model/plansModel.json", JSON.stringify(plans));
//     res.status(200).json({
//       message: "Plan Updated !!!",
//     });
//   } else {
//     res.status(404).json({
//       message: "Plan Not found !!!",
//     });
//   }
// }
// function deletePlanById(req, res) {
//   let { id } = req.params;
//   let filteredPlans = plans.filter(function (plan) {
//     return plan.id != id;
//   });
//   if (filteredPlans.length == plans.length) {
//     res.status(404).json({
//       message: "Plan not found !!",
//     });
//   } else {
//     fs.writeFileSync("../Model/plansModel.json", JSON.stringify(filteredPlans));
//     res.status(200).json({
//       message: "Plan deleted Successfully !!!",
//     });
//   }
// }



module.exports.getAllPlans = getAllPlans;
module.exports.createPlan = createPlan;
module.exports.getPlanById = getPlanById;
module.exports.updatePlanById = updatePlanById;
module.exports.deletePlanById = deletePlanById;