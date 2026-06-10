import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ──────────────────────────────────────────────────────────────────────

const WORDS = [
  { youth: "Имба", elder: "Непобедимый / Слишком сильный", emoji: "💥", example: "Этот персонаж имба — никто не может его победить." },
  { youth: "Кринж", elder: "Стыдоба / Неловкость", emoji: "😬", example: "Смотреть старые фото — чистый кринж." },
  { youth: "Крипово", elder: "Жутко / Страшновато", emoji: "👻", example: "Этот фильм такой крипово снят!" },
  { youth: "Муд", elder: "Настроение / Состояние души", emoji: "🎭", example: "Сегодня у меня муд — лежать и ничего не делать." },
  { youth: "Свага", elder: "Стиль / Уверенность в себе", emoji: "😎", example: "Он вышел с такой свагой — все обернулись." },
  { youth: "Слэй", elder: "Блеск! / Великолепно!", emoji: "✨", example: "Ты слэй в этом платье, серьёзно!" },
  { youth: "Соус", elder: "Источник / Доказательство", emoji: "🔗", example: "Дай соус — где ты это прочитал?" },
  { youth: "Тильт", elder: "Злость / Выбит из колеи", emoji: "😡", example: "Три поражения подряд — я в тильте." },
  { youth: "Треш", elder: "Ужас / Полная чепуха", emoji: "🗑️", example: "Что за треш они показывают по ТВ." },
  { youth: "Чиназес", elder: "Отлично! / Классно!", emoji: "🤙", example: "Чиназес! Завтра едем на море!" },
  { youth: "Я в прайме", elder: "Я на пике / В лучшей форме", emoji: "🏅", example: "Мне 25, я в прайме — всё возможно." },
  { youth: "Альтушка", elder: "Девушка из субкультуры / Неформалка", emoji: "🖤", example: "Она альтушка — слушает инди и носит цепи." },
  { youth: "Анк", elder: "Ладно / Окей", emoji: "👌", example: "Анк, встречаемся в шесть." },
  { youth: "Бести", elder: "Лучшая подруга / Лучший друг", emoji: "💛", example: "Она моя бести с первого класса." },
  { youth: "Гигачад", elder: "Настоящий мужик / Крутой парень", emoji: "💪", example: "Он помог всем переехать — гигачад." },
  { youth: "ГГ", elder: "Молодец! / Хорошая игра!", emoji: "🏆", example: "Выиграл турнир — все написали «ГГ»." },
  { youth: "Гринфлаг", elder: "Хороший знак / Плюс в человеке", emoji: "🟢", example: "Он помыл посуду без напоминания — гринфлаг." },
  { youth: "Редфлаг", elder: "Тревожный знак / Плохое поведение", emoji: "🚩", example: "Он написал в два ночи «ты не спишь?» — редфлаг." },
  { youth: "Игрок", elder: "Тот кто играет чувствами / Ловелас", emoji: "🃏", example: "Не верь ему — он игрок, таких много." },
  { youth: "Лейм", elder: "Скучно / Неинтересно", emoji: "😴", example: "Эта вечеринка такая лейм, пойдём домой." },
  { youth: "Масик", elder: "Милашка / Котик", emoji: "🥰", example: "Ты мой масик, самый лучший!" },
  { youth: "Нормис", elder: "Обычный человек / Не в теме", emoji: "🙂", example: "Он нормис — даже не знает, кто такой скуф." },
  { youth: "NPC", elder: "Безликий / Живёт по шаблону", emoji: "🤖", example: "Он каждый день одно и то же — настоящий NPC." },
  { youth: "Пикми", elder: "Хочет понравиться любой ценой", emoji: "🙋", example: "Она согласна на всё лишь бы понравиться — пикми." },
  { youth: "Сигма", elder: "Одиночка / Сам по себе крутой", emoji: "🦁", example: "Он ни перед кем не прогибается — сигма." },
  { youth: "Скуф", elder: "Потасканный мужик / Дядька", emoji: "🧔", example: "Сидит скуф в майке и смотрит футбол." },
  { youth: "Соевый", elder: "Мягкотелый / Без характера", emoji: "🫘", example: "Он такой соевый — со всем соглашается." },
  { youth: "Стейси", elder: "Уверенная красотка / Топ-девушка", emoji: "💅", example: "Она зашла в комнату как стейси — все замолчали." },
  { youth: "Тарелочница", elder: "Та, что жалуется вечно / Нытик", emoji: "🍽️", example: "Она опять тарелочница — всё плохо и все виноваты." },
  { youth: "Темщик", elder: "Тот, кто всё усложняет / Провокатор", emoji: "🌀", example: "Не слушай его — он темщик, нагнетает." },
  { youth: "Токсик", elder: "Вредный человек / Злыдень", emoji: "☠️", example: "Не общайся с ним — он токсик." },
  { youth: "Тюбик", elder: "Тюфяк / Тряпка", emoji: "🧴", example: "Такой тюбик — даже постоять за себя не может." },
  { youth: "Фрешмен", elder: "Новичок / Первогодок", emoji: "🎒", example: "Он фрешмен — ещё не понимает как тут всё устроено." },
  { youth: "Агриться", elder: "Злиться / Раздражаться", emoji: "😤", example: "Не агрись, всё решаемо." },
  { youth: "Байтить", elder: "Провоцировать / Дразнить", emoji: "🎣", example: "Он байтит тебя — не ведись." },
  { youth: "Гостинг", elder: "Пропасть без объяснений / Бросить", emoji: "👻", example: "Он начал гостинг — просто перестал отвечать." },
  { youth: "Дабл-ю", elder: "Победа / W", emoji: "🥇", example: "Сдал экзамен на пятёрку — чистый дабл-ю." },
  { youth: "Дропнуть", elder: "Бросить / Перестать заниматься", emoji: "🗂️", example: "Он дропнул сериал на третьей серии." },
  { youth: "Киннить", elder: "Ассоциировать себя с персонажем", emoji: "🎭", example: "Я киню Германа из «Пиковой дамы» — такой же упрямый." },
  { youth: "Овершеринг", elder: "Слишком много рассказывать о себе", emoji: "📢", example: "Она занимается овершерингом — рассказала всё при первой встрече." },
  { youth: "Пон", elder: "Понятно / Ясно", emoji: "💡", example: "— Встречаемся в семь. — Пон." },
  { youth: "Рейдж-байт", elder: "Контент ради злости / Провокация", emoji: "😠", example: "Это рейдж-байт — специально сделано чтобы ты злился." },
  { youth: "Таскмаскинг", elder: "Делать вид, что занят / Имитация работы", emoji: "🎭", example: "Он таскмаскинг — открыл таблицы и листает соцсети." },
  { youth: "Ультануть", elder: "Применить крайнее средство / Пойти ва-банк", emoji: "💣", example: "Он ультанул — позвонил директору напрямую." },
  { youth: "POV", elder: "Точка зрения / С позиции кого-то", emoji: "📹", example: "POV: ты опоздал на работу и видишь начальника." },
  { youth: "База", elder: "Абсолютно верно / Согласен", emoji: "✅", example: "— Надо больше спать. — База." },
  { youth: "Базовый минимум", elder: "Самое необходимое / Элементарно", emoji: "📋", example: "Помыть посуду — это базовый минимум." },
  { youth: "Брейнрот", elder: "Деградация / Тупеешь от контента", emoji: "🧠", example: "Три часа тиктока — чистый брейнрот." },
  { youth: "Вумэн-момент / Мэн-момент", elder: "Типичное женское / мужское поведение", emoji: "🙄", example: "Забыл купить хлеб — чистый мэн-момент." },
  { youth: "Дрипчик ракнут", elder: "Стильно одет / Выглядит круто", emoji: "👗", example: "Он пришёл — дрипчик ракнут, все смотрят." },
  { youth: "КМК", elder: "По-моему / Как мне кажется", emoji: "🤔", example: "КМК, это плохая идея." },
  { youth: "Кенселинг", elder: "Публичная отмена / Бойкот", emoji: "🚫", example: "Его подвергли кенселингу после скандала." },
  { youth: "Норм или стрём?", elder: "Нормально или странно?", emoji: "🤷", example: "Написать ему первой — норм или стрём?" },
  { youth: "Окак", elder: "Окей / Хорошо", emoji: "👍", example: "— Приедешь в восемь? — Окак." },
  { youth: "Оплата у психолога не прошла", elder: "Ведёшь себя странно / Не в себе", emoji: "🛋️", example: "Ты зачем так сделал? Оплата у психолога не прошла?" },
  { youth: "Пояснительная бригада", elder: "Объясни подробнее / Давай разберём", emoji: "📖", example: "Вызываю пояснительную бригаду — что тут произошло?" },
  { youth: "Сам решу, сам решу-у", elder: "Разберусь сам / Не лезь", emoji: "🙅", example: "— Помочь? — Сам решу, сам решу-у." },
  { youth: "Имба-гайд", elder: "Отличная инструкция / Лучший совет", emoji: "📜", example: "Это имба-гайд по приготовлению пасты." },
  { youth: "Краш", elder: "Симпатия / Влюблённость", emoji: "💘", example: "Мой краш поставил лайк — весь день счастлива!" },
  { youth: "Геймер", elder: "Заядлый игрок в компьютерные игры", emoji: "🎮", example: "Он геймер — играет каждый вечер." },
  { youth: "Топчик", elder: "Лучшее / Высший класс", emoji: "🔝", example: "Этот ресторан — топчик, советую всем." },
  { youth: "Хайп", elder: "Шумиха / Ажиотаж", emoji: "🔥", example: "Вокруг этого фильма такой хайп!" },
  { youth: "Зашквар", elder: "Позор / Стыд", emoji: "🙈", example: "Прийти в старом пальто — зашквар." },
  { youth: "Флексить", elder: "Хвастаться / Красоваться", emoji: "💅", example: "Купил кроссовки и флексит в школе." },
  { youth: "Чиллить", elder: "Отдыхать / Ничего не делать", emoji: "🛋️", example: "Планы на выходные — чиллить дома." },
  { youth: "Постироничный", elder: "Как будто шутка, но серьёзно", emoji: "😏", example: "Он постиронично носит кепку козырьком назад." },
  { youth: "Сарказм", elder: "Насмешка / Едкая шутка", emoji: "🧂", example: "«Конечно, ты всегда прав» — это сарказм." },
  { youth: "Роуд-муви", elder: "Фильм о путешествии / История в дороге", emoji: "🚗", example: "Мы сняли своё роуд-муви за лето." },
  { youth: "Челлендж", elder: "Испытание / Задание напоказ", emoji: "🎯", example: "Он принял ледяной челлендж и выложил видео." },
  { youth: "Лайк", elder: "Отметка «нравится» / Одобрение", emoji: "👍", example: "Поставь лайк, если согласен." },
  { youth: "Репост", elder: "Поделиться записью / Переслать", emoji: "🔁", example: "Сделай репост — пусть все увидят." },
  { youth: "Сториз", elder: "Короткое фото или видео на 24 часа", emoji: "⭕", example: "Я выложила сториз с концерта." },
  { youth: "Тренд", elder: "Мода / Веяние времени", emoji: "📈", example: "Этот танец сейчас в тренде." },
  { youth: "Вайн", elder: "Короткое смешное видео", emoji: "📱", example: "Смотрели вайны до трёх ночи." },
  { youth: "Тиктокер", elder: "Блогер в TikTok", emoji: "🎬", example: "Она тиктокер — у неё миллион подписчиков." },
  { youth: "Субкультура", elder: "Молодёжная группа по интересам", emoji: "🎸", example: "Панки — это субкультура 70-х." },
  { youth: "Гипстер", elder: "Модник с необычным вкусом", emoji: "🧣", example: "Он гипстер — пьёт холодный кофе и читает Кафку." },
  { youth: "Инста", elder: "Instagram / Соцсеть с фото", emoji: "📸", example: "Добавь меня в инсту." },
  { youth: "Трэш", elder: "Ужас / Полный хаос", emoji: "🗑️", example: "Что за трэш тут творится!" },
  { youth: "Ламповый", elder: "Уютный / Тёплый и душевный", emoji: "🕯️", example: "Такой ламповый вечер с друзьями." },
  { youth: "Рофлить", elder: "Шутить / Смеяться", emoji: "😂", example: "Мы рофлили над этим мемом весь день." },
  { youth: "Лойс", elder: "Лайк / Отметка «нравится»", emoji: "❤️", example: "Лойс этому посту — всё правильно." },
  { youth: "Кек", elder: "Смешно / Хаха", emoji: "😄", example: "Кек, он серьёзно так сказал?" },
  { youth: "ЛОЛ", elder: "Смеюсь вслух / Очень смешно", emoji: "🤣", example: "ЛОЛ, это самое смешное что я слышал." },
  { youth: "ОМГ", elder: "О боже / Не может быть!", emoji: "😱", example: "ОМГ, ты видела что он написал?!" },
  { youth: "Йес", elder: "Да! / Ура!", emoji: "🙌", example: "Зарплата пришла — йес!" },
  { youth: "Абизяна", elder: "Обезьяна / Смешной неловкий человек", emoji: "🐒", example: "Упал с велосипеда как абизяна." },
  { youth: "Апгрейд", elder: "Улучшение / Обновление", emoji: "⬆️", example: "Надо сделать апгрейд телефона." },
  { youth: "Битва хайпов", elder: "Соревнование популярностей / Кто круче", emoji: "⚔️", example: "Между брендами идёт битва хайпов." },
  { youth: "Вау", elder: "Вот это да! / Удивительно!", emoji: "🤩", example: "Вау, ты это сам нарисовал?" },
  { youth: "Видео-контент", elder: "Видеоматериалы / Ролики", emoji: "🎥", example: "Они делают видео-контент для блога." },
  { youth: "Влог", elder: "Видеодневник / Видеоблог", emoji: "📷", example: "Она ведёт влог о путешествиях." },
  { youth: "Виртуальная реальность", elder: "VR / Компьютерный мир вместо настоящего", emoji: "🥽", example: "Он играл в виртуальной реальности весь вечер." },
  { youth: "Геймификация", elder: "Превращение в игру / Игровые элементы в жизни", emoji: "🎮", example: "В приложении есть геймификация — зарабатываешь баллы." },
  { youth: "Голосовой помощник", elder: "Говорящий робот / Алиса, Siri", emoji: "🗣️", example: "Я спросил голосового помощника." },
  { youth: "Гифка", elder: "Движущаяся картинка / Анимация", emoji: "🖼️", example: "Он ответил смешной гифкой." },
  { youth: "Донат", elder: "Пожертвование / Подарок блогеру", emoji: "💸", example: "Он задонатил стримеру сто рублей." },
  { youth: "Зарегать", elder: "Зарегистрироваться / Создать аккаунт", emoji: "📝", example: "Зарегай меня на этом сайте, пожалуйста." },
];

