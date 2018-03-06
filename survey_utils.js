
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
	
	
	
	check_in.on("change", function() {
		
		target_array = choice_array.map(function(x) {return [x.Display.toLowerCase().replace(/ /g, "_"), x.Selected]})
		
		target_array.map(function(x) { q_embed(x[0], x[1]) });
		
		response_array = target_array.map(function(x) { return q_retrieve(x[0]) })
		
		console.log("embedded names", target_array.map(function(x) {return x[0]}));
		console.log("embedded values", response_array);
		
	});  
	
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


