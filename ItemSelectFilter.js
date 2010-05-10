/**
 * @author rafael
 */

 
 function ItemSelectFilter(type){
 	
	
	var type = type;
	
	this.tagName;
	this.color;
	
	this.value;
	
	this.id;
	
	this.widget;
	
	if (type == 1) {
		
		this.widget = loadWidget("ItemSelectFilter.ui", this);
	}
	else if(type == 2){
		this.widget = new QCheckBox();
		
	}
	this.setLabel = function(label){
		
		if (type == 1) {
		
			this.widget.chkBox.text = label;
		}
		else if(type == 2){
			
			this.widget.text = label;
		}
		this.tagName = label;
	}
	
	this.setColor = function(color){
		
		this.color = color;
	}
	
	this.setValue = function(value){
		
		this.value = value;
	}
	
	this.setID = function(id){
		
		
		this.id = id;
	}
	
	
	
	
 }
 
