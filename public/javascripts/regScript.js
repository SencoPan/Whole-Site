$(".registration").on("submit", submitForm);
$(".radioUrAgmnt").on("click",(e) => {
    let change = $(".radioUrAgmnt").find(":checkbox");
    if ( e.target === change[0] ) {
        //
    }
    else{
        change.prop("checked") === true ? change.prop("checked", false) : change.prop("checked", true);
    }
})
function submitForm(event){
    event.preventDefault();

    const firstName = $("input[name='FirstName']").val()
    const secondName = $("input[name='SecondName']").val()
    const email = $("input[name='email']").val()
    const password = $("input[name='password']").val()
    const passwordCheck = $("input[name='passwordCheck']").val()
    const login = $("input[name='login']").val()
    const captcha = $("#g-recaptcha-response").val()
    const radioUsrAgmnt = $('input[type="radio"]').val()

    console.log(login);

    fetch("/reg", {
        method:"POST",
        headers:{
            'Accept' : 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            firstName : firstName ,
            secondName : secondName ,
            email : email ,
            password : password ,
            passwordCheck : passwordCheck ,
            login : login ,
            captcha : captcha,
            radioUsrAgmnt : radioUsrAgmnt
        })
    })
        .then((res) => {return res.json()})
        .then((data) => {console.log(data)})
}