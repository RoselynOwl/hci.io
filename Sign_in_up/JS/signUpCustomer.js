const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
submitBtn.addEventListener("click", function(){
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function(){
    alert("Your Form Successfully Signed up");
    location.reload();
  },800);
});

prevBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

$(document).ready(function(){
  const submitButton = document.querySelector('.submit');
  submitButton.classList.add('disabled');

  const symbolRequirement = document.getElementById('symbol-requirement');
  const lowercaseRequirement = document.getElementById('lowercase-requirement');
  const lengthRequirement = document.getElementById('length-requirement');
  const uppercaseRequirement = document.getElementById('uppercase-requirement');

  // change color

  symbolRequirement.style.color = 'red';
  lowercaseRequirement.style.color ='red';
  lengthRequirement.style.color = 'red';
  uppercaseRequirement.style.color = 'red';

});

document.addEventListener('DOMContentLoaded', function () {
  const style = document.createElement('style');
  style.innerHTML = `
  #password-strength {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    position: relative; /* 添加相对定位 */
    z-index: 1; 
}

.strength-box {
    width: 30px;
    height: 10px;
    border: 1px solid #000;
    position: relative;
    z-index: 2; 
}

#weak {
    background-color: red;
}

#medium {
    background-color: yellow;
}

#strong {
    background-color: green;
}

  `;

  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);


  const passwordInput = document.getElementById('password');
  const weakBox = document.getElementById('weak');
  const mediumBox = document.getElementById('medium');
  const strongBox = document.getElementById('strong');
  const strengthBox = document.querySelector('.strength-box');
  
  passwordInput.addEventListener('focus', function() {
    strengthBox.style.display = 'block'; 
    weakBox.style.display = 'block';
    mediumBox.style.display = 'block';
    strongBox.style.display = 'block';
  });
  
  // passwordInput.addEventListener('blur', function() {
  //   strengthBox.style.display = 'none'; 
  //   weakBox.style.display = 'none';
  //   mediumBox.style.display = 'none';
  //   strongBox.style.display = 'none';
  // });
  
  passwordInput.addEventListener('input', function () {
      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);

      // display the color according strength of password
      switch (strength) {
        case 0:
            weakBox.style.backgroundColor = 'red';
            mediumBox.style.backgroundColor = 'transparent';
            strongBox.style.backgroundColor = 'transparent';
            break;
        case 1:
            weakBox.style.backgroundColor = 'transparent';
            mediumBox.style.backgroundColor = 'yellow';
            strongBox.style.backgroundColor = 'transparent';
            break;
        case 2:
            weakBox.style.backgroundColor = 'transparent';
            mediumBox.style.backgroundColor = 'transparent';
            strongBox.style.backgroundColor = 'green';
            break;
        default:
            weakBox.style.backgroundColor = 'transparent';
            mediumBox.style.backgroundColor = 'transparent';
            strongBox.style.backgroundColor = 'transparent';
    }
    
  
// get password value

const passwordRequirements = document.querySelector('.password-requirements');
const submitButton = document.querySelector('.submit');

// listen password input
passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;

    // check password valid or not
    const isSymbolValid = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);
    const isLowercaseValid = /[a-z]/.test(password);
    const isLengthValid = password.length >= 8;
    const isUppercaseValid = /[A-Z]/.test(password);

    // disabled submitbhutton
    if (isSymbolValid && isLowercaseValid && isLengthValid && isUppercaseValid) {
        submitButton.classList.remove('disabled');
        submitButton.disabled = false;
    } else {
        submitButton.classList.add('disabled');
        submitButton.disabled = true;
    }


    updatePasswordRequirementsDisplay(isSymbolValid, isLowercaseValid, isLengthValid, isUppercaseValid);
});


function updatePasswordRequirementsDisplay(isSymbolValid, isLowercaseValid, isLengthValid, isUppercaseValid) {
    const symbolRequirement = document.getElementById('symbol-requirement');
    const lowercaseRequirement = document.getElementById('lowercase-requirement');
    const lengthRequirement = document.getElementById('length-requirement');
    const uppercaseRequirement = document.getElementById('uppercase-requirement');

    // change status
    symbolRequirement.textContent = isSymbolValid ? '✓' : '✗';
    symbolRequirement.style.color = isSymbolValid ? 'green' : 'red';

    lowercaseRequirement.textContent = isLowercaseValid ? '✓' : '✗';
    lowercaseRequirement.style.color = isLowercaseValid ? 'green' : 'red';

    lengthRequirement.textContent = isLengthValid ? '✓' : '✗';
    lengthRequirement.style.color = isLengthValid ? 'green' : 'red';

    uppercaseRequirement.textContent = isUppercaseValid ? '✓' : '✗';
    uppercaseRequirement.style.color = isUppercaseValid ? 'green' : 'red';
}


  function calculatePasswordStrength(password) {
      if (password.length < 8) {
          return 0; // 弱
      } else if (password.length < 12) {
          return 1; // 中
      } else {
          return 2; // 强
      }
  }
})});
