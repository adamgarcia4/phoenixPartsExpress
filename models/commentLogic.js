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
	// {
	// 	path: 'a/b',
	// 	body: '2'
	// },
	// {
	// 	path: 'b/',
	// 	body: '3'
	// }
];


var tree = {
	path: 'a',
	children: []
	// children: [
	// 	{
	// 		path: 'a/b',
	// 		children: [
	// 			{
	// 				path: 'a/b/c'
	// 			}
	// 		]
	// 	}
	// ]
};

var newNode = {
	path: 'a/b/c',
	children: []
};

// console.log(JSON.stringify(tree));

var newNodePathArr = newNode.path.split('/');

// console.log(newNodePathArr);

// Iterate through path Array
for (var i = 0; i < newNodePathArr.length; i++) {

	// If original tree has this path and it's the end, then add as child
	if (newNodePathArr[i] == tree.path) {
		tree.children.push({
			path: newNodePathArr.slice(1),
			children: []
		})
	}
}

console.log(JSON.stringify(tree));








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

commentNode.prototype.addChild = function (path, body) {
	this.children.push(
		new commentNode(path, body)
	)
};

commentNode.prototype.printChildren = function () {
	console.log(this.children);
}

commentNode.prototype.print = function () {

	console.log('(', this.path, this.body, ')  |   ');

	this.children.forEach(function (t) {
		t.print();
	})
}

// comments.forEach(function(t){console.log(splitPathIntoArr(t.path))});


var input = ["a", "a-b", "a-c-d"];

var output = [];

// Iterate through each comment in the commentList
// for (var i = 0; i < input.length; i++) {
//
// 	// For a given comment, transform pathString into an array
// 	var chain = input[i].split("-");
// 	// console.log(chain);
//
// 	//Current node (before going through children is what we currently have.
// 	var currentNode = output;
//
// 	// Iterate through every element in the pathArray
// 	for (var j = 0; j < chain.length; j++) {
//
// 		//
// 		var wantedNode = chain[j];
//
// 		var lastNode = currentNode;
//
// 		// Iterate through
// 		for (var k = 0; k < currentNode.length; k++) {
//
// 			//check if the 'name' ie: path is equal to what our element in the chain is
// 			if (currentNode[k].name == wantedNode) {
// 				currentNode = currentNode[k].children;
// 				break;
// 			}
// 		}
//
// 		// The path couldn't be found in the pathArray, so we need to create one
// 		if (lastNode == currentNode) {
// 			var newNode = currentNode[k] = {name: wantedNode, children: []};
// 			currentNode = newNode.children;
// 		}
// 	}
// }