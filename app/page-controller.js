(PageController = function(page) {
	var webPage = page;
	
	var $newRecordControl = $(webPage).find('#addnewstuff');
	var $newRecordDesc = $(webPage).find('#newstuff');
	var $recordList = $(webPage).find('#stuffList');
	var dataStore = dsController();
	dataStore.init();
	
	function loadAll(){
		console.log('loadAll()');
		var items = dataStore.getAll();
		var item;
		
		for (item in items) {
			var rowContainer = document.createElement('div');
			rowContainer.setAttribute('id', 'keyValue-' + items[item].key);
			rowContainer.setAttribute('class', 'row-container');
				
			var keyContainer = document.createElement('div');
			keyContainer.setAttribute('class', 'id-cell');
			keyContainer.appendChild(document.createTextNode(items[item].key));

			rowContainer.appendChild(keyContainer);
			
			var valContainer = document.createElement('div');
			valContainer.setAttribute('id', 'valValue-' + items[item].key);
			valContainer.setAttribute('class', 'description-cell');
			
			valContainer.appendChild(document.createTextNode(items[item].val));
			rowContainer.appendChild(valContainer);
			
			var dataControlContainer = document.createElement('div');
			var editControl = document.createElement('button');
			editControl.setAttribute('id', 'buEdit' + items[item].key);
			editControl.setAttribute('value', items[item].key);
			editControl.setAttribute('class', 'edit-record-control');
			editControl.setAttribute('type', 'button');
			//editControl.addEventListener('click', newRecordClickEvent(event));
			editControl.appendChild(document.createTextNode('Edit'));
			
			var deleteControl = document.createElement('button');
			deleteControl.setAttribute('id', 'buDelete');
			deleteControl.setAttribute('class', 'edit-record-control');
			deleteControl.setAttribute('value', items[item]);
			deleteControl.setAttribute('type', 'button');
			//deleteControl.addEventListener('click', deleteRecordClickEvent(event));	
			deleteControl.appendChild(document.createTextNode('Delete'));			
			
			dataControlContainer.appendChild(editControl);	
			dataControlContainer.appendChild(deleteControl);

			$recordList.append(rowContainer);
			
		}
		
	function saveNewRecordClickEvent(event){}
	
	function cancelNewRecordClickEvent(event) {}
	
	function editRecordClickEvent(event) {}
	
	function saveRecordClickEvent(event){}
	
	function deleteRecordClickEvent(event){}
	
	function cancelEditActionClickEvent(event) {}
			
	}
	
	
	loadAll();
	
	

})();    	
	//function loadAll(){
	//	var items = dataStore.getAll();
	//	var item;
	//	
	//	for(item in items) {
	//		var row = document.createElement('div')
	//			.setAttribute('id', 'keyValue-' + items[item].key)
	//			.setAttribute('class', 'row-container');
	//			
	//		var keyValue = document.createElement('div')
	//			.setAttribute('class', 'id-cell');
	//					
	//		keyValue.appendChild(document.createTextNode(items[item].key));
	//			
	//		row.appendChild(keyValue);	
	//			
	//		var valValue = document.createElement('div')
	//			.setAttribute('id', 'valValue-' + items[item].key)
	//			.setAttribute('class', 'description-cell');
	//		
	//		valValue.appendChild(document.createTextNode(items[item].val));
	//		row.appendChild(valValue);
	//		
	//		var dataControls = document.createElement('div');
	//		
	//		var editControl = document.createElement('button')
	//			.setAttribute('id', 'buEdit' + items[item].key)
	//			.setAttribute('value', items[item].key)
	//			.setAttribute('class', 'edit-record-control')
	//			.setAttribute('type', 'button')
	//			.addEventListener('click', newRecordClickEvent(event));
	//			
	//		editControl.appendChild(createTextNode('Edit'));
	//		dataControls.appendChild(editControl);
	//		
	//		var deleteControl = document.createElement('button')
	//			.setAttribute('id', 'buDelete')
	//			.setAttribute('class', 'edit-record-control')
	//			.setAttribute('value', items[item])
	//			.setAttribute('type', 'button')
	//			.addEventListener('click', deleteRecordClickEvent(event));				
	//		
	//		dataControls.appendChild(deleteControl);
	//		
	//		row.appendChild(dataControls);
	//		
	//		$stuffList.append(row);
	//		
	//		
	//		
	//	}
	//	
	//	
	//	
	
	
	
	//function saveNewRecordClickEvent(event){}
	//
	//function cancelNewRecordClickEvent(event) {}
	//
	//function editRecordClickEvent(event) {}
	//
	//function saveRecordClickEvent(event){}
	//
	//function deleteRecordClickEvent(event){}
	//
	//function cancelEditActionClickEvent(event) {}
	
	
	
	
	
	
	
