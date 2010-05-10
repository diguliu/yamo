/**
 * @author rafael
 */

function InfoRect(x,y,w,h,parent){
	
	var self = this;
	
	var X = x;
	
	var Y = y;
	
	var bolaW = parent.getW();
	
	var bolaH = parent.getH();
	
	var track = parent.getTrack();
	
	var sceneRef = parent.getScene();
	
	var viewRef = parent.getView();
	
	var canvasWidth = viewRef.width;

	var canvasHeight = viewRef.height;
	
	var textTitle = track.getTitle();
	
	var textArtist = track.getArtist();
	
	var textAlbum = track.getAlbumName();
	
	if(textTitle.length > 9){
		
		textTitle = cropString(textTitle,19);
	}
	
	if(textArtist.length > 17){
		
		textArtist = cropString(textArtist,10);
	}
	
	if(textAlbum.length > 17){
		
		textAlbum = cropString(textAlbum,10);
	}
	
	
	if(x + w > canvasWidth){
		
		msg("flip");
		X = x - (bolaW + w);
	}
	else if(x < 0){
		msg("flip");
		X = bolaW ;

	}
	
	if(y + h > canvasHeight){
		
		msg("flip");
		Y = y -((y+h) - canvasHeight);
		
	}
	else if(y < 0){
		
		msg("flip");
		Y = bolaH ;

	}
	
	
	var rect = new QGraphicsRectItem(new QRectF(X,Y,w,h));
	
	var fontBrush = new QBrush(new QColor(200,200,200,200));
	
	var brush = new QBrush(new QColor(56,56,56,150));
	
	var pen = new QPen(new QColor(87,87,87,200));
	pen.setWidth(2);
	
	var font = new QFont("Verdana",10,QFont.Bold);
	
	var font2 = new QFont("Verdana",9,QFont.Bold);
	
	rect.setBrush(brush);
	
	rect.setPen(pen);
	
	rect.setZValue(7);
	
	rect.setAcceptHoverEvents(true);
	
	if (!track.getVisualData()) {
		
		track.newVisualData();
		
		var image = track.getVisualData().setAlbumImageItem(track.getAlbumImagePath(),100);
		
		var trackTitle = track.getVisualData().setTitleTextItem(textTitle);
		
		var trackArtist = track.getVisualData().setArtistTextItem(textArtist);
		
		var trackAlbum = track.getVisualData().setAlbumTextItem(textAlbum);
		
		
	}
	var image = track.getVisualData().getAlbumImageItem();

	var trackTitle = track.getVisualData().getTitleTextItem();

	var trackArtist = track.getVisualData().getArtistTextItem();

	var trackAlbum = track.getVisualData().getAlbumTextItem();
	
	
	image.setPos(X+10,Y+10);

	image.setZValue(8);

	trackTitle.setFont(font);

	trackTitle.setBrush(fontBrush);

	trackTitle.setPos(X+120,Y+40);

	trackTitle.setZValue(8);

	trackArtist.setFont(font2);

	trackArtist.setBrush(fontBrush);

	trackArtist.setPos(X+120,Y+60);

	trackArtist.setZValue(8);

	trackAlbum.setFont(font2);

	trackAlbum.setBrush(fontBrush);

	trackAlbum.setPos(X+120,Y+80);

	trackAlbum.setZValue(8);

	
	
	trackTitle.mousePressEvent = function(){
		
		addTrack(track.getID());

		stMsg("Música " +track.getTitle()+" foi adicionada à Playlist");
	}
	
	
	image.mousePressEvent = function(){
		
		addAlbum(track.getAlbumID());

		stMsg("Album "+track.getAlbumName()+" foi adicionado à Playlist");
		
	}
	
	trackArtist.mousePressEvent = function(){
		
		addArtist(track.getArtistID());
	
	}
	
	rect.hoverLeaveEvent = function(event){
		
		self.remove();
		parent.setClickedMe(false);	
	}
	

	
	
	this.draw = function(){
		
		
		sceneRef.addItem(rect);

		sceneRef.addItem(image);

		sceneRef.addItem(trackTitle)

		sceneRef.addItem(trackArtist);

		sceneRef.addItem(trackAlbum);
		
	}
	
	this.remove = function(){
		
		sceneRef.removeItem(rect);

		sceneRef.removeItem(image);

		sceneRef.removeItem(trackTitle);

		sceneRef.removeItem(trackArtist);

		sceneRef.removeItem(trackAlbum);

	}
	
}
