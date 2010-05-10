



//classe da janela de debug

function DebugWindow() 

{
	
	var dialog = loadWindow("DebugWindow.ui");
	
	var txtQuery = dialog.txtQuery;
	
	
	
	dialog.btnQuery.clicked.connect(function(){
		
		var query = txtQuery.plainText;
		
		var result = sql(query);
		
		if(result.length > 0)
			
			for(var i = 0; i < result.length; i++)
				dialog.lstDebug.addItem(result[i]);
		
	});
	
	
	dialog.btnClose.clicked.connect(function(){
		
		dialog.close();
		
	});
	
	dialog.btnClear.clicked.connect(function(){
		
		dialog.lstDebug.clear();
		
	});
	
	this.printMsg = function(msg){
		
		dialog.lstDebug.addItem(msg);
		
	}
	
	this.getDialog = function(){
		
		return dialog;
		
	}
	

	dialog.show();

}







