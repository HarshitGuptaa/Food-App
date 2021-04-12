//login
let email = document.querySelector("#username");
let pw = document.querySelector("#password");
let loginBtn = document.querySelector("#submit");
let message = document.querySelector('.message');

//signup
let name = document.querySelector("#name");
let signpw = document.querySelector("#signupPw");
let cpw = document.querySelector("#cpassword");
let signupmail = document.querySelector('#email');
let signupBtn = document.querySelector('#signupbtn');



let loginForm = document.querySelector('.form-panel.one');
let signupForm = document.querySelector('.form-panel.two');
let formtoggle = document.querySelector('.form-toggle');
let form = document.querySelector("form"); 
let forgetPassword = document.querySelector(".forgetPassword");



forgetPassword.addEventListener("click" , async function(e){
    try{
        e.preventDefault();
        if(email.value){
            let obj = await axios.post("http://localhost:3000/api/user/forgetpassword" , {email:email.value});
            console.log(obj);
            message.innerHTML = "Reset Link sent to registered email";
        }
    }
    catch(error){
        console.log(error);
    }
})

signupForm.addEventListener("click", function(e){
    e.preventDefault();
    formtoggle.classList.add("visible");
    loginForm.classList.add("hidden");
    signupForm.classList.add("active");
    form.style.height = "588px";
})

formtoggle.addEventListener("click",function(e){
    e.preventDefault();
    this.classList.remove("visible");
    loginForm.classList.remove("hidden");
    signupForm.classList.remove("active");
    form.style.height = "468px"
})

// $(document).ready(function() {
//     var panelOne = $('.form-panel.two').height(),
//     panelTwo = $('.form-panel.two')[0].scrollHeight;
    
//     $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
//         e.preventDefault();
        
//         $('.form-toggle').addClass('visible');   form-toggle
//         $('.form-panel.one').addClass('hidden');  loginform
//         $('.form-panel.two').addClass('active');  signupform 
//         $('.form').animate({   form
//             'height': panelTwo
//         }, 200);
//     });
    
//     $('.form-toggle').on('click', function(e) {
//         e.preventDefault();
//         $(this).removeClass('visible');
//         $('.form-panel.one').removeClass('hidden');
//         $('.form-panel.two').removeClass('active');
//         $('.form').animate({
//             'height': panelOne
//         }, 200);
//     });
    
//     let email = $("#username").value;
//     let pw = $("#password").value; 

//     $('#submit').on("click",async function(e){
//         try{
//             e.preventDefault();
//             if(email && pw){
//                 let obj = axios.post( "http://localhost:3000/api/user/login" , {email:email.value , password:pw.value});
//                 console.log(obj);
//             }
//         }

//         catch{
//             console.log(error);
//         }

//     });

    
    loginBtn.addEventListener("click" , async function(e){
        try{
            e.preventDefault(); // prevent page refresh
            if(email.value && pw.value){
                let obj = await axios.post( "http://localhost:3000/api/user/login" , {email:email.value , password:pw.value});
                console.log(obj);

                if(obj.data.data){
                    window.location.href="/";
                }else{
                    message.innerHTML=obj.data.message;
                }
            }
        }
        catch(error){
            console.log(error);
        }
        // alert("clicked !!");
    })

    signupBtn.addEventListener("click" , async function(e){
        try{
            e.preventDefault();
            if(name.value && signpw.value && cpw.value && signupmail.value){
                let signupObject = {
                    "name":name.value,
                    "email":signupmail.value,
                    "password":signpw.value,
                    "confirmPassword":cpw.value
                }
                let obj = await axios.post("http://localhost:3000/api/user/signup" , signupObject)
                console.log(obj);
                if(obj.data.data){
                    window.location.href="/";
                }else{
                    message.innerHTML=obj.data.message;
                }
            }
    
        }
        catch(error){
            console.log(error);
        }
    })



//   });