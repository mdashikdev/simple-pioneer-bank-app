const loginForm=document.querySelector('#login_form'),
      alert_bar=document.querySelector('#alert_bar'),
      deposite_form=document.querySelector('#deposite_form'),
      withdraw_form=document.querySelector('#withdraw_form'),
      deposite_container=document.querySelector('#deposite_container'),
      withdraw_container=document.querySelector('#withdraw_container'),
      balance_container=document.querySelector('#balance_container'),
      logoutBtn=document.getElementById('logoutBtn');





    loginForm.onsubmit=(e)=>{
        e.preventDefault();
        const email=loginForm.email.value,
              pass=loginForm.pass.value;
        loginMethod(email,pass);
    }

    deposite_form.onsubmit=(e)=>{
        e.preventDefault();
        amountInOut('deposite');
    }

    withdraw_form.onsubmit=(e)=>{
        e.preventDefault();
        amountInOut('withdraw');
    }

   onload=()=>{
    deposite_container.innerText=`$${localStorage.getItem('depositeAmount') ? localStorage.getItem('depositeAmount') : '0'}`;
    withdraw_container.innerText=`$${localStorage.getItem('withdrawAmount') ? localStorage.getItem('withdrawAmount'): '0'}`;
    balance_container.innerText=`$${localStorage.getItem('balanceAmount') ? localStorage.getItem('balanceAmount') : '0'}`;
   }

   document.getElementById('reset').addEventListener('click',()=>{
        localStorage.removeItem('depositeAmount');
        localStorage.removeItem('withdrawAmount');
        localStorage.removeItem('balanceAmount');
        location.reload();
   })
    
    const amountInOut=(status)=>{
        let regex=/(\d)+/;
        let inOrOutFormAmout= parseInt(status === 'withdraw' ? withdraw_form.amount.value : deposite_form.amount.value);

        let balAmount=parseInt(balance_container.textContent.match(regex)),
            prevAmount=parseInt(status === 'withdraw' ? withdraw_container.textContent.match(regex) : deposite_container.textContent.match(regex));

        if (inOrOutFormAmout > 0 && inOrOutFormAmout !== '' && status === 'deposite') {
            deposite_container.innerText=`$${prevAmount + inOrOutFormAmout}`;
            localStorage.setItem('depositeAmount',prevAmount + inOrOutFormAmout);

            balance_container.innerText=`$${balAmount + inOrOutFormAmout}`;
            deposite_form.reset();

        }else if(inOrOutFormAmout > 0 && inOrOutFormAmout !== '' && status === 'withdraw' && balAmount > 0){
            withdraw_container.innerText=`$${prevAmount + inOrOutFormAmout}`;
            localStorage.setItem('withdrawAmount',prevAmount + inOrOutFormAmout);

            balance_container.innerText=`$${balAmount - inOrOutFormAmout}`;
            localStorage.setItem('balanceAmount',balAmount - inOrOutFormAmout);

            withdraw_form.reset();

        }else{
            alert_timeOut('Invalid Amount');
            deposite_form.reset();
        }
        console.log(inOrOutFormAmout)
    }

const loginMethod=(email,pass)=>{
    const regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (email.match(regex) && pass !== '') {
        localStorage.setItem('unId',window.btoa(email));
        alert_timeOut('Login Successfull');
        logout();
    }else{
        alert_timeOut('Login Failed');
    }
}

const login=()=>{
    document.getElementById('login_area').style.display='block';
    document.getElementById('dashboard_area').style.display='none';
    logoutBtn.style.display='none';
}

const logout=()=>{
    document.getElementById('login_area').style.display='none';
    document.getElementById('dashboard_area').style.display='block';
    logoutBtn.style.display='block';
}

logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem('unId');
    alert_timeOut('Logout successfull');
    login();

})

if (localStorage.getItem('unId')) {
    logout();
}else{
    login();
}



const alert_timeOut=(text)=>{
    alert_bar.style.display='block';
    alert_bar.innerText=text;

    setTimeout(() => {
    alert_bar.style.display='none';
    }, 2000);
}