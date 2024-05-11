require(["dojo/_base/declare", "dojo/_base/lang", "dojo/aspect", "ecm/model/Desktop", "ecm/widget/DesktopPane"], function(declare, lang, aspect, desktop, DesktopPane) {
    /**
     * Use this function to add any global JavaScript methods your plug-in requires.
     */
    console.log("Desktop Content Plugin")
    aspect.after(DesktopPane.prototype, "desktopLoaded", function() {
        console.log("inside desktop load");
        /*
        <div style="height:40px;background:#184fec;width:100%;margin: 10px 0px;">
        
        <marquee style="font-size: 20px;color: #FFFFFF;font-family: 'Open Sans', sans-serif; padding:5px;">
         Please help us serve you better by raising a Sampark Request for any concerns related to DMS 2.0
        </marquee>
         
        </div>
        */
        if (this.desktopId == "icm") {
            var div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "40px";
            div.style.background = "#184fec";
            div.style.margin = "200px 0px";
            var marquee = document.createElement("marquee");
            marquee.setAttribute("style", "font-size: 20px;color: #FFFFFF;font-family: 'Open Sans', sans-serif; padding:5px;");
            marquee.innerHTML = "Please help us serve you better by raising a Sampark Request for any concerns related to DMS 2.0";
            div.appendChild(marquee);
            var mobilechild = document.getElementsByClassName("mobileQRBorder")[0];
            // var container = document.getElementById('ecm_widget_layout_NavigatorMainLayout_0_LoginPane');
            var container = document.getElementsByClassName("ecmLoginPane dijitStackContainer-child")[0];
            container.appendChild(div);
            container.removeChild(mobilechild);
        }
    });
});