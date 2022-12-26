const signin = document.querySelector('#signin');
const signup = document.querySelector('.signup');

const fullname = document.querySelector('.fullname');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const Lname = document.querySelector('.lfullname');
const pass = document.querySelector('.lpassword');

signup.addEventListener('click',(e)=>{
  e.preventDefault();
  let name = fullname.value.trim();
  let login = email.value.trim();
  let pass = password.value.trim();
  let options = {
    method: 'POST',
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      "username":name,
      "email":login,
      "password":pass,
    })
  }

  fetch("https://task.samid.uz/v1/user/sign-up",options)
  .then(res=>{
    if(!res.ok) throw alert(res);
    console.log(res); 
  }).finally(()=>{
    fullname.value="";
    email.value="";
    password.value="";
  })

});
signin.addEventListener('submit',(e)=>{
  e.preventDefault();
  const form = new FormData();
  form.append("username", Lname.value.trim());
  form.append("password", pass.value.trim());
  fetch("https://task.samid.uz/v1/user/sign-in",{
    method:'POST',
    body:form,
  })
  .then(res=>res.json())
  .then(res=>{
    if(res.data?.token){
      window.localStorage.setItem("token",res.data.token)
      window.location.replace("../main.html");
    }
  })

});

