/* =========================================================
                    DAILY CART
                    MAIN JAVASCRIPT
========================================================= */


/* =========================================================
                    HERO IMAGE SLIDER
========================================================= */

let currentSlideIndex = 0;

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");


function showSlide(index) {

    if (slides.length === 0) {
        return;
    }

    if (index >= slides.length) {
        currentSlideIndex = 0;
    }

    else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    }

    else {
        currentSlideIndex = index;
    }


    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });


    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });


    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add("active");
    }


    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add("active");
    }

}


function changeSlide(direction) {

    showSlide(currentSlideIndex + direction);

}


function currentSlide(index) {

    showSlide(index);

}


setInterval(function() {

    changeSlide(1);

}, 5000);



/* =========================================================
                    CART SYSTEM
========================================================= */

let cart = [];



/* =========================================================
                    ADD TO CART
========================================================= */

function addToCart(productName) {

    const products =
        document.querySelectorAll(".product-card");

    let selectedProduct = null;


    const cleanProductName =
        String(productName)
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();


    products.forEach(function(product) {

        const nameElement =
            product.querySelector("h3");

        if (!nameElement) {
            return;
        }


        const name =
            nameElement.textContent
                .trim()
                .replace(/\s+/g, " ")
                .toLowerCase();


        if (name === cleanProductName) {

            selectedProduct = product;

        }

    });


    if (!selectedProduct) {

        alert("Product not found!");

        return;

    }


    /* PRODUCT INFORMATION */

    const nameElement =
        selectedProduct.querySelector("h3");


    const priceElement =
        selectedProduct.querySelector(".product-price");


    const imageElement =
        selectedProduct.querySelector("img");


    const categoryElement =
        selectedProduct.querySelector(".product-category");


    const name =
        nameElement
            ? nameElement.textContent
                .trim()
                .replace(/\s+/g, " ")
            : productName;


    /* PRICE */

    let price = "₹0";


    if (priceElement) {

        const priceMatch =
            priceElement.textContent.match(
                /₹\s*[\d,]+/
            );


        if (priceMatch) {

            price =
                priceMatch[0]
                    .replace(/\s+/g, "");

        }

    }


    /* IMAGE */

    const image =
        imageElement
            ? imageElement.getAttribute("src") || ""
            : "";


    /* CATEGORY */

    const category =
        categoryElement
            ? categoryElement.textContent
                .trim()
                .replace(/\s+/g, " ")
            : "PRODUCT";


    /* ADD PRODUCT */

    cart.push({

        name: name,

        price: price,

        image: image,

        category: category

    });


    updateCartCount();


    alert(
        name +
        " has been added to your cart!"
    );

}



/* =========================================================
                    CART COUNTER
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            cart.length;

    }

}



/* =========================================================
                    SHOW CART
========================================================= */

function showCart() {

    const oldModal =
        document.querySelector(
            ".cart-modal"
        );


    if (oldModal) {

        oldModal.remove();

    }


    const modal =
        document.createElement("div");


    modal.className =
        "cart-modal";


    const box =
        document.createElement("div");


    box.className =
        "cart-box";


    let cartHTML = `

        <div class="cart-header">

            <h2>
                🛒 Your Shopping Cart
            </h2>

            <span>
                ${cart.length}
                item${cart.length === 1 ? "" : "s"}
            </span>

        </div>

    `;


    /* EMPTY CART */

    if (cart.length === 0) {

        cartHTML += `

            <div class="empty-cart">

                <div style="font-size:50px;">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products to your cart!
                </p>

            </div>

        `;

    }


    /* CART PRODUCTS */

    else {

        let total = 0;


        cart.forEach(function(item, index) {

            const numericPrice =
                parseInt(
                    String(item.price)
                        .replace(/[^\d]/g, "")
                ) || 0;


            total += numericPrice;


            cartHTML += `

                <div class="cart-item">

                    <div class="cart-item-image">

                        ${
                            item.image
                            ?
                            `
                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >
                            `
                            :
                            ""
                        }

                    </div>


                    <div class="cart-item-info">

                        <span class="cart-category">
                            ${item.category || "PRODUCT"}
                        </span>

                        <h3>
                            ${item.name}
                        </h3>

                        <p class="cart-item-price">
                            ${item.price}
                        </p>

                    </div>


                    <button
                        type="button"
                        class="remove-cart"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            `;

        });


        /* TOTAL */

        cartHTML += `

            <div class="cart-total">

                <span>
                    Total
                </span>

                <strong>
                    ₹${total.toLocaleString("en-IN")}
                </strong>

            </div>

        `;

    }


    /* CLOSE BUTTON */

    cartHTML += `

        <button
            type="button"
            class="close-cart"
            onclick="closeCart()"
        >
            Close Cart
        </button>

    `;


    box.innerHTML =
        cartHTML;


    modal.appendChild(box);


    document.body.appendChild(modal);


    /* CLICK OUTSIDE */

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {

                closeCart();

            }

        }
    );

}



/* =========================================================
                    REMOVE FROM CART
========================================================= */

function removeFromCart(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {

        return;

    }


    cart.splice(index, 1);


    updateCartCount();


    showCart();

}



/* =========================================================
                    CLOSE CART
========================================================= */

function closeCart() {

    const modal =
        document.querySelector(
            ".cart-modal"
        );


    if (modal) {

        modal.remove();

    }

}
/* =========================================================
                    CATEGORY FILTER
========================================================= */

function filterCategory(category) {

    category =
        category
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    const buttons =
        document.querySelectorAll(
            ".category button, .category-tabs button"
        );


    /* ACTIVE BUTTON */

    buttons.forEach(function(button) {

        button.classList.remove("active");


        const buttonCategory =
            button.textContent
                .toLowerCase()
                .trim();


        if (
            buttonCategory === category
        ) {

            button.classList.add("active");

        }

    });


    /* FILTER PRODUCTS */

    products.forEach(function(product) {

        const productCategory =
            (
                product.getAttribute(
                    "data-category"
                ) || ""
            )
            .toLowerCase()
            .trim();


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

        }

        else {

            product.style.display = "none";

        }

    });


    /* SCROLL TO PRODUCTS */

    const productsSection =
        document.getElementById(
            "products"
        );


    if (productsSection) {

        productsSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}



/* =========================================================
                    PRODUCT SEARCH
========================================================= */

function searchProduct() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        return;

    }


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const message =
        document.getElementById(
            "searchMessage"
        );


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    /* EMPTY SEARCH */

    if (searchText === "") {

        products.forEach(function(product) {

            product.style.display = "";

        });


        if (message) {

            message.textContent = "";

        }


        return;

    }


    let found = false;


    /* SEARCH PRODUCTS */

    products.forEach(function(product) {

        const dataName =
            product.getAttribute(
                "data-name"
            ) || "";


        const heading =
            product.querySelector("h3");


        const headingName =
            heading
                ? heading.textContent
                : "";


        const productName =
            dataName || headingName;


        if (
            productName
                .toLowerCase()
                .includes(searchText)
        ) {

            product.style.display = "";

            found = true;

        }

        else {

            product.style.display =
                "none";

        }

    });


    /* SEARCH MESSAGE */

    if (message) {

        if (found) {

            message.textContent =
                "Searching for: " +
                searchInput.value;

        }

        else {

            message.textContent =
                "No product found for: " +
                searchInput.value;

        }

    }


    /* SCROLL TO PRODUCTS */

    if (found) {

        const productsSection =
            document.getElementById(
                "products"
            );


        if (productsSection) {

            productsSection.scrollIntoView({

                behavior: "smooth"

            });

        }

    }

}



/* =========================================================
                    SEARCH EVENTS
========================================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "keypress",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                searchProduct();

            }

        }
    );


    searchInput.addEventListener(
        "input",
        function() {

            if (
                this.value.trim() === ""
            ) {

                const products =
                    document.querySelectorAll(
                        ".product-card"
                    );


                products.forEach(
                    function(product) {

                        product.style.display =
                            "";

                    }
                );


                const message =
                    document.getElementById(
                        "searchMessage"
                    );


                if (message) {

                    message.textContent =
                        "";

                }

            }

        }
    );

}



/* =========================================================
                    CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const formMessage =
                document.getElementById(
                    "formMessage"
                );


            if (formMessage) {

                formMessage.textContent =
                    "Thank you! Your message has been submitted.";

            }


            this.reset();


            setTimeout(
                function() {

                    if (formMessage) {

                        formMessage.textContent =
                            "";

                    }

                },
                5000
            );

        }
    );

}



/* =========================================================
                    DARK MODE
========================================================= */

function toggleDarkMode() {

    document.body
        .classList
        .toggle("dark-mode");


    const themeButton =
        document.querySelector(
            ".theme-btn"
        );


    if (!themeButton) {

        return;

    }


    if (
        document.body
            .classList
            .contains("dark-mode")
    ) {

        themeButton.textContent =
            "☀️";

    }

    else {

        themeButton.textContent =
            "🌙";

    }

}



/* =========================================================
                    INITIAL SETUP
========================================================= */

showSlide(0);

filterCategory("all");

updateCartCount();