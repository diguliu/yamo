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
		    
		    msg("abriu selecao...");
		   
		   this.getSelectedItems();
		
		
		    if(this.selectedItems.length > 0){
			for(var i = 0; i < this.selectedItems.length; i++){
			    msg("ID: "+this.selectedItems[i].track.getID().toString());
			
			}
		    
		    }
		    
		    msg(this.selectedItems.toString());
		
		}
		else{
		    if(this.selectedItems.length > 0)
			deselectAll();
		    
		    if(this.selectedItems.length == 0) msg("nenhum item selecionado");
		}
		
		
		
					
	}
	
	this.getSelectedItems = function(){
	    
	    
	    var items = this.items;
    
	    for(var i = 0; i < items.length; i++){
		
		if(this.selectionArea().intersects(items[i].boundingRect())){
		    
		    items[i].setSelected(true);
		    this.selectedItems.push(items[i]);
		    msg("achou");
		
		}
	    
	    } 
	    
	
	}
	
	function deselectAll(){
	    msg("entrou em deselect all");
	    for(var i = 0; i < self.items.length; i++){
		msg("loop");
		self.items[i].setSelected(false);
	    
	    }
	    
	    self.selectedItems.clear();
	    msg("limpou array");
	}
	
			

}
extend(_yamoCanvas, QGraphicsScene);