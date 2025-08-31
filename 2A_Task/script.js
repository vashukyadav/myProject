// Loop through each product div for color and size selection
document.querySelectorAll(".col-md-3").forEach((productDiv) => {
  let imgElement = productDiv.querySelector(".tshirt-img");
  let priceElement = productDiv.querySelector(".price");

  // Color selection for each product
  productDiv.querySelectorAll(".color-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let newImg = this.getAttribute("data-img");
      let newPrice = this.getAttribute("data-price");

      // Update image and price for this specific product
      imgElement.src = newImg;
      priceElement.innerText = newPrice;
    });
  });

  // Size selection with price update for each product
  productDiv.querySelectorAll(".size-box").forEach((size) => {
    size.addEventListener("click", function () {
      // Remove active class from all sizes in this product
      productDiv
        .querySelectorAll(".size-box")
        .forEach((s) => s.classList.remove("active"));

      // Add active class to the clicked size
      this.classList.add("active");

      // Update the price based on selected size
      let newPrice = this.getAttribute("data-price");
      priceElement.innerText = newPrice;
    });
  });
});

document.querySelectorAll(".col-md-3").forEach((productDiv) => {
  let imgElement = productDiv.querySelector(".tshirt-img");
  let priceElement = productDiv.querySelector(".price");

  productDiv.querySelectorAll(".color-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let newImg = this.getAttribute("data-img");
      let newPrice = this.getAttribute("data-price");
      imgElement.src = newImg;
      priceElement.innerText = newPrice;
    });
  });

  productDiv.querySelectorAll(".size-box").forEach((size) => {
    size.addEventListener("click", function () {
      productDiv
        .querySelectorAll(".size-box")
        .forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
      let newPrice = this.getAttribute("data-price");
      priceElement.innerText = newPrice;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const colorButtons = document.querySelectorAll(".color-btn");

  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const imgElement = this.closest(".col-md-3").querySelector(".tshirt-img");
      const newImg = this.getAttribute("data-img");

      if (!imgElement.dataset.default) {
        imgElement.dataset.default = imgElement.src;
      }

      imgElement.src = newImg;
    });

    button.addEventListener("dblclick", function () {
      const imgElement = this.closest(".col-md-3").querySelector(".tshirt-img");
      imgElement.src = imgElement.dataset.default;
    });
  });
});

let cartCount1 = 0;
let totalPrice1 = 0;

document.getElementById("add-to-cart").addEventListener("click", function () {
  let quantity = parseInt(document.getElementById("quantity").value);
  let priceText = document
    .getElementById("product-price")
    .innerText.replace("$", "");
  let price = parseFloat(priceText);

  cartCount1 += quantity;
  totalPrice1 += price * quantity;

  document.getElementById("cart-count").innerText = cartCount1;
  document.getElementById("cart-total").innerText =
    "$" + totalPrice1.toFixed(2);
});

let selectedRating = 0;

// रेटिंग चुनने के लिए इवेंट लिस्नर
document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function () {
    selectedRating = this.getAttribute("data-value");
    document.querySelectorAll(".star").forEach((s) => (s.style.color = "#ccc"));
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

const sortSelect = document.getElementById("sortSelect");
const productRow = document.getElementById("productRow");

// Store original order by setting a data attribute on each product card
const productCards = Array.from(productRow.querySelectorAll(".col-md-3"));
productCards.forEach((card, index) => {
  card.dataset.originalIndex = index;
});

sortSelect.addEventListener("change", function () {
  const sortValue = this.value;
  // Get current product cards into an array
  let products = Array.from(productRow.querySelectorAll(".col-md-3"));

  if (sortValue === "default") {
    // Restore original order
    products.sort((a, b) => a.dataset.originalIndex - b.dataset.originalIndex);
  } else if (sortValue === "low-high") {
    // Sort ascending by price (price extracted from .price text)
    products.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector(".price").textContent.replace("$", "")
      );
      const priceB = parseFloat(
        b.querySelector(".price").textContent.replace("$", "")
      );
      return priceA - priceB;
    });
  } else if (sortValue === "high-low") {
    // Sort descending by price
    products.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector(".price").textContent.replace("$", "")
      );
      const priceB = parseFloat(
        b.querySelector(".price").textContent.replace("$", "")
      );
      return priceB - priceA;
    });
  } else {
    // For other options (popularity, rating, latest), demonstration ke liye reverse order use kar rahe hain.
    products.reverse();
  }

  // Clear and re-append the sorted products to update the UI
  products.forEach((product) => {
    productRow.appendChild(product);
  });
});

// 🛒 Add to Cart button functionality
const addToCartBtn = document.getElementById("add-to-cart");
const cartItems = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");

addToCartBtn.addEventListener("click", function () {
  // Get the selected size (active button)
  const activeSizeButton = document.querySelector(
    "#size-options button.active-size"
  );
  const selectedSize = activeSizeButton
    ? activeSizeButton.textContent
    : "Not selected";

  // Get the selected color (from the color options)
  const activeColorOption = document.querySelector(".color-option.active");
  const selectedColor = activeColorOption
    ? activeColorOption.getAttribute("data-color")
    : "Not selected";

  // Get the quantity selected
  const quantity = document.getElementById("quantity").value;

  // Product price (for now, assuming price is $33)
  const price = parseFloat(
    document.getElementById("product-price").textContent.replace("$", "")
  );

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item", "d-flex", "align-items-center", "mb-3");

  // Product Image (based on selected color)
  // Product Image (based on selected color)
  const colorImages = {
    black: "product-001-b-300x366.jpg",
    white: "product-01-d-300x366.jpg",
    pink: "product-01-c-300x366.jpg",
  };

  const productImage = document.createElement("img");
  productImage.src = colorImages[selectedColor] || "product-001-b-300x366.jpg";
  productImage.style.width = "50px"; // Image width
  productImage.style.marginRight = "10px"; // Equivalent of "me-3"
  productImage.style.border = "1px solid #ddd"; // Equivalent of "img-thumbnail"
  productImage.style.borderRadius = "5px"; // Slight rounding
  productImage.style.padding = "3px"; // Thumbnail padding
  

  // Product Name, Size, Quantity, Total Price
  const productDetails = document.createElement("div");
  productDetails.innerHTML = `
         <strong>${selectedSize}</strong> - ${selectedColor} <br>
         Quantity: ${quantity} <br>
         Total Price: $${(price * quantity).toFixed(2)}
     `;

  // Append image and details to the cart item
  cartItem.appendChild(productImage);
  cartItem.appendChild(productDetails);

  // Add cart item to the cart items container
  cartItems.appendChild(cartItem);

  // Update the subtotal
  const currentSubtotal = parseFloat(subtotalElement.textContent);
  const newSubtotal = currentSubtotal + price * quantity;
  subtotalElement.textContent = newSubtotal.toFixed(2);
});
