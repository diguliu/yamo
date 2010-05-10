/**
 * @author rafael
 */



function extend(subclass, superclass) {    //method that implements inheritance
	    
		function Dummy(){} 
	    
	    Dummy.prototype = superclass.prototype; 
	    
		subclass.prototype = new Dummy();
	    
		subclass.prototype.constructor = subclass;
	    
		subclass.superclass = superclass;
	    
		subclass.superproto = superclass.prototype;
}

function cropString(str,limite){
		
		var resul = str.substring(0,limite);
		
		resul +="...";
		
		return resul;
}


function sql(query){
	
	
	var result = Amarok.Collection.query(query);
	
	return result;
}


function addListItem(list,item,font,icon){
	
	
	//item.setFont(font);
			
	list.addItem(item);
}





function loadWindow(file){ ////reads file UI file and creates a window
	
	var loader = new QUiLoader(Amarok.Window);
	
	var ui_file = new QFile(Amarok.Info.scriptPath() + "/"+file, loader);
 	
	ui_file.open( QIODevice.ReadOnly );
	
	var window = loader.load(ui_file, Amarok.Window);
	
    ui_file.close();
	
	return window;
	
}

function loadWidget(file,parent){
	
	var loader = new QUiLoader();
	
	var ui_file = new QFile(Amarok.Info.scriptPath()+ "/"+file, loader);
	
	ui_file.open(QIODevice.ReadOnly);
	
	var widget = loader.load(ui_file,parent);
	
	ui_file.close();
	
	return widget;
	
}


function createArrayOfTracks(queryResult,ncols){
	
	var resultArray = new Array();
	
	for(var i = 0; i < queryResult.length; i++){
		
		if(i == 0 || i%ncols == 0){
			
			var id = queryResult[i];
			
			var URL = queryResult[i+1];
			
			var title = queryResult[i+2];
			
			var artistid = queryResult[i+3];
			
			var artist = queryResult[i+4];
			
			var albumid = queryResult[i+5];
			
			var albumname = queryResult[i+6];
			
			var genrename = queryResult[i+7];
			
			var year = queryResult[i+8];
			
			var image = queryResult[i+9];
			
			if(image == ""){
			    
			    image = Amarok.Info.scriptPath() + "/nocover.png";
			    
			}
		
			resultArray.push(
			
				new Track(id,URL,title,artistid,artist,albumid,albumname,genrename,year,image)
			
			);
		
		}
	}
	
	return resultArray;
	
}

Array.prototype.clear=function() //cria novo metodo para tipo interno Array
{
      this.length = 0;  //limpa array
}




/////////////MATH//////////////




function degreeToRadian(degree){
	
	return degree * (Math.PI/180);
	
}


function radianToDegree(radian){
	
	return radian * (180/Math.PI);
}

///////////////////////////////





/////////////QUICK SORT/////////////

var pivot = new Object();

function q_sort1(array, left, right){ //sorts an array of objects (name, value)
	
	
	var l_hold = left;
	
	var r_hold = right;
	
	
	pivot.value = array[left].value;
	pivot.name = array[left].name;
	pivot.id = array[left].id;
	
	
	while (left < right) {
		
		while ((array[right].value>=pivot.value) && (left<right)) {
			right--;
		
		}
		if (left != right){
			
			array[left].value = array[right].value;
			
			array[left].name = array[right].name;
			
			array[left].id = array[right].id;
			
			left++;
		}
		while ((array[left].value<=pivot.value) && (left<right)) {
			left++;
		}
		if (left != right) {
			
			array[right].value = array[left].value;
			
			array[right].name = array[left].name;
			
			array[right].id = array[left].id;
			
			right--;
		}
	}
	
	array[left].value = pivot.value;
	
	array[left].name = pivot.name;
	
	array[left].id = pivot.id;
	
	pivot.value = left;
	left = l_hold;
	right = r_hold;
	if (left < pivot.value) q_sort1(array, left, pivot.value-1);
	if (right > pivot.value) q_sort1(array, pivot.value+1, right);
}



function quickSort(array,type){
	
	
	if (type == 1) {

		q_sort1(array, 0, array.length - 1);
	}
	else 
		if (type == 2) {
			q_sort2(array, 0, array.length - 1);
		}
}




