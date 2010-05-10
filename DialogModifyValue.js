/**
 * @author rafael
 */

 
 function DialogModifyValue(trackID, tagID,parent){
 	
	var dialog = loadWindow("DialogModifyValue.ui");
	
		
	
		var btnOK = dialog.btnOK;
		
		var btnCancel = dialog.btnCancel;
		
		var txtValue = dialog.txtValue;
		
		btnOK.clicked.connect(function(){
		
			if (txtValue.text != "") {
				
				
					modifyValue(trackID, tagID, txtValue.text);
					
					parent.notifyModifiedValue();
					
				    dialog.close();
					
				
			}
			else {
			
				Amarok.alert("Value field is blank!");
			}
		});
		
	    
		btnCancel.clicked.connect(function(){
			
			dialog.close();
			
		});
	
	
	
		
	
	
	dialog.show();
	
	
 }
