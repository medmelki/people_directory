

function setActive(that, category){
    that.className += " info";
    $('.'+ category + 'Element').not(that).removeClass("info");
}
