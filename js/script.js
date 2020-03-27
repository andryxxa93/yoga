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

    let deadLine = '2020-03-29';
    
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - (new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t /(1000 * 60 * 60));
        

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            function updateClock() {
                let t = getTimeRemaining(endtime);

                function addZero(num) {
                    if(num <= 9) {
                        return '0' + num;
                    } else {
                        return num;
                    }
                }
                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);
    
            if (t.total <= 0) {
                let z = '00';
                hours.textContent = z;
                minutes.textContent = z;
                seconds.textContent = z;
            }
        }
    }

    setClock('timer', deadLine);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn');

    function showModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    descriptionBtn.forEach(function(item){
        item.addEventListener('click', function(){
        showModal();
        });
    });

    more.addEventListener('click', function() {
        showModal();
    });

    close.addEventListener('click', function() {
        hideModal();
    });
});