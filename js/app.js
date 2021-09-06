'use strict';
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
        }
    }
}
let wrapper = document.querySelector('.wrapper');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const pageSlider = new Swiper('.page', {
    // Перетаскивание на ПК
    simulateTouch: false,
    // Вертикальный слайдер
    direction: 'vertical',
    // Количество слайдов для показа
    slidesPerView: 'auto',
    // Включаем параллакс
    parallax: {
        enabled: true,
    },
    // Отключить предзагрузку всех картинок
    preloadImages: false,
    // Lazy Loading
    lazy: {
        // Подключать на старте переключения слайда
        loadOnTransitionStart: true,
        // Подключить предыдущую и следующие картинки
        loadPrevNext: false,
    },
    // Слежка за видимыми слайдами
    watchSlidesProgress: true,
    // Добавление класса видимым слайдам
    watchSlidesVisibility: true,
    // Управление клавиатурой
    keyboard: {
        // Включить\выключить
        enabled: true,
        // Включить\выключить
        // только когда слайдер
        // в пределах вьюпорта
        onlyInViewport: true,
        // Включить\выключить
        // управление клавишами
        // pageUp, pageDown
        pageUpDown: true,
    },
    // Управление колесом мыши
    mousewheel: {
        // Чувствительность колеса мыши
        sensitivity: 1,
        // Класс объекта на котором
        // будет срабатывать прокрутка мышью.
        //eventsTarget: ".image-slider"
    },

    // Отключение функцияонала если слайдеров меньше чем нужно
    watchOverflow: true,
    // Скорость
    speed: 800,
    // Обновить свайпер
    // при изменении элементов слайдера
    observer: true,

    // Обновить свайпер
    // при изменении родительских
    // элементов слайдера
    observeParents: true,

    // Обновить свайпер
    // при изменении дочерних
    // элементов слайда
    observeSlideChildren: true,
    // Пагинация
    pagination: {
        el: '.nav-page__pagination',
        type: 'bullets',
        clickable: 'true',
        bulletClass: 'nav-page__bullet',
        bulletActiveClass: 'nav-page__bullet_active',
        renderBullet: function (index, className) {
            if (index == 0) {
                return '<span class="' + className + '">start</span>';
            } else if (index == swiperWrapper.children.length - 1) {
                return '<span class="' + className + '">end</span>';
            } else {
                return '<span class="' + className + '">' + '0' + index + '</span>';
            }

        },
    },
    // Скролл
    scrollbar: {
        el: '.nav-page__scroll',
        dragClass: 'nav-page__drag-scroll',
        // Возможность перетаскивать скролл
        draggable: true,
    },
    // Отключаем автоинициализвции
    init: false,
    on: {
        // Событие инициализации слайдера
        init: function () {
            scrollDown();
            setScrollType();
            delFreemodeOnPhones();
            wrapper.classList.add('_loaded');
        },
        // Событие изменение слайдера
        resize: function () {
            setScrollType();
            delFreemodeOnPhones();
        },
        slideNextTransitionStart: function () {
            webpAdd();
        }
    },
});

// Scroll to content
function scrollDown() {
    const scrollIcon = document.querySelector('.scroll-down');
    if (scrollIcon) {
        scrollIcon.addEventListener('click', function (e) {
            pageSlider.slideNext(800, true)
            e.preventDefault();
        });
    }
}

// adding and deleteing freemode as need
function setScrollType() {
    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free')
        pageSlider.params.freeMode = false;
    }

    for (let index = 0; index < pageSlider.slides.length; index++) {
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.page__content');
        if (pageSlideContent && window.innerWidth > 767.98) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight;
            if (pageSlideContentHeight > window.innerHeight) {
                wrapper.classList.add('_free');
                pageSlider.params.freeMode = true;
                break;
            }
        }
    }
}
function delFreemodeOnPhones() {
    if (window.innerWidth < 767.98) {
        wrapper.classList.add('_free')
        pageSlider.params.freeMode = true;
    }
}

function webpAdd() {
    const loadedImages = document.querySelectorAll('.swiper-lazy-loaded');
    if (loadedImages.length > 0) {
        for (let index = 0; index < loadedImages.length; index++) {
            const loadedImage = loadedImages[index];
            const webp = loadedImage.previousElementSibling;
            if (webp && webp.tagName == 'SOURCE') {
                const dataImgSrc = loadedImage.getAttribute('src').split('.');
                if (dataImgSrc[1] !== 'svg') {
                    dataImgSrc[1] = 'webp'
                }
                const dataImgSrcWebp = dataImgSrc.join('.');
                webp.setAttribute('srcset', dataImgSrcWebp);
            }
        }

    }
}
// Init swiper
pageSlider.init();



function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

// * Минни версия Динамического адаптива
const parent_original = document.querySelector('.main-footer__content');
const parent = document.querySelector('.footer__body');
const item = document.querySelector('.main-footer__footer');
function dinamicAdaptive(e) {
	if (e.matches) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2])
			item.classList.add('done')
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2])
			item.classList.remove('done')
		}
	}
}
const mediaWidth = window.matchMedia('(max-width: 767.98px)');
mediaWidth.addListener(dinamicAdaptive)
dinamicAdaptive(mediaWidth);