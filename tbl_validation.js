



function add_please(qid) {
		
		//Initialize the hidden #please div
		j$("<p id = 'please' style = 'display:none;color : red; font-size:110%;margin-left:20%'>" +
		   "Please answer all questions before proceeding</p>")
			.prependTo(j$("#Plug"));
		
		//Add show / hide event listeners	
		j$( "div.QuestionBody" ).bind({
		
		//When the cursor leaves the question body
		  mouseleave: function() {
			  //If answers are valid
			  if(check_val(qid)==0){
				//Show the validation prompt
				j$("#please").fadeIn("fast")
					.css("display", "inline-block");	
			  }
		//When the cursor reenters the question body
		  }, mouseenter: function() {
			  //Hide the validation prompt
			  j$("#please").fadeOut("slow");
		  }
		});
		
		console.log("please added");
	}

function add_radio_click(qid, radio_q, arr_val) {
	

	var text_in   = j$("#" + qid).find("input:text");
	var radio_in = j$("#" + qid).find("input:radio");
	
	radio_in.on("click", function() { 
	  
	  var ind = j$(this).data("index");
	  console.log(this.id);
	  console.log("validation array: ", arr_val);
	
	  var locs = parse_id(this.id);
	  console.log(locs);	
	  console.log(text_in[locs.choice]);
	  
	  j$(text_in[locs.choice -1]).val("");
		
	  console.log(ind, locs.ans, ind / locs.ans, Math.floor(ind / locs.ans), ind - locs.ans);

	  arr_val[Math.ceil((ind - locs.ans + 1)/2)] = 1;
	  console.log(arr_val);
	  check_arr(arr_val, qid);
	  
	}).each(function (idx) {j$(this).data('index', idx)});
	
	console.log("radio clicks added");
	
}

function add_text_input(qid, radio_q, arr_val, cols, qst_a, qst_b) {

	var text_in  = j$("#" + qid).find("input:text");
	
	text_in.on("change paste keyup", function() {
	  var ind = j$(this).data("index");
	  var locs = parse_id(this.id);
	  
	  if(cols === 4) {
		var radio_q = four_col_qst(ind, qst_a, qst_b)
	  }
	  
	  console.log(locs);
	  
	  radio_q.Choices[locs.choice].Selected = false;
	  
	  if(j$(this).val() == "") {
		arr_val[ind] = 0;
		check_arr(arr_val)
	  } else {
		arr_val[ind] = 1;
		check_arr(arr_val)
	  }
	
	}).each(function (idx) {j$(this).data('index', idx)});
}

function array_init(len, val) {
	return Array.apply(null, Array(len)).map(Number.prototype.valueOf,val);
}

function check_arr(arr_val, qid) {
	
	var valid = (arr_val.reduce(function(a,b) {return a + b})) == arr_val.length;
	console.log("validation array: ", arr_val);
	if(valid) {
		j$("#NextButton").fadeIn("fast");
		q_embed(qid + "_VAL", 1);
	} else {
		j$("#NextButton").fadeOut("fast");
		q_embed(qid + "_VAL", 0);
	}
	
	return(valid);

}
	
function check_val(qid) {
	return q_retrieve(qid + "_VAL");	
}

function four_col_qst(ind, qst_a, qst_b) {

	var qst = ind % 2 === 0?qst_a:qst_b;
	
	return qst
	
}

function hide_el(element) {
	if($(element)) $(element).hide();
}  

function parse_id(input_id) {
  
  var locs = input_id.split("#")[1].split("~");
  var qp = {
	  sub : locs[0],
	  choice : locs[1],
	  ans : locs[2]
  }
  
  return qp
}

function q_retrieve(key) {
	return Qualtrics.SurveyEngine.getEmbeddedData(key);
}

function q_embed(key, val) {
	Qualtrics.SurveyEngine.setEmbeddedData(key, val);
}


function tbl_val(q_obj, cols = 2) {
	var that = q_obj;
	var j$ = jQuery.noConflict();
	var qid = that.getQuestionInfo().QuestionID;
	var text_in = j$("#" + qid).find("input:text");
	var radio_in = j$("#" + qid).find("input:radio");
	var text_q = that.question.runtime.Children["1"];
	var radio_q = that.question.runtime.Children["2"]; 
	var arr_val = array_init(text_in.length, 0);
	
	if(cols == 4) {
		var qst_a = that.question.runtime.Children[3];
		var qst_b = that.question.runtime.Children[4];
		
		console.log("qst_a: ", qst_a);
	}

	if(check_val(qid) == 1) {
		arr_val = array_init(text_in.length, 1);
	} else {
		hide_el('NextButton');
		arr_val = array_init(text_in.length, 0);
	}

	console.log(qid);
	console.log(radio_in);	
	
	console.log(arr_val);

	add_please(qid);

	add_radio_click(qid, radio_q, arr_val);

	add_text_input(qid, radio_q, arr_val, cols, qst_a, qst_b);
	
}