/**
 * Created by orangeeeee on 2015/2/121.
 */
$(document).ready(function () {
    $('#copy-button').zclip({
        path: 'lib/ZeroClipboard.swf',
        copy:function(){return $('#result-area').val();}
    });
});
$(function() {

    $('#convert-button').click(function () {

        var inputStrings = document.getElementById('input-area').value.split('\n');
        var variableStrings = "";
        var methodStrings = "";

        $.each(inputStrings , function(i, value) {

            //isEmpty
            if(value != "") {

                var typeString = "String";

                var valueArray = value.split("\t");
                valueArray = valueArray.length > 1 ? valueArray : value.split(" ");

                //javadoc追加
                if(valueArray.length > 1) {
                    comment = valueArray[0];
                    value = valueArray[1];
                    variableStrings += "\t/** "+ comment +" */\n";
                }
                if($('#option1Chk').is(':checked')) {
                    var tmpValue = value.toLowerCase();
                    value = tmpValue.replace(/_./g, function(matched) {
                        return matched.charAt(1).toUpperCase();});
                }

                if(value.length > 2 && value.substr(0,2) == "is") {
                    typeString = "boolean";
                    variableStrings += "\tprivate " + typeString + " " + value + ";\n\n";
                    value = value.substring(2,value.length);
                }else{
                    variableStrings += "\tprivate " + typeString + " " + value + ";\n\n";
                }
                var option1 = document.getElementById('option1Chk').value;
                var fcUpVal = value.charAt(0).toUpperCase()
                    + (value.length == 1 ? "": value.substring(1,value.length));

                var getterPrefix = typeString == "boolean" ? "is" : "get";

                //getter setting
                methodStrings += "\tpublic " + typeString + " " + getterPrefix + fcUpVal + "() {" +
                    "\n\t\treturn " + value + ";\n\t}\n\n"

                //setter setting
                methodStrings += "\tpublic void set" + fcUpVal + "(" + typeString + " " + value + ") {\n" +
                    "\t\tthis." + value + " = " + value + ";\n\t}\n\n";

            }

        });

        document.getElementById('result-area').value = variableStrings + methodStrings;
    });
});
