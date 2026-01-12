document.addEventListener('DOMContentLoaded',()=>{
  const email=document.querySelector('#email');
  if(email){
    email.addEventListener('input',()=>email.setCustomValidity(''));
    email.addEventListener('invalid',()=>email.setCustomValidity('Please use a real email. No smoke signals.'));
  }
});