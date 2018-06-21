// // TODO:
//  strings/keys/
//  array to object
//  folding/unfodling
//  import json
//  export json
//  new origin
//  delete node
//

// rules:
//
//



    function onEnter(input) {

        input.parentNode.className == "node" || "node array" || "node obj";
        let array = input.parentNode.className != "node"
        let val = input.value != "";
        let semicolon = input.value[input.value.length-1] == ":"
        let node = input.parentNode;
        switch (input.className) {
            case 'string':
                if (val){
                    if (semicolon) {
                        createValInput(input);
                        makeArray(input, true)
                        input.value = input.value.replace(":", "");
                        moveCursor('next');
                    } else {
                        if (true) {

                        }
                        input.parentNode.parentNode.appendChild(createNode());

                    }
                } else {
                    input.parentNode.appendChild(createNode());
                    makeArray(input.firstChild, false);
                }
                break;
            case 'key':
                if (val){

                } else {

                }
                break;
            case 'val' || 'int':
                if (val){
                    if (input.value == ':') {
                        makeArray(input, true);
                    } else {
                        node.parentNode.appendChild(createNode(true));
                        moveCursor('next');
                    }
                } else {
                    node.appendChild(createNode());
                    makeArray(node.lastChild.getElementsByTagName('input')[0]);
                }
                break;
            default:

        }


        // make int
        if (parseInt(input.value, 10 ) >= 0 && input.className == "val") {
            input.className = "int";
        }
    }

    function attachNode(input, node) {
        point = input.parentNode;
            point.appendChild(node);
    }

    function createNode(pair = false, key = "", val = ""){
        let newNode = document.createElement("div");
        newNode.className = 'node';
        let newInput = document.createElement('input');
        newInput.placeholder = "...";
        newInput.className = "string";
        newInput.value = key;
        if (pair) {
            newInput.className = "key";
        }
        newNode.appendChild(newInput);
        if (pair) {
            let semicolon = document.createTextNode(":");
            newNode.appendChild(semicolon);
            let newValInput = document.createElement('input');
            newValInput.placeholder = "...";
            newValInput.className = "val";
            newValInput.value = val;
            newNode.appendChild(newValInput);

        }
        return newNode;
    }

    function makeArray(input, obj = false){
        node = input.parentNode;
        newNode = document.createElement('div');
        newNode.className = "node";
        if (obj) {
            newNode.className = "node obj";
            node.parentNode.appendChild(newNode);
            newNode.appendChild(node);
            node.lastChild.focus();


        } else {
            node.className = "node arr";
            node.removeChild(node.getElementsByClassName('string')[0]);
            node.appendChild(createNode());
            node.lastChild.lastChild.focus();
        }
    }



    function createValInput(input){
        input.className = "key"
        let newInput = document.createElement('input');
        newInput.className = 'val';
        newInput.placeholder = "...";
        let semicolon = document.createTextNode(":");
        input.parentNode.appendChild(semicolon);
        input.parentNode.appendChild(newInput);
        moveCursor('next');
    }


    function deleteNode(input){
        let node = input.parentNode;
        if (input.value == "" && input != document.getElementById('start')) {
            if (input.className == "val") {
                node.firstChild.className = "string";
                node.removeChild(node.firstChild.nextSibling);

                if (node.className == "node obj" && (node.firstChild == node.lastChild)) {
                    node.className = "node";
                }
                moveCursor("prev");
                node.removeChild(input);
            } else {
                moveCursor("prev");
                if (node.parentNode.firstChild == node.parentNode.lastChild) {
                    deleteCascade(node);
                } else {
                    node.parentNode.removeChild(input.parentNode);
                }
            }
        } else {
            input.value = "";
        }
    }
    function deleteCascade(node){
        if (node.parentNode.firstChild == node.parentNode.lastChild) {
            deleteCascade(node.parentNode);
            node.parentNode.parentNode.removeChild(node.parentNode);
        }
    }



    function moveCursor(direction){
        let inputs = document.getElementsByTagName("input");
        let active = document.activeElement;
        let pos = Array.from(inputs).indexOf(document.activeElement);

        if (direction == "prev") {
            let focus = inputs[pos - 1];
            if (typeof focus !== 'undefined' ) {
                focus.focus();
            } else {
                inputs[0].focus();
            }
        } else if (direction == "next") {
            let focus = inputs[pos + 1];
            if (typeof focus !== 'undefined' ) {
                focus.focus();
            } else {
                inputs[inputs.length - 1].focus();
            }
        }
    }





document.addEventListener("keydown", function(event){
    let active = document.activeElement;
    console.log(event.key);
    switch (event.key) {
        case "Enter":
        onEnter(active);
        break;
        case "ArrowUp":
        moveCursor("prev");
        break;
        case "ArrowDown":
        moveCursor("next");
        break;
        case "Delete":
        deleteNode(document.activeElement);
        break;
    }
})


var test = {
    tree: {
        kaas: "ja",
        origin: {
            list: {
                food:[
                    'pizza',
                    'pasta',
                ],
                drinks: [
                    'juice',
                    'beer'
                ]
            },
            list2: {
                wants: ['geld', 'moneys']
            },
        }
    },
    baas : {
        deken : "nee"
    }
};
