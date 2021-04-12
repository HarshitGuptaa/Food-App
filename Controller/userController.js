// const userDB = require("../Model/usersModel.json");
// const {v4 : uuidv4} = require("uuid");
// const fs = require("fs");

const userModel = require("../Model/usersModel");


function getAllUsers(req, res) {
  if (userDB.length) {
    res.status(200).json({
      message: "Got all users successfully",
      data: userDB,
    });
  } else {
    res.status(200).json({
      message: "No users found !!!",
    });
  }
}
function createUser(req, res) {
  let user = req.body;
  user.id = uuidv4();
  userDB.push(user);
  fs.writeFileSync("../Model/usersModel.json", JSON.stringify(userDB));

  res.status(201).json({
    message: "Successfully create a user !",
    data: userDB,
  });
}
async function getUserById(req, res) {
  try{
    let id = req.id;
    // get user 
    let user = await userModel.findById(id);
    console.log(user);
    res.status(200).json({
      message:"Got user By id !!",
      data : user
    })
  }
  catch(error){
    res.json({
      message:"Failed to get user !!!",
      error
    })
  }
}
async function updateUserById(req, res) {
  try{
    let id = req.id;
    console.log(id);
    console.log(req.body);
    let updateObj = req.body;
    // console.log(updateObj);
    let user = await userModel.findById(id);

    for(key in updateObj){
      user[key] = updateObj[key];
    }

    let updatedUser = await user.save();
    
    console.log(updatedUser);

    res.status(201).json({
      message:"Updated User",
      data : updatedUser
    })

  }
  catch(error){
    res.status(501).json({
      message:"Failed to update user",
      error
    })
  }
}

async function deleteUserById(req, res) {
  try{
    let id = req.id;
    let deletedUser =await userModel.findByIdAndDelete(id);
    if(deletedUser){
      res.status(200).json({
        message:"User deleted Succesfulyy !!",
        data : deletedUser
      })
    }
    else{
      res.status(200).json({
        message:"User not Found !!!"
      })
    }
  }
  catch(error){
    res.status(501).json({
      message:"Failed to delete",
      error
    })
  }
}

async function updateProfilePhoto(req , res){
  try{
    let file = req.file;
    console.log(file);
    let imagePath = file.destination+"/"+file.filename;
    imagePath = imagePath.substring(6);

    let id = req.id;
    let user = await userModel.findById(id);
    user.pImage = imagePath;
    await user.save({validateBeforeSave:false}); 
    res.json({
      message:"Profile Photo updated !!"
    })
  }
  catch(error){
    res.status(200).json({
      message:"failed to update photo !!",
      error
    })
  }
}



// function getAllUsers(req, res) {
//   if (userDB.length) {
//     res.status(200).json({
//       message: "Got all users successfully",
//       data: userDB,
//     });
//   } else {
//     res.status(200).json({
//       message: "No users found !!!",
//     });
//   }
// }
// function createUser(req, res) {
//   let user = req.body;
//   user.id = uuidv4();
//   userDB.push(user);
//   fs.writeFileSync("../Model/usersModel.json", JSON.stringify(userDB));

//   res.status(201).json({
//     message: "Successfully create a user !",
//     data: userDB,
//   });
// }
// function getUserById(req, res) {
//   let { id } = req.params;

//   let filteredUsers = userDB.filter(function (user) {
//     return user.id == id;
//   });
//   if (filteredUsers.length) {
//     res.status(200).json({
//       message: "Succesfully get user by id",
//       data: filteredUsers[0],
//     });
//   } else {
//     res.status(404).json({
//       message: "User Not found !!!",
//     });
//   }
// }
// function updateUserById(req, res) {
//   let { id } = req.params;
//   let updateObj = req.body;
//   // { "plan":"", "food":"" }
//   let filteredUser = userDB.filter(function (user) {
//     return user.id == id;
//   });
//   if (filteredUser.length) {
//     let user = filteredUser[0];
//     for (key in updateObj) {
//       user[key] = updateObj[key];
//     }
//     fs.writeFileSync("../Model/usersModel.json", JSON.stringify(userDB));
//     res.status(200).json({
//       message: "User Updated !!!",
//     });
//   } else {
//     res.status(404).json({
//       message: "User Not found !!!",
//     });
//   }
// }
// function deleteUserById(req, res) {
//   let { id } = req.params;
//   let filteredUsers = userDB.filter(function (user) {
//     return user.id != id;
//   });
//   if (filteredUsers.length == userDB.length) {
//     res.status(404).json({
//       message: "User not found !!",
//     });
//   } else {
//     fs.writeFileSync("../Model/usersModel.json", JSON.stringify(filteredUsers));
//     res.status(200).json({
//       message: "User deleted Successfully !!!",
//     });
//   }
// }


module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.updateProfilePhoto = updateProfilePhoto;