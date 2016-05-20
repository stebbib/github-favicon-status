// ==UserScript==
// @name         Github Buildstatus in Favicon
// @namespace    http://koddsson.com/
// @version      0.1
// @description  Show the github build/merge status in the favicon.
// @author       koddsson@gmail.com
// @match        https://github.com/*/*/pull/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.favicon) {
        return;
    }

    var changeFavicon = function(iconURL) {
        var head = document.getElementsByTagName("head")[0];
        var newLink = document.createElement("link");
        newLink.type = "image/x-icon";
        newLink.rel = "icon";
        newLink.href = iconURL;
        removeExistingFavicons();
        head.appendChild(newLink);
    };
    var removeExistingFavicons = function() {
        var links = document.getElementsByTagName("link");

        Array.prototype.filter.call(links, function(link) {
            // TODO: Should this be more fine-grained? Not just throwing away all that have "icon" in rel?
            return /\bicon\b/i.test(link.getAttribute("rel"));
        }).forEach(function(link) {
            link.remove();
        });
    };

    // public

    window.favicon = {
        "change": function(iconURL) {
            if (iconURL !== "") {
                changeFavicon(iconURL);
            }
        },
    };

    // TODO: Fix these icons to be better colors.
    window.greenGithubIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACQ0lEQVR4AbXXzWsTQRiA8T0pxo/if6AQDTWCh4AHe3DWHlQoCHoSKqGp0UuRgl7EqwhiwI8oGrQepLbqSal3byIF0VakVjwIIqKmFTSmSVPz+iyssrw4ZDe7Bn6n7OFhYGbeccL+MhcO9qCICbzCIpq+RcxiAkX0wAkjzEdZ3EcdElIdk+iNE5BCBcuQLi2jglTUgCzmIQmZx7awAbuwAElYFTs7BWzHN8h/UkXWFrBWLzvqqEK69B0NSMAc1vwr4AZEuQ2DPKawAglo+yRgBQ+Rh8FdiHJNB2TRgignYQIKKKGIARjfAIZxHkMwAWcsu6M3GPAAouEETEyjEA2T+HvCLUE0nIOJqQTR8BMbvIAiREMLx2FiGkELoqHg+EthWyKTkEcQDeNewIytDiYhxyAaXjqWg2cJJkF70IYoX72AJkSpwiSsBlHqjuW2a8AkyEXLEmA9+w/BJGQQomHBC3gN0XAWJiEXIRpmvIB7tj8TXP45WLfhUYhFCSamMsRiyAvYiBpEwy+U4cJE1I+baEM0/PhzFHvGIAGPMQ3xvcdV5DvE9KOACj5AbDAWvA23qu04iwO4BVHeYh+Msh/vIgyrW/RAch0SMA0XTyJc0acgIZTh6IAU3kACRuHiNC5jBC6MxV6IFm4kA9L4BPF9xGGYCMQGn5HuNJbvUINoE88whacxAr4gF/ZhshkvIFqXAc+xKerTbDWuoBEjoIFLWBXncZrBOGoRAmq4g3Ss17GyDkeQQQ592O3rQw4ZDGI9nDB+A5lbH/6+dd5/AAAAAElFTkSuQmCC';
    window.yellowGithubIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABsFBMVEUAAAAiiFUmi1F5fgB7gAB5fgB7gAB7gAB5fgAqiFN7gAB5fgB5fgAliVEzgE15fgB5fgB7gAB5fgAkjFUojVR7gAB5fgAmiVApi1F7gAB7gAAui117gAB7gAB7gAB5fgB7gAAcjlV5fgB7gAAoi1QojFN7gAB7gAB7gAB5fgB7gAB5fgB7gAB7gAAojFInilN5fgAoilEni1J7gAAni1Eni1N7gAAni1Eni1J7gAB7gAB7gAB7gAAkklsoi1Ioi1N5fgB5fgB7gAB7gAAojFN5fgB5fgAni1F5fgB7gAAniVIoilMni1N5fgB7gAB7gAB5fgB5fgB7gAAmjFJ7gAAth0t5fgB7gAAmjVR5fgB7gAB7gAB7gAB7gAB5fgB7gAB7gAAojVEni1F5fgB5fgAnilEmjFB7gAApilN5fgB5fgB5fgAoilF7gAAoi1J7gAAojFN5fgArjlV7gAB5fgAojFN5fgAmjVF5fgB7gAB7gAB7gAAojFAni1V5fgB5fgAoh1Akkkl7gAB7gAB5fgArgFUniVV5fgB7gAArlVUmjFInilIoilEniU57gAB5fgDPotsOAAAAjnRSTlMAD2Wm0+757tIrqfanKQqZ+vrZKjrt7DYs7+wL2fby+NcJmJ5AX7P8/v6wpZX7c2KMTGOJYXuqbnCn94b1Dmds+7Gk0WbQ70Lr9EFTXO3VhI/RqGSTEfT9Q5vznbTK4JTjJk+c2khJ3CWXyr902HmRR9ck5+VZ6S/5yMbqMyHPzSAHkviQBiekogxdOz8NBizthwAAAAlwSFlzAAAASAAAAEgARslrPgAAAeZJREFUOMttUwdbE0EQHYKGUCQEIQIKAdwQo0BCU0AgAQUkooBGQJqFoqAUY5fQIfS5v8zO7B0X75jvvu/u5r1pO28BLi3DkXntutOZ5cp0ZIDdsnNyETX9yc27YYHz3QUK01Djt8ed/194IYOaohADsfCmiRcVs5/MKCLJ3lsGXlKqKYxZml4KsSxb4bfvSF95mVmAvip8kldZxYRq8t0V/pqA9N0LytDAfb94QMlqucE6CqsXQoTCjgYhGhqbmuVPCxXz0LQPuf4jYbFWHrlNnl87l31sJYS5345OcHBfdV1WQiTKZxaCNh47T9ism8ftgSc8eMhOeMpH1gt9hLfbcdEfJMYzcNLLewVBDNAc5eAhgu8KPBZVhD7ew3M7YZCBF/CSJTBkJwxzkyPwijc0Yq9QyevtgddKRmErIa523wxvRjnVWDyWDo+/DfJRT3QCTEp4ahpx5p1f54yH3O91BU3KbX4oQM31cZYcc/OEL3zStSPX/ZkEsSj/lmJfZIC+869oiCuuJL8sP1tjK6sRvcSaId9vSnKQ+I7442dai3qBXwlD1r+9iH/+1vwzCZR/PWlejI1NDkrLgNrWdvrV2tn1SadBkPDe/oHldqYOBy4z4OhRAux2fJJKnp6dnSZTg+em9wLOQBzZY/J7QQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wNS0xN1QxNDo0NToxNy0wNTowMK+RpdoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDUtMTdUMTQ6NDU6MTctMDU6MDDezB1mAAAAAElFTkSuQmCC';
    window.redGithubIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABelBMVEUAAAAiiFUmi1EmilEni1L2Lw32Lw0nilMqiFMni1H2Lw0oi1IliVEzgE0milL2Lw0ni1IkjFUojVT2Lw32Lw0miVApi1H2Lw0ui132Lw32Lw0ni1IcjlUni1Ini1Ioi1QojFMmjFP2Lw32Lw0ni1Mni1Ini1L2Lw0ojFInilMmilIoilEni1InjFIni1Eni1MnjFMni1Eni1L2Lw0mi1L2Lw0kklsoi1Ioi1MnilInilIni1IojFMni1Ini1H2Lw32Lw0niVIoilMni1Moi1Eni1Eni1InjFImjFImi1Ith0v2Lw0mjVQnilL2Lw0njFEoi1Ini1Ini1IojFMni1IojVEni1Eni1Ini1InilEmjFAni1IpilMnilMni1EoilEni1Eoi1Ini1MojFMrjlX2Lw0ni1IojFP2Lw0mjVEoi1Ini1L2Lw0ojFAni1Uni1Mni1Ioh1AkkkkmjFInilErgFUniVUni1IrlVUmjFInilIoilEniU72Lw2kmmqCAAAAfXRSTlMAD2Wm0+750iup9qcpCpn62So67ew2LO8L8vjXCZieQF+z/P6wpZX7c2KMTGOJYXuqbnD3hvUOZ2yxpNFm0ELr9EFTXNWEj6hkkxH9Q5vznbTK4JTjJk+c2khJ3CWXv3TYeZFHJOflWekvyMbqMyHPzSAHkpAGJ6IMXTs/DcZ2cTkAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAGfSURBVDjLbVNnQ8IwEI1FAUEBFVcdYagI7r2VigtFce8tbnGLM//d5FIobfo+5C73XsblLgjlUCBZCous1iKbRSpAIuzFDpKDw1lioEtdbqKD21WqW+4hAjxlGl9eQUzgrczyVdXEFF4752vY/g6vnqyV6VBXD4IGFmjEPn+A2mCQDoEmH25m0Ra4YIi5rRjjcERqw7itvaOTTrogF5ZtN2zZgw3ohbCTvl8feP1GQQTCA4NIAic0ZBQMw8kkjJx8KyxgBIhRNMaFomAciAkEj9Qn8niSJUymkBXezESAo1BXBFWUTXglxAW8DtOiIAZEBZoBOysK5oAYQ/PciifUqWku8OpFjII4j3eiRbgsWYor+XRiGZIkK4MIJaldXSNkfcOnahJh16baFklazS2aqG17h0139xi/f6C17iFriCPqrSnHWs1PcoI4b/lT6vYqZ+fD6hEXWV5tOZS6JOTqOu+KKn+Tyrb1Le1Y653/Xi94SGsf4/EJQjrB80v+13p9k/UC+f3D8Dszo1FNEP1MIRFf35n0z+/vTzoT+9Oi/97r9quCi4P4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA1LTE3VDE0OjQ3OjIwLTA1OjAw4ExMigAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNS0xN1QxNDo0NzoyMC0wNTowMJER9DYAAAAASUVORK5CYII=';

    window.setFavIconAfterStatus = function() {
        var indicator = document.querySelector('.branch-action');
        indicator = indicator.querySelector('.build-statuses-list');

        if (indicator && indicator.querySelector('.text-failure')) {
            window.favicon.change(redGithubIcon);
        } else if (indicator && indicator.querySelector('.text-pending')) {
            window.favicon.change(yellowGithubIcon);
        } else if (indicator && indicator.querySelector('.text-success')) {
            window.favicon.change(greenGithubIcon);
        }
    };

    document.body.addEventListener('DOMSubtreeModified', setFavIconAfterStatus);

    window.setFavIconAfterStatus();
})();
