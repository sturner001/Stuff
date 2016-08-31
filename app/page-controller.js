(PageController = function(page) {
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
			editControl.addEventListener('click', editRecordClickEvent);
			editControl.appendChild(document.createTextNode('Edit'));
			
			var deleteControl = document.createElement('button');
			deleteControl.setAttribute('id', 'buDelete');
			deleteControl.setAttribute('class', 'edit-record-control');
			deleteControl.setAttribute('value', items[item]);
			deleteControl.setAttribute('type', 'button');
			//deleteControl.addEventLloistener('click', deleteRecordClickEvent(event));	
			deleteControl.appendChild(document.createTextNode('Delete'));			
			
			dataControlContainer.appendChild(editControl);	
			dataControlContainer.appendChild(deleteControl);
			rowContainer.appendChild(dataControlContainer);

			$recordList.append(rowContainer);
			
		}
		

	
	function newRecordClickEvent(event) {
		console.log('new rec control clicked');
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
		console.log('save new rec control clicked');
		event.stopPropagation();
		event.preventDefault();
	    if ($newRecordDesc.val() != ''){
			var val = $newRecordDesc.val();
			var index = dataStore.set(val);
			$newRecordDesc.val('');
		}
		$recordList.empty();
		loadAll();
		$newRecordControl.off('click');
		$newRecordControl.click(newRecordClickEvent);
		$newRecordDesc.attr('disabled', 'disabled');
		document.getElementById('cancel-new-record').remove();
		$('.edit-record-control').not($newRecordControl).removeAttr('disabled');
			
	}
	
	
	function saveEditRecordClickEvent (event) {
		event.preventDefault();
		event.stopPropagation();
		var $valDiv = $(webPage).find('#valValue-' + this.value);
		var $textBox = $(webPage).find('#textBox-' + this.value);
		var tempVal = $textBox.val();
		dataStore.put(this.value, tempVal);
		$textBox.remove();
		valDiv.text(tempVal);
		$(this).off('click');
		$(this).click(editRecordClickEvent);
		var $deleteControl = $webPage('#buDelete' + this.value);
		$deleteControl.text('Delete');
		$deleteControl.off(click);
		$deleteControl.click(deleteRecordClickEvent);
		$('.edit-record-control').not($(this)).not($deleteControl)
			.removeAttr('disabled');
		
	}
	
	
	
	$newRecordControl.on('click', newRecordClickEvent);
	
	function cancelNewRecordClickEvent(event) {
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
		event.preventDefault();
		event.stopPropagation();
		
		var $valDiv = $(webPage).find('#valValue-' + this.value);
        var recordDescription = $valDiv.text();
        $valDiv.empty();
		 $('<input>').val(recordDescription).attr('id', 'textBox-' + this.value)
			.attr('class', 'edit-record-textbox')
			.attr('type', 'text')
			.appendTo($valDiv)
			.focus();
		
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
	
	
	
	
	
	
	
