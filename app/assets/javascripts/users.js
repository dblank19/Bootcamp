$(document).ready(function() {
    
    Stripe.setPublishableKey($('meta[name="stripe_key"]').attr('content'));
    
    $('pro_submit_btn').click(function(event) {
        event.preventDefault();
        $('input[type=sumbit]').prop('disabled', true);     //This disables the submit button to prevent the user pressing it multiple times
        var error  = false;
        var ccNum = $("#card_number").val(),
            cvcNum = $('#card_code').val(),
            expMonth = $("#card_month").val(),
            expYear = $("#card_year").val();
            
        if (!error) {
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear,
            }, stripeResponseHandler);
        }
        return false;
    });
    
    function stripeResponseHandler(status, response) {
        var f = $("#new_user");
        var token = response.id;
        
        f.append('<input> type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        
        f.get(0).sumbit();
    }
});