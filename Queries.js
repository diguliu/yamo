/**
 * @author rafael
 */




function getTags(){

		query = "SELECT id,tag, color FROM yamo_tags";
				
				var res = sql(query);
				
				
				
				var resArray = new Array();
				
				for(i = 0 ; i < res.length; i++ ){
					
					if (i % 3 == 0) {
						var resObject = new Object();
						
						resObject.id = res[i];
						resObject.tagName = res[i+1];
						resObject.color = res[i+2];
						
						
						resArray.push(resObject);
					}
				}
				
				
				return resArray;
		
}



function getValueFromTrackAndThisTag(trackID,tag){
	
	var tagID = getTagID(tag);
	
	var query = "SELECT value from yamo_tracktag where tag = "+tagID+" and track="+trackID;
	
	var res = sql(query);
	
	if(res.length == 0) return 0;
	
	return res;
	
}

function getTrackID(trackTitle,trackAlbum){
	
	
	var query = "SELECT a.id from tracks a JOIN albums b ON(a.album = b.id) WHERE a.title LIKE '%"+trackTitle+"%'";
	
	query += "  AND b.name LIKE '%"+trackAlbum+"%'";
	
	var result = sql(query);
	
	if(result.length > 0) return result;
	
	else return -1;
}

function getTagID(tag){
	
	var query = "SELECT id from yamo_tags where tag like '%"+tag+"%'";
	
	return sql(query);
}

function getNameFromTagID(tagID){
	
	var res = sql("SELECT tag from yamo_tags where id = "+tagID)
	
	
	return res.toString();
}


function getColorFromTagID(tagID){


  var query = "SELECT color from yamo_tags where id = "+tagID;

  var res = sql(query);

  return res;

}


function getTagsFromTrack(trackID){
	
	var query = "SELECT b.tag, a.value, b.color FROM yamo_tracktag a JOIN yamo_tags b ON (a.tag = b.id) JOIN tracks c ON (a.track = c.id)"
	
	query += "  WHERE c.id="+trackID;
	
	var res = sql(query);
	
	
	var resArray = new Array();
				
	for(i = 0 ; i < res.length; i++ ){
		
		if (i % 3 == 0) {
			var resObject = new Object();
			
			resObject.tagName = res[i];
			resObject.value = res[i+1];
			resObject.color = res[i+2];
			
			
			resArray.push(resObject);
		}
	}
	
	
	
	return resArray;
}



function getSumMusic(trackID){
	
	var query = "SELECT sum(value) from yamo_tracktag where track = "+trackID;
	
	var result = sql(query);
	
	if (result > 0) {
	
		return result;
	}
	
	else return 0;
}


function tagMusic(trackID, tag, value){

		var tagID = getTagID(tag);
		
		var countTag = sql("SELECT count(*) from yamo_tracktag where track = "+trackID + " and tag = "+tagID);
		
		if (countTag > 0) {
		
			Amarok.alert("You've already tagged this music with this tag!");
		}
		else {
		
			var query = "INSERT into yamo_tracktag(track,tag,value) VALUES(\"" + trackID + "\", \"" + tagID + "\", \"" + value + "\")";
			
			var resultQuery = sql(query);
		}
}


function unTagMusic(trackID, tagID){
	
	
	sql("DELETE FROM yamo_tracktag where track = "+trackID+" AND tag = "+tagID);
}


function insertTag(tag,color){
	
	
	var query = "INSERT INTO yamo_tags (tag,color) VALUES (\"" + tag+"\", \""+color+"\")";
			
	var res = sql(query);
	
}



function modifyTag(tagID, name, color){
	
	
	if (color) {
		
		sql("UPDATE yamo_tags SET tag = '"+name+"', color = '"+color+"' WHERE id = "+tagID);
	}
	else {
		
		sql("UPDATE yamo_tags SET tag = '"+name+"' WHERE id = "+tagID);
		
	}
}


function deleteTag(tag){
		
		var tagid = getTagID(tag);
		
		var query = "DELETE from yamo_tags where id = "+tagid;
	
		sql(query);
		
		var query2 = "DELETE from yamo_tracktag where tag="+tagid;
		
		sql(query2);
}


function modifyValue(trackID, tagID, newValue){
	
	sql("UPDATE yamo_tracktag set value = "+parseInt(newValue)+"  WHERE track = "+trackID+" AND tag = "+tagID);
	
	
}


function tableExists(tablename){
	
	var table_exists = false;
	
	var existing_tables = sql("SHOW TABLES");
	
	for (var i = 0; i < existing_tables.length; i++) {

		if (existing_tables[i] == tablename) {

			table_exists = true;
			
		}
		
		
	}
	
	return table_exists;
	
}