const ELDER_WORDS = [
  { elder: "Аршин", youth: "Старая мера длины (~71 см)", emoji: "📏", example: "Отмерь три аршина ткани на платье." },
  { elder: "Бердо", youth: "Часть ткацкого станка / Гребень для нитей", emoji: "🪢", example: "Бердо щёлкало в такт работе ткачихи." },
  { elder: "Болван", youth: "Дурак / Тупица", emoji: "🪆", example: "Эх ты, болван, всё напутал!" },
  { elder: "Бородник", youth: "Заросший мужик / Бородач", emoji: "🧔", example: "Пришёл какой-то бородник с ярмарки." },
  { elder: "Буерак", youth: "Яма / Овраг / Место бездорожья", emoji: "🏔️", example: "Телега застряла в буераке." },
  { elder: "Бурлак", youth: "Тот, кто тянет лодку / Тяжелый труд", emoji: "⚓", example: "Бурлаки тянули баржу вдоль Волги." },
  { elder: "Велосипед", youth: "Изобретать то, что уже есть", emoji: "🚲", example: "Не изобретай велосипед — всё уже придумано." },
  { elder: "Волость", youth: "Административный район / Округ", emoji: "🗺️", example: "Он был старостой волости." },
  { elder: "Горница", youth: "Лучшая комната в доме / Гостиная", emoji: "🏠", example: "Гостей принимали в горнице." },
  { elder: "Гусляр", youth: "Музыкант с гуслями / Народный певец", emoji: "🎵", example: "Гусляр пел о подвигах богатырей." },
  { elder: "Деверь", youth: "Брат мужа", emoji: "👨‍👦", example: "Деверь помог нам с переездом." },
  { elder: "Дьяк", youth: "Писарь / Чиновник / Грамотей", emoji: "✍️", example: "Дьяк записал все жалобы в книгу." },
  { elder: "Забрало", youth: "Опустить забрало / Стать серьёзным", emoji: "⚔️", example: "Рыцарь опустил забрало и двинулся в бой." },
  { elder: "Завсегда", youth: "Всегда / Постоянно", emoji: "🔄", example: "Он завсегда помогает соседям." },
  { elder: "Замолаживать", youth: "Становиться пасмурным / Холодает", emoji: "☁️", example: "Замолаживает — к вечеру будет дождь." },
  { elder: "Земляной вал", youth: "Защитная насыпь / Крепостная стена из земли", emoji: "🏰", example: "Город окружал высокий земляной вал." },
  { elder: "Золотарь", youth: "Тот, кто чистит выгребные ямы / Ассенизатор", emoji: "🚿", example: "Золотарь приехал раз в месяц." },
  { elder: "Казна", youth: "Государственные деньги / Бюджет", emoji: "💰", example: "Деньги уходили прямо в казну." },
  { elder: "Камчатка", youth: "Последняя парта / Подальше от учителя", emoji: "🗺️", example: "Он всегда сидел на камчатке." },
  { elder: "Капкан", youth: "Ловушка / Западня", emoji: "🪤", example: "Охотник поставил капкан у норы." },
  { elder: "Кирка", youth: "Инструмент для рубки / Кайло", emoji: "⛏️", example: "Шахтёр работал киркой весь день." },
  { elder: "Коврига", youth: "Большой круглый хлеб / Буханка", emoji: "🍞", example: "На столе лежала целая коврига хлеба." },
  { elder: "Копейка", youth: "Мелкая монета / Копейки (немного денег)", emoji: "🪙", example: "Копейка рубль бережёт." },
  { elder: "Косарь", youth: "Тысяча рублей / Тот, кто косит траву", emoji: "🌾", example: "Одолжи косарь до получки." },
  { elder: "Крестьянин", youth: "Сельский житель / Землепашец", emoji: "👨‍🌾", example: "Крестьянин встал до рассвета." },
  { elder: "Курень", youth: "Казачий дом / Хата", emoji: "🏡", example: "Казаки жили в куренях станицы." },
  { elder: "Лавка", youth: "Скамья / Небольшой магазин", emoji: "🛋️", example: "Сидели на лавке у ворот." },
  { elder: "Лапоть", youth: "Плетёная обувь / Бедный деревенский", emoji: "👟", example: "Лапти носили бедные крестьяне." },
  { elder: "Лихоимец", youth: "Взяточник / Жадный мошенник", emoji: "🤑", example: "Чиновник оказался лихоимцем." },
  { elder: "Медок", youth: "Сладкий мёд / Ласково о мёде", emoji: "🍯", example: "Выпил стакан молока с медком." },
  { elder: "Милостыня", youth: "Подаяние / Помощь бедным деньгами", emoji: "🙏", example: "Нищий просил милостыню у церкви." },
  { elder: "Монастырь", youth: "Религиозная обитель / Место уединения монахов", emoji: "⛪", example: "Он ушёл в монастырь." },
  { elder: "Наряд", youth: "Красивая одежда / Праздничное платье", emoji: "👗", example: "Она надела свой лучший наряд." },
  { elder: "Невеста", youth: "Девушка перед свадьбой / Будущая жена", emoji: "💍", example: "Невеста была в белом платье." },
  { elder: "Оброк", youth: "Дань / Платёж за землю", emoji: "📜", example: "Крестьяне платили оброк барину." },
  { elder: "Ухват", youth: "Инструмент для горшков в печи", emoji: "🍳", example: "Бабушка вытащила горшок ухватом." },
  { elder: "Пахарь", youth: "Тот, кто пашет землю / Труженик", emoji: "🌱", example: "Пахарь работал от зари до зари." },
  { elder: "Плаха", youth: "Колода для казни / Жертвенное место", emoji: "🪓", example: "Осуждённого вывели на плаху." },
  { elder: "Похлёбка", youth: "Простой суп / Жидкое варево", emoji: "🍵", example: "Похлёбка из капусты грела душу." },
  { elder: "Пряник", youth: "Сладкая выпечка / Кто угождает", emoji: "🍪", example: "Тула славится своими пряниками." },
  { elder: "Работяга", youth: "Трудяга / Тот, кто много работает", emoji: "🔧", example: "Он настоящий работяга — уходит последним." },
  { elder: "Распутник", youth: "Гуляка / Человек без моральных устоев", emoji: "🃏", example: "Он известный распутник в округе." },
  { elder: "Ремесленник", youth: "Мастер / Тот, кто делает вещи руками", emoji: "🪛", example: "Ремесленник сшил сапоги за три дня." },
  { elder: "Сенокос", youth: "Заготовка сена / Косить траву летом", emoji: "🌿", example: "В июле начинался сенокос." },
  { elder: "Сотник", youth: "Командир сотни / Офицер", emoji: "⚔️", example: "Сотник повёл войско в атаку." },
  { elder: "Судьба", youth: "То, что предначертано / Жизненный путь", emoji: "🎲", example: "Такова уж судьба — не поспоришь." },
  { elder: "Терем", youth: "Высокий богатый дом / Башня", emoji: "🏯", example: "Царевна сидела в тереме." },
  { elder: "Торба", youth: "Мешок / Сумка", emoji: "👜", example: "Он тащил торбу с рынка." },
  { elder: "Угол", youth: "Снятый угол / Комната в аренду", emoji: "🏠", example: "Снять угол в городе стоило дёшево." },
  { elder: "Царевна", youth: "Дочь царя / Принцесса", emoji: "👸", example: "Царевна ждала суженого." },
  { elder: "Чернила", youth: "Тушь для письма / Краска для ручки", emoji: "🖊️", example: "Перо макали в чернила." },
  { elder: "Ямщик", youth: "Кучер / Возница почтовой кареты", emoji: "🐴", example: "Ямщик гнал лошадей сквозь метель." },
  { elder: "Яхонт", youth: "Рубин или сапфир / Драгоценность", emoji: "💎", example: "Серьги с яхонтами стоили целое состояние." },
  { elder: "Алчность", youth: "Жадность / Желание иметь больше", emoji: "💰", example: "Его погубила алчность." },
  { elder: "Батрак", youth: "Наёмный работник / Поденщик", emoji: "🌾", example: "Батраки работали на чужих полях." },
  { elder: "Боярин", youth: "Знатный господин / Богатый дворянин", emoji: "👑", example: "Боярин въехал в город на белом коне." },
  { elder: "Ватага", youth: "Компания / Шумная банда", emoji: "👥", example: "Ватага ребят носилась по двору." },
  { elder: "Возница", youth: "Водитель телеги / Кучер", emoji: "🐎", example: "Возница правил лошадью умело." },
  { elder: "Гончар", youth: "Мастер глиняной посуды / Гончарное дело", emoji: "🏺", example: "Гончар лепил горшки на колесе." },
  { elder: "Дворянин", youth: "Благородный господин / Аристократ", emoji: "🎩", example: "Молодой дворянин прибыл в столицу." },
  { elder: "Духовник", youth: "Личный священник / Исповедник", emoji: "⛪", example: "Он исповедовался своему духовнику." },
  { elder: "Жалованье", youth: "Зарплата / Оклад", emoji: "💵", example: "Жалованье солдата было невелико." },
  { elder: "Землепашец", youth: "Фермер / Тот, кто пашет землю", emoji: "🌾", example: "Землепашец трудился с утра до ночи." },
  { elder: "Кабак", youth: "Таверна / Дешёвый бар", emoji: "🍺", example: "Мужики собирались в кабаке по вечерам." },
  { elder: "Козак", youth: "Казак / Вольный воин", emoji: "🏇", example: "Козаки охраняли границу." },
  { elder: "Кольчуга", youth: "Металлическая рубаха / Броня из колец", emoji: "🛡️", example: "Кольчуга защищала воина от стрел." },
  { elder: "Крепостной", youth: "Несвободный крестьянин / Раб помещика", emoji: "⛓️", example: "Крепостные не могли уйти с земли барина." },
  { elder: "Лукошко", youth: "Плетёная корзинка / Короб", emoji: "🧺", example: "Она собирала грибы в лукошко." },
  { elder: "Авось", youth: "Может повезёт / На удачу", emoji: "🍀", example: "Авось пронесёт — поедем без зонтика." },
  { elder: "Намедни", youth: "Недавно / На днях", emoji: "📅", example: "Намедни встретил старого друга на рынке." },
  { elder: "Давеча", youth: "Вчера / Позавчера", emoji: "🕰️", example: "Давеча смотрел хороший фильм по телевизору." },
  { elder: "Кумекать", youth: "Думать / Соображать", emoji: "🧠", example: "Надо покумекать, как это починить." },
  { elder: "Шамать", youth: "Есть / Кушать", emoji: "🍲", example: "Садитесь шамать, всё уже на столе!" },
  { elder: "Балаган", youth: "Бардак / Цирк", emoji: "🎪", example: "Что за балаган вы тут устроили!" },
  { elder: "Ухажёр", youth: "Парень / Тот кто ухаживает", emoji: "💐", example: "К ней ухажёр приходил каждый вечер." },
  { elder: "Голубчик", youth: "Дружище / Милый", emoji: "🕊️", example: "Голубчик, ты опять забыл позвонить!" },
  { elder: "Мотать на ус", youth: "Запоминать / Учиться на опыте", emoji: "📝", example: "Мотай на ус — потом пригодится." },
];

