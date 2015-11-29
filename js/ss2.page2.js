// handler for adding a participant
$(function() {
      $("#addparticipantbtn").click( function()
           {
			   
			var pfname = $( "#pfname" ).val();
			if(!validateName(pfname))
				swal('Error','Please provide a First Name!');
			var plname = $( "#plname" ).val();
			if(!validateName(plname))
				swal('Error','Please provide a Last Name!');
			var pemail = $( "#pemail" ).val();
			if(!validateEmail(pemail))
				swal("Error",  "Please provide a valid Email!");
			var pwishi = $( "textarea#pwishi" ).val();
		    if(validateName(pfname) && validateName(plname) && validateEmail(pemail)){
				if(hasGroup()){
					if(isEmailUsed(pemail)){
						swal("Error",  "This email is already in use for another participant!");
					}
					else if(isNameUsed(pfname,plname)){
						swal("Error",  "A participant with exactly the same name already exists!");
					}
					else{
						addParticipant(pfname,plname,pemail,pwishi);
						setEmailCount(0,group.participants.length);
						swal("Success", "Participant "+pfname+" "+plname+ " added.", "success");
					}
				}
				else
					swal("Error",  "You must create a group first!");
		    }
           }
      );
});	

 function addPtoTable(p){
	/*var table = document.getElementById("participanttable");
    var row = table.insertRow(0);
	*/
	var target = document.getElementById("participanttableheadrow");
    var row = document.createElement('tr');
	row.style.cssText = "height: 10";
	
	row.height="10"
    var fnameCell = row.insertCell(0);
    var lnameCell = row.insertCell(1);
	var emailCell = row.insertCell(2);
	var wishlistCell = row.insertCell(3);
    fnameCell.innerHTML = p.fname;
    lnameCell.innerHTML = p.lname;
	emailCell.innerHTML = p.email;
	wishlistCell.innerHTML = p.wishlist;
	
	target.parentNode.insertBefore(row, target.nextSibling );
	$('.hide').css('height', '0');

 }
 
function AddAfter(rowId){
    
}