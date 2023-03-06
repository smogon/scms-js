var Message = function(options){
	_this = this;

	var prepared = false;
	var isPreparing = false;
	var sent = false;
	var isSending = false;


	/*---------------------------------properties-------------------------------*/
	_this.baseUrl = '';
	_this.messagerUrl = _this.baseUrl + '/forums/conversations/add';
	_this.postUrl = _this.baseUrl + '/forums/conversations/insert';
	_this.leaveUrl = _this.baseUrl + '/forums/conversations/{conversationId}/leave';

	_this.to = '';
	_this.title = '';
	_this.message = '';
	_this.allowInvite = true; //doesn't work properly
	_this.noReply = false; //doesn't work properly
	_this.token = '';
	_this.conversationId = -1;
	_this.removeOnSend = false;
	_this.allowMultipleSend = false;

	//allow options object to override defaults
	if(!options){ options = {}; }
	for(var opt in options){
		_this[opt] = options[opt];
	}
	/*---------------------------------private-functions-------------------------------*/


	//appropriately formats the send data
	var getSendData = function(){

		var sendData = {
			recipients:_this.to,
			title:_this.title,
			message_html:_this.message,
			_xfToken:_this.token
		};
		if(_this.allowInvite) { sendData.open_invite = 1; }
		if(_this.noReply) { sendData.conversation_locked = 1; }

		return sendData;
	};

	//parses conversation id from a newly posted conversation
	var parseConversationId = function(data) {
		var link = $('.datePermalink', data)[0].href;
		link = link.substring(link.lastIndexOf('.') + 1, link.indexOf('/message'));
		return link;
	};

	//attempts to remove user from the conversation
	var removeFromHistory = function(callback) {
		if(_this.conversationId !== -1) {
			$.ajax({
				url:_this.leaveUrl.replace('{conversationId}', _this.conversationId),
				type:'POST',
				dataType:'html',
				data:{
					delete_type: 'delete',
					_xfConfirm: 1,
					_xfToken: _this.token
				},
				success:function(){
					defined(callback)({ success:true, info:'Removed.' });
				},
				error:function(){
					defined(callback)({ success:true, info:'Not Removed, proceeding.' });
				}
			});
		} else {
			defined(callback)({ success:true, info:'Status unknown.' })
		}
	};
	//makes a function defined to reduce need for checks
	var defined = function(func) {
		return typeof(func) !== 'undefined' ? func : function() { };
	}


	/*---------------------------------public-functions-------------------------------*/

	//retrieves the required token (callback:function({success:boolean,info:string}))
	_this.prepare = function(callback) {
		if(isPreparing){
			return defined(callback)({ success:false, info:'Message is already being prepared.' });
		} else if(prepared){
			return defined(callback)({ success:false, info:'Message already prepared.' });
		}

		isPreparing = true;

		$.ajax({
			url: _this.messagerUrl,
			dataType:'html',
			success: function(res) {
				_this.token = $(res).find('[name="_xfToken"]').val();
				var success = typeof(_this.token) === 'string' && _this.token.length > 0;
				var info = success ? 'Token retrieved.' : 'There was a problem fetching your token. Error Unknown.';
				
				if(success) { prepared = true; }
				defined(callback)({ success:success, info:info });
			},
			error: function() {
				defined(callback)({ success:false, info:'There was a problem fetching your token. Make sure you are logged in.' });
			},
			complete: function(){
				isPreparing = false;
			}
		});
	}

	//sends the message (callback:function({success:boolean,info:string}))
	_this.send = function(callback) {
		if(!prepared) {
			return defined(callback)({ success:false, info:'Message was not prepared.' });
		} else if(isSending) {
			return defined(callback)({ success:false, info:'Message is already being sent.' });
		} else if(!_this.allowMultipleSend && sent) {
			return defined(callback)({ success:false, info:'Message has already been sent.' });
		}

		isSending = true;

		$.ajax({
			url:_this.postUrl,
			type:'POST',
			dataType:'html',
			data:getSendData(),
			success:function(data){
				_this.conversationId = parseConversationId(data);
				sent = true;
				if(_this.removeOnSend) {
					removeFromHistory(callback);
				}
				else {
					defined(callback)({ success:true, info:'Message sent.' });
				}
			},
			error:function() { 
				defined(callback)({ success:false, info:'There was a problem sending the message. This is likely due to a script error.' });
			},
			complete:function(){
				isSending = false;
			}
		});
	};
}