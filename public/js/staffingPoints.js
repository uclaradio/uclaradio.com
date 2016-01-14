var timeLastSubmitted;

$(document).ready(function() {
	$('form#staffing-points').submit(function(e) {
		e.preventDefault();
		$.post( $(this).attr('action'), $('form#staffing-points').serialize(), function(data) {
			$('#submissionStatus h3').empty();
			$('#submissionStatus h3').append(data);
			$('form#staffing-points input').val('');
			$('form#staffing-points textarea').val('');
		});
	});
});
