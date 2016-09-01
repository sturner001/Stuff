PageController = function(page) {
	var webPage = page;
	
	var $newRecordControl = $(webPage).find('#addnewstuff');
	var $newRecordDesc = $(webPage).find('#newstuff');
	var $newDataControls = $(webPage).find('#new-data-controls');
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
			//editControl.addEventListener('click', editRecordClickEvent);
			editControl.appendChild(document.createTextNode('Edit'));
			
			var deleteControl = document.createElement('button');
			deleteControl.setAttribute('id', 'buDelete' + items[item].key);
			deleteControl.setAttribute('class', 'edit-record-control');
			deleteControl.setAttribute('value', items[item].key);
			deleteControl.setAttribute('type', 'button');
				
			deleteControl.appendChild(document.createTextNode('Delete'));			
			
			dataControlContainer.appendChild(editControl);	
			dataControlContainer.appendChild(deleteControl);
			rowContainer.appendChild(dataControlContainer);
			            
			$(editControl).click(editRecordClickEvent);
			$(deleteControl).click(deleteRecordClickEvent);
			
			$recordList.append(rowContainer);
		}
	}
	
	function newRecordClickEvent(event) {
		console.log('newRecordClickEvent fired');
		event.preventDefault();
		event.stopPropagation();
		console.log($newRecordControl);
		$newRecordControl.text('Save');
		$newRecordControl.off('click');
		$newRecordControl.click(saveNewRecordClickEvent);
		
		var cancelNewRecordControl = document.createElement('button');
		cancelNewRecordControl.setAttribute('type', 'button');
		cancelNewRecordControl.setAttribute('class', 'edit-record-control');
		cancelNewRecordControl.value = 'Cancel';
		$(cancelNewRecordControl).text('Cancel');
		cancelNewRecordControl.id = 'cancel-new-record';
		$newDataControls.append(cancelNewRecordControl);
		
		$('.edit-record-control').not($newRecordControl).not($(cancelNewRecordControl)).attr('disabled', 'disabled'); 
					
		$newRecordDesc.removeAttr('disabled');
		$newRecordDesc.focus();
		$('#cancel-new-record').click(cancelNewRecordClickEvent);
		
	}
		
	function saveNewRecordClickEvent (event) {
		console.log('saveNewRecordClickEvent fired');
		event.stopPropagation();
		event.preventDefault();
	    if ($newRecordDesc.val() != ''){
			var val = $newRecordDesc.val();
			var index = dataStore.set(val);
			$newRecordDesc.val('');
		}
		$(this).text('New');
		$recordList.empty();
		loadAll();
		$newRecordControl.off('click');
		$newRecordControl.click(newRecordClickEvent);
		$newRecordDesc.attr('disabled', 'disabled');
		document.getElementById('cancel-new-record').remove();
		$('.edit-record-control').not($newRecordControl).removeAttr('disabled');
			
	}
	
	function cancelNewRecordClickEvent(event) {
		console.log('cancelNewRecordClickEvent fired');
		event.stopPropagation();
		event.preventDefault();
		console.log('cancelNewRecordClickEvent clicked');
		event.preventDefault();
		event.stopPropagation();
		$newRecordControl.text('New');
		$newRecordControl.off('click');
		$newRecordControl.click(newRecordClickEvent);
		$newRecordDesc.val('');
		$newRecordDesc.attr('disabled', 'disabled');
		$('.edit-record-control').not($newRecordControl).removeAttr('disabled');
		this.remove();
		
		
	}

	function editRecordClickEvent (event) {
		console.log('editRecordClickEvent fired');
		event.preventDefault();
		event.stopPropagation();
		
		var $valDiv = $(webPage).find('#valValue-' + this.value);
        var recordDescription = $valDiv.text();
        $valDiv.text('');
	    
		$('<input>').val(recordDescription).attr('id', 'textBox-' + this.value)
			.attr('class', 'edit-record-textbox')
			.attr('type', 'text')
			.appendTo($valDiv)
			.focus();
        
		console.log($(this));
		$(this).text('Save');
		$(this).off('click');
		$(this).click(saveEditRecordClickEvent);		

		var $deleteControl = $(webPage).find('#buDelete' + this.value);
		$deleteControl.text('Cancel');
		$deleteControl.off('click');
		$deleteControl.click(cancelEditActionClickEvent);
		
		$('.edit-record-control').not($(this)).not($deleteControl)
			.attr('disabled', 'disabled' ); 
		
	}	
	
	function saveEditRecordClickEvent (event) {
		console.log('saveEditRecordClickEvent fired');
		event.preventDefault();
		event.stopPropagation();
		var $valDiv = $(webPage).find('#valValue-' + this.value);
		var $textBox = $(webPage).find('#textBox-' + this.value);
		var tempVal = $textBox.val();
		dataStore.put(this.value, tempVal);
		$textBox.remove();
		$valDiv.text(tempVal);
		$(this).text('Edit');
		$(this).off('click');
		$(this).click(editRecordClickEvent);
		var $deleteControl = $(webPage).find('#buDelete' + this.value);
		$deleteControl.text('Delete');
		$deleteControl.off('click');
		$deleteControl.click(deleteRecordClickEvent);
		$('.edit-record-control').not($(this)).not($deleteControl)
			.removeAttr('disabled');
		
	}

	
	
	function cancelEditActionClickEvent(event) {
		console.log('cancelEditActionClickEvent fired');
		event.preventDefault();
		event.stopPropagation();
		var $valDiv = $(webPage).find('#valValue-' + this.value);
		var $textBox = $(webPage).find('#textBox-' + this.value);
		var tempVal = $textBox.val();
		
		$textBox.remove();
		$valDiv.text(dataStore.get(this.value));
		$(this).text('Delete');
		$(this).off('click');
		$(this).click(deleteRecordClickEvent);
		var $editControl = $(webPage).find('#buEdit' + this.value);
		
		$editControl.off('click');
		$editControl.click(editRecordClickEvent);
		$editControl.text('Edit');
		$('.edit-record-control').not($editControl).not($(this)).removeAttr('disabled');
	}
			
	
	
	function deleteRecordClickEvent(event){
		console.log('deleteRecordClickEvent');
		event.preventDefault();
		event.stopPropagation();
		
	}
	
	loadAll();
	$newRecordControl.on('click', newRecordClickEvent);
	
	

}    	
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
	
	
	
	
	
	
	
