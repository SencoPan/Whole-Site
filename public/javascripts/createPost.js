let image = $(".col-sm-12 img");
let input = $("input[name='photosOfPost']");

let formData = new FormData();

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




