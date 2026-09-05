const hamButton = document.querySelector('#ham-btn');
const navigation = document.querySelector('#nav-menu');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
});