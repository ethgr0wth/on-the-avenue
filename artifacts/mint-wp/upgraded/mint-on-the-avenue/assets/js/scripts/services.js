/*******************************
// Services
*******************************/
// $( ".loadtestimonials" ).click(function(e) {
//     (e).preventDefault();
// 	console.log('clicked');
//     var testcat = $(this).attr('href');
//     if (!$(this).hasClass('active')) {
//         $('.loadtestimonials').removeClass('active');
//         $(this).addClass('active');
//     }
//     if ($('body').hasClass('mobile')) {
//         $(testcat).foundation('reveal', 'open', {
//           animation: 'fade',
//           animation_speed: 300,
//         });
//     }
//     else {
//         if ($(testcat).is(":hidden"))  {    // you get the idea...
//             $('.testimonial-content').slideUp("fast");
//         }
//         $(testcat).slideDown( "slow", function() {});
//     }
// });

window.onload = () => {
	
	const btns = document.querySelectorAll('.loadtestimonials');
	const titles = document.querySelectorAll('.services-title')
	const btnContents = document.querySelectorAll('.testimonials');

	btns.forEach(btn => btn.addEventListener('click', e => {
		e.preventDefault();
		const test = e.target.closest('.loadtestimonials');
		titles.forEach(title => title.classList.remove('active'));
		if (test) {
			console.log(e.target)
			e.target.closest('.services-title').classList.add('active');
		}
		if (!test) return;
		location.hash = test.attributes[1].value;
		
		btnContents.forEach(cont => {
			cont.classList.remove('active');
			cont.style.display = 'none';
		});
		
		
		let targetCont = document.querySelector(test.attributes[1].value);
		targetCont.classList.add('active');
		targetCont.style.display = 'block';
	}));
	
}
