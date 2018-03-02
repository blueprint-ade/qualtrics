
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

function q_retrieve(key) {
	return Qualtrics.SurveyEngine.getEmbeddedData(key);
}

function q_embed(key, val) {
	Qualtrics.SurveyEngine.setEmbeddedData(key, val);
}