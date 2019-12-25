$(".registration").on("submit", submitForm);

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
        url: "/auth/reg",
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
        },

        success: function(data) {
            if(data.code === 200){
                window.location.href = '/';
            }
            console.log('process sucess:' + data);
        },

        error: function() {
            console.log('process error');
        },
    });
}