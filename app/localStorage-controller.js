
(dsController = function (){
	
	return {
		
		init : function() {
			var initialized = false;
			if (window.localStorage) {
					initialized = true;
					if (localStorage.getItem('indexer') == null) {
						localStorage.setItem('indexer', 0);
					}					
				return initialized;
			}
			return initialized;	
		},
		
		set : function (item) {
			var indexer = localStorage.getItem('indexer');
			var index = indexer++;
			localStorage.setItem(index, item);
			localStorage['indexer'] = indexer;
			return index;
		},

		get : function (key){
			return localStorage.getItem(key);
		},
		
		put : function (key, value){
			localStorage[key] = value;
		},
		
		getAll : function (){
			var index = 0;
			var items = [];
			var itemName = localStorage.getItem(index);
			while (itemName != null){
				var item = { key: index, val: itemName };
				items.push(item);
				index++;
				itemName = localStorage.getItem(index);
			}
			localStorage.setItem('indexer', index);
			return items;			
		},
		
		removeIt : function(key){
			var x = key;
			x++;
			var itemName = localStorage.getItem(x);
			while (itemName != null)
			{
				localStorage.setItem(key, itemName);
				key++;
				itemName =  localStorage.getItem(key + 1);	
			}
		
			localStorage.removeItem(key);
		}		
	}		
})();