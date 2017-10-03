
$(function () {
    $.getJSON("vocabconfig.json",function(vocabconfig) {
     var vocabs = vocabconfig.vocabs;
     //get data for each vocab..
	$.each(vocabs, function(i, v) {
        //create a new empty table for the vocabulary
        var tableID = 'neiivocab'+i;
        //initialise table
        createTable(tableID,v[0]);
        var tableelem='#'+tableID;
        var tabledata=[];
        $(tableelem).bootstrapTable({
				data: tabledata
			});
        
        //get the terms for this table by parsing JSON via api
        handleJSON(v[1],tableID,tabledata);
		
	});
    
}); //end vocabConfig getJSON 

		
}); //end function


//iterative function to retrieve json, insert it into specified table, check for next json page
function handleJSON(jsonurl,tableID,tabledata){
    var urlToFetch=jsonurl;
    $.getJSON(urlToFetch,function(vocabjson) {
			var terms = vocabjson.result.items;
			//parse the individual terms into tabledata array one by one
			$.each(terms, function(i, term){
                var termdata = parseTerm(term);
				tabledata.push(termdata);
			});			
		    
			//pass tabledata to appropriate table 
			var tableelement='#'+tableID;
            $(tableelement).bootstrapTable('load',tabledata);

            //if there's another page of JSON defined as 'next' in the json response then call this handleJSON function again.
            //keeps looping till there is not 'next' value (i.e. the last JSON page has been reached).
            if (vocabjson.result.next){
                var nextURL=vocabjson.result.next;
		//need to use an https url for github pages    
		var nextURLSecure = nextURL.replace("http://", "https://");   
                handleJSON(nextURLSecure, tableID, tabledata);
                }
            
		});
    
};



//function to create a new vocab table with headers 
function createTable(tableID, tableTitle) {
	var tabID=tableID;
	var tabTitle=tableTitle;
	
	var heading=document.createElement("h2");
	heading.innerHTML = tabTitle;
    document.getElementById("vocab-div").appendChild(heading);
	
    var tab = document.createElement("table");
    tab.id=tabID;
    tab.class="table table-bordered";
    //table ordered by label
    tab.setAttribute("data-sort-name", "label");
    tab.setAttribute("data-sort-order", "asc");
    document.getElementById("vocab-div").appendChild(tab);
    
    var th=document.createElement('thead');
    var thid=tabID+"-th";
    th.id=thid;
    document.getElementById(tabID).appendChild(th);

    var tr = document.createElement("tr");
    var trid = tabID+"-tr";
    tr.id=trid;
    document.getElementById(thid).appendChild(tr);
    
    var header = document.createElement("th");
    header.setAttribute("data-field", "label");
    header.innerHTML = "Label"; 
    document.getElementById(trid).appendChild(header);
    
    var header = document.createElement("th");
    header.setAttribute("data-field", "description");
    header.innerHTML ="Description";
    document.getElementById(trid).appendChild(header);
    
    var header = document.createElement("th");
    header.setAttribute("data-field", "exactMatch");
    header.innerHTML ="Exact Match";
    document.getElementById(trid).appendChild(header);
    
    var header = document.createElement("th");
    header.setAttribute("data-field", "uri");
    header.setAttribute("data-formatter","linkFormatter");
    header.innerHTML ="URI";
    document.getElementById(trid).appendChild(header);
    
}

function parseTerm(term){
    //parse sissvoc json item into data structure for table
    var termURI = term._about;
    var termDefinition = term.definition;
    var termLabel= term.prefLabel._value;
    var termdata ={
        "value": "inactive",
        "label": termLabel,
        "description": termDefinition,
        "exactMatch": "",
        "uri": termURI
        };
    return termdata
};

function linkFormatter(value, row, index) {
  return "<a href='"+value+"'>"+value+"</a>";
}

