$(".registration").on("submit", submitForm);
$(".registration.disabled").on("submit.prob2", (event) => {
    event.preventDefault();
    alert("Please agree with User Agremeent");
});
$(".registration.probPass").on("submit.prob1", (event) => {
    event.preventDefault();
    alert("Your password doesn't match");
});

if($(".radioUrAgmnt").find(":checkbox").prop("checked") === true){
    $(".registration").addClass("activated").removeClass("disabled");
    $("input[type='submit']").addClass("activated").removeClass("disabled");
    $(".registration").off("submit.prob2")
}

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
    let wholeForm = $(".registration");
    let submitBut = $("input[type='submit']");

    if ( e.target === change[0] ) {

    }
    else{
        change.prop("checked") === true ? change.prop("checked", false) : change.prop("checked", true);
    }

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


})

function submitForm(event){
    event.preventDefault();
    const firstName = $("input[name='FirstName']").val(),
            secondName = $("input[name='SecondName']").val(),
            email = $("input[name='email']").val(),
            password = $("input[name='password']").val(),
            passwordCheck = $("input[name='passwordCheck']").val(),
            login = $("input[name='login']").val(),
            captcha = $("#g-recaptcha-response").val(),
            radioUsrAgmnt = $('input[type="checkbox"]').val();

    console.log(login);

    $.ajax({
        url: "/reg",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            firstName: firstName ,
            secondName: secondName ,
            email: email ,
            password: password ,
            passwordCheck: passwordCheck ,
            login: login ,
            captcha: captcha,
            radioUsrAgmnt: radioUsrAgmnt
        }),
        contentType: "application/json",
        cache: false,
        complete: function() {
            //called when complete
            console.log('process complete');
            alert("Captcha is failed");
        },

        success: function(data) {
            console.log(data);
            console.log('process sucess');
            window.location.replace("/");
        },

        error: function() {
            console.log('process error');
        },
    });
}