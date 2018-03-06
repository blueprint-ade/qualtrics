
var j$ = jQuery.noConflict();

function embed_radio_value(q_obj, radio_choices, key) {
	
	var qid = q_obj.getQuestionInfo().QuestionID;
	
	var radio_in = j$("#" + qid).find("input:radio");
	
	radio_in.on("click", function() {
		
		console.log(this);
		
		x = radio_choices[this.value].Display;
		q_embed(key, x); 
		
		console.log(q_retrieve(key));
		
	});

}

function embed_text_value(q_obj, key) {
	
	var qid = q_obj.getQuestionInfo().QuestionID;
	
	var text_in  = j$("#" + qid).find("input:text");
	
	text_in.on("change paste keyup", function() {
	   
		console.log(j$(this).val());
		q_embed(key, j$(this).val());
		
		console.log(q_retrieve(key));
	
	})

}

function embed_gender_sf(q_obj, key) {
	
	var qid = q_obj.getQuestionInfo().QuestionID;
	
	var text_in  = j$("#" + qid).find("input:text");
	
	var x = ""
	
	text_in.on("change paste keyup", function() {
	   
		console.log(j$(this).val());
		
		x = j$(this).val();
		if(x == "Other <em>(please write in)</em>:") {
			x = "Other";
		}
		
		q_embed(key, j$(this).val());
		
		console.log(q_retrieve(key));
	
	})

}

function embed_text_exists(q_obj, key) {
	
	var qid = q_obj.getQuestionInfo().QuestionID;
	
	var text_in  = j$("#" + qid).find("input:text");
	
	text_in.on("change paste keyup", function() {
	   
		console.log(j$(this).val());
		
		if(j$(this).val() != "") {
			q_embed(key, true);
		}
		console.log(q_retrieve(key));
	
	})

}


function select_all_boolean(q_obj) {
	
	var qid = q_obj.getQuestionInfo().QuestionID;
	
	var check_in  = j$("#" + qid).find("input:checkbox");
	var choices   = q_obj.question.runtime.Choices;
	var choice_array = Object.keys(choices).map(i => choices[i]);
	
	var target_array = choice_array.map(function(x) {return [x.Display, x.Selected]});
	target_array.map(function(x) { q_embed(x[0], x[1]) });
	
	var response_array = []
	
	
	check_in.on("change", function() {
		
		target_array = choice_array.map(function(x) {return [x.Display.toLowerCase().replace(/ /g, "_"), x.Selected]})
		
		target_array.map(function(x) { q_embed(x[0], x[1]) });
		
		response_array = target_array.map(function(x) { return q_retrieve(x[0]) })
		
		console.log("embedded names", target_array.map(function(x) {return x[0]}));
		console.log("embedded values", response_array);
		
	});  
	
}


function calendar_picker(q_obj) {
	
	When did you start this job? <i>If you don't know the exact day, please give your best guess.</i><br><br>

<link href="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/calendar/assets/skins/sam/calendar.css" rel="stylesheet" type="text/css"/><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/yahoo-dom-event/yahoo-dom-event.js"></script> <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/calendar/calendar-min.js"></script> <script>Qualtrics.SurveyEngine.addOnload(function(){var qid =this.questionId;var calid = qid +'_cal';var y =QBuilder('div');
  $(y).setStyle({clear:'both'});var d =QBuilder('div',{className:'yui-skin-sam'},[QBuilder('div',{id:calid}),
    y
  ]);var c =this.questionContainer;
  c = $(c).down('.QuestionText');
  c.appendChild(d);var cal1 =new YAHOO.widget.Calendar(calid); 
  cal1.render();var input = $('QR~'+ qid);
  $(input).setStyle({marginTop:'20px',width:'150px'});var p =$(input).up();var x =QBuilder('div');
  $(x).setStyle({clear:'both'});
  p.insert(x,{position:'before'});
    cal1.selectEvent.subscribe(function(e,dates){var date = dates[0][0];if(date[1]<10)
        date[1]='0'+ date[1];if(date[2]<10)
        date[2]='0'+ date[2];
  
    input.value = date[2]+'/'+date[1]+'/'+date[0];})});</script>
	
}


function embed_pay_schedule(q_obj, key) {
	
	var radio_choices = q_obj.question.runtime.Children[2].Answers;
	
	embed_radio_value(q_obj, radio_choices, key);

	
}


function q_retrieve(key) {
	return Qualtrics.SurveyEngine.getEmbeddedData(key);
}

function q_embed(key, val) {
	Qualtrics.SurveyEngine.setEmbeddedData(key, val);
}


