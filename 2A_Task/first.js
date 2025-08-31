let selectedRating = 0;

// रेटिंग चुनने के लिए इवेंट लिस्नर
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function() {
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
document.getElementById("submit").addEventListener("click", function() {
    if (selectedRating == 0) {
        alert("Please fill the rating before submitting.");
        return;
    }
    alert("Review submitted successfully!");
});

let cartCount = 0;
let totalPrice = 0;

// Cart count aur price update karne wala function
function updateCart(price) {
    cartCount++;
    totalPrice += price;
    
    // Navbar me count aur price update karna
    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("cart-total").innerText = `$${totalPrice.toFixed(2)}`;
}

// "Add to Cart" button ka event listener
document.getElementById("add-to-cart").addEventListener("click", function () {
    let priceText = document.querySelector(".fw-bold").innerText; 
    let price = parseFloat(priceText.replace("$", "").split("–")[0]); // First price extract karega

    updateCart(price);
});
