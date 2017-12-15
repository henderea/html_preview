export default {
    getValueFromState: function(obj, path) {
        var stack = path.split('.');
        var current = obj;
        while(stack.length) {
            current = current[stack.shift()];
        }

        return current;
    },
    setValueInState: function(obj, path, value) {
        var stack = path.split('.');
        var current = obj;
        while(stack.length > 1) {
            current = current[stack.shift()];
        }
        current[stack.shift()] = value;

        return obj;
    }
};