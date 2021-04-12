
let pw = document.querySelector("#password");
let cpw = document.querySelector("#cpw");
let submit = document.querySelector('#submit');
let message = document.querySelector(".message");

submit.addEventListener("click" , async function(e){
    try{
        e.preventDefault(); // prevent page refresh
        if(cpw.value && pw.value){
            let token = document.URL.split("/");
            token = token[token.length-1];
            let obj = await axios.post( `http://localhost:3000/api/user/resetpassword/${token}` , {password:pw.value,confirmPassword:cpw.value});
            console.log(obj);
            message.innerHTML=obj.data.message;

            setTimeout( window.location.href="/" , 25000);
        }
    }
    catch(error){
        console.log(error);
    }
    // alert("clicked !!");
})
