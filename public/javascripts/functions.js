async function cancel () {
window.location.href = '/';
}
async function lostpass (){ 
		$('#get-credentials').modal('show');
	};
async function adcsen () {
$('#adcs').modal("show")
$('.collapse').collapse('hide')
}
async function remv() {
$('#adcs').toggle('hide')
}
async function sub () {
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
  $('.cancel').addEventListener("click", window.location.href = '/');
  $('.cancellogs').addEventListener("click", window.location.href = '/');
});


async function account () {
window.location.href = '/dashboard/account'

}
async function search() {
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