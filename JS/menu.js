document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menuIcon');
    var menuItems = document.querySelector('.menu-items');

    menuIcon.addEventListener('click', function() {
        if (menuItems.style.display === 'none' || menuItems.style.display === '') {
            menuItems.style.display = 'flex';
            menuItems.style.wrap = 'nowrap';
            menuItems.style.direction = 'column';
        } else {
            menuItems.style.display = 'none';
        }
    });
});