function setYamoDB(){
	
	var dbName1 = "yamo_tags";

	var dbName2 = "yamo_tracktag"
	
   
	var included = 0;
	
	if(!tableExists(dbName1)){
		
		
		sql('CREATE TABLE ' + dbName1 + ' (id int(10) not null auto_increment,tag VARCHAR(80) not null,color VARCHAR(7) not null, primary key(id))');
		included += 1;	
		
	
	}
	
	
	
	if(!tableExists(dbName2)){
		
		
		sql( 'CREATE TABLE ' + dbName2 + ' (track int(10) not null,tag int(10) not null, value int(10) not null, primary key(track,tag))') ;	
		included += 1;
		
	
	}

    
    if( included == 2 ){ 
       
	
		Amarok.alert("Tabelas 'yamo_tags' e 'yamo_tracktag' criadas com sucesso")
	
	
    }
	else if(included == 0){
		Amarok.alert("Banco do amarok já foi criado!");
	}
	
}




function deleteYamoDb(){
	
	sql("DROP TABLE yamo_tags");

	sql("DROP TABLE yamo_tracktag");

	Amarok.alert("Tabelas exluidas com sucesso");
}


function getAllArtists(){
	

	var query = "SELECT artist.name, artist.id FROM artists artist";

	var result = sql(query);

	return result;
	
}

function getAllAlbumsFromArtist(artistID){
	
	var query = "SELECT album.name, album.id FROM albums album WHERE album.artist="+artistID;
	
	var result = sql(query);
	
	return result;
}

function getAllTracksFromAlbum(albumID){
	
	var query = "SELECT track.title, track.id FROM tracks track WHERE track.album="+albumID;
	
	var result = sql(query);
	
	return result;
}


function getAllTracksInfoFromCollection(ID3Filters){
	
	
	
	
	
		
		
		var artist = ID3Filters.artist;
		var album  = ID3Filters.album;
		var genre  = ID3Filters.genre;
		var year   = ID3Filters.year;
		
		var where = " WHERE 1=1";
		
		if(artist) where += " and artist.id ="+artist;
		
		if(album) where += " and album.id = "+album;
		
		if(genre) where += " and genre.id ="+genre;
		
		if(year) where += " and year.id = "+year;
	
	

	var _query = "SELECT track.id,url.rpath, track.title,artist.id, artist.name, album.id, album.name, genre.name, year.name,image.path";

	    _query += "    FROM tracks track JOIN albums album ON ( track.album = album.id )";

		_query += "    JOIN urls url ON (track.url = url.id)";

	    _query += "    JOIN artists artist ON ( album.artist = artist.id )";

	    _query += "    LEFT JOIN genres genre ON ( track.genre = genre.id )";

	    _query += "    LEFT JOIN years year ON ( track.year = year.id )";

		_query += "    LEFT JOIN images image ON (album.image = image.id)";
		
		_query +=      where;
		
		 
		
		
	var result = sql(_query);
	
	return result;
}

function getValuesFromTheeseTags(tagFiltersSelected,trackID){
				
				var query;
				
				
				var tagIDs = new Array();
				
				for(i = 0; i < tagFiltersSelected.length; i++){
					
					tagIDs.push(tagFiltersSelected[i].id);
					
					
				}
				
				if(tagFiltersSelected.length > 1){
					
					query =  " select tag,value from yamo_tracktag where track =";
					query +=     " (select yatr.track from yamo_tracktag yatr";
					query +=	 " where yatr.tag in ("+tagIDs.toString()+")";
					query +=     " and yatr.track = "+trackID;
					query +=     " group by yatr.track";
					query +=     " having count(*) = "+tagFiltersSelected.length+")";
					query += "     and tag in("+tagIDs.toString()+")";
				}
				
				else if(tagFiltersSelected.length == 1){
					
					query =  " SELECT tag,value from yamo_tracktag where tag = "+tagIDs[0];
					query     += " AND track = "+trackID;
					
				}
				
				var result = sql(query);
				
				
				
				if(result.length > 0){
					
					
					var resultArray = new Array();
					
					for(var i = 0; i < result.length; i++){
						
						if (i % 2 == 0) {
							var resultItem = new Object();
							resultItem.name = getNameFromTagID(result[i]);
							resultItem.value = result[i+1];
							resultItem.id = result[i];
							resultArray.push(resultItem);
						}
					}
					
					
					
					
					return resultArray;
					
					
				}
				
				else{
					
					return null;
					
				}
				 
				
				
				
				
				
			}


	
	
	

