$(function() {
    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
    
        // Serialize the form data.
        var formData = $(form).serialize();
        // Submit the form using AJAX.
       
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error-message');
            $(formMessages).addClass('sent-message');
        
            // Set the message text.
            $(formMessages).text(response);
        
            // Clear the form.
            $('#contact-name').val('');
            $('#contact-email').val('');
            $('#contact-subject').val('');
            $('#contact-message').val('');
        }).fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('sent-message');
            $(formMessages).addClass('error-message');
        
            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text('Done' + data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});

