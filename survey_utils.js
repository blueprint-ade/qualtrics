
var j$ = jQuery.noConflict();

function embed_radio_value(qid, radio_choices, key) {
		
	var radio_in = j$("#" + qid).find("input:radio");
	
	radio_in.on("click", function() {
		
		console.log(this);
		
		x = radio_choices[this.value].Display;
		q_embed(key, x); 
		
		console.log(q_retrieve(key));
		
	});

}

function embed_radio_value(qid, radio_q, key) {
	
	var radio_val = "None";
	var radio_in = j$("#" + qid).find("input:radio");
	
	radio_in.on("click", function() {
		
		console.log(this)
		
	});
	
	
	
}

function q_retrieve(key) {
	return Qualtrics.SurveyEngine.getEmbeddedData(key);
}

function q_embed(key, val) {
	Qualtrics.SurveyEngine.setEmbeddedData(key, val);
}