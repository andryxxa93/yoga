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

	info.addEventListener('click', (event) => {
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

	function openModal(event) {
		// определяем элементы на странцие
		const target = event.target,
			body = document.querySelector('body'),
			overlay = document.querySelector('.overlay'),
			close = document.querySelector('.popup-close');

		// открываем модальное окно    
		overlay.style.display = 'block';
		target.classList.add('more-splash');
		body.style.overflow = 'hidden';
		// закрываем модальное окно в случае нажатия на крести - close
		close.addEventListener('click', function(){
			overlay.style.display = 'none';
			target.classList.remove('more-splash');
			document.body.style.overflow = '';
		});
	}
		// опеределяем кнопку и начинаем за ней следить. В случае нажатия вызываем функция открытия
		document.querySelector('.more').addEventListener('click', openModal);
		// опеределяем массив кнопок, перебираем массив, запускаем слежение. В случае нажатия вызываем функцию закрытия
		document.querySelectorAll('.description-btn').forEach((item) => {
			item.addEventListener('click', openModal);
		});

		// Form

		let message = {
			loading: "Загрузка...",
			sucsess: "Спасибо! Скоро мы с Вами свяжемся!",
			failure: "Что-то пошло не так..."
		};
		
		let form = document.querySelector('.main-form'),
			formDown = document.querySelector('#form'),
			input = form.getElementsByTagName ('input'),
			statusMessage = document.createElement('div');
			 
		
			statusMessage.classList.add('status');
		
		function sendForm(elem){
		// создаём обработчик события реагирующий на отправку формы
			elem.addEventListener('submit', function (event) {
				// выключаем стандартное поведение браузера
				event.preventDefault();
				// добавляем в форму элемент 
				elem.appendChild(statusMessage);
			// прочитываем поля из выбранной формы
				let formData = new FormData(elem);
			// берем данные из переменной выше и вставляем в функцию отправки данных на сервер
			function postData() {
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			
					request.onreadystatechange = function () {
						if(request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 300) {
								resolve();
							} else {
								reject();
							}
						}
					};
			// перебираем форму с данными и записываем их в объект, потом форматируем в формат json и отправляем его на сервер
					let obj = {};
					formData.forEach (function (value, key) {
						obj[key] = value;
					});
					let json = JSON.stringify(obj);
					request.send(json);
		
				});
			}
			
			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			}
			
			postData (formData)
				.then (() => statusMessage.innerHTML = message.loading)
				.then (() => statusMessage.innerHTML = message.sucsess)
				.catch (() => statusMessage.innerHTML = message.failure)
				.then (clearInput);
			});
		
		}
		
		sendForm(form);
		sendForm(formDown);


		let sliderIndex = 1,
			slides = document.querySelectorAll('.slider-item'),
			prev = document.querySelector('.prev'),
			next = document.querySelector('.next'),
			dotsWrap = document.querySelector('.slider-dots'),
			dots = document.querySelectorAll('.dot');


			showSlides(sliderIndex);

			function showSlides(n) {

				if(n > slides.length) {
					sliderIndex = 1;
				}
				if(n < 1) {
					sliderIndex = slides.length;
				}

				slides.forEach((item) => item.style.display = 'none');
				dots.forEach((item) => item.classList.remove('dot-active'));

				slides[sliderIndex-1].style.display = 'block';
				dots[sliderIndex-1].classList.add('dot-active');
				
			}

			function plusSlides(n) {
				showSlides(sliderIndex += n);
			}
			function currentSlide(n) {
				showSlides(sliderIndex = n);
			}

			next.addEventListener('click', function() {
				plusSlides(1);
			});
			prev.addEventListener('click', function() {
				plusSlides(-1);
			});

			dotsWrap.addEventListener('click', function(event) {
				for (let i = 0; i < dots.length + 1; i++) {
					if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
						currentSlide(i);
					}
				}
			});

			let persons = document.querySelectorAll('.counter-block-input')[0],
				days =  document.querySelectorAll('.counter-block-input')[1],
				place = document.getElementById('select'),
				total = document.getElementById('total'),
				totalSum = 0,
				daysSum = 0,
				personsSum = 0;

				total.innerHTML = 0;

				persons.addEventListener('input', function() {
					personsSum = +this.value;
					totalSum = (personsSum + daysSum)*4000;

					if (days.value == '' || persons.value == '') {
						total.innerHTML = 0;
					} else {
						total.innerHTML = totalSum;
					}
				});

				days.addEventListener('input', function() {
					daysSum = +this.value;
					totalSum = (personsSum + daysSum)*4000;
					
					if ( persons.value == '' || days.value == '') {
						total.innerHTML = 0;
					} else {
						total.innerHTML = totalSum;
					}
				});

				place.addEventListener('change', function() {
					if(days.value == '' || persons.value == '') {
						total.innerHTML = 0;
					} else {
						let a = totalSum;
						total.innerHTML = a * this.options[this.selectedIndex].value;
					}
				});
});