// Советы старших — молодёжи
const TIPS_TO_YOUTH = [
  {
    title: "Не торопитесь с выбором пути",
    text: "В 20 лет кажется, что надо всё решить прямо сейчас. Но жизнь длинная — ошибки поправимы, а опыт бесценен. Дайте себе время.",
    author: "Михаил Андреевич, 71 год",
    avatar: "👴",
    likes: 112,
  },
  {
    title: "Звоните родителям",
    text: "Не только когда нужны деньги или совет. Просто так. «Как дела?» — это самое важное, что вы можете сказать.",
    author: "Людмила Сергеевна, 65 лет",
    avatar: "👵",
    likes: 189,
  },
  {
    title: "Умейте слушать тишину",
    text: "Вы выросли с наушниками в ушах. Попробуйте иногда сидеть просто так, без музыки и телефона. Голова скажет спасибо.",
    author: "Иван Николаевич, 68 лет",
    avatar: "🧓",
    likes: 74,
  },
  {
    title: "Деньги — инструмент, не цель",
    text: "Мы жили скромно, но счастливо. Самое ценное в жизни — это люди рядом, а не вещи вокруг.",
    author: "Нина Петровна, 72 года",
    avatar: "👩‍🍳",
    likes: 95,
  },
  {
    title: "Учитесь готовить хотя бы три блюда",
    text: "Уметь накормить себя и близких — это не устаревший навык, это забота о себе. Борщ, каша и яичница — и вы уже не пропадёте.",
    author: "Тамара Васильевна, 70 лет",
    avatar: "👵",
    likes: 83,
  },
  {
    title: "Не сжигайте мосты",
    text: "Жизнь — штука круглая. Тот, с кем вы поссорились сегодня, завтра может оказаться рядом. Уходите красиво.",
    author: "Аркадий Фёдорович, 74 лет",
    avatar: "👴",
    likes: 67,
  },
];

