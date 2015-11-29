function setTargetAssignComplete(){
	$('#targetlbl').text('COMPLETE');
	document.getElementById("targetprog").value = "1";
}
function setEmailCount(i,tot){
	$('#emaillbl').text(i+'/'+tot);
	document.getElementById("emailprog").value = 100*i/tot;
}
function setStatus(status){
	$('#statuslbl').text(status.toUpperCase());

}

$(function() {
      $("#sendmailbtn").click( function()
           {
				if(!hasGroup()){
					swal("Error",  "You must create a group and add participants first.");
				}
				else if(!hasParticipants()){
					swal("Error",  "You need at least 2 participants.");
				}
				else if(sesh.mailssent){
					swal("Error",  "You already did that. There's no need in doing it twice! Refresh this page to start a new group.");
				}
				else{
					group.notify();
				}
			}
      );
});	