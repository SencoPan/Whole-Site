var print = args => console.log(...args);
print("hi there");
var footerToHide = $(".page-footer");
var temp = $(".to-hide-content");
const InputToSeaz = $("#search-anm-1");
const IconToActWith = $("#search-anm-i-1");
const ChoiceLanToSeaz = $('div#choice-lan');
const IconToActLan = $("#search-anm-i-2");
const ChoiceAwIthinDiv = $("div#choice-lan").find(".lan-links");
const temp1 = {
	zero1:0,
	zero2:0
};
console.log(parseInt(ChoiceAwIthinDiv.css("padding-top")))
console.log(parseInt(InputToSeaz.css("padding-top")));

$(function(undefined) {
	IconToActLan.click(
		function(event) {
			 if(temp1.zero1 == 1){
			 	temp1.zero1 = 0;
				ChoiceAwIthinDiv.css("display", "none")
			 	print('1')
				ChoiceLanToSeaz.animate({width:".39em",padding:"0"},
					{
					queue: false,	
					duration: 750,
					complete: function(){}
					}
				)
			}
			else{
				temp1.zero1 = 1;
				ChoiceAwIthinDiv.css("display", "flex")
				ChoiceLanToSeaz.animate({width:"4em",padding:"1"}, 
					{
					queue: false,	
					duration: 750,
					complete : function(){}
					}

				)
			}
		}
		)
	IconToActWith.click(function(event1){
		if ((temp1.zero2 == 1) && (InputToSeaz.val() != '')) {
			temp1.zero2 = 0
			window.location.replace("http://www.google.com");
		}
		else if(temp1.zero2 == 1){
			temp1.zero2 = 0;
			InputToSeaz.animate({width:"0em",padding:"0"}, {
					queue: false,	
					duration: 750,
					complete: function(){}
					})
		}
		else{
			temp1.zero2 = 1
			InputToSeaz.animate({width:"8em",padding:"1"}, {
					queue: false,	
					duration: 750,
					complete: function(){}
					})
		}
	});

	$(document).click(function(event){
		const targetClick = event.target;
		if((!($(targetClick).is(InputToSeaz)) && !($(targetClick).is(IconToActWith))) && (!($(targetClick).is(ChoiceLanToSeaz)) && !($(targetClick).is(IconToActLan)))){
				temp1.zero2 = 0;
				InputToSeaz.animate({width:"0",padding:"0"}, {
					queue: false,	
					duration: 750,
					complete: function(){}
					})
				temp1.zero1 = 0;
				ChoiceAwIthinDiv.css("display", "none")
				ChoiceLanToSeaz.animate({width:".39em",padding:"0"},
					{
					queue: false,	
					duration: 750,
					complete: function(){}
					}
				)
		}
		else if ((!($(targetClick).is(InputToSeaz)) && !($(targetClick).is(IconToActWith)))) {
				temp1.zero2 = 0;
				InputToSeaz.animate({width:"0",padding:"0"}, {
					queue: false,	
					duration: 750,
					complete: function(){}
					})
		}
		else if ((!($(targetClick).is(ChoiceLanToSeaz)) && !($(targetClick).is(IconToActLan)))) {
				temp1.zero1 = 0;
				ChoiceAwIthinDiv.css("display", "none")
				ChoiceLanToSeaz.animate({width:".39em",padding:"0"},
					{
					queue: false,	
					duration: 750,
					complete: function(){}
					}
				)
		}
		else{
		}
	}	
	)


	var togRightInClass = $(".side").find(".col-2").find("p");

	togRightInClass.on("click", function(data) {
			// print(data.target.classList.contains("right-in"));
			if (data.target.classList.contains("right-now-in") ) {
				return false;
			}
			else{
				console.log($(this).attr("id"));
				if($(data.target).attr("id") == "content-1"){
					$(".to-hide-content").css("display", 'flex');
				}
				else{
					$(".to-hide-content").css("display", 'none');
				}
				$("p.right-now-in").attr('class', "unstated");
				$("p.not-in").attr('class', 'right-now-in');
				$("p.unstated").attr("class", 'not-in');
			}
			
	})
	var togDateInClass = $(".row").find(".col-5").find("ul.content-buttons").find("li a");
	togDateInClass.on("click", function(data){
		if(data.target.classList.contains("right-now-in")){
			return false;
		}
		else{
			$("a.right-now-in").toggleClass('right-now-in')
			$(data.target).toggleClass("right-now-in")
			return false;
		}
	})
	console.table({togDateInClass})
	$("form.logs").on("submit", (event)=>{
		event.preventDefault();
	});
}(undefined))
