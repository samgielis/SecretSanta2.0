$(function() {
      $("#creategroupbtn").click( function()
           {
			  
			var gemail = $( "#gemail" ).val();
			if(!validateEmail(gemail))
				swal("Error",  "Please provide a valid host Email!");
			
			var gmessage = $( "#gmessage" ).val();
			
			var gminp = parseInt($( "#gminp" ).val());
			var gmaxp = parseInt($( "#gmaxp" ).val());
			if(isNaN(gminp))
				swal('Error',"You should provide a minimum budget.");
			if(isNaN(gmaxp))
				swal('Error',"You should provide a maximum budget.");
			if(gminp > gmaxp)
				swal('Error',"Your minimum exceeds your maximum... there's no logic in that man!");
			if(gminp < 0)
				swal('Error',"There's no logic in having a minimum below 0...");
			
			var gcurrency = $( "#gcurrency" ).val();
			if(gcurrency.length < 2)
				swal('Error',"Please select one of the provided currencies.");
			
			
		    if(isFormP1Valid(gemail,gminp,gmaxp,gcurrency)){
				if(hasGroup()){
					swal({   title: "Warning",   text: "You have already provided this information, do you want to update it?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, change it!",   closeOnConfirm: false }, function(){   startGroup(gminp, gmaxp, gemail,gmessage, gcurrency); swal("Information updated", "Your group information has been updated.", "success"); });
				}
				else{
					startGroup(gminp, gmaxp, gemail,gmessage, gcurrency);
					swal("Success",  "Your group has been created!");
				}
		    }
           }
      );
});	

function isFormP1Valid(gemail,gminp,gmaxp,gcurrency){
	return validateEmail(gemail) && !isNaN(gmaxp) && !isNaN(gminp) && gminp <= gmaxp && gminp >= 0 && gcurrency.length >= 2;

}	