var scrollToBottom = {};

scrollToBottom.chat_box = function() {
	var objDiv = document.getElementById("chat-box");
    objDiv.scrollTop = objDiv.scrollHeight;
};

module.exports = scrollToBottom;