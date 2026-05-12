jQuery.noConflict();
(function($) {
$( document ).ready(function() {
// andherewego.exe

/*******************************
// Foxycart / Gift Cards
*******************************/
$('#digital_info').hide();
$("#foxyform").validate({
	rules: {
		field: {
			required: true,
			notname: true,
			phoneUS: true,
			email: true
		}
	}
});
$('form.foxyform').each(function(key, form) {
	var validator = $(form).validate({
		submitHandler: function(form) {
			$('.reveal-modal').foundation('reveal', 'close');
			$('form').reset();
			$(form).ajaxsubmit();
			validator.resetForm();
		},
	});
});
$('#in_store, #usps_standard').click(function() {
	$('#in_store, #usps_standard, #digital_email').removeClass('active');
	$(this).addClass('active');
	if (this.checked) {
		if (document.getElementById('gift_delivery').checked) {
			$('#digital_info').show();
			$('#name_to').addClass("required");
			$('#name_from').addClass("required");
			$('#email_info').hide();
			$('#email_to').removeClass("required").val("");
		} else {
			$('#digital_info').hide();
			$('#name_to').removeClass("required").val("");
			$('#name_from').removeClass("required").val("");
			$('#email_info').hide();
			$('#email_to').removeClass("required").val("");
		}
	}
});
$('#digital_email').click(function() {
	$('#in_store, #usps_standard, #digital_email').removeClass('active');
	$(this).addClass('active');
	if (this.checked) {
		if (document.getElementById('gift_delivery').checked) {
			$('#digital_info').show();
			$('#email_info').show();
			$('#name_to').addClass("required");
			$('#name_from').addClass("required");
			$('#email_to').addClass("required");
		} else {
			$('#digital_info').hide();
			$('#email_info').hide();
			$('#name_to').removeClass("required").val("");
			$('#name_from').removeClass("required").val("");
			$('#email_to').removeClass("required").val("");
		}
	}
});
$('#gift_delivery').click(function() {
	if (this.checked) {
		if ($('#digital_email').hasClass('active')) {
			$('#digital_info').show();
			$('#email_info').show();
			$('#name_to').addClass("required");
			$('#name_from').addClass("required");
			$('#email_to').addClass("required");
		} else if ($('#in_store, #usps_standard').hasClass('active')) {
			$('#digital_info').show();
			$('#name_to').addClass("required");
			$('#name_from').addClass("required");
			$('#email_info').hide();
			$('#email_to').removeClass("required").val("");
		}
	} else {
		$('#digital_info').hide();
		$('#name_to').removeClass("required").val("");
		$('#name_from').removeClass("required").val("");
		$('#email_to').removeClass("required").val("");
	}
});



// end it all
});
})(jQuery);