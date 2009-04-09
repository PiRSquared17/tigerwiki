var LionwikiPlugin = function(){
	
	this.combo = new LionwikiPlugin.prototype.Combo('My Combo', FCK_TOOLBARITEM_ONLYTEXT);
	this.http_request=false;
};



LionwikiPlugin.prototype.makeRequest = function(url, parameters, callback) {
      this.httprequest = false;
      if (window.XMLHttpRequest) { // Mozilla, Safari,...
         this.http_request = new XMLHttpRequest();
         if (this.http_request.overrideMimeType) {
            this.http_request.overrideMimeType('text/xml');
         }
      } else if (window.ActiveXObject) { // IE
         try {
            this.http_request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
            try {
               this.http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
         }
      }
      if (!this.http_request) {
         alert('Cannot create XMLHTTP instance');
         return false;
      }
      this.http_request.onreadystatechange = callback;
      this.http_request.open('GET', url + parameters, true);
      this.http_request.send(null);
   }


LionwikiPlugin.prototype.LinkFromCombo = function(name){
    this.Name = name;
}

// Un item est selectionné
LionwikiPlugin.prototype.LinkFromCombo.prototype.Execute = function(itemText, itemLabel){
    if (itemText != "") {
        FCK.InsertHtml(itemText);
    }
}

this.LionwikiPlugin.prototype.LinkFromCombo.prototype.GetState = function(){
    return;
}
FCKCommands.RegisterCommand('lionwiki_links_insert', new LionwikiPlugin.prototype.LinkFromCombo('any_name'));

// creation de la combo
LionwikiPlugin.prototype.Combo = function(tooltip, style){
    this.Command = FCKCommands.GetCommand('lionwiki_link');
    this.CommandName = 'lionwiki_link';
    this.Label = this.GetLabel();
    this.Tooltip = tooltip ? tooltip : this.Label; //Doesn't seem to work
    this.Style = style;
};


LionwikiPlugin.prototype.Combo.prototype = new FCKToolbarSpecialCombo;


LionwikiPlugin.prototype.Combo.prototype.GetLabel = function(){
    return "Wiki Links";
};


LionwikiPlugin.prototype.Combo.prototype.CreateItems = function(A){

	this._Combo.AddItem('Test','Test');
	
}


LionwikiPlugin.prototype.Link = function(name){
    this.Name = name;
	this.Label=name;
}

// Un item est selectionné
LionwikiPlugin.prototype.Link.prototype.Execute = function(){
	this.link_popup= window.open('../../dirlist.php', 'insertVariable', 'width=500,height=400,scrollbars=no,scrolling=no,location=no,toolbar=no');
}

this.LionwikiPlugin.prototype.Link.prototype.GetState = function(){
    return;
}

FCKCommands.RegisterCommand('lionwiki_link', new LionwikiPlugin.prototype.Link('Wiki Links'));

LionwikiPlugin.prototype.LinkButton = new FCKToolbarButton('lionwiki_link', 'Wiki Link', 'Wiki Internal Link', FCK_TOOLBARITEM_ONLYICON, false, false, 1);
LionwikiPlugin.prototype.LinkButton.IconPath = FCKConfig.PluginsPath + 'lionwiki/images/link.gif';

FCKToolbarItems.RegisterItem( 'lionwiki_link', LionwikiPlugin.prototype.LinkButton);

//Register the combo with the FCKEditor


lionwiki_plugin=new LionwikiPlugin();

//FCKToolbarItems.RegisterItem('lionwiki_links', lionwiki_plugin.combo);

lionwiki_plugin.callback = function() {
	
	if (response=lionwiki_plugin.http_request.responseText) {
	
		list = response.split(';');
		
		for(var i=0;i<=list.length;i++) {
			//lionwiki_plugin.combo.box.AddItem(list[i],list[i]);
		}
		
		
	}
	

}

lionwiki_plugin.makeRequest('../../dirlist.php','',lionwiki_plugin.callback)