// Советы молодёжи — старшим
const TIPS_TO_ELDER = [
  {
    title: "Не бойтесь интернета — он не кусается",
    text: "Начните с одного приложения — например, карты или погода. Потом сами не заметите, как освоитесь. Мы рядом, поможем!",
    author: "Маша, 19 лет",
    avatar: "👩‍💻",
    likes: 48,
  },
  {
    title: "Спрашивайте нас — мы не смеёмся",
    text: "Когда вы спрашиваете про телефон или соцсети, нам приятно помочь. Это не стыдно — мы тоже многого не знаем из вашего опыта.",
    author: "Дима, 22 года",
    avatar: "👨‍🎓",
    likes: 91,
  },
  {
    title: "Ваш жизненный опыт — это суперсила",
    text: "Вы прошли через столько всего, о чём мы только читали в книгах. Рассказывайте нам — мы реально хотим слушать.",
    author: "Аня, 17 лет",
    avatar: "👧",
    likes: 134,
  },
  {
    title: "Как настроить шрифт побольше на смартфоне",
    text: "Настройки → Экран → Размер текста. Сдвиньте ползунок вправо — и читать станет намного удобнее. Попробуйте!",
    author: "Артём, 24 года",
    avatar: "👨‍💻",
    likes: 77,
  },
  {
    title: "Мы тоже боимся будущего",
    text: "Кажется, что молодым всё просто. Но нас тоже пугает неизвестность. Ваши слова «всё будет хорошо» — не пустые слова, они правда помогают.",
    author: "Света, 20 лет",
    avatar: "👩‍🎓",
    likes: 156,
  },
  {
    title: "Голосовые сообщения — это удобно",
    text: "Не нужно набирать длинный текст — просто нажмите и говорите. Для пальцев и глаз намного легче. Покажем как!",
    author: "Коля, 18 лет",
    avatar: "🧑",
    likes: 62,
  },
];

