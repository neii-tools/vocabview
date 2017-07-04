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
	var vocabs=getVocabList();
	//for each vocab..
	$.each(vocabs, function(i, v) {
		//get json from sissvoc and parse
		console.log(v[1]);
		$.getJSON(v[1],function(vocabjson) {
			var terms = vocabjson.result.items;
			var tabledata=[];
			//parse the individual terms into tabledata
			$.each(terms, function(i, term){
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
				tabledata.push(termdata);
				
				console.log(termLabel);
				console.log(termURI);
				console.log(termDefinition); 
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
	
});


function getVocabList(sissvoc){
	//hardcoded for now but could come from a config file
	var vocabs = [["NEII Licensing","http://vocabs.ands.org.au/repository/api/lda/neii/neii-licencing/version-1/concept.json"],
	["NEII Observed Property","http://vocabs.ands.org.au/repository/api/lda/neii/neii-observed-property/version-1/concept.json"]];
	return vocabs;

};


//function to create a new vocab table with headers 
function createTable(tableID, tableTitle) {
	var tabID=tableID;
	var tabTitle=tableTitle;
	
	var heading=document.createElement("h2");
	heading.innerHTML = tabTitle;
    document.getElementById("vocab-div").appendChild(heading);
	
    var tab = document.createElement("table");
    tab.setAttribute("id", tabID);
    tab.setAttribute("class", "table table-bordered");
    document.getElementById("vocab-div").appendChild(tab);
    
    var th=document.createElement('thead');
    var thid=tabID+"-th";
    th.setAttribute("id", thid);
    document.getElementById(tabID).appendChild(th);

    var tr = document.createElement("TR");
    var trid = tabID+"-tr";
    tr.setAttribute("id", trid);
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
