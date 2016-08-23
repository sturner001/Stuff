(PageController = function (page){

	var $myPage = page;
	var $addBbutton = $myPage.find('#addNewStuffButton');
	var $newTextBox = $myPage.find('#newstuff');
	var dataStore = dsController();
    var $stuffList = $myPage.find('#stuffList'); 
	dataStore.init();
    	
	function loadAll(){
		var items = dataStore.getAll();
		var item;
		
		for(item in items) {
			var row = document.createElement('div')
				.setAttribute('id', 'keyValue-' + items[item].key)
				.setAttribute('class', 'row-container');
				
			var keyValue = document.createElement('div')
				.setAttribute('class', 'id-cell');
						
			keyValue.appendChild(document.createTextNode(items[item].key));
				
			row.appendChild(keyValue);	
				
			var valValue = document.createElement('div')
				.setAttribute('id', 'valValue-' + items[item].key)
				.setAttribute('class', 'description-cell');
			
			valValue.appendChild(document.createTextNode(items[item].val);
			row.appendChild(valValue);
			
			var dataControls = document.createElement('div');
			
			var editControl = document.createElement('button')
				.setAttribute('id', 'buEdit' + items[item].key)
				.setAttribute('value', items[item].key)
				.setAttribute('class', 'edit-record-control')
				.setAttribute('type', 'button');
				
			editControl.appendChild(createTextNode('Edit'));
			dataControls.appendChild(editControl);
			
			var deleteControl = document.createElement('button')
				.setAttribute('id', 'buDelete')
				.setAttribute('class', 'edit-record-control')
				.setAttribute('value', items[item])
				.setAttribute('type', 'button');			
			
			dataControls.appendChild(deleteControl);
			
			row.appendChild(dataControls);
			
			$stuffList.append(row);
			
		}
		
		
		
	}
	
	newRecordClickEvent(event){
		event.preventDefault();
		event.stopPropigation();
		var $newControl = $(this);
		newControl.text('Save');
		
		
		
		
	}
	
	
	saveNewRecordClickEvent(event){}
	
	cancelNewRecordClickEvent(event) {}
	
	editRecordClickEvent(event) {}
	
	saveRecordClickEvent(event){}
	
	deleteRecordClickEvent(event){}
	
	cancelEditActionClickEvent(event) {}
	
	
	
	
	
	
	
}());