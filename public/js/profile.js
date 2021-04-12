const profileImage = document.querySelector("#profileImage");
const fields = document.querySelectorAll(".form-group input");
const editbtn = document.querySelector(".edit-btn");
const savebtn = document.querySelector(".save-btn");

let username = document.querySelector("#name") ;
let email = document.querySelector("#email") ;
let pw = document.querySelector("#password");
let cpw = document.querySelector("#cpw");
let role = document.querySelector("#role");


profileImage.addEventListener("change" , async function(e){
    e.preventDefault();
    let file = profileImage.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append("user" , file);
    let obj = await axios.patch("http://localhost:3000/api/user/updateprofilephoto" , formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
}) 


editbtn.addEventListener("click",function(){
    for(let i=0;i<fields.length;i++){
        fields[i].removeAttribute('disabled');
    }
})

savebtn.addEventListener("click",async function(){
  //submit data and reload page

  let updateObj = {
    "name":username.value,
    "email":email.value,
    "password":pw.value,
    "confirmPassword":cpw.value,
    "role":role.value
  }

  // console.log(username.value);

console.log(updateObj);

  let obj = await axios.patch("http://localhost:3000/api/user" , updateObj);
  // console.log(obj);
  if(obj.data){
    window.location.reload();
  }

})
