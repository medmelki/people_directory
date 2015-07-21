

function setActive(that, category){
    that.className += " info";
    $('.'+ category + 'Element').not(that).removeClass("info");
}

function setFocus(that){
    that.className += " focus";
    $('.navListItem').not(that).removeClass("focus");
}
