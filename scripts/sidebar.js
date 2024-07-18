export function sidebarToggleOpen(windowsize) {
    if (windowsize.matches) {
        document.querySelector(".sidebar").style.width = "100%";
        document.querySelector(".sidebar").style.textAlign = "center";
    } else {
        document.querySelector(".sidebar").style.width = "250px";
        document.querySelector(".sidebar").style.borderRight = "3px solid grey";
    }
};

export function sidebarToggleClose() {
    document.querySelector(".sidebar").style.width= "0"
    document.querySelector(".sidebar").style.border= "none"
}