const STORIES = [
  {
    name: "Виктор Степанович",
    age: "74 года",
    avatar: "👴",
    text: "Помню, как в 1975-м мы слушали «The Beatles» с соседом на одних наушниках. Сейчас мой внук показал, как искать любую песню за секунды. Времена меняются, но страсть к музыке — нет.",
    year: "1975 → 2024",
    color: "#ede8f8",
  },
  {
    name: "Катя",
    age: "17 лет",
    avatar: "👧",
    text: "Бабушка научила меня вязать во время карантина. Залипла на три часа. Сейчас веду тикток о вязании — уже 12 тысяч подписчиков. Оказывается, старое — это новое хипстерское.",
    year: "Весна 2020",
    color: "#fce8f4",
  },
  {
    name: "Алексей",
    age: "45 лет",
    avatar: "👨",
    text: "Когда-то папа учил меня забивать гвозди, я считал это устаревшим. Теперь сам учу сына — а он снимает об этом видео для ютуба. Умение из прошлого стало контентом будущего.",
    year: "Сквозь годы",
    color: "#e8eef8",
  },
  {
    name: "Зинаида Ивановна",
    age: "79 лет",
    avatar: "👵",
    text: "Внучка попросила показать старые фотографии. Мы просидели над альбомами до полуночи. Она снимала их на телефон и говорила: «Бабуль, это же история!» Впервые за долго я почувствовала, что меня по-настоящему слышат.",
    year: "Декабрь 2023",
    color: "#f0eafc",
  },
  {
    name: "Максим",
    age: "21 год",
    avatar: "👦",
    text: "Дед показал мне, как читать звёздное небо без приложений. Я вырос с навигатором в кармане и понятия не имел, что Большая Медведица — это не просто картинка из учебника. Теперь знаю.",
    year: "Лето 2022",
    color: "#e8f0fc",
  },
  {
    name: "Галина Фёдоровна",
    age: "67 лет",
    avatar: "🧓",
    text: "Думала, что в 65 уже поздно учиться новому. Внук настроил мне видеозвонки — и теперь каждое утро вижу правнука, хотя живём в разных городах. Слёзы радости — они одинаковые в любом возрасте.",
    year: "2021 → сейчас",
    color: "#fce8ec",
  },
  {
    name: "Соня",
    age: "15 лет",
    avatar: "🧒",
    text: "Прабабушка знает наизусть сотни стихов. Я попросила её записать голосовые — теперь слушаю перед сном. Это лучше любого подкаста. Её голос — самое тёплое, что у меня есть в телефоне.",
    year: "Зима 2023",
    color: "#ede8f8",
  },
  {
    name: "Пётр Михайлович",
    age: "71 год",
    avatar: "👴",
    text: "Сын объяснил мне, что такое мемы. Я не понял ничего. Но когда он смеялся, объясняя — я смеялся вместе с ним. Не над шуткой. Над тем, как он сиял рядом. Это и было главным.",
    year: "Будни 2024",
    color: "#e8f0fc",
  },
  {
    name: "Лиза",
    age: "23 года",
    avatar: "👩",
    text: "Мама не понимала, зачем я веду блог. Потом подписалась и однажды написала в личку: «Ты пишешь лучше меня». Это был лучший комплимент в моей жизни. От мамы.",
    year: "Осень 2022",
    color: "#fce8f4",
  },
  {
    name: "Николай Васильевич",
    age: "68 лет",
    avatar: "🧔",
    text: "Внучка показала мне, как делают рилсы. Я снял видео, как строгаю рубанком в гараже. Она смонтировала, поставила музыку. Сейчас у того видео 40 тысяч просмотров. Я до сих пор не верю.",
    year: "Февраль 2024",
    color: "#f0eafc",
  },
  {
    name: "Настя",
    age: "19 лет",
    avatar: "👩‍🎓",
    text: "На первом курсе было очень тяжело. Позвонила бабушке в слезах. Она не давала советов — просто слушала и говорила: «Я тебя люблю». Иногда это единственное, что нужно услышать.",
    year: "Сентябрь 2023",
    color: "#e8eef8",
  },
  {
    name: "Тамара Алексеевна",
    age: "72 года",
    avatar: "👵",
    text: "Мой сын подарил мне электронную книгу. Сначала я отказывалась — «не нужно это». Теперь читаю каждый вечер и увеличиваю шрифт сколько хочу. Он был прав. Иногда молодые тоже бывают правы.",
    year: "Рождество 2022",
    color: "#fce8ec",
  },
];

// ─── Notification Bell ─────────────────────────────────────────────────────────

const Bell = () => {
  const [ringing, setRinging] = useState(false);
  const [count, setCount] = useState(3);
  const [showPanel, setShowPanel] = useState(false);

  const ring = () => {
    setRinging(true);
    setTimeout(() => setRinging(false), 700);
    setShowPanel((v) => !v);
  };

  return (
    <div className="relative">
      <button
        onClick={ring}
        className="relative p-2 rounded-full hover:bg-[#ede8f8] transition-colors"
        title="Уведомления"
      >
        <span className={ringing ? "bell-shake inline-block" : "inline-block"}>
          <Icon name="Bell" size={22} style={{ color: "#8b72c8" }} />
        </span>
        {count > 0 && (
          <span className="absolute top-1 right-1 bg-[#8b72c8] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-golos font-bold">
            {count}
          </span>
        )}
      </button>
      {showPanel && (
        <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-[#ddd8f0] z-50 animate-fade-in-up p-4">
          <p className="font-cormorant text-lg font-semibold text-[#1e1830] mb-3">Уведомления</p>
          {[
            { icon: "💡", text: "Новый совет от Нины Петровны про огород" },
            { icon: "📅", text: "Событие «Цифровой чай» через 3 дня" },
            { icon: "📖", text: "Виктор добавил историю о путешествии" },
          ].map((n, i) => (
            <div
              key={i}
              className="flex gap-3 py-2 border-b border-[#ddd8f0] last:border-0 cursor-pointer hover:bg-[#ede8f8] rounded-lg px-2 transition-colors"
              onClick={() => setCount((c) => Math.max(0, c - 1))}
            >
              <span className="text-xl">{n.icon}</span>
              <p className="text-sm text-[#7068a0] leading-snug">{n.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Word Card ─────────────────────────────────────────────────────────────────

const WordCard = ({ w, i }: { w: (typeof WORDS)[0]; i: number }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="opacity-0-start animate-fade-in-up cursor-pointer"
      style={{ perspective: "800px", animationDelay: `${Math.min(i * 80, 500)}ms` }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        style={{
          transition: "transform 0.5s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          height: "160px",
        }}
      >
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" as const }}
          className="absolute inset-0 bg-white rounded-2xl border border-[#ddd8f0] p-5 flex flex-col justify-between card-hover shadow-sm"
        >
          <div>
            <span className="text-3xl">{w.emoji}</span>
            <p className="font-cormorant text-2xl font-semibold text-[#1e1830] mt-1">{w.youth}</p>
            <span className="tag-youth text-xs px-2 py-0.5 rounded-full font-golos font-medium">молодёжное</span>
          </div>
          <p className="text-xs text-[#7068a0] font-golos">Нажми, чтобы перевести →</p>
        </div>
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" as const,
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-[#ede8f8] rounded-2xl border border-[#c8bce8] p-5 flex flex-col justify-between shadow-sm"
        >
          <div>
            <span className="tag-elder text-xs px-2 py-0.5 rounded-full font-golos font-medium">по-взрослому</span>
            <p className="font-cormorant text-xl font-semibold text-[#1e1830] mt-2">{w.elder}</p>
          </div>
          <p className="text-sm text-[#7068a0] font-golos italic">«{w.example}»</p>
        </div>
      </div>
    </div>
  );
};

const ElderWordCard = ({ w, i }: { w: (typeof ELDER_WORDS)[0]; i: number }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="opacity-0-start animate-fade-in-up cursor-pointer"
      style={{ perspective: "800px", animationDelay: `${Math.min(i * 80, 500)}ms` }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        style={{
          transition: "transform 0.5s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          height: "160px",
        }}
      >
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" as const }}
          className="absolute inset-0 bg-[#e8eef8] rounded-2xl border border-[#b8cce8] p-5 flex flex-col justify-between card-hover shadow-sm"
        >
          <div>
            <span className="text-3xl">{w.emoji}</span>
            <p className="font-cormorant text-2xl font-semibold text-[#1e1830] mt-1">{w.elder}</p>
            <span className="tag-elder text-xs px-2 py-0.5 rounded-full font-golos font-medium">из прошлого</span>
          </div>
          <p className="text-xs text-[#7068a0] font-golos">Нажми, чтобы перевести →</p>
        </div>
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" as const,
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-[#fce8f4] rounded-2xl border border-[#e8b8d4] p-5 flex flex-col justify-between shadow-sm"
        >
          <div>
            <span className="tag-youth text-xs px-2 py-0.5 rounded-full font-golos font-medium">по-молодёжному</span>
            <p className="font-cormorant text-xl font-semibold text-[#1e1830] mt-2">{w.youth}</p>
          </div>
          <p className="text-sm text-[#7068a0] font-golos italic">«{w.example}»</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

type Tab = "home" | "dictionary" | "tips" | "stories";

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [search, setSearch] = useState("");
  const [likedTips, setLikedTips] = useState<Record<string, boolean>>({});
  const [tipsTab, setTipsTab] = useState<"to_youth" | "to_elder">("to_youth");
  const [dictTab, setDictTab] = useState<"youth" | "elder">("youth");
  const heroRef = useRef<HTMLDivElement>(null);

  const filteredWords = WORDS.filter(
    (w) =>
      w.youth.toLowerCase().includes(search.toLowerCase()) ||
      w.elder.toLowerCase().includes(search.toLowerCase())
  );

  const filteredElderWords = ELDER_WORDS.filter(
    (w) =>
      w.elder.toLowerCase().includes(search.toLowerCase()) ||
      w.youth.toLowerCase().includes(search.toLowerCase())
  );

  const currentTips = tipsTab === "to_youth" ? TIPS_TO_YOUTH : TIPS_TO_ELDER;

  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: "home", label: "Главная", icon: "Home" },
    { key: "dictionary", label: "Словарь", icon: "BookOpen" },
    { key: "tips", label: "Советы", icon: "Lightbulb" },
    { key: "stories", label: "Истории", icon: "ScrollText" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-cream)" }}>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-[#ddd8f0]"
        style={{ backgroundColor: "rgba(246, 244, 252, 0.92)" }}
      >
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-float">🌉</span>
            <span className="font-cormorant text-xl font-semibold text-[#2d2318]">Мост поколений</span>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <button
                key={n.key}
                onClick={() => setTab(n.key)}
                className={`nav-link font-golos text-sm font-medium pb-0.5 ${
                  tab === n.key ? "active text-[#8b72c8]" : "text-[#7068a0]"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Bell />
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex items-center justify-around px-2 pb-2 gap-1">
          {navItems.map((n) => (
            <button
              key={n.key}
              onClick={() => setTab(n.key)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors ${
                tab === n.key ? "bg-[#ede8f8]" : ""
              }`}
            >
              <Icon
                name={n.icon}
                size={18}
                style={{ color: tab === n.key ? "#8b72c8" : "#7068a0" }}
              />
              <span
                className={`text-[10px] font-golos font-medium ${
                  tab === n.key ? "text-[#8b72c8]" : "text-[#7068a0]"
                }`}
              >
                {n.label}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 py-8 pb-16">

        {/* ════════════ HOME ════════════ */}
        {tab === "home" && (
          <div>
            {/* Hero */}
            <section
              ref={heroRef}
              className="relative rounded-3xl overflow-hidden mb-10"
              style={{
                background:
                  "linear-gradient(135deg, #fce8f4 0%, #ede8f8 50%, #d8e8f8 100%)",
              }}
            >
              <div className="texture-bg absolute inset-0" />
              <div className="relative grid md:grid-cols-2 gap-0 items-center">
                <div className="p-8 md:p-12">
                  <span className="inline-block bg-white/60 text-[#8b72c8] font-golos text-sm font-medium px-3 py-1 rounded-full mb-4 animate-fade-in">
                    💬 Говорим на одном языке
                  </span>
                  <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-[#1e1830] leading-tight mb-4 opacity-0-start animate-fade-in-up delay-100">
                    Когда слова<br />
                    <em>сближают</em>
                  </h1>
                  <p className="font-golos text-[#7068a0] text-base leading-relaxed mb-6 opacity-0-start animate-fade-in-up delay-200">
                    Молодёжь и старшее поколение — разные слова, общее сердце. Здесь мы переводим друг друга и учимся вместе.
                  </p>
                  <div className="flex gap-3 flex-wrap opacity-0-start animate-fade-in-up delay-300">
                    <button
                      onClick={() => setTab("dictionary")}
                      className="font-golos font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105 hover:shadow-md"
                      style={{ backgroundColor: "#8b72c8" }}
                    >
                      Открыть словарь
                    </button>
                    <button
                      onClick={() => setTab("stories")}
                      className="font-golos font-medium px-5 py-2.5 rounded-xl border border-[#c4b5e8] text-[#1e1830] bg-white/60 hover:bg-white transition-all"
                    >
                      Читать истории
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://cdn.poehali.dev/projects/0045c45d-b857-4d28-85c9-c4417bb90732/files/1ab4e009-e621-4f8f-9d35-8e2b4b395862.jpg"
                    alt="Встреча поколений"
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { num: "150+", label: "слов в словаре", icon: "📚" },
                { num: "12", label: "историй", icon: "✨" },
                { num: "12", label: "советов", icon: "💡" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="opacity-0-start animate-fade-in-up bg-white rounded-2xl p-4 text-center border border-[#ddd8f0] shadow-sm"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <p className="text-2xl mb-1">{s.icon}</p>
                  <p className="font-cormorant text-3xl font-semibold text-[#8b72c8]">{s.num}</p>
                  <p className="font-golos text-xs text-[#7068a0] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Word of day */}
            <section className="bg-white rounded-3xl border border-[#ddd8f0] p-6 mb-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h2 className="font-cormorant text-2xl font-semibold text-[#1e1830]">Слово дня</h2>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 bg-[#fce8f4] rounded-2xl p-5">
                  <span className="tag-youth text-xs px-2 py-0.5 rounded-full font-golos font-medium">молодёжное</span>
                  <p className="font-cormorant text-3xl font-semibold text-[#1e1830] mt-2">Вайб</p>
                  <p className="font-golos text-sm text-[#7068a0] mt-1">«Здесь классный вайб — хочется остаться!»</p>
                </div>
                <div className="hidden md:flex text-3xl text-[#8b72c8] font-cormorant px-4">→</div>
                <div className="flex-1 bg-[#e8eef8] rounded-2xl p-5">
                  <span className="tag-elder text-xs px-2 py-0.5 rounded-full font-golos font-medium">по-взрослому</span>
                  <p className="font-cormorant text-3xl font-semibold text-[#1e1830] mt-2">Атмосфера / Настроение</p>
                  <p className="font-golos text-sm text-[#7068a0] mt-1">Общее чувство и дух места или компании</p>
                </div>
              </div>
            </section>

            {/* Section previews */}
            <div className="grid md:grid-cols-2 gap-5">
              <div
                className="rounded-3xl overflow-hidden cursor-pointer card-hover shadow-sm border border-[#ddd8f0]"
                onClick={() => setTab("tips")}
              >
                <img
                  src="https://cdn.poehali.dev/projects/0045c45d-b857-4d28-85c9-c4417bb90732/files/fda53e7d-67ae-4f07-a17b-2ce487a50484.jpg"
                  alt="Советы"
                  className="w-full h-44 object-cover"
                />
                <div className="bg-white p-5">
                  <h3 className="font-cormorant text-xl font-semibold text-[#1e1830]">💡 Советы и опыт</h3>
                  <p className="font-golos text-sm text-[#7068a0] mt-1">Молодёжь учит технологиям, старшие делятся мудростью</p>
                </div>
              </div>
              <div
                className="rounded-3xl overflow-hidden cursor-pointer card-hover shadow-sm border border-[#ddd8f0]"
                onClick={() => setTab("stories")}
              >
                <img
                  src="https://cdn.poehali.dev/projects/0045c45d-b857-4d28-85c9-c4417bb90732/files/1ab4e009-e621-4f8f-9d35-8e2b4b395862.jpg"
                  alt="Истории"
                  className="w-full h-44 object-cover"
                />
                <div className="bg-white p-5">
                  <h3 className="font-cormorant text-xl font-semibold text-[#1e1830]">📖 Истории и воспоминания</h3>
                  <p className="font-golos text-sm text-[#7068a0] mt-1">Трогательные истории о том, как поколения нашли общий язык</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ DICTIONARY ════════════ */}
        {tab === "dictionary" && (
          <div>
            <div className="mb-6 opacity-0-start animate-fade-in-up">
              <h2 className="font-cormorant text-4xl font-semibold text-[#1e1830] mb-2">Словарь поколений</h2>
              <p className="font-golos text-[#7068a0]">Нажми на карточку, чтобы перевернуть и узнать перевод</p>
            </div>

            {/* Dict tabs */}
            <div className="flex gap-2 mb-5 opacity-0-start animate-fade-in-up delay-100">
              <button
                onClick={() => { setDictTab("youth"); setSearch(""); }}
                className={`font-golos font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  dictTab === "youth"
                    ? "text-white shadow-sm"
                    : "bg-white border border-[#ddd8f0] text-[#7068a0] hover:border-[#8b72c8]"
                }`}
                style={dictTab === "youth" ? { backgroundColor: "#8b72c8" } : {}}
              >
                <span>🤙</span> Словарь молодёжи
              </button>
              <button
                onClick={() => { setDictTab("elder"); setSearch(""); }}
                className={`font-golos font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  dictTab === "elder"
                    ? "text-white shadow-sm"
                    : "bg-white border border-[#ddd8f0] text-[#7068a0] hover:border-[#7db3d8]"
                }`}
                style={dictTab === "elder" ? { backgroundColor: "#7db3d8" } : {}}
              >
                <span>🌿</span> Словарь старших
              </button>
            </div>

            {/* Description strip */}
            <div
              className="rounded-2xl px-5 py-3 mb-5 opacity-0-start animate-fade-in-up delay-200 flex items-center gap-3"
              style={{ backgroundColor: dictTab === "youth" ? "#ede8f8" : "#d8e8f8" }}
            >
              <span className="text-xl">{dictTab === "youth" ? "🤙" : "🌿"}</span>
              <p className="font-golos text-sm" style={{ color: dictTab === "youth" ? "#6040a0" : "#2060a0" }}>
                {dictTab === "youth"
                  ? "Слова, которые используют молодые люди — с переводом для старшего поколения"
                  : "Старинные и народные слова — с объяснением для молодёжи"}
              </p>
            </div>

            <div className="relative mb-6 opacity-0-start animate-fade-in-up delay-200">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7068a0]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск слова..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#ddd8f0] bg-white font-golos text-[#1e1830] focus:outline-none focus:border-[#8b72c8] transition-colors"
              />
            </div>

            {dictTab === "youth" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredWords.map((w, i) => (
                    <WordCard key={w.youth} w={w} i={i} />
                  ))}
                </div>
                {filteredWords.length === 0 && (
                  <div className="text-center py-16 text-[#7068a0] font-golos">
                    <p className="text-4xl mb-3">🔍</p>
                    <p>Слово не найдено</p>
                  </div>
                )}
              </>
            )}

            {dictTab === "elder" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredElderWords.map((w, i) => (
                    <ElderWordCard key={w.elder} w={w} i={i} />
                  ))}
                </div>
                {filteredElderWords.length === 0 && (
                  <div className="text-center py-16 text-[#7068a0] font-golos">
                    <p className="text-4xl mb-3">🔍</p>
                    <p>Слово не найдено</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ════════════ TIPS ════════════ */}
        {tab === "tips" && (
          <div>
            <div className="mb-6 opacity-0-start animate-fade-in-up">
              <h2 className="font-cormorant text-4xl font-semibold text-[#1e1830] mb-2">Советы и опыт</h2>
              <p className="font-golos text-[#7068a0]">Два поколения — два взгляда на жизнь</p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-0 mb-6 opacity-0-start animate-fade-in-up delay-100 bg-[#ede8f8] p-1 rounded-2xl w-fit">
              <button
                onClick={() => setTipsTab("to_youth")}
                className={`font-golos font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  tipsTab === "to_youth"
                    ? "bg-white text-[#1e1830] shadow-sm"
                    : "text-[#7068a0] hover:text-[#1e1830]"
                }`}
              >
                🌿 Старшие → Молодёжи
              </button>
              <button
                onClick={() => setTipsTab("to_elder")}
                className={`font-golos font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  tipsTab === "to_elder"
                    ? "bg-white text-[#1e1830] shadow-sm"
                    : "text-[#7068a0] hover:text-[#1e1830]"
                }`}
              >
                🤙 Молодёжь → Старшим
              </button>
            </div>

            {/* Context banner */}
            <div
              className="rounded-2xl px-5 py-3 mb-6 opacity-0-start animate-fade-in-up delay-200 flex items-start gap-3"
              style={{ backgroundColor: tipsTab === "to_youth" ? "#e8eef8" : "#fce8f4" }}
            >
              <span className="text-2xl mt-0.5">{tipsTab === "to_youth" ? "🧓" : "👦"}</span>
              <p className="font-golos text-sm leading-relaxed" style={{ color: tipsTab === "to_youth" ? "#2060a0" : "#a03060" }}>
                {tipsTab === "to_youth"
                  ? "Люди с большим жизненным опытом делятся тем, что хотели бы сказать молодому поколению"
                  : "Молодые люди делятся тем, что хотели бы донести до старшего поколения"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {currentTips.map((tip, i) => {
                const key = `${tipsTab}-${i}`;
                const liked = !!likedTips[key];
                return (
                  <div
                    key={key}
                    className="bg-white rounded-3xl border border-[#ddd8f0] p-6 card-hover shadow-sm opacity-0-start animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{tip.avatar}</span>
                      <div>
                        <p className="font-golos font-semibold text-[#1e1830] text-sm">{tip.author}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-golos font-medium ${tipsTab === "to_youth" ? "tag-elder" : "tag-youth"}`}>
                          {tipsTab === "to_youth" ? "старшее поколение" : "молодёжь"}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-cormorant text-xl font-semibold text-[#1e1830] mb-2">{tip.title}</h3>
                    <p className="font-golos text-[#7068a0] text-sm leading-relaxed mb-4">{tip.text}</p>
                    <button
                      onClick={() => setLikedTips((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className="flex items-center gap-1.5 text-sm font-golos font-medium transition-all hover:scale-105"
                      style={{ color: liked ? "#8b72c8" : "#7068a0" }}
                    >
                      <Icon
                        name="Heart"
                        size={16}
                        style={{ fill: liked ? "#8b72c8" : "none", color: liked ? "#8b72c8" : "#7068a0" }}
                      />
                      {tip.likes + (liked ? 1 : 0)} Полезно
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════ STORIES ════════════ */}
        {tab === "stories" && (
          <div>
            <div className="mb-8 opacity-0-start animate-fade-in-up">
              <h2 className="font-cormorant text-4xl font-semibold text-[#1e1830] mb-2">Истории и воспоминания</h2>
              <p className="font-golos text-[#7068a0]">Жизнь — лучший учитель, а истории — мосты между людьми</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {STORIES.map((story, i) => (
                <div
                  key={i}
                  className="opacity-0-start animate-fade-in-up rounded-3xl border border-[#ddd8f0] overflow-hidden shadow-sm card-hover"
                  style={{ backgroundColor: story.color, animationDelay: `${i * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white shadow-sm border border-[#ddd8f0]">
                        {story.avatar}
                      </div>
                      <div>
                        <p className="font-cormorant text-lg font-semibold text-[#1e1830]">{story.name}</p>
                        <p className="font-golos text-xs text-[#7068a0]">
                          {story.age} · {story.year}
                        </p>
                      </div>
                    </div>
                    <blockquote className="font-cormorant text-lg italic text-[#1e1830] leading-relaxed border-l-4 border-[#8b72c8] pl-4">
                      {story.text}
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white border border-[#ddd8f0] rounded-3xl p-6 text-center shadow-sm opacity-0-start animate-fade-in-up delay-500">
              <p className="text-3xl mb-2">📝</p>
              <h3 className="font-cormorant text-2xl font-semibold text-[#1e1830] mb-1">Есть своя история?</h3>
              <p className="font-golos text-sm text-[#7068a0] mb-4">Поделись — она может стать чьим-то мостиком к пониманию</p>
              <button
                className="font-golos font-semibold text-sm px-6 py-2.5 rounded-xl text-white inline-block transition-all hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: "#8b72c8" }}
              >
                Рассказать историю
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#ddd8f0] py-6" style={{ backgroundColor: "var(--bg-sand)" }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-cormorant text-2xl text-[#1e1830] mb-1">🌉 Мост поколений</p>
          <p className="font-golos text-xs text-[#7068a0]">Сближаем людей через слова, истории и живое общение</p>
        </div>
      </footer>
    </div>
  );
}