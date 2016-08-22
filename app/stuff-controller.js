(stuffController = function () {
	var stuffPage;
	var initialized = false;
	var stuffItemValue = null;
	var test = dsController();
	
	
	
	return {
		init : function (page){
			
			test.init();
			
			if (!initialized)
			{
				stuffPage = page;
				var $addStuffButton = $(stuffPage).find('#addnewstuff');
				var $newStuffTextBox = $(stuffPage).find('#newstuff');
				var $stuffList = $(stuffPage).find('#stuffList');
								
				function LoadAll(){
					var items = dsController().getAll();
					var item;
					
					for(item in items) {
						var row = document.createElement('div');
						row.setAttribute('id', 'keyValue-' + items[item].key);
						row.setAttribute('class', 'row-container');
						
						var keyValue = document.createElement('div');
						keyValue.setAttribute('class', 'id-cell');
						
						var valValue = document.createElement('div');
						valValue.setAttribute('id', 'valValue-' + items[item].key);
						valValue.setAttribute('class', 'description-cell');
						
						var textKeyNode = document.createTextNode(items[item].key);
						keyValue.appendChild(textKeyNode);
						row.appendChild(keyValue);						
						
						var textValNode = document.createTextNode(items[item].val);
						valValue.appendChild(textValNode);
						row.appendChild(valValue);						
						
						var dataControls = document.createElement('div');
						
						var editControl = document.createElement('button');
						editControl.setAttribute('id', 'buEdit' + items[item].key )
						editControl.setAttribute('value', items[item].key)
						var text = document.createTextNode('Edit');
						editControl.appendChild(text);
						editControl.setAttribute('class', 'edit-record-control');
						editControl.setAttribute('type', 'button');
				
						dataControls.appendChild(editControl);
						
						
						
						//initializing Cancel button
						var deleteControl = document.createElement('button');
						deleteControl.setAttribute('id', 'buDelete' + items[item].key )
						deleteControl.setAttribute('value', items[item].key)
						var textDelete = document.createTextNode('Delete');
						deleteControl.appendChild(textDelete);
						deleteControl.setAttribute('class', 'edit-record-control');
						deleteControl.setAttribute('type', 'button');
						dataControls.appendChild(deleteControl);
						
						row.appendChild(dataControls);
						
						$stuffList.append(row);
						
						$('#buEdit'+ items[item].key).click(editRecordClickEvent);
						$('#buDelete' + items[item].key).click(deleteRecordClickEvent);
					}
				}

				
				function newRecordClickEvent (event) {
					event.preventDefault();
					event.stopPropagation();
					this.innerHTML = '';
					this.appendChild(document.createTextNode('Save'));
					$addStuffButton.off('click');
					$addStuffButton.click(saveNewRecordClickEvent);
					var cancelControl = document.createElement('button');
					cancelControl.setAttribute('type', 'button');
					cancelControl.setAttribute('class', 'edit-record-control');
					cancelControl.value = 'Cancel';
					cancelControl.appendChild(document.createTextNode('Cancel'));
					cancelControl.id = 'cancel-new-record';
					
					document.getElementById('new-data-controls').appendChild(cancelControl);
					$('.edit-record-control').not($addStuffButton).not($(cancelControl)).attr('disabled', 'disabled'); 
					$newStuffTextBox.removeAttr('disabled');
					$newStuffTextBox.focus();
					$('#cancel-new-record').click(cancelNewRecordClickEvent);
				}
				
				function saveNewRecordClickEvent (event) {
					event.preventDefault();
					event.stopPropagation();
					if($newStuffTextBox.val() != '') {
						var val = $newStuffTextBox.val();
						var index = dsController().set(val);
						$newStuffTextBox.val('');
					}
					
					$stuffList.empty();
					LoadAll();
					$addStuffButton.text('New');
					$addStuffButton.off('click');
					$addStuffButton.click(newRecordClickEvent);
					$newStuffTextBox.attr('disabled', 'disabled');
					document.getElementById('cancel-new-record').remove();
					$('.edit-record-control').not($addStuffButton).removeAttr('disabled');
				}
				
				function cancelNewRecordClickEvent(event)
				{
					event.preventDefault();
					event.stopPropagation();
					$addStuffButton.text('New');
					$addStuffButton.off('click');
					$addStuffButton.click(newRecordClickEvent);
					$newStuffTextBox.val('');
					$newStuffTextBox.attr('disabled', 'disabled');
					$('.edit-record-control').not($addStuffButton).removeAttr('disabled');
					this.remove();
				}
				
				function editRecordClickEvent(event)
				{
					event.preventDefault();
					event.stopPropagation();
					
					var valDiv = document.getElementById('valValue-' + this.value);
					var valText = valDiv.firstChild.nodeValue;
					stuffItemValue = valText;
				    while (valDiv.firstChild) {
						valDiv.removeChild(valDiv.firstChild);						
					}
					
					var textBox = document.createElement('input');
					textBox.value = valText;
					textBox.id = 'textBox-' + this.value;
					textBox.setAttribute('class', 'edit-record-textbox');
					textBox.setAttribute('type', 'text');
					valDiv.appendChild(textBox);
					textBox.focus();
					this.innerHTML = 'Save';


					$('#' + this.id).off('click');
					$('#' + this.id).click(saveRecordClickEvent);
					
				    var cancelButton = document.getElementById('buDelete' + this.value);
					cancelButton.removeChild(cancelButton.firstChild);
					var cancelText = document.createTextNode('Cancel');
					cancelButton.appendChild(cancelText);					
					
					$('#buDelete' + this.value).off('click');
					$('#buDelete' + this.value).click(cancelEditActionClickEvent);
					$('.edit-record-control').not($('#buEdit'+ this.value)).not($('#buDelete'+this.value)).attr('disabled', 'disabled'); 
					
				}
				
				function saveRecordClickEvent(event)
				{
					event.preventDefault();
					event.stopPropagation();
					var valDiv = document.getElementById('valValue-' + this.value);
					var textBox = document.getElementById('textBox-' + this.value);
					var newValue = textBox.value;
					textBox.remove();
					dsController().put(this.value, newValue);
					var newText = document.createTextNode(newValue);
					valDiv.appendChild(newText);;
					this.innerHTML = 'Edit';
					
					$('#' + this.id).off('click');
					$('#' + this.id).click(editRecordClickEvent);
					
				    
					var deleteButton = document.getElementById('buDelete' + this.value);
					deleteButton.removeChild(deleteButton.firstChild);
					var deleteText = document.createTextNode('Delete');
					deleteButton.appendChild(deleteText);
					
					$('#buDelete' + this.value).off('click');
					$('#buDelete' + this.value).click(deleteRecordClickEvent);
					$('.edit-record-control').not($('#buEdit'+ this.value)).not($('#buDelete'+this.value)).removeAttr('disabled');
				}
				
				function deleteRecordClickEvent (event){
					event.preventDefault();
					event.stopPropagation();
			
					var key = $(this).val();
					var $rowContainer = $(this).parent().parent();
					var value = $rowContainer.find('#valValue-' + key).text();
					var messageText = "To delete record No. " + key + "', " + value + "' click the 'Yes' button";  
					var $message = $('<div>' + messageText + '</div>');
					
					$message.dialog({
						width: 300,
						height: 250,
						modal: true,
						resizable: false,
						buttons: {
							'Yes': function (){ 
								dsController().removeIt(key);
								$stuffList.empty();
								LoadAll();
								$(this).dialog('close');
							},
							'No': function () {
								$(this).dialog('close');
							}
						}
					});
				}
				
				
				function cancelEditActionClickEvent (event){
					event.preventDefault();
					event.stopPropagation();
					
					var valDiv = document.getElementById('valValue-' + this.value);
					var textBox = document.getElementById('textBox-' + this.value);
					textBox.remove();
					var newText = document.createTextNode(stuffItemValue);
					valDiv.appendChild(newText);
					this.innerHTML = 'Delete';
					
					$('#buDelete' + this.value).off('click');
					$('#buDelete' + this.value).click(deleteRecordClickEvent);
					
					$('#buEdit' + this.value).off('click');
					$('#buEdit' + this.value).click(editRecordClickEvent);
					$('#buEdit' + this.value).text('Edit');
					$('.edit-record-control').not($('#buEdit'+ this.value)).not($('#buDelete'+this.value)).removeAttr('disabled');
				}
				
				LoadAll();
				


				
				$addStuffButton.click(newRecordClickEvent);
				
				//initialized = true;
			}
		}
	}
})();


