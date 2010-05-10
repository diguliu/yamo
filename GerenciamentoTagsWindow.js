/**
 * @author rafael
 */


function GerenciamentoTagsWindow(parent){

		
			
				//==== Variable Init=======================================================
				//=========================================================================
				
				//=====System==============================================================
				
				var dialog = loadWindow("GerenciamentoTagsWindow.ui");
				
				var self = this;
				
				var parent = parent;
				
				
				
				
				
				
				//==Gui Style Vars=========================================================
				
				var font = new QFont("verdana", 9);
				font.setBold(true);
				
				//=====Buttons=============================================================
				
				var btnIncludeTag = dialog.panIncluirTag.btnIncluir;
				
				var btnCloseWindow = dialog.btnFechar;
				
				var btnTagMusic = dialog.panAvaliarMusica.btnAvaliar;
				
				var btnBackPage = dialog.panTrackBrowser.btnVoltar;
				
				var btnForwardPage = dialog.panTrackBrowser.btnAvancar;
				
				var btnDelete = dialog.panIncluirTag.btnDelete;
				//=========================================================================
				
				
				
				var sldValue = dialog.panAvaliarMusica.sldValor;
				
				
				
				//=====Text Fields=========================================================
				
				var txtTag = dialog.panIncluirTag.txtTag;
				
				
				//=====Labels==============================================================
				var lblMusicSelected = dialog.panAvaliarMusica.lblMusica;
				
				var lblTagSelected = dialog.panAvaliarMusica.lblTag;
				
				var lblValue = dialog.panAvaliarMusica.lblValue;
				
				
				//====Lists================================================================
				
				var lstMusics = dialog.panTrackBrowser.bookLists.pageMusicas.lstMusicas;
				
				var lstAlbums = dialog.panTrackBrowser.bookLists.pageAlbums.lstAlbums;
				
				var lstArtists = dialog.panTrackBrowser.bookLists.pageArtistas.lstArtistas;
				
				var lstTags = dialog.panTagsCadastradas.lstTagsCadastradas;
				
				var collectionBrowser = dialog.panTrackBrowser.bookLists;
				
				//===Combos================================================================
				
				var cboShow = dialog.panTrackBrowser.cboMostrar;
				
				var cboColor = dialog.panIncluirTag.cboColor;
				
				//===Graphics View/Scene===================================================
				
				
				
				var ratingView = dialog.ratingView;
				
				ratingView.setScene(new QGraphicsScene(ratingView.sceneRect, this));
				
				
				
				var ratingCanvas = ratingView.scene();
				
				//====Control Vars=========================================================
				
				var ratingCanvasFilled = false;
				
				var pagEnabled = new Array(false, false, false);
				
				var showMode = 0;
				
				var tagManagementMode = 0;
				
				var choosedNewColor = false;
				//=========================================================================
				
				
				//====Pointer Vars=========================================================
				var tagSelected = null;
				
				var trackSelected = null;
				
				var albumSelected = null;
				
				var artistSelected = null;
				
				
				//====Containers===========================================================
				
				var musicContainer = new Array();
				
				var artistContainer = new Array();
				
				var albumContainer = new Array();
				
				
				
				
				
				//====On init==============================================================
				
				
				dialog.show();
				
				showCurrentTags();
				
				if (Amarok.Playlist.totalTrackCount() > 0) {
				
					btnBackPage.setEnabled(false);
					
					btnForwardPage.setEnabled(false);
					
					showPlaylist();
				}
				else {
				
					showMode = 1;
					
					loadCollection();
					
					cboShow.setCurrentIndex(1);
					
					
					
				}
				
				//=========================================================================
				
				
				
				//====ACTIONS==============================================================
				
				
				
				cboColor['activated(int)'].connect(function(index){
				
					if (tagManagementMode == 1) {
					
						choosedNewColor = true;
						
					}
					
				});
				
				//_________________________________________________________________________
				btnCloseWindow.clicked.connect(function(){
					
						ratingCanvas.clear();
						
						parent.gerenciamentoTagsClosed();
						
						dialog.close();
					
					
				});
				
				
				
				
				//_________________________________________________________________________
				
				btnIncludeTag.clicked.connect(function(){
						
						
					var tagName = txtTag.text;
					
					var tagColor = (cboColor.color.name()).toString();
					
					
					if (tagManagementMode == 0) { //INSERT NEW TAG
						
						
						if (tagName != "") {
						
							insertTag(tagName, tagColor);
							
							showCurrentTags();
							
							txtTag.text = "";
							
						}
						else 
							Amarok.alert("Color field is blank!");
						
					}
					else if (tagManagementMode == 1) { //MODIFY TAG
					
							
							
							if (!choosedNewColor) {
							
								if (tagName != "") {
									modifyTag(getTagID(tagSelected), tagName, null);
								}
								
							
							}
							else {
								
								if (tagName != "") {
									modifyTag(getTagID(tagSelected), tagName, tagColor);
								}
								else{
									modifyTag(getTagID(tagSelected), tagSelected, tagColor);
								}
								choosedNewColor = false;
								
							}
							
							dialog.panIncluirTag.title = "New TAG";
							txtTag.text = "";
							showCurrentTags();
							tagManagementMode = 0;
					}
							
							parent.updateTagFilters();
						
				});
				
				
				
				btnDelete.clicked.connect(function(){
					
						deleteTag(tagSelected);	
						
						showCurrentTags();
						
						btnDelete.setEnabled(false);
						
						if(trackSelected){
							
							if (showMode == 0){
								
								var trackID = getTrackID(trackSelected.title, trackSelected.album);
								
								self.showMusicTagRatings(trackID);
							}
							else if (showMode == 1){
								
								self.showMusicTagRatings(trackSelected[1]);
							} 
						}			
					
					
				});
				
				//_________________________________________________________________________
				
				
				btnForwardPage.clicked.connect(function(){
				
					var currentPage = collectionBrowser.currentIndex;
					
					if (currentPage < 2) {
					
						collectionBrowser.setCurrentIndex(currentPage + 1);
					}
					
					updateBrowser();
				});
				
				
				//_________________________________________________________________________
				
				btnBackPage.clicked.connect(function(){
				
					var currentPage = collectionBrowser.currentIndex;
					if (currentPage > 0) {
						newPage = currentPage - 1;
						collectionBrowser.setCurrentIndex(newPage);
						
					}
					
					updateBrowser();
					
				});
				
				
				//_________________________________________________________________________
				
				lstTags.itemDoubleClicked.connect(function(item){
				
					
					tagManagementMode = 1;
					
					dialog.panIncluirTag.title = "Modify Tag";
					
					txtTag.text = item.text();
				});
				
				
				//_________________________________________________________________________
				
				
				lstTags.itemClicked.connect(function(item){
					
					
					btnDelete.setEnabled(true);
				
					tagSelected = item.text();
					
					if (trackSelected) {
					
						toggleTagPanel(true);
					}
					lblTagSelected.text = tagSelected;
					
					
				});
				
				
				
				//_________________________________________________________________________
				
				lstMusics.itemClicked.connect(function(item){
				
				
					if (tagSelected) {
					
						toggleTagPanel(true);
						
					}
					
					
					trackSelected = musicContainer[lstMusics.currentRow];
					
					
					if (showMode == 0) {
					
					
						lblMusicSelected.text = trackSelected.title;
						
						var trackID = getTrackID(trackSelected.title, trackSelected.album);
						
						self.showMusicTagRatings(trackID);
					}
					else 
						if (showMode == 1) {
						
							lblMusicSelected.text = trackSelected[0];
							
							self.showMusicTagRatings(trackSelected[1]);
						}
				});
				
				
				
				//_________________________________________________________________________
				
				
				
				
				lstArtists.itemClicked.connect(function(){
				
					artistSelected = artistContainer[lstArtists.currentRow];
					
					showAlbumsOfArtist(artistSelected[1]);
					
				});
				
				//_________________________________________________________________________
				
				
				
				lstAlbums.itemClicked.connect(function(){
				
				
					albumSelected = albumContainer[lstAlbums.currentRow];
					
					showMusicsOfAlbum(albumSelected[1]);
					
				});
				
				
				
				//_________________________________________________________________________
				
				
				
				btnTagMusic.clicked.connect(function(){
				
					var value = sldValue.value;
					
					if (value > 0) {
					
												
						if (showMode == 0) {
						
							tagMusic(getTrackID(trackSelected.title, trackSelected.album), tagSelected, value);
							
							self.showMusicTagRatings(getTrackID(trackSelected.title, trackSelected.album));
						}
						else 
							if (showMode == 1) {
							
								tagMusic(trackSelected[1], tagSelected, value);
								
								self.showMusicTagRatings(trackSelected[1]);
							}
					}else Amarok.alert("Choose at least 1% value!!");
					
					
					
				});
				
				//_________________________________________________________________________
				
				
				
				sldValue.valueChanged.connect(function(){
				
					lblValue.text = sldValue.value;
					
				});
				
				//_________________________________________________________________________		
				
				cboShow['currentIndexChanged(int)'].connect(function(index){
				
					musicContainer.clear();
					albumContainer.clear();
					artistContainer.clear();
					
					lstAlbums.clear();
					lstArtists.clear();
					lstMusics.clear();
					ratingCanvas.clear();
					if (index == 0) {
					
						pagEnabled[0] = false;
						pagEnabled[1] = false;
						pagEnabled[2] = false;
						
						btnBackPage.setEnabled(false);
						btnForwardPage.setEnabled(false);
						
						showMode = 0;
						
						showPlaylist();
					}
					else {
					
						showMode = 1;
						
						loadCollection();
					}
				});
				
				
				//=========================================================================
				
				
				
				//===PRIVATE FUNCTIONS=====================================================
				
				
				function updateBrowser(){
				
				
					var currentPage = collectionBrowser.currentIndex;
					
					if (currentPage != 2) {
					
						lblMusicSelected.text = "-";
						ratingCanvas.clear();
						toggleTagPanel(false);
						trackSelected = null;
					}
					
					
					if (currentPage == 0) {
					
						btnBackPage.setEnabled(false);
						if (pagEnabled[1] == true) {
						
							btnForwardPage.setEnabled(true);
						}
						
					}
					else 
						if (currentPage == 2) {
						
							btnForwardPage.setEnabled(false);
							
							if (pagEnabled[1] == true) {
							
								btnBackPage.setEnabled(true);
							}
						}
						else {
						
							if (pagEnabled[currentPage - 1] == true) {
							
							
								btnBackPage.setEnabled(true);
							}
							else {
								btnBackPage.setEnabled(false);
								
							}
							
							if (pagEnabled[currentPage + 1] == true) {
							
								btnForwardPage.setEnabled(true);
							}
							else {
								btnForwardPage.setEnabled(false);
							}
						}
					
					
					
				}
				
				
				//_________________________________________________________________________
				
				
				
				
				function showPlaylist(){
				
				
					if (lstMusics.count > 0) {
					
						lstMusics.clear();
						
					}
					
					
					
					if (musicContainer.length > 0) {
					
						musicContainer.clear();
					}
					
					
					if (collectionBrowser.currentIndex != 2) {
					
						collectionBrowser.setCurrentIndex(2);
					}
					
					for (var i = 0; i < Amarok.Playlist.totalTrackCount(); i++) {
					
						var track = Amarok.Playlist.trackAt(i);
						
						musicContainer.push(track);
						
						lstMusics.addItem(track.title + " - " + track.artist)
						
					}
				}
				//_________________________________________________________________________
				
				
				function loadCollection(){
				
				
				
					if (collectionBrowser.currentIndex != 0) {
						collectionBrowser.setCurrentIndex(0);
					}
					
					showArtistList();
				}
				
				//_________________________________________________________________________
				
				
				function showArtistList(){
				
					var artistList = getAllArtists();
					
					if (artistList.length > 0) {


						if (lstArtists.count > 0) {
						    lstArtists.clear();
						}
					
						if (artistContainer.length > 0) {
						    artistContainer.clear();
						}
					
						pagEnabled[0] = true;
						for (var j = 0; j < artistList.length; j++) {
						
						
							if (j % 2 == 0) {
							
								lstArtists.addItem(artistList[j]);
								
								artistContainer.push([artistList[j], artistList[j + 1]]);
							}
						}
					}else{
						Amarok.alert("Your database collection does not contain any artist registries.\n Check your collection data !")
					}
					
					
				}
				
				//_________________________________________________________________________
				
				
				function showAlbumsOfArtist(ID){
				
									
					var albumList = getAllAlbumsFromArtist(ID);
					
									
					if (albumList.length > 0) {

						if (collectionBrowser.currentIndex != 1) {
							collectionBrowser.setCurrentIndex(1);
						}
						
						
						if (lstAlbums.count > 0) {
						
							lstAlbums.clear();
						}
						
						if (albumContainer.length > 0) {
							albumContainer.clear();
						}
					
					
						pagEnabled[1] = true;
						
						if (pagEnabled[2]) 
							pagEnabled[2] = false;
						
						updateBrowser();
						
						for (var j = 0; j < albumList.length; j++) {
						
							if (j % 2 == 0) {
							
								lstAlbums.addItem(albumList[j]);
								albumContainer.push([albumList[j], albumList[j + 1]])
							}
						}
					}
					else{
						Amarok.alert("No albums found for this artist! Check your collection data !");
					}
					
				}
				
				//_________________________________________________________________________
				
				
				function showMusicsOfAlbum(ID){
				
				
				
					
					
					var musicsList = getAllTracksFromAlbum(ID);
					
					if (musicsList.length > 0) {


						if (collectionBrowser.currentIndex != 2) {
						      collectionBrowser.setCurrentIndex(2);
						}
					
					
						if (lstMusics.count > 0) {
					
						      lstMusics.clear();
						}
					
						if (musicContainer.length > 0) {
					
						      musicContainer.clear();
						}
					
						pagEnabled[2] = true;
						
						updateBrowser();
						
						for (var j = 0; j < musicsList.length; j++) {
						
							if (j % 2 == 0) {
							
								lstMusics.addItem(musicsList[j]);
								
								musicContainer.push([musicsList[j], musicsList[j + 1]])
							}
						}
						
					}else{
						 Amarok.alert("No tracks found for this album! Check your collection data! "); 
					}
				}
				
				//_________________________________________________________________________
				
				
				this.showMusicTagRatings = function(trackID){
				
				
					if (trackID == -1) 
						return;
					
					if (ratingCanvasFilled) {
					
						ratingCanvas.clear();
						
						ratingCanvasFilled = false;
					}
					
					var tagList = getTagsFromTrack(trackID);
					
					
					if (tagList.length > 0) {
					
					
						var nBars = tagList.length / 2;
						
						ratingCanvasFilled = true;
						
						ratingView.sceneRect = new QRectF(0, 0, 130, (nBars * 40));
						for (var i = 0; i < tagList.length; i++) {
						
						
						
							var itemTag = new QGraphicsSimpleTextItem(tagList[i].tagName);
							
							itemTag.setPos(4, i * 40);
							
							itemTag.setZValue(2);
							
							ratingCanvas.addItem(itemTag);
							
							var progressBar = new tagValueProgressBar(getTagID(tagList[i].tagName), tagList[i].value, trackID, this);
							
							progressBar.setGeometry(1, i * 40, ratingView.sceneRect.width() * 2.28, 40);
							
							progressBar.setValue(tagList[i].value);
							
							ratingCanvas.addWidget(progressBar);
							
							nBars += 1;
							
						}
					}
					
				}
				
				
				//_________________________________________________________________________
				
				
				function showCurrentTags(){
				
					lstTags.clear();
					
					var tagsData = getTags();
					
					for (var i = 0; i < tagsData.length; i++) {
					
						var tagItem = new QListWidgetItem(tagsData[i].tagName);
						
						var pixmapIcon = new QPixmap(15, 15);
						
						pixmapIcon.fill(new QColor(tagsData[i].color));
						
						var itemIcon = new QIcon(pixmapIcon);
						
						tagItem.setIcon(itemIcon);
						
						lstTags.addItem(tagItem);
						
						
					}
					
				}
				
				//_________________________________________________________________________
				
				
				function toggleTagPanel(flag){
				
					if (flag) {
					
						dialog.panAvaliarMusica.enabled = true;
						
						btnTagMusic.enabled = true;
						
						sldValue.enabled = true;
						
						sldValue.setFocus();
						
					}
					
					else {
					
						dialog.panAvaliarMusica.enabled = false;
						
						btnTagMusic.enabled = false;
						
						sldValue.enabled = false;
						
					}
					
				}
				
				//_________________________________________________________________________
				
				
				
				//=========================================================================
				
				
				
				//==PUBLIC FUNCTIONS=======================================================
				
				
				this.getDialog = function(){
				
					return dialog;
				}
				
			//==========================================================================
			
			
			
			
			
		
}
