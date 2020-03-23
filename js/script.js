window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    //функция которая будет скрывать ненужыне табы

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            //проходимся по всем элементам и удаляем класс show
            tabContent[i].classList.remove('show');
            // проходимся по всем элементам и добавляем класс hide
            tabContent[i].classList.add('hide'); 
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show'); 
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        //проверяем что мы нажали именно на тот таб
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    //скрываем все элементы
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
});