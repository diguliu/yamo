/**
 * @author rafael
 */

 
 function addTrack(ID){
		
		
		var query  = " SELECT concat('file://','/', u.rpath)";
        
		query += " FROM tracks t, urls u";
        
		query += " where t.id="+ID;
        
		query += " and t.url=u.id";
    	
		var result = sql(query);
		
		Amarok.Playlist.addMedia(new QUrl(result[0]));
		
}
	
	
function addAlbum(albumID){
    
	
    var query  = " SELECT concat('file://','/', u.rpath)";
        
		query += " FROM tracks t, urls u";
        
		query += " where t.album="+albumID;
        
		query += " and t.url=u.id";
        
		query += " order by t.discnumber, t.tracknumber";
    
	var result = sql(query);

    for (var i=0; i < result.length; i++){
		
		Amarok.Playlist.addMedia(new QUrl(result[i]));
	
	}
}	


function addArtist(artistID){
    

    var query  = " SELECT distinct t.album";
        
		query += " FROM tracks t, urls u";
        
		query += " where t.artist="+artistID;
        
		query += " and t.url=u.id";
        
		query += " order by t.year";
    
	var result = sql(query);

    for (var i=0; i < result.length; i++){this.addAlbum(result[i]);}

}
