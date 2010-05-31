/**
 * @author rafael
 */

 
 
function _yamoCanvas(view){
			
	_yamoCanvas.superclass.call(this, view.sceneRect);
	
	
	this.view = view;			
	
	this.methodSelected = 0;
	
	this.items = new Array();
	
	this.selectedItems = new Array();
	
	var self = this;
	
	var posA, posB;
	
	this._addItem = function(item,addToArray){
	
	    if(addToArray)
		this.items.push(item);
	    
	    this.addItem(item);
	    
	
	}
	
	this._clear = function(){
	    
	    this.items.clear();
	    this.clear();
	
	
	}
	
	this.count = function(){
	    
	    return this.items.length;
	
	}
	
	
	this.wheelEvent = function(wheel){
				
		 if(this.methodSelected == 0){
		
		    if (wheel.delta() > 0) {
			    view.scale(1.1, 1.1);
		    }
		    else {
		    
			    view.scale(0.9, 0.9);
		    }
		}
		else if(this.methodSelected == 1){
		    
		    if(wheel.delta() > 0){
		    
			    for(var i = 0; i < this.items.length; i++){
				var item = this.items[i];
				item.setTransform((new QTransform()).translate(item.X + item.W/2, item.Y+item.H/2).scale(1.1, 1.1).translate(-(item.X + item.W/2), -(item.Y+item.H/2)),true);
			    }
		    
		    }
		    else{
			    
			    for(var i = 0; i < this.items.length; i++){
				var item = this.items[i];
				item.setTransform((new QTransform()).translate(item.X + item.W/2, item.Y+item.H/2).scale(0.9, 0.9).translate(-(item.X + item.W/2), -(item.Y+item.H/2)),true);
			    }
		    }
			    
		}
				    
	}
			
	
	this.mousePressEvent = function(event){
		/*
		msg("Mouse button pressed!");

		if(event.modifiers() & Qt.ShiftModifier)
			msg("Shift Hold!");
		else
			msg("No shift!");
		
*/
		if(event.modifiers() & Qt.ControlModifier ){
			
			view.dragMode = QGraphicsView.ScrollHandDrag;
		}
		else{
				
			view.dragMode = QGraphicsView.RubberBandDrag;
		}
		
		posA = QCursor.pos();
	
		
		
		
		
	}
	
	this.mouseReleaseEvent = function(event){

		if(event.modifiers() & Qt.ControlModifier ||event.modifiers() & Qt.ShiftModifier )
			view.dragMode = QGraphicsView.NoDrag;
		
		posB = QCursor.pos();
		
		msg(posA.toString());
		msg(posB.toString());
		
		if(posA.x() != posB.x() && posA.y() != posB.y()){
		    
			msg("Opening selection");

			this.getSelectedItems(event.modifiers() & Qt.ShiftModifier);
		
			msg("Selected items:");
		    if(this.selectedItems.length > 0)
				for(var i = 0; i < this.selectedItems.length; i++){
					msg("ID: "+this.selectedItems[i].track.getID().toString());

				}
		    
		}
	}
	
	this.getSelectedItems = function(shift_hold){

		if(!shift_hold){
			msg("Deselecting everybody!")
			deselectAll();
		}

	    var items = this.items;
    
		for(var i = 0; i < items.length; i++)
			if(this.selectionArea().intersects(items[i].boundingRect())){
				items[i].inverseSelection();
				if(items[i].isSelected)
					this.selectedItems.push(items[i]);
				else
					for(var j=0 ; j<this.selectedItems.length ; j++)
						if(this.selectedItems[j] == items[i])
							this.selectedItems.splice(j,1);
			}
	}
	
	function deselectAll(){
	    for(var i = 0; i < self.items.length; i++){
			self.items[i].setSelected(false);
	    }
	    
	    self.selectedItems.clear();
	    msg("Array cleaned!");
	}
	
			

}
extend(_yamoCanvas, QGraphicsScene);
