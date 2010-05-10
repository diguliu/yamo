/**
 * @author rafael
 */

 
 
 function tagValueProgressBar(tagID,value,trackID,parent){
 	
	
	tagValueProgressBar.superclass.call(this);
	
	
	this.tagID = tagID;
	this.value = value;
	this.trackID = trackID;
	
	
	var self = this;
	
	var opMenu = new QMenu();
	
	var actionMod =  opMenu.addAction("Modify Value");
	var actionDel = opMenu.addAction("Delete");
	
	actionMod.triggered.connect(function(){
		
		
		var dialogModify = new DialogModifyValue(self.trackID,self.tagID,self);
		
		
	});
	
	actionDel.triggered.connect(function(){
		
		unTagMusic(trackID,tagID);
		
		parent.showMusicTagRatings(trackID);
		
	});
	
	
	opMenu.leaveEvent = function(){
		
		this.hide();
	}
	
	this.getTag = function(){
		
		return tag;
	}
	
	this.notifyModifiedValue = function(){
		
		   parent.showMusicTagRatings(trackID);
		
	}
	
	
	
	this.mousePressEvent = function(event){
		
		if (event.button() == Qt.RightButton) {
		
			opMenu.exec(QCursor.pos());
			
		}
			
	}
	
	
	
	
	
 }
 
 extend(tagValueProgressBar,QProgressBar);
