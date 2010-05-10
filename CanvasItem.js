/**
 * @author rafael
 */



function CanvasItem(X,Y,W,H,color,track,scene,view) { 
    
    CanvasItem.superclass.call(this, X,Y,W,H); //call superclass constructor 
    
	this.itemColor = color;
	
	var defaultColor = color;
	
	var pen = new QPen(new QColor(61,61,61,180));
	var pen2 = new QPen(new QColor(150,200,240));
	pen2.setWidth(5);
	
	var self = this;
	
	var menu = null;
	
	var selectionCircle;
	
	var isSelected = false;
	
	var brush = new QBrush(this.itemColor);
	
	var scaleFactor = 0.9;
	
	this.clickedMe = false;
	
	pen.setWidth(1);
	
	this.setPen(pen);
	
	this.setBrush(brush);
	
	this.track = track;
	
	this.X = X;
	
	this.Y = Y;
	
	this.W = W;
	
	this.H = H;
	
	var scene = scene;
	
	var view = view;
	        
    this.setAcceptHoverEvents(true);
	
	this.infoRect = null;
	
	
    this.getTrack = function(){
    
		return this.track;
    }
	
	
	this.setPosition = function(x,y){
		
		
		this.setPos(x,y);
		this.X = x;
		this.Y = y;
	}
	
	this.setClickedMe = function(flag){
		
		this.clickedMe = flag;
	}
	
	
	
	this.getW = function(){
		
		return this.W;
	}
	
	this.getH = function(){
		
		return this.H;
	}
	
	this.getX = function(){
		
		return this.X;
	}
	
	this.getY = function(){
		
		return this.Y;
	}
	
	
	this.getScene = function(){
		
		return scene;
		
	}
	
	this.getView = function(){
		
		return view;
		
	}
	
		
    this.hoverEnterEvent = function(event){
    	
		if(!this.infoRect){
			
			this.infoRect = new InfoRect(parseInt(this.X+W),parseInt(this.Y-W),300,120,this);
		}
		
		this.infoRect.draw();
		
		this.setColor(new QColor(150,200,240));
		
		msg(this.ItemIsSelectable);
			
    }
	
	this.mousePressEvent = function(event){
		
		this.clickedMe = true;
		
		msg("clicou na bola");
		
	}
	
	this.hoverLeaveEvent = function(event){
		
			if (!this.clickedMe) {
				this.infoRect.remove();
			}
			
			this.setColor(defaultColor);
	}
	
	
	
	this.setColor = function(color){
		
		this.itemColor = color;
		
		brush.setColor(this.itemColor);
		
		this.setBrush(brush);
	}
	
	
	this.setSelected = function(flag){
	    
	    if(flag){
		
		this.isSelected = true;
		selectionCircle = new QGraphicsEllipseItem(this.X-1,this.Y-1,this.W+1,this.H+1);
		selectionCircle.setPen(pen2);
		selectionCircle.setZValue(2);
		scene.addItem(selectionCircle);
	    }
	    else{
		this.isSelected = false;
		if(selectionCircle){
		    msg("entrou");
		    scene.removeItem(selectionCircle);
		    selectionCircle = null;
		}
	    }
	}
	
	
	
	
}



extend(CanvasItem, QGraphicsEllipseItem); 