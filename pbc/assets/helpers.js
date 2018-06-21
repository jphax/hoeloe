function createFromJson(point, key = ""){
    console.log(point);
    let newNode = document.createElement("div");
    if (typeof(point) == 'object' && !Array.isArray(point)){
        newNode.className = "node obj";
        input = document.createElement('input');
        input.className = 'key';
        input.value = key;
        newNode.appendChild(input);
        console.log('obj');
        for (var key in point){
            if (typeof point[key] == "object") {
                newNode.appendChild(createFromJson(point[key], key));
            } else {
                newNode.appendChild(createNode(true, key, point[key]));
            }
        }

        return newNode;

    } else if (Array.isArray(point)){
        console.log('array');
        point.forEach(function (item){
            newNode.appendChild(createFromJson(item, newNode));
        });
        newNode.className = "node arr";
        return newNode;
    } else {
        console.log("other");
        return createNode(false, point)
    }
}
function testCascade(obj){
    for (var key in obj){
        console.log(obj[key]);
    }
}


var arr = ['asd', 'asd','sdf'];
