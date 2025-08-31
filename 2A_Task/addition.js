document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Local storage se cart fetch karo
    console.log("Cart Loaded from localStorage:", cart); // Debugging ke liye

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cartItems"); // FIX: ID corrected
    const subtotalEl = document.getElementById("subtotal");
    const cartTotal = document.getElementById("cart-total");

    // 🛒 Cart ko UI me update karne ka function
    function updateCartUI() {
        cartItems.innerHTML = "";
        if (cart.length === 0) {
            cartItems.innerHTML = "<p class='text-center'>No products in the cart.</p>";
            subtotalEl.innerText = "0.00";
            cartTotal.innerText = "$0.00";
            cartCount.innerText = "0";
            return;
        }

        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            cartItems.innerHTML += `
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });

        let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.innerText = totalQuantity;
        subtotalEl.innerText = subtotal.toFixed(2);
        cartTotal.innerText = `$${subtotal.toFixed(2)}`;

        console.log("Cart Updated on UI:", cart); // Debugging ke liye
    }

    // 🛒 Add to Cart button event listener
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", function() {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));

            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            console.log("Item added to cart:", { name, price });

            // Local storage me cart save karo
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log("Cart saved to localStorage:", cart); // Debugging

            updateCartUI(); // Cart UI update karo
            new bootstrap.Offcanvas(document.getElementById("cartOffcanvas")).show(); // Cart ko show karo
        });
    });

    // 🌟 Page load par cart ko update karo
    updateCartUI();
});





















document.addEventListener("DOMContentLoaded", function () {
    const sortSelect = document.getElementById("sortSelect");
    const productDropDown = document.getElementById("productDropDown");

    // Select all product cards
    const productCards = Array.from(productDropDown.querySelectorAll(".col-md-3"));
    // Store the original index for default sorting
    productCards.forEach((card, index) => {
      card.dataset.originalIndex = index;
    });

    sortSelect.addEventListener("change", function () {
      const sortValue = this.value;
      // Get updated list of product cards
      let products = Array.from(productDropDown.querySelectorAll(".col-md-3"));

      if (sortValue === "default") {
        // Restore original order
        products.sort((a, b) => a.dataset.originalIndex - b.dataset.originalIndex);
      } else if (sortValue === "low-high") {
        // Sort by ascending price
        products.sort((a, b) => {
          const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
          const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
          return priceA - priceB;
        });
      } else if (sortValue === "high-low") {
        // Sort by descending price
        products.sort((a, b) => {
          const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
          const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
          return priceB - priceA;
        });
      } else {
        // For other options (popularity, rating, latest), simply reverse the order
        products.reverse();
      }

      // Remove existing product cards and re-append them in new order
      products.forEach(product => {
        productDropDown.appendChild(product);
      });
    });
  });




  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".color-btn").forEach(button => {
      button.addEventListener("click", function () {
        let parentDiv = this.closest(".col-md-3"); // Get the parent product div
        let imgElement = parentDiv.querySelector(".tshirt-img"); // Get the image element
        let newImg = this.getAttribute("data-img");

        if (imgElement.dataset.default === undefined) {
          imgElement.dataset.default = imgElement.src; // Store default image
        }

        imgElement.src = newImg; // Change image on click
      });

      button.addEventListener("dblclick", function () {
        let parentDiv = this.closest(".col-md-3");
        let imgElement = parentDiv.querySelector(".tshirt-img");

        if (imgElement.dataset.default) {
          imgElement.src = imgElement.dataset.default; // Reset to default image on double click
        }
      });
    });
  });  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".col-lg-3, .col-md-4, .col-sm-6").forEach(function (productCard) {
        let imgTag = productCard.querySelector(".tshirt-img"); // Image tag reference
        let defaultImg = imgTag.src; // Store default image

        productCard.querySelectorAll(".color-btn").forEach(function (button) {
            button.addEventListener("click", function () {
                let newImg = this.getAttribute("data-img"); // Get new image source
                imgTag.src = newImg; // Change the image
            });

            button.addEventListener("dblclick", function () {
                imgTag.src = defaultImg; // Reset to default image
            });
        });
    });
});



// Ensure code runs after DOM is loaded
    document.addEventListener("DOMContentLoaded", function() {
      const sortSelect = document.getElementById("sortSelect");
      const productDropDown = document.getElementById("productDropDown");

      // Select all product cards
      const productCards = Array.from(productDropDown.querySelectorAll(".col-md-3"));
      // Store the original index for default sorting
      productCards.forEach((card, index) => {
        card.dataset.originalIndex = index;
      });

      sortSelect.addEventListener("change", function () {
        const sortValue = this.value;
        // Get updated list of product cards
        let products = Array.from(productDropDown.querySelectorAll(".col-md-3"));

        if (sortValue === "default") {
          // Restore original order
          products.sort((a, b) => a.dataset.originalIndex - b.dataset.originalIndex);
        } else if (sortValue === "low-high") {
          // Sort by ascending price
          products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
            const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
            return priceA - priceB;
          });
        } else if (sortValue === "high-low") {
          // Sort by descending price
          products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
            const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
            return priceB - priceA;
          });
        } else {
          // For other options (popularity, rating, latest), simply reverse the order
          products.reverse();
        }

        // Remove existing product cards and re-append them in new order
        products.forEach(product => {
          productDropDown.appendChild(product);
        });
      });
    });
    document.addEventListener("DOMContentLoaded", function () {
      const products = document.querySelectorAll(".col-md-3");
  
      products.forEach((product) => {
          const defaultImg = product.querySelector(".tshirt-img").src;
          const colorBtns = product.querySelectorAll(".color-btn");
  
          colorBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                  const newImg = this.getAttribute("data-img");
                  product.querySelector(".tshirt-img").src = newImg;
              });
  
              btn.addEventListener("dblclick", function () {
                  product.querySelector(".tshirt-img").src = defaultImg;
              });
          });
      });
  });

  let cartCount = 0;
  let totalPrice = 0;

  document.getElementById("add-to-cart").addEventListener("click", function () {
      let quantity = parseInt(document.getElementById("quantity").value);
      let priceText = document.getElementById("product-price").innerText.replace("$", "");
      let price = parseFloat(priceText);

      cartCount += quantity;
      totalPrice += (price * quantity);

      document.getElementById("cart-count").innerText = cartCount;
      document.getElementById("cart-total").innerText = "$" + totalPrice.toFixed(2);
  });
  let selectedRating = 0;

  // रेटिंग चुनने के लिए इवेंट लिस्नर
  document.querySelectorAll(".star").forEach(star => {
      star.addEventListener("click", function () {
          selectedRating = this.getAttribute("data-value");
          document.querySelectorAll(".star").forEach(s => s.style.color = "#ccc");
          this.style.color = "gold";
          let prevSiblings = this.previousElementSibling;
          while (prevSiblings) {
              prevSiblings.style.color = "gold";
              prevSiblings = prevSiblings.previousElementSibling;
          }
      });
  });

  // सबमिट बटन इवेंट
  document.getElementById("submit").addEventListener("click", function () {
      if (selectedRating == 0) {
          alert("Please fill the rating before submitting.");
          return;
      }
      alert("Review submitted successfully!");
  });
