let image = $(".col-sm-12 img");
let input = $("input[name='photosOfPost']");

image.on("click", (event) =>{
    input.trigger("click");
});

input.on("change", (event) => {
    let selectedFile = event.target.files[0],
        reader = new FileReader();

    reader.onload = function(event) {
       image.attr('src', event.target.result);
    };

    reader.readAsDataURL(selectedFile);
});

$("input[type='submit']").on("click", (event) => {
    event.preventDefault();

    let title = $("input[name='titleOfPost']").val(),
        tags = $("input[name='tagsOfPost']").val(),
        description = $("textarea[name='descOfPost']").val(),
        photo = image.src;

    if(!(title && tags && description)){
        return false;
    }else {
        $.ajax({
            url: "/CreatePost",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                title: title,
                tags: tags,
                description: description,
                photos: photo
            }),
            contentType: "application/json",
            cache: false,
            complete: function () {
                console.log('process complete');
                document.location.href = "http://localhost:3000/"
            },
            error: () => {
                console.log("error has occurred");
            }
        });
    }
});



