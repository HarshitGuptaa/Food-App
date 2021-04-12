let names = ["EVERYONE" , "DEVELOPERS" , "FITNESS FREAKS" , "VEGANS"];

let changingText = document.querySelector("#changing-text");

let aTag = document.querySelector(".aTag");
// console.log(aTag);
let showcase = document.querySelector(".showcase");
let navigation = document.querySelector(".navigation");
// let featurebtn = aTag[0];

let idx=0;
let text="";
let word = names[idx];
let isDeleting = false;
let wait = 3000;
let typeSpeed;

window.addEventListener("load",function(){
    typeWords();
})

window.addEventListener("scroll",function(){
    let obj = showcase.getBoundingClientRect();
    // console.log(obj);
    let bottom = obj.bottom;

    if(bottom<=0){
        navigation.classList.add("fixed");
    }else{
        navigation.classList.remove("fixed");
    }
})

aTag.addEventListener("click",function(){
    window.scrollTo(0,657);
})

function typeWords(){
    typeSpeed = 35;
    
    if(isDeleting && text.length==0){
        idx=(idx+1)%names.length;
        word=names[idx];
        isDeleting=false;
        // typeSpeed=500;
    }

    if(text.length==word.length){
        isDeleting=true;
        //typeSpeed=wait;
    }


    text = isDeleting?word.substring(0,text.length-1) : word.substring(0,text.length+1);
    changingText.innerHTML = text;
    setTimeout(typeWords,text.length==word.length?2500 : typeSpeed);
}

