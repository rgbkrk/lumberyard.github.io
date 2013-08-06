jQuery(function() {

  jQuery('#request-invite').on('submit', function(ev) {
    ev.preventDefault()
    var email = jQuery('#email').val()
    var notice = jQuery('#notice').hide()

    success = function(data, success, xhr) {
      res = data
      
      if (res['status'] === 'OK') {
        notice.text("Thank you for your interest in the private beta. We'll contact you when you're invited.").show()
      }
      else if (res['status'] === 'EXISTS') {
        notice.text("Thank you, you've already requested an invite").show()
      }
    };

    error = function(xhr, msg, err) {
      notice.text("An error occured, please try again in a minute.").show()
    }

    jQuery.ajax(
      'http://pack-rat.herokuapp.com/submit', {
        data: 'email=' + escape(email),
        success: success,
        error: error,
        type: 'GET'
      }
    )
  })

})
