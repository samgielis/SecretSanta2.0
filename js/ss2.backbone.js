/*
	STATE
*/
 var sesh = new Session();
 var group;
 
 function Session(){
	 
	this.groupcreated = false;
	this.mailssent = false;
 }

 
/*
	STATE MODIFIERS
*/
 function startGroup(pmin, pmax, hostmail,infotext, currency){
	 group = new Group(pmin, pmax, hostmail,infotext,currency);
	 sesh.groupcreated = true;
	 
 }
  function addParticipant(fname, lname, email, wishlist){
	 if(!sesh.groupcreated)
		 return false;
	 else{
		 var newp = new Participant(fname, lname, email, wishlist);
		 group.addP(newp);
		 addPtoTable(newp);
		 return true;
	 }
 }
 
 
 
/*
	STATE CHECKS
*/
 function hasGroup(){
	 return sesh.groupcreated;
 }
 
 function hasParticipants(){
	 return group.participants.length >= 2;
 }
 
 function isEmailUsed(email){
	for(var i = 0; i < group.participants.length; i++){
		if(group.participants[i].email == email)
			return true;
	}
	return false;
	 
 }
 function isNameUsed(fname,lname){
	for(var i = 0; i < group.participants.length; i++){
		if(group.participants[i].fname == fname && group.participants[i].lname == lname)
			return true;
	}
	return false;
	 
 }
 
 
 
 
 
/*
	PARTICIPANTS
*/
 function Participant(fname, lname, email, wishlist){
	
	this.fname = fname;
	this.lname = lname;
	this.email = email;
	this.wishlist = wishlist;

}



/*
	GROUPS
*/
function Group(pmin, pmax, hostmail, infotext, currency){
	
	this.pmin = pmin;
	this.pmax = pmax;
	this.hostmail = hostmail;
	this.infotext = infotext;
	this.participants = [];
	this.targets = undefined;
	this.currency = currency;
}

Group.prototype.addP = function(p){
	this.participants.push(p);
}

Group.prototype.notify = function(){
	
	setStatus("ASSIGNING TARGETS...");
	this.targets = createPermutation(this.participants);
	setTargetAssignComplete();
	setStatus("TARGETS ASSIGNED!");
	
	for(var i = 0; i < this.participants.length; i++){
		setStatus("SENDING EMAIL NOTIFICATION TO "+this.participants[i].fname+" "+this.participants[i].lname+".");
		
		sendEmail(this.participants[i],this.targets[i],this);
		setEmailCount(i+1,group.participants.length);
	}	
	setStatus("MISSION COMPLETE!");
	swal("Success", "All participants have been assigned a target and should have received a notification with the necessary information. I would personally like to wish you the best of luck with your hunt and hope you and your group will have a very, merry Christmas! Cheers, Sam Gielis.", "success")
	sesh.mailssent = true;
}



/*
	PERMUTATION
*/
function createPermutation(array){
	
	var arrayNew = array.slice(0);
	do {
		for (var i = arrayNew.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = arrayNew[i];
			arrayNew[i] = arrayNew[j];
			arrayNew[j] = temp;
		}
	}
	while (!isValidPermutation(array,arrayNew));
	
    return arrayNew;
}

function isValidPermutation(a,b){
	for(var i = 0; i < a.length; i++){
		if(a[i] == b[i])
			return false;
	}
	return true;
}




/*
	MAILING
*/
function sendEmail(p, t, group){
	
	$.ajax({
	  type: "POST",
	  url: "https://mandrillapp.com/api/1.0/messages/send.json",
	  data: {
		'key': '1E050dv5lK4LBsoEI4huRA',
		'message': {
		  'from_email': 'secretsanta2point0@gmail.com',
		  'to': [
			  {
				'email': p.email,
				'name': p.fname + " "+p.lname,
				'type': 'to'
			  },
			],
		  'autotext': 'true',
		  'subject': 'Your Secret Santa target is...',
		  'html': getMailText(p,t,group)
		}
	  }
	 }).done(function(response) {
	   console.log(response); // if you"re into that sorta thing
	 });
	
}

function getMailText(p,t,group){
	var mailtext="<p>Hey, "+ p.fname+"!</p>"+"<p>You are participating in a Secret Santa event this year, yay! Somebody asked us to assign a target to you, and so we did! Here's what you should know:";
	mailtext+= "Your target is <b>"+t.fname+" "+t.lname+"</b>! There is a minimum budget of <b>"+group.pmin+" "+group.currency+ "</b> and a maximum budget of <b>"+group.pmax+" "+group.currency+ "</b>. ";
	if(t.wishlist != undefined){
		mailtext+= "A little birdy told us your target would like the following things: </p>";
	    mailtext+= "<p>"+t.wishlist	+"</p>";
	}
	else
		mailtext+="</p>";
	mailtext+= "<p> Not sure what this is all about? Contact "+group.hostmail+". This person is acting as the host of your Secret Santa event.";
	if(group.infotext != undefined){
		mailtext+="Your host also added the following general information: </p>";
		mailtext+= "<p>"+group.infotext+"</p>";
	}
	else
		mailtext+="</p>";	
	mailtext+= "<p> That's it! We hope you'll have a great time looking for and being suprised with a perfect present! Merry Christmas!</p>";
	mailtext+= "<p></p>";
	mailtext+= "<p>Sam Gielis</p>";
	mailtext+= "<p>Find Secret Santa 2.0 at https://github.com/samgielis/SecretSanta2.0</p>";
	return mailtext;
}
