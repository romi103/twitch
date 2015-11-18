$(document).ready(function() {

    var streamLink = 'https://api.twitch.tv/kraken/streams/';
    var userLink = 'https://api.twitch.tv/kraken/users/';
    var profileLink ='http://www.twitch.tv/';
    var defaultLogoLink = "https://www.google.co.uk/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0CAcQjRxqFQoTCPPl1O6uk8kCFUa2Ggod1DUPvg&url=https%3A%2F%2Fpixabay.com%2Fen%2Fubuntu-logo-ubuntu-logo-linux-8647%2F&psig=AFQjCNFfmjBYjDcjgThGLxQ_jnbppGCT-A&ust=1447709099049019";
    var users = ["freecodecamp", "dotamajor", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "medrybw"]
    var active = [];
    var offline = [];

    //display users info
    function displayUser(user) {
        if (user.game) {
            $("#all, #online").append("<div class='channel'><a href='" + profileLink + user.name +"'><img class='image' src='" + user.logoLink + "'/><p>" + user.disname + "</p><p>" + user.game  + "<span> Live Stream <i class='fa fa-play-circle'></i></span></p></a></div>");
        } else {
            $("#all, #offline").append("<div class='channel'><a href='" + profileLink + user.name +"'><img class='image' src='" + user.logoLink + "'/><p>" + user.disname + "</p></div>");
        }
    }

    //logo default
    function defaultLogo(user) {
        if (user.logoLink === null) {
            user.logoLink = "log.png";
        }
    }

    //account object constructur
    function Account(name, disname, logoLink, game) {
        this.name = name;
        this.disname = disname;
        this.logoLink = logoLink;
        this.game = game;
    }

    //getting user info
    function getUserInfo(user) {
        $.getJSON(userLink + user + "").done(function(data) {
               $("#spinner").hide(); 

        }).done(function(data) {

            $.getJSON(streamLink + data.name + "", function(stream) {

                var streamStat = stream.stream;
                if (streamStat === null) {
                    var currentUserInfo = new Account(data.name, data.display_name, data.logo);
                    defaultLogo(currentUserInfo);

                } else {
                    var currentUserInfo = new Account(data.name, data.display_name, data.logo, stream.stream.game);
                    defaultLogo(currentUserInfo);
                }
                displayUser(currentUserInfo);

            });

        });
    }
    users.forEach(getUserInfo);
});
