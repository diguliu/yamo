/**
 * @author rafael
 */

 
 function TagFilterContainer(rect){
 	
	
		
		var container = new QGraphicsScene(rect);
		
		
		var tagFilterItems = new Array();
		
		
		var count = 0;
		
		this.addItem = function(item){
		
			count++;
			
			tagFilterItems.push(item);
			
			
			container.sceneRect = new QRectF(0, 0, 240, count * 40);
			
			
			item.widget.setGeometry(1, (count-1) * 40, 240, 40);
			
			container.addWidget(item.widget);
			
			
		}
		
		this.removeAll = function(){
		
		
			container.clear();
			tagFilterItems.clear();
			
			count = 0;
			
			
		}
		
		this.getItems = function(){
		
		
			return tagFilterItems;
		}
		
		this.getItem = function(index){
		
		
			return tagFilterItems[index];
		}
		
		this.count = function(){
		
		
			return count;
		}
		
	
		this.getScene = function(){
			return container;
		}
 }
 
 
