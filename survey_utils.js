
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
	
	});

}

function embed_gender_sf(q_obj, key) {
	
	var qid = q_obj.getQuestionInfo().QuestionID;
	
	var radio_in  = j$("#" + qid).find("input:radio");
	var radio_choices =q_obj.question.runtime.Choices;
	
	var x = ""
	
	radio_in.on("click", function() {
	   
		
		x = radio_choices[this.value].Display;
		if(x == "Other <em>(please write in)</em>:") {
			x = "Other";
		}
		
		q_embed(key, x);
		
		console.log(q_retrieve(key));
	
	});

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
	
	});

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

function count_jobs(q_obj) {

	var radio_in = radios(q_obj);
	var num_jobs = 0;
	radio_in.on("click", function() {
		
		q_embed("num_jobs", this.value);
		
	});
	
}


function zero_job(q_obj, job_num) {

	var qid = q_obj.getQuestionInfo().QuestionID;
	var keys = ["JobStart" + job_num, "JobTitle" + job_num, "num_jobs"];
	var num_jobs = q_retrieve("num_jobs")
	
	var job = {
		start : q_retrieve(keys[0]),
		title : q_retrieve(keys[1])
	}
	var x, s, t = "";
	
	var radio_in = jQuery("#" + qid).find("input:radio");
	var radio_choices = q_obj.question.runtime.Choices;
	
	console.log(q_obj.question.runtime);
	
	radio_in.on("click", function() {
		
		x = radio_choices[this.value].Display;
		
		s = x == "No"?"":job.start;
		t = x == "No"?"":job.title;
		n = x == "Yes"?num_jobs : num_jobs - 1;
		q_embed(keys[0], s);
		q_embed(keys[1], t);
		q_embed(keys[2], n);
		
		console.log(keys.map(q_retrieve));

		
	});
	
}

function get_qid(q_obj) {
	
	return q_obj.getQuestionInfo().QuestionID;	
}

function radios(q_obj) {
	
	var qid = get_qid(q_obj);
	
	return jQuery("#" + qid).find("input:radio");
	
}

function decrement_numjobs() {

	q_embed("num_jobs", Math.max(q_retrieve("num_jobs") - 1, 0));

}

function increment_fun() {
	
	var x = q_retrieve("FollowUp");
	console.log("follow-up", x);
	console.log("next", +x + 1);
	if(typeof x === 'undefined') {
		x = 0
	}
	
	q_embed("FollowUp", +x  + 1);
	console.log("real", +x + 1);

}
