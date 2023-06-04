$(document).ready(function(){
  
  $( '#single-select-field' ).select2( {
    theme: "bootstrap-5",
    placeholder: 'Selecione um tipo'
} );
  $(window).on('load', async function() {
        $('#set-password').modal('show');
    });
  $('.cancel').on('click', async function() {window.location.href = '/'});
  $('.cancellogs').on('click', async function() {
  
  window.location.href = '/'});
  $('.cancellog').on('click', async function() {
  
  window.location.href = '/'});
  $('#forgotbut').on('click', async function() {
  $('#get-credentials').modal('show');
  });
  $('#adcbt').on('click', async function() {
  $('#adcs').modal("show")
  $('.collapse').collapse('hide')
  })
  $('#searchbar').on('keyup', async function() {
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
  });
  $('#length').on('input', async function() {
  this.previousElementSibling.value = this.value;
  
  })
});