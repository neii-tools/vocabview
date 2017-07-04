var data = [
    {
        "value": "active",
        "label": "The site is active.",
        "description": "The site is active",
        "exactMatch": "",
        "uri": "http://neii.gov.au/vocabularies/nemsr/siteStatus/active"
    },
    {
        "value": "inactive",
        "label": "The site is inactive.",
        "description": "The site is inactive",
        "exactMatch": "",
        "uri": "http://neii.gov.au/vocabularies/nemsr/siteStatus/inactive"
    },
    {
        "value": "decommissioned",
        "label": "The site has been decommissioned.",
        "description": "The site has been decommissioned",
        "exactMatch": "",
        "uri": "http://neii.gov.au/vocabularies/nemsr/siteStatus/decommissioned"
    }
];

$(function () {
    $.getJSON("vocabconfig.json",function(vocabconfig) {
     var vocabs = vocabconfig.vocabs;
     //get data for each vocab..
	$.each(vocabs, function(i, v) {
		//get json from sissvoc and parse
		$.getJSON(v[1],function(vocabjson) {
			var terms = vocabjson.result.items;
			var tabledata=[];
			//parse the individual terms into tabledata one by one
			$.each(terms, function(i, term){
                var termdata = parseTerm(term);
				tabledata.push(termdata);
			});			
		    
			//create a new empty table for the vocabulary
			var tableID = 'neiivocab'+i;
			createTable(tableID,v[0]);

            
			//pass tabledata to new table
			var tableelem='#'+tableID;
			$(tableelem).bootstrapTable({
				data: tabledata
			});
		});
		
	});
    
    //then create the vocab tables
 
    
}); //end getJSON 
		
}); //end function



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
    header.innerHTML ="Label";
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

