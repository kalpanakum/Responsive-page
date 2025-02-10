/*
    app.js

*/

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-cards");
  const searchBox = document.getElementById("searchBox");
  const messageWindow = document.getElementById("message-window");

  function displayProducts(products) {
      productContainer.innerHTML = ""; // Clear existing products

      products.forEach(product => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.setAttribute("data-id", product.productId);

          // Product name with event handler
          const productName = document.createElement("div");
          productName.textContent = product.name;
          productName.setAttribute("data-id", product.productId);
          productName.style.cursor = "pointer";
          productName.addEventListener("click", () => {
              showMessage(product.description);
          });

          // Product image
          const productImage = document.createElement("img");
          productImage.src = product.imageName;
          productImage.alt = product.name;

          // Product price
          const productPrice = document.createElement("p");
          productPrice.classList.add("price");
          productPrice.textContent = `$${product.price.toFixed(2)}`;

         // SKU (make sure it's added correctly)
        const productSku = document.createElement("div");
        productSku.classList.add("sku");
        productSku.textContent = `SKU-${product.productSku}`;  // Assuming your product object has a `sku` property



          // Shopping cart button (only icon)
        const cartButton = document.createElement("button");
        cartButton.classList.add("add-to-cart");
        cartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`;  // Only icon
        cartButton.addEventListener("click", () => {
            showMessage(`${product.name} has been added to the cart.`);
        });

          // Append elements to the product card
        productCard.appendChild(productSku);
        productCard.appendChild(productPrice);
        productCard.appendChild(productName);
        productCard.appendChild(productImage);
        productCard.appendChild(cartButton);

        productContainer.appendChild(productCard);
      });
  }

  // Load and display all products initially
  displayProducts(productService.getProducts());

  // Search event listener
  searchBox.addEventListener("keyup", () => {
      const searchTerm = searchBox.value.toLowerCase();
      //console.log("Search Term:", searchTerm); 
      const filteredProducts = searchTerm
          ? productService.searchProducts(searchTerm)
          : productService.getProducts();

         // console.log("Filtered Products:", filteredProducts);
      displayProducts(filteredProducts);
  });

  // Function to show messages in the message window
  function showMessage(message) {
      messageWindow.textContent = message;
      messageWindow.style.display = "block";

      setTimeout(() => {
          messageWindow.style.display = "none";
      }, 3000); // Hide message after 3 seconds
  }
});