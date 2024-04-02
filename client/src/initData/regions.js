const regions = [
    { id: 1, name: 'Алтайский край', isProduction: true },
    { id: 2, name: 'Амурская область', isProduction: true },
    { id: 3, name: 'Архангельская область', isProduction: true },
    { id: 4, name: 'Астраханская область', isProduction: true },
    { id: 5, name: 'Белгородская область', isProduction: true },
    { id: 6, name: 'Брянская область', isProduction: true },
    { id: 7, name: 'Владимирская область', isProduction: true },
    { id: 8, name: 'Волгоградская область', isProduction: true },
    { id: 9, name: 'Вологодская область', isProduction: true },
    { id: 10, name: 'Воронежская область', isProduction: true },
    { id: 11, name: 'Донецкая Народная Республика', isProduction: false },
    { id: 12, name: 'Еврейская автономная область', isProduction: true },
    { id: 13, name: 'Забайкальский край', isProduction: true },
    { id: 14, name: 'Запорожская область', isProduction: true },
    { id: 15, name: 'Ивановская область', isProduction: true },
    { id: 16, name: 'Иркутская область', isProduction: true },
    { id: 17, name: 'Кабардино-Балкарская Республика', isProduction: true },
    { id: 18, name: 'Калининградская область', isProduction: true },
    { id: 19, name: 'Калужская область', isProduction: true },
    { id: 20, name: 'Камчатский край', isProduction: true },
    { id: 21, name: 'Карачаево-Черкесская Республика', isProduction: true },
    { id: 22, name: 'Кемеровская область', isProduction: true },
    { id: 23, name: 'Кировская область', isProduction: true },
    { id: 24, name: 'Костромская область', isProduction: true },
    { id: 25, name: 'Краснодарский край', isProduction: true },
    { id: 26, name: 'Красноярский край', isProduction: true },
    { id: 27, name: 'Крым', isProduction: false },
    { id: 28, name: 'Курганская область', isProduction: true },
    { id: 29, name: 'Курская область', isProduction: true },
    { id: 30, name: 'Ленинградская область', isProduction: true },
    { id: 31, name: 'Липецкая область', isProduction: true },
    { id: 32, name: 'Луганская Народная Республика', isProduction: false },
    { id: 33, name: 'Магаданская область', isProduction: true },
    { id: 34, name: 'Москва', isProduction: true },
    { id: 35, name: 'Московская область', isProduction: true },
    { id: 36, name: 'Мурманская область', isProduction: true },
    { id: 37, name: 'Ненецкий автономный округ', isProduction: true },
    { id: 38, name: 'Нижегородская область', isProduction: true },
    { id: 39, name: 'Новгородская область', isProduction: true },
    { id: 40, name: 'Новосибирская область', isProduction: true },
    { id: 41, name: 'Омская область', isProduction: true },
    { id: 42, name: 'Оренбургская область', isProduction: true },
    { id: 43, name: 'Орловская область', isProduction: true },
    { id: 44, name: 'Пензенская область', isProduction: true },
    { id: 45, name: 'Пермский край', isProduction: true },
    { id: 46, name: 'Приморский край', isProduction: true },
    { id: 47, name: 'Псковская область', isProduction: true },
    { id: 48, name: 'Республика Адыгея', isProduction: true },
    { id: 49, name: 'Республика Алтай', isProduction: true },
    { id: 50, name: 'Республика Башкортостан', isProduction: true },
    { id: 51, name: 'Республика Бурятия', isProduction: true },
    { id: 52, name: 'Республика Дагестан', isProduction: true },
    { id: 53, name: 'Республика Ингушетия', isProduction: true },
    { id: 54, name: 'Республика Калмыкия', isProduction: true },
    { id: 55, name: 'Республика Карелия', isProduction: true },
    { id: 56, name: 'Республика Коми', isProduction: true },
    { id: 57, name: 'Республика Марий Эл', isProduction: true },
    { id: 58, name: 'Республика Мордовия', isProduction: true },
    { id: 59, name: 'Республика Саха (Якутия)', isProduction: true },
    { id: 60, name: 'Республика Северная Осетия — Алания', isProduction: true },
    { id: 61, name: 'Республика Татарстан', isProduction: true },
    { id: 62, name: 'Республика Тыва', isProduction: true },
    { id: 63, name: 'Республика Хакасия', isProduction: true },
    { id: 64, name: 'Ростовская область', isProduction: true },
    { id: 65, name: 'Рязанская область', isProduction: true },
    { id: 66, name: 'Самарская область', isProduction: true },
    { id: 67, name: 'Санкт-Петербург', isProduction: true },
    { id: 68, name: 'Саратовская область', isProduction: true },
    { id: 69, name: 'Сахалинская область', isProduction: true },
    { id: 70, name: 'Свердловская область', isProduction: true },
    { id: 71, name: 'Севастополь', isProduction: true },
    { id: 72, name: 'Смоленская область', isProduction: true },
    { id: 73, name: 'Ставропольский край', isProduction: true },
    { id: 74, name: 'Тамбовская область', isProduction: true },
    { id: 75, name: 'Тверская область', isProduction: true },
    { id: 76, name: 'Томская область', isProduction: true },
    { id: 77, name: 'Тульская область', isProduction: true },
    { id: 78, name: 'Тюменская область', isProduction: true },
    { id: 79, name: 'Удмуртская Республика', isProduction: true },
    { id: 80, name: 'Ульяновская область', isProduction: true },
    { id: 81, name: 'Хабаровский край', isProduction: true },
    { id: 82, name: 'Ханты-Мансийский автономный округ — Югра', isProduction: true },
    { id: 83, name: 'Херсонская область', isProduction: true },
    { id: 84, name: 'Челябинская область', isProduction: true },
    { id: 85, name: 'Чеченская Республика', isProduction: true },
    { id: 86, name: 'Чувашская Республика', isProduction: true },
    { id: 87, name: 'Чукотский автономный округ', isProduction: true },
    { id: 88, name: 'Ямало-Ненецкий автономный округ', isProduction: true },
    { id: 89, name: 'Ярославская область', isProduction: true },
];

export default regions;