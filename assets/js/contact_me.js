$(function() {

    $("#iletisimformu input,#iletisimformu textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var site = $("input#site").val();
            var isim = $("input#isim").val();
            var eposta = $("input#eposta").val();
            var telefon = $("input#telefon").val();
            var adet = $("input#adet").val();
            var adres = $("textarea#adres").val();
            $.ajax({
                url: "http://mailer.dragoman-turkey.com/mailer",
                type: "POST",
                data: {
                    site: site,
                    isim: isim,
                    eposta: eposta,
                    telefon: telefon,
                    adet: '' + adet,
                    adres: adres
                },
                cache: false,
                success: function(data) {
                  console.log("SUCCESS",data)
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success')
                        .append("<strong>Siparişiniz iletildi. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#iletisimformu').trigger("reset");
                },
                error: function(data) {
                  console.log("ERROR",data)
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').append("<strong>Sipariş iletiminde bir sorun oluştu. Daha sonra tekrar deneyin lütfen.");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#iletisimformu').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#isim').focus(function() {
    $('#success').html('');
});

