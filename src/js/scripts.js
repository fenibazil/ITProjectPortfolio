// Включаем в сборку файл стилей
import '../styles/styles.scss';

// Библиотеки
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap; 

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import Choices from 'choices.js';

// Либа для инициализации модулей https://www.npmjs.com/package/module-dispatcher
// Вызывает метод init() у модулей на указанных страницах
const ModuleDispatcher = require('module-dispatcher');
const app = (function (app_) {
    'use strict';

    app_.init = function () {
        app.docReady(function () {
            /**
             * Инициализация модуль-диспетчера с библиотекой, указанной в output.library
             */
            new ModuleDispatcher({
                Library : app
            });
        });
    };

    return app_;
})({});

// Проверяем, что DOM загрузился: http://dustindiaz.com/smallest-domready-ever
app.docReady = function (f) {
    return /in/.test(document.readyState) ? window.setTimeout(app.docReady, 9, f) : f();
};

// базовые модули
app.defaultInit = require('./partials/default-init');

// Инициализация нужных модулей на всех страницах, отключать/подключать модули по необходимости
// если модуль нужен только для одной страницы - подключать через ModuleDispatcher на конкретной странице
module.exports = app;

app.defaultInit.init();