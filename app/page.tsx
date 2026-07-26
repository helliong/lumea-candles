"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./page.module.scss";

const cx = (...names: Array<string | false>) =>
  names
    .filter((name): name is string => Boolean(name))
    .map((name) => styles[name])
    .join(" ");

type Product = {
  id: number;
  name: string;
  scent: string;
  price: number;
  image: string;
  category: "Ароматические" | "Интерьерные";
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Тихое утро",
    scent: "Инжир · сандал · белый чай",
    price: 2490,
    image: "/images/product-ceramic.png",
    category: "Ароматические",
    badge: "Бестселлер",
  },
  {
    id: 2,
    name: "Арка",
    scent: "Натуральный пчелиный воск",
    price: 1890,
    image: "/images/product-arch.png",
    category: "Интерьерные",
    badge: "Новая форма",
  },
  {
    id: 3,
    name: "После дождя",
    scent: "Ветивер · мох · кедр",
    price: 2490,
    image: "/images/product-ceramic.png",
    category: "Ароматические",
  },
  {
    id: 4,
    name: "Мягкий свет",
    scent: "Без аромата · соевый воск",
    price: 1690,
    image: "/images/product-arch.png",
    category: "Интерьерные",
  },
];

const Icon = ({ name }: { name: "search" | "bag" | "menu" | "close" }) => {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.7" />
        <path d="m16 16 4.3 4.3" />
      </>
    ),
    bag: (
      <>
        <path d="M5.5 8.5h13l1 12h-15l1-12Z" />
        <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
      </>
    ),
    menu: (
      <>
        <path d="M4 8h16M4 16h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Все свечи");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visibleProducts = useMemo(() => {
    if (activeFilter === "Все свечи") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  const cartProducts = cart
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean) as Product[];
  const total = cartProducts.reduce((sum, product) => sum + product.price, 0);

  const addToCart = (id: number) => {
    setCart((current) => [...current, id]);
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const closeAll = () => {
    setCartOpen(false);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <main className={styles.page}>
      <header className={styles["site-header"]}>
        <button
          className={styles["mobile-menu-button"]}
          type="button"
          aria-label="Открыть меню"
          onClick={() => setMenuOpen(true)}
        >
          <Icon name="menu" />
        </button>
        <a className={styles["logo"]} href="#" aria-label="LUMEA — на главную">
          LUMEA
        </a>
        <nav className={styles["desktop-nav"]} aria-label="Главная навигация">
          <a href="#collection">Коллекция</a>
          <a href="#scents">Ароматы</a>
          <a href="#about">О нас</a>
          <a href="#delivery">Доставка и оплата</a>
        </nav>
        <div className={styles["header-actions"]}>
          <button type="button" aria-label="Поиск" onClick={() => setSearchOpen(true)}>
            <Icon name="search" />
          </button>
          <button type="button" aria-label="Корзина" onClick={() => setCartOpen(true)}>
            <Icon name="bag" />
            <span className={styles["bag-count"]}>{cart.length}</span>
          </button>
        </div>
      </header>

      <section className={styles["hero"]}>
        <Image
          className={styles["hero-image"]}
          src="/images/hero-candles.png"
          alt="Авторские свечи LUMEA из натурального воска"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles["hero-shade"]} />
        <div className={styles["hero-copy"]}>
          <p className={styles["eyebrow"]}>Авторские свечи</p>
          <h1>Свет, который становится частью дома</h1>
          <p className={styles["hero-description"]}>
            Создаём свечи вручную небольшими партиями из натурального воска,
            чтобы в вашем доме стало больше тёплых моментов.
          </p>
          <a className={styles["primary-button"]} href="#collection">
            Смотреть коллекцию
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a className={styles["scroll-cue"]} href="#collection" aria-label="Прокрутить к коллекции">
          <span>Ниже — больше тепла</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className={styles["benefits"]} aria-label="Преимущества LUMEA">
        <div>
          <span>01</span>
          <p>Натуральный соевый и пчелиный воск</p>
        </div>
        <div>
          <span>02</span>
          <p>Ручная работа небольшими партиями</p>
        </div>
        <div>
          <span>03</span>
          <p>До 45 часов чистого горения</p>
        </div>
        <div>
          <span>04</span>
          <p>Упаковка без лишнего пластика</p>
        </div>
      </section>

      <section className={cx("collection", "section-shell")} id="collection">
        <div className={styles["section-heading"]}>
          <div>
            <p className={styles["eyebrow"]}>Наша коллекция</p>
            <h2>Выберите своё настроение</h2>
          </div>
          <p>
            Сложные, ненавязчивые ароматы и скульптурные формы для медленных
            вечеров, ранних завтраков и маленьких домашних ритуалов.
          </p>
        </div>

        <div className={styles["filters"]} role="group" aria-label="Фильтр коллекции">
          {["Все свечи", "Ароматические", "Интерьерные"].map((filter) => (
            <button
              className={activeFilter === filter ? styles.active : undefined}
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={styles["product-grid"]}>
          {visibleProducts.map((product) => (
            <article className={styles["product-card"]} key={product.id}>
              <div className={styles["product-image-wrap"]}>
                {product.badge && <span className={styles["product-badge"]}>{product.badge}</span>}
                <Image
                  src={product.image}
                  alt={`Свеча «${product.name}»`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
                <button
                  className={styles["quick-add"]}
                  type="button"
                  onClick={() => addToCart(product.id)}
                >
                  Добавить в корзину
                  <span aria-hidden="true">+</span>
                </button>
              </div>
              <div className={styles["product-meta"]}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.scent}</p>
                </div>
                <strong>{product.price.toLocaleString("ru-RU")} ₽</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles["mood-section"]} id="scents">
        <div className={styles["mood-image"]}>
          <Image
            src="/images/hero-candles.png"
            alt="Тёплая атмосфера со свечами LUMEA"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
        <div className={styles["mood-copy"]}>
          <p className={styles["eyebrow"]}>Аромат месяца</p>
          <h2>Тишина после дождя</h2>
          <p>
            Прохладный ветивер, влажный мох и мягкий кедр. Аромат чистого воздуха
            из открытого окна и вечера, который никуда не торопится.
          </p>
          <div className={styles["notes"]} aria-label="Ноты аромата">
            <span>Ветивер</span>
            <span>Мох</span>
            <span>Кедр</span>
          </div>
          <button className={styles["text-link"]} type="button" onClick={() => addToCart(3)}>
            Добавить аромат месяца — 2 490 ₽ <span>↗</span>
          </button>
        </div>
      </section>

      <section className={cx("story", "section-shell")} id="about">
        <div className={styles["story-number"]}>L / 01</div>
        <div className={styles["story-copy"]}>
          <p className={styles["eyebrow"]}>Сделано руками</p>
          <h2>В каждой свече — немного времени и много внимания</h2>
        </div>
        <div className={styles["story-text"]}>
          <p>
            Мы плавим воск, смешиваем ароматы и заливаем каждую форму вручную в
            нашей небольшой мастерской. Поэтому две свечи могут чуть отличаться —
            и в этом их красота.
          </p>
          <a href="#process">Как мы создаём свечи <span>→</span></a>
        </div>
      </section>

      <section className={styles["process"]} id="process">
        <div className={styles["process-title"]}>
          <p className={styles["eyebrow"]}>Наш процесс</p>
          <h2>От идеи до первого огонька</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <h3>Ищем настроение</h3>
            <p>Собираем аромат как историю: от первой свежей ноты до тёплого шлейфа.</p>
          </li>
          <li>
            <span>02</span>
            <h3>Заливаем вручную</h3>
            <p>Контролируем температуру воска и даём каждой свече спокойно застыть.</p>
          </li>
          <li>
            <span>03</span>
            <h3>Упаковываем с заботой</h3>
            <p>Используем бумагу, картон и материалы, которым легко дать вторую жизнь.</p>
          </li>
        </ol>
      </section>

      <section className={cx("delivery", "section-shell")} id="delivery">
        <p className={styles["eyebrow"]}>Доставка и забота</p>
        <h2>Тепло уже в пути</h2>
        <div className={styles["delivery-grid"]}>
          <article>
            <span>Бесплатно</span>
            <h3>Доставка от 5 000 ₽</h3>
            <p>Бережно упакуем заказ и отправим по России удобной службой доставки.</p>
          </article>
          <article>
            <span>Для подарка</span>
            <h3>Открытка с вашими словами</h3>
            <p>Добавьте текст при оформлении — мы подпишем карточку от руки.</p>
          </article>
          <article>
            <span>Спокойно</span>
            <h3>Обмен без сложностей</h3>
            <p>Если что-то случилось в пути, быстро заменим свечу или вернём оплату.</p>
          </article>
        </div>
      </section>

      <section className={styles["newsletter"]}>
        <div>
          <p className={styles["eyebrow"]}>Письма LUMEA</p>
          <h2>{subscribed ? "Спасибо, что вы с нами" : "Редкие письма о красивых моментах"}</h2>
        </div>
        {subscribed ? (
          <p className={styles["success-copy"]}>Первое тёплое письмо уже готовится.</p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (email.trim()) setSubscribed(true);
            }}
          >
            <label className={styles["sr-only"]} htmlFor="email">Электронная почта</label>
            <input
              id="email"
              type="email"
              placeholder="Ваш e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit">Подписаться <span>→</span></button>
          </form>
        )}
      </section>

      <footer className={styles.footer}>
        <div className={styles["footer-brand"]}>
          <a className={styles["logo"]} href="#">LUMEA</a>
          <p>Свет для моментов, которые хочется запомнить.</p>
        </div>
        <div className={styles["footer-links"]}>
          <div>
            <p>Магазин</p>
            <a href="#collection">Коллекция</a>
            <a href="#scents">Ароматы</a>
            <a href="#delivery">Доставка</a>
          </div>
          <div>
            <p>Помощь</p>
            <a href="mailto:hello@lumea.store">hello@lumea.store</a>
            <a href="#about">О бренде</a>
            <a href="#delivery">Уход за свечой</a>
          </div>
          <div>
            <p>Мы рядом</p>
            <a href="#">Telegram</a>
            <a href="#">Pinterest</a>
            <a href="#">ВКонтакте</a>
          </div>
        </div>
        <div className={styles["footer-bottom"]}>
          <span>© 2026 LUMEA</span>
          <span>Сделано с теплом</span>
        </div>
      </footer>

      <div
        className={cx("overlay", (cartOpen || searchOpen || menuOpen) && "visible")}
        onClick={closeAll}
      />

      <aside className={cx("drawer", cartOpen && "open")} aria-hidden={!cartOpen}>
        <div className={styles["drawer-header"]}>
          <div>
            <p className={styles["eyebrow"]}>Ваша корзина</p>
            <h2>{cart.length ? `${cart.length} ${cart.length === 1 ? "свеча" : "свечи"}` : "Пока пусто"}</h2>
          </div>
          <button type="button" aria-label="Закрыть корзину" onClick={() => setCartOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className={styles["cart-list"]}>
          {cartProducts.length ? cartProducts.map((product, index) => (
            <article className={styles["cart-item"]} key={`${product.id}-${index}`}>
              <Image src={product.image} alt="" width={82} height={102} />
              <div>
                <h3>{product.name}</h3>
                <p>{product.scent}</p>
                <strong>{product.price.toLocaleString("ru-RU")} ₽</strong>
              </div>
              <button type="button" onClick={() => removeFromCart(index)}>Убрать</button>
            </article>
          )) : (
            <div className={styles["empty-cart"]}>
              <span aria-hidden="true">◌</span>
              <p>Добавьте свечу, которая сделает ваш вечер немного теплее.</p>
              <button type="button" onClick={() => setCartOpen(false)}>Выбрать свечу</button>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className={styles["cart-footer"]}>
            <div><span>Итого</span><strong>{total.toLocaleString("ru-RU")} ₽</strong></div>
            <button type="button">Перейти к оформлению <span>→</span></button>
            <p>Доставка рассчитывается при оформлении</p>
          </div>
        )}
      </aside>

      <aside className={cx("search-panel", searchOpen && "open")} aria-hidden={!searchOpen}>
        <button type="button" aria-label="Закрыть поиск" onClick={() => setSearchOpen(false)}>
          <Icon name="close" />
        </button>
        <p className={styles["eyebrow"]}>Поиск по коллекции</p>
        <label className={styles["sr-only"]} htmlFor="search">Название или аромат</label>
        <input id="search" type="search" placeholder="Что будем искать?" />
        <p>Попробуйте: сандал, без аромата, подарок</p>
      </aside>

      <aside className={cx("mobile-menu", menuOpen && "open")} aria-hidden={!menuOpen}>
        <div>
          <a className={styles["logo"]} href="#" onClick={() => setMenuOpen(false)}>LUMEA</a>
          <button type="button" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Мобильная навигация">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Коллекция</a>
          <a href="#scents" onClick={() => setMenuOpen(false)}>Ароматы</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>О нас</a>
          <a href="#delivery" onClick={() => setMenuOpen(false)}>Доставка и оплата</a>
        </nav>
        <p>Свет для моментов, которые хочется запомнить.</p>
      </aside>
    </main>
  );
}
