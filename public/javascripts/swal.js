const swal = require('sweetalert2')


	$(document).ready(function () {
		if (alertistrue === true) {
			swal.default.fire(alerttitle, alertMessage, "error");
		}
})