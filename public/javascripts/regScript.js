$(".registration").on("submit", submitForm);
$(".registration.disabled").on("submit.prob2", (event) => {
    event.preventDefault();
    alert("Please agree with User Agremeent");
});
$(".registration.probPass").on("submit.prob1", (event) => {
    event.preventDefault();
    alert("Your password doesn't match");
});

$("input[name='passwordCheck']").on("mouseout", (event) => {
    let first = $("input[name='passwordCheck']");
    let second = $("input[name='password']");
    let wholeForm = $(".registration")

    if (first.val() === second.val()){
        first.addClass('fine');
        wholeForm.removeClass("probPass");
        $(".registration").off("submit.prob1");
    }
    else{
        first.addClass("bad");
        wholeForm.addClass("probPass");
        $(".registration.probPass").on("submit.prob1", (event) => {
            event.preventDefault();
            alert("Your password doesn't match");
        });
    }

})

$(".radioUrAgmnt").on("click",(e) => {
    let change = $(".radioUrAgmnt").find(":checkbox");
    let wholeForm = $(".registration")
    let submitBut = $("input[type='submit']");
    if(change.prop("checked") === true ){
        submitBut.addClass("activated").removeClass("disabled");
        wholeForm.addClass("activated").removeClass("disabled");
        $(".registration").off("submit.prob2")
    }
    else{
        submitBut.addClass("disabled").removeClass("activated");
        wholeForm.addClass("disabled").removeClass("activated");
        $(".registration.disabled").on("submit.prob2", (event) => {
            event.preventDefault();
            alert("Please agree with User Agremeent");
        });
    }

    if ( e.target === change[0] ) {

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
    const radioUsrAgmnt = $('input[type="checkbox"]').val()

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