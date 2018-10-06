var profile = (function () {
    var full_name = "guest";

    var getName = function () {
        return full_name;
    };

    var setName = function (name) {
        console.log(name);
        full_name = name;
        console.log(full_name)
    };

    return {
        getName: getName,
        setName: setName
    }

})();

export default profile;