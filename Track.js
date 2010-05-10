/**
 * @author rafael
 */

 
 function Track(id,url,title,artistid,artist,albumid,albumname,genrename,year,image){
	
	this.ID = id;
	
	this.URL = url;
	
	this.Title = title;
	
	this.ArtistID = artistid;
	
	this.Artist = artist;
	
	this.AlbumID = albumid;
	
	this.AlbumName = albumname;
	
	this.GenreName = genrename;
	
	this.Year = year;
	
	this.AlbumImagePath = image;
	
	this.visualData = null;
	
	
	this.newVisualData = function(){
		
		this.visualData = new visualData();
	}
	
	this.getVisualData = function(){
		
		return this.visualData;
	}
	
	this.getID = function(){
		
		return this.ID;
	}
	this.getURL = function(){
		
		return this.URL;
	}
	
	this.getTitle = function(){
		
		return this.Title;
	}
	
	this.getArtistID = function(){
		
		return this.ArtistID;
	}
	
	this.getArtist = function(){
		
		return this.Artist;
	}
	
	this.getAlbumID = function(){
		
		return this.AlbumID;
	}
	
	this.getAlbumName = function(){
		
		return this.AlbumName;
	}
	
	this.getGenreName = function(){
		
		return this.GenreName;
	}
	
	this.getYear = function(){
		
		return this.Year;
	}
	
	this.getAlbumImagePath = function(){
		
		return this.AlbumImagePath;
	}
	
}

function visualData(){
	
	
	this.albumImageItem = null;
	
	this.titleTextItem = null;
	
	this.artistTextItem = null;
	
	this.albumTextItem = null;
	
	this.setAlbumImageItem = function(imgPath,size){
		
		this.albumImageItem = new QGraphicsPixmapItem(new QPixmap(imgPath).scaled(size,size));
		
	}
	
	this.getAlbumImageItem = function(){
		
		return this.albumImageItem;
	}
	
	this.setTitleTextItem = function(text){
		
		this.titleTextItem = new QGraphicsSimpleTextItem(text);
	}
	
	this.getTitleTextItem = function(){
		
		return this.titleTextItem;
	}
	
	
	this.setArtistTextItem = function(text){
		
		this.artistTextItem = new QGraphicsSimpleTextItem(text);
	}
	
	this.getArtistTextItem = function(){
		
		return this.artistTextItem;
	}
	
	
	this.setAlbumTextItem = function(text){
		
		this.albumTextItem = new QGraphicsSimpleTextItem(text);
	}
	
	this.getAlbumTextItem = function(){
		
		 return this.albumTextItem;
	}
	
	
}
