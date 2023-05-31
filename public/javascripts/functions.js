function cancel () {
window.location.href = '/';
}
function lostpass (){ 
		$('#get-credentials').modal('show');
	};
function adcsen () {
$('#adcs').modal("show")
$('.collapse').collapse('hide')
}
function remv() {
$('#adcs').toggle('hide')
}
 function sub () {
$('submit').on('click', trigger('submit'))
};
$(document).ready(function(){
  
  $( '#single-select-field' ).select2( {
    theme: "bootstrap-5",
    placeholder: 'Selecione um tipo'
} );
  $(window).on('load', function() {
        $('#set-password').modal('show');
    });
});


function account () {
window.location.href = '/dashboard/account'

}
function search() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.querySelectorAll('.collapsestuff');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerText.toLowerCase().includes(input)) {
            x[i].style.visibility="hidden";
        }
        else {
            x[i].style.visibility="visible";                 
        }
    }
}
function checkboxescheck (form) {
  if (
    form.form-check-input.checked == false) 
    {
        alert ('É necessário selecionar ao menos um campo.');
        return false;
    } else {    
        return true;
    }
}