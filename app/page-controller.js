PageController = function(page) {
	var webPage = page;
	
	var $newRecordControl = $(webPage).find('#addnewstuff');
	var $newRecordDesc = $(webPage).find('#newstuff');
	var $newDataControls = $(webPage).find('#new-data-controls');
	var $recordList = $(webPage).find('#stuffList');
	var dataStore = dsController();
	dataStore.init();
	
	function loadAll(){
		console.log('loadAll() method fired');
		var items = dataStore.getAll();
		var item;
		
		for (item in items) {
			var $rowContainer = $('<div>', {
				id: 'row-' + items[item].key
			}).attr('class', 'row-container')
			.appendTo($recordList);
			
			$('<div>').text(items[item].key).attr('class', 'id-cell')
				.appendTo($rowContainer);
				
			$('<div>', {
				id: 'valValue-' + items[item].key
			}).attr('class', 'description-cell').text(items[item].val)
				.appendTo($rowContainer);

			$dataControlContainer = $('<div>')
				.attr('class', 'data-control-container')
				.appendTo($recordList);
				
			$('<button>', {
				id: 'buEdit' + items[item].key,
				value: items[item].key,
				type: 'button',
				click: editRecordClickEvent
				
			}).attr('class', 'edit-record-control').text('Edit')
				.appendTo($dataControlContainer);
			
			$('<button>', {
				id: 'buDelete' + items[item].key,
				value: items[item].key,
				type: 'button',
				click: deleteRecordClickEvent
				
			}).attr('class', 'edit-record-control').text('Delete')
				.appendTo($dataControlContainer);
			
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
		
		$('<button>',{
			type: 'button',
			value: 'Cancel',
			id: 'cancel-new-record',
			click: cancelNewRecordClickEvent
		
		}).attr('class', 'new-record-control').text('Cancel')
			.appendTo($newDataControls);
		
		$('.edit-record-control').not($newRecordControl).not($('#cancel-new-record')).attr('disabled', 'disabled'); 
					
		$newRecordDesc.removeAttr('disabled');
		$newRecordDesc.focus();
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
		
		var key = this.value;
		var value = $('#valValue-' + key).text();
		var messageText = "To delete record No. '" + key + "', '" + value + "' click the 'Yes' button.";
		$('<div>' + messageText +  '</div>').dialog({
			width: 300,
			height: 250,
			modal: true,
			resize: false,
			buttons: {
				'Yes': function () {
					dataStore.removeIt(key);
					$recordList.empty();
					loadAll();
					$(this).dialog('close');
				},
				'No': function () {
					$(this).dialog('close');
				}
				
			}
			
		})
		
		
	}
	
	loadAll();
	$newRecordControl.on('click', newRecordClickEvent);
	
	

}    	
	