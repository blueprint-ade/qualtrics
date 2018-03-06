Qualtrics.SurveyEngine.addOnload(function()
{
  
  //Set years you would like to have available 
  
  var yearFirst = 1985; //min is 1985
  var yearLast = 2005; //max is 2005
  
  //This remains unchanged
  var qid=this.questionId;
  var mo=document.getElementsByName('QR~'+qid+'~1')[0];
  var day=document.getElementsByName('QR~'+qid+'~2')[0];
  var yr=document.getElementsByName('QR~'+qid+'~3')[0];
  
  var mos=mo.getElementsByTagName("option");
  var days=day.getElementsByTagName("option");
  var yrs=yr.getElementsByTagName("option");
  
  var full_date = new Date();
	
  //hide impossibles
  for(i=13;i<=150;i++)
  {
    mo.removeChild(mos[13]);
  }
  for(i=32;i<=150;i++)
  {
    day.removeChild(days[32]);
  }
  var j = yearLast-1898;
  for(i=j;i<151;i++)
  {
    yr.removeChild(yrs[j]);
  }
  
  for(i=1;i<=yearFirst-1900;i++)
  {
    yr.removeChild(yrs[1]);
  }
  
  function fixer()
  {
    day.options[29].disabled=0;
    day.options[30].disabled=0;
    day.options[31].disabled=0; 
	
	
	console.log(mo.selectedIndex, day.selectedIndex);
	  
	 console.log(yrs[yr.selectedIndex].innerHTML);
	  
	  full_date.setFullYear(yrs[yr.selectedIndex].innerHTML);
	  full_date.setMonth(mo.selectedIndex - 1);
	  full_date.setDate(day.selectedIndex);
	  
	  
	  Qualtrics.SurveyEngine.setEmbeddedData("full_high_edu_end", full_date.toLocaleDateString());
	  var test = Qualtrics.SurveyEngine.getEmbeddedData("full_high_edu_end");
	  
	  console.log(test);
	  
    if(mo.selectedIndex==2||mo.selectedIndex==4||mo.selectedIndex==6||mo.selectedIndex==9||mo.selectedIndex==11){
      day.options[31].disabled=1;
      if(day.selectedIndex==31){day.selectedIndex=30};
      if(mo.selectedIndex==2)
      {
        day.options[30].disabled=1;
        if(day.selectedIndex==30){day.selectedIndex=29};                      
        if(parseInt(yr.options[yr.selectedIndex].innerHTML,10)%4!=0)
        {
          day.options[29].disabled=1;
          if(day.selectedIndex==29){day.selectedIndex=28}; 
        }
        else
        {
          day.options[29].disabled=0;
        }
      }
    }    
  }
	day.onchange=function() {fixer();}
  yr.onchange=function(){fixer();};
  mo.onchange=function(){fixer();};
});