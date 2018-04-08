/**
 * Created by adamgarcia on 3/29/18.
 */

var comments = [
	{
		path: '/',
		body: '0'
	},
	{
		path: 'a/',
		body: '1'
	},
	{
		path: 'a/b',
		body: '2'
	},
	{
		path: 'b/',
		body: '3'
	}
];

var comment = comments[3];

// console.log(comment);

function splitPathIntoArr(pathStr) {
	// Removes leading and trailing '/'
	var trimmedPath = pathStr.replace(/(^\/)|(\/$)/g, "");
	return trimmedPath.split('/');
}

// console.log(splitPathIntoArr(comment.path));

function commentNode(path, body) {
	this.path = path;
	this.body = body;
	this.children = [];
}

commentNode.prototype.addChild = function(path,body) {
	this.children.push(
		new commentNode(path,body)
	)
};

commentNode.prototype.printChildren = function() {
	console.log(this.children);
}

var test = new commentNode('a','b');
test.addChild('c','d');
test.printChildren